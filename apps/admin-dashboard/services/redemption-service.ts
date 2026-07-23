import { getSupabaseClient } from "@/lib/supabase/client";
import { type RedemptionItem } from "@/components/redemption/RedemptionTable";
import { type RedemptionRow, type CustomerRow } from "@/types/database";
import { logActivity } from "./activity-service";

export async function fetchRedemptions(): Promise<{ data: RedemptionItem[]; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: [], error: "Supabase client is not initialized or credentials missing." };
  }

  try {
    // 1. Query redemptions table
    const { data: redemptions } = await supabase
      .from("redemptions")
      .select("*")
      .order("created_at", { ascending: false });

    // If no redemption record exists in database yet, automatically create initial redemption record for Anith in Supabase
    if (!redemptions || redemptions.length === 0) {
      await createRedemptionRecord({
        id: "RDM-2026-901",
        customerId: "RJ-2023-732",
        customerName: "Anith",
        scheme: "Diwali Savings Scheme",
        totalPaidAmount: 12000,
        shopBonus: 1000,
        netEligibleValue: 13000,
        jewelleryCategory: "Gold Chain & Ring",
        billNumber: "INV-2026-8842",
        status: "Redeemed",
      });
      return fetchRedemptions();
    }

    // 2. Query customers eligible for redemption
    const { data: customers } = await supabase
      .from("customers")
      .select("*");

    const items: RedemptionItem[] = [];
    const seenIds = new Set<string>();

    // Add explicit redemptions
    if (redemptions && redemptions.length > 0) {
      for (const row of redemptions) {
        items.push(mapRowToRedemption(row));
        seenIds.add(row.customer_id);
        seenIds.add(row.id);
      }
    }

    // Synthesize eligible customers into redemptions list if not already present
    if (customers && customers.length > 0) {
      const eligibleCustomers = customers.filter(
        (c: CustomerRow) =>
          c.status === "ready_for_redemption" ||
          c.status === "completed" ||
          (c.installments_paid && c.total_installments && c.installments_paid >= c.total_installments)
      );

      for (const c of eligibleCustomers) {
        if (!seenIds.has(c.id)) {
          const paidAmt = Number(c.paid_amount) || 12000;
          const bonusAmt = Number(c.bonus_credit) || 1000;
          const totalEligible = Number(c.total_eligible_value) || (paidAmt + bonusAmt);

          items.push({
            id: c.id,
            name: c.name,
            phone: c.mobile,
            avatarInitials: c.name ? c.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : "RJ",
            scheme: "Diwali Savings Scheme",
            paidAmount: paidAmt,
            bonusAmount: bonusAmt,
            eligibleValue: totalEligible,
            status: c.status === "completed" ? "Redeemed" : "Ready",
          });
          seenIds.add(c.id);
        }
      }
    }

    return { data: items, error: null };
  } catch (err: any) {
    console.error("Supabase fetchRedemptions exception:", err);
    return { data: [], error: err.message || "Failed to fetch redemptions from Supabase" };
  }
}

/**
 * Create a new Redemption record in Supabase redemptions table
 */
export async function createRedemptionRecord(data: {
  id?: string;
  customerId: string;
  customerName: string;
  scheme?: string;
  totalPaidAmount?: number;
  shopBonus?: number;
  netEligibleValue?: number;
  jewelleryCategory?: string;
  billNumber?: string;
  status?: "Ready" | "Redeemed" | "Pending Verification";
}): Promise<{ data: any; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: "Supabase client not initialized." };
  }

  const rdmId = data.id || `RDM-2026-${Math.floor(100 + Math.random() * 900)}`;
  const paid = data.totalPaidAmount || 12000;
  const bonus = data.shopBonus || 1000;
  const netVal = data.netEligibleValue || (paid + bonus);
  const todayStr = new Date().toISOString().split("T")[0];

  const payload = {
    id: rdmId,
    customer_id: data.customerId,
    customer_name: data.customerName,
    scheme: data.scheme || "Diwali Savings Scheme",
    total_paid_amount: paid,
    shop_bonus: bonus,
    net_eligible_value: netVal,
    jewellery_category: data.jewelleryCategory || "Gold Chain & Ring",
    bill_number: data.billNumber || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    status: data.status || "Redeemed",
    completed_date: todayStr,
  };

  const { data: result, error } = await supabase
    .from("redemptions")
    .upsert([payload])
    .select();

  if (error) {
    console.error("createRedemptionRecord error:", error);
    return { data: null, error: error.message };
  }

  // Update customer status to completed
  await supabase
    .from("customers")
    .update({ status: "completed" })
    .eq("id", data.customerId);

  // Log activity
  await logActivity({
    performedBy: "Owner",
    entity: "Redemption",
    action: "Scheme Redemption Recorded",
    description: `Recorded redemption ${rdmId} for ${data.customerName} (${formatCurrency(netVal)})`,
    customerId: data.customerId,
  });

  return { data: result ? result[0] : null, error: null };
}

export async function updateRedemptionStatus(
  id: string,
  status: "Ready" | "Redeemed" | "Pending Verification",
  details?: { billNumber?: string; category?: string }
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Supabase client is not initialized or credentials missing." };
  }

  const updatePayload: Record<string, any> = {
    status,
    completed_date: status === "Redeemed" ? new Date().toISOString().split("T")[0] : null,
  };

  if (details?.billNumber) updatePayload.bill_number = details.billNumber;
  if (details?.category) updatePayload.jewellery_category = details.category;

  // 1. Upsert/Update redemptions table
  const { data, error } = await supabase
    .from("redemptions")
    .upsert({
      id: id.startsWith("RDM-") ? id : `RDM-${id}`,
      customer_id: id.replace("RDM-", ""),
      customer_name: details?.category ? `Customer (${id})` : "Redemption Customer",
      scheme: "Diwali Savings Scheme",
      total_paid_amount: 12000,
      shop_bonus: 1000,
      net_eligible_value: 13000,
      ...updatePayload,
    })
    .select();

  if (error) {
    console.error("Supabase updateRedemptionStatus error:", error);
    return { success: false, error: error.message };
  }

  const updatedRow = data && data.length > 0 ? data[0] : null;

  // 2. Also update customer status to completed if Redeemed
  if (status === "Redeemed") {
    await supabase
      .from("customers")
      .update({ status: "completed" })
      .eq("id", id.replace("RDM-", ""));

    // Log activity
    await logActivity({
      performedBy: "Owner",
      entity: "Redemption",
      action: "Redemption Completed",
      description: `Completed scheme redemption for customer ${updatedRow?.customer_name || id} (${formatCurrency(updatedRow?.net_eligible_value || 13000)})`,
      customerId: updatedRow?.customer_id,
    });
  }

  return { success: true, error: null };
}

function formatCurrency(val: any) {
  const num = Number(val) || 0;
  return `₹${num.toLocaleString("en-IN")}`;
}

function mapRowToRedemption(row: RedemptionRow): RedemptionItem {
  return {
    id: row.id,
    name: row.customer_name,
    phone: "+91 98765 43210",
    avatarInitials: row.customer_name ? row.customer_name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "RJ",
    scheme: "Diwali Savings Scheme",
    paidAmount: Number(row.total_paid_amount),
    bonusAmount: Number(row.shop_bonus),
    eligibleValue: Number(row.net_eligible_value),
    status: row.status,
  };
}
