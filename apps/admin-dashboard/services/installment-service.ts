import { getSupabaseClient } from "@/lib/supabase/client";
import { type Payment as Installment } from "@/lib/mock-data/payments";
import { type InstallmentRow } from "@/types/database";
import { logActivity } from "./activity-service";

export type { PaymentMethod as InstallmentMethod, PaymentStatus as InstallmentStatus } from "@/lib/mock-data/payments";
export type { Payment as Installment } from "@/lib/mock-data/payments";

export interface InstallmentStats {
  todayInstallments: number;
  todayCollection: number;
  cashCollection: number;
  digitalCollection: number;
}

/**
 * Helper to map DB rows to Installment objects, assigning authoritative sequential installment numbers per customer.
 */
function mapRowsToInstallments(rows: InstallmentRow[]): Installment[] {
  // Group rows by customer to compute sequential installment numbers chronologically
  const customerGroupMap = new Map<string, InstallmentRow[]>();

  for (const row of rows) {
    const key = row.customer_id || row.customer_name;
    if (!customerGroupMap.has(key)) {
      customerGroupMap.set(key, []);
    }
    customerGroupMap.get(key)!.push(row);
  }

  // Calculate sequence per customer by creation/date order for successful payments
  const calculatedSeqMap = new Map<string, number>();

  customerGroupMap.forEach((customerRows) => {
    // Only successful/recorded payments consume sequential installment numbers
    const successfulPayments = customerRows.filter((r) => r.status !== "CANCELLED");

    // Sort chronologically ascending: date -> created_at -> id
    successfulPayments.sort((a, b) => {
      const timeA = new Date(a.date || a.created_at || 0).getTime();
      const timeB = new Date(b.date || b.created_at || 0).getTime();
      if (timeA !== timeB) return timeA - timeB;
      const createdA = new Date(a.created_at || 0).getTime();
      const createdB = new Date(b.created_at || 0).getTime();
      if (createdA !== createdB) return createdA - createdB;
      return a.id.localeCompare(b.id);
    });

    successfulPayments.forEach((r, idx) => {
      calculatedSeqMap.set(r.id, idx + 1);
    });
  });

  return rows.map((row) => {
    const totalInst = row.total_installments || 12;
    // Compute authoritative sequential installment number for each customer payment
    const instNum = calculatedSeqMap.get(row.id) ?? row.installment_number ?? 1;

    return {
      id: row.id,
      customerId: row.customer_id,
      customerName: row.customer_name,
      avatarInitials: row.customer_name
        ? row.customer_name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "RJ",
      installment: `${instNum}/${totalInst}`,
      amount: Number(row.amount),
      originalAmount: row.original_amount ? Number(row.original_amount) : undefined,
      method: row.method,
      date: row.date,
      recordedBy: row.recorded_by || "Owner",
      status: row.status,
    };
  });
}

function mapRowToInstallment(row: InstallmentRow): Installment {
  const instNum = row.installment_number || 1;
  const totalInst = row.total_installments || 12;
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    avatarInitials: row.customer_name
      ? row.customer_name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "RJ",
    installment: `${instNum}/${totalInst}`,
    amount: Number(row.amount),
    originalAmount: row.original_amount ? Number(row.original_amount) : undefined,
    method: row.method,
    date: row.date,
    recordedBy: row.recorded_by || "Owner",
    status: row.status,
  };
}

/**
 * Fetch all installments from Supabase installments table
 */
export async function fetchInstallments(): Promise<{ data: Installment[]; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: [], error: "Supabase client is not initialized or credentials missing." };
  }

  const { data, error } = await supabase
    .from("installments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetchInstallments error:", error.message || error);
    return { data: [], error: error.message };
  }

  return { data: mapRowsToInstallments(data || []), error: null };
}

/**
 * Fetch installments for a specific customer from Supabase
 */
export async function fetchInstallmentsByCustomerId(
  customerId: string
): Promise<{ data: Installment[]; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: [], error: "Supabase client is not initialized or credentials missing." };
  }

  const { data, error } = await supabase
    .from("installments")
    .select("*")
    .eq("customer_id", customerId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase fetchInstallmentsByCustomerId error:", error.message || error);
    return { data: [], error: error.message };
  }

  return { data: mapRowsToInstallments(data || []), error: null };
}

/**
 * Fetch today's collection metrics and stats from Supabase
 */
export async function fetchInstallmentStats(): Promise<{ data: InstallmentStats; error: string | null }> {
  const supabase = await getSupabaseClient();
  const defaultStats: InstallmentStats = {
    todayInstallments: 0,
    todayCollection: 0,
    cashCollection: 0,
    digitalCollection: 0,
  };

  if (!supabase) {
    return { data: defaultStats, error: "Supabase client is not initialized or credentials missing." };
  }

  const { data, error } = await supabase
    .from("installments")
    .select("amount, status, method, date");

  if (error || !data) {
    console.error("Supabase fetchInstallmentStats error:", error?.message || error);
    return { data: defaultStats, error: error?.message || "Failed to fetch stats." };
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const todayInstallments = data.filter((i) => i.date === todayStr && i.status === "RECORDED");

  const todayCollection = todayInstallments.reduce((sum, i) => sum + Number(i.amount), 0);
  const cashCollection = todayInstallments
    .filter((i) => i.method === "Cash")
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const digitalCollection = Math.max(0, todayCollection - cashCollection);

  return {
    data: {
      todayInstallments: todayInstallments.length,
      todayCollection,
      cashCollection,
      digitalCollection,
    },
    error: null,
  };
}

/**
 * Record a new installment in Supabase and write to activity_logs
 */
export async function recordInstallment(
  installmentData: Partial<Installment> & { installmentNumber?: number; totalInstallments?: number }
): Promise<{ data: Installment | null; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: "Supabase client is not initialized or credentials missing." };
  }

  const newReceiptNo = installmentData.id || `#RJ-${Math.floor(8822 + Math.random() * 1000)}`;
  const custId = installmentData.customerId || "RJ-2023-441";
  const custName = installmentData.customerName || "Ananya Sharma";
  const amountVal = Number(installmentData.amount) || 1000;
  const methodVal = installmentData.method || "Cash";
  const todayStr = new Date().toISOString().split("T")[0];

  // Parse installment string if provided (e.g. "8/12")
  let instNum = installmentData.installmentNumber;
  let totInst = installmentData.totalInstallments;

  if (!instNum && installmentData.installment && installmentData.installment.includes("/")) {
    const parts = installmentData.installment.split("/");
    instNum = parseInt(parts[0], 10);
    totInst = parseInt(parts[1], 10);
  }

  // If instNum is not explicitly provided, calculate it by fetching customer's existing installments from DB
  if (!instNum && custId) {
    const existingRes = await fetchInstallmentsByCustomerId(custId);
    if (existingRes.data) {
      const activeCount = existingRes.data.filter((p) => p.status !== "CANCELLED").length;
      instNum = activeCount + 1;
    }
  }

  const insertPayload = {
    id: newReceiptNo,
    customer_id: custId,
    customer_name: custName,
    scheme: "Diwali Savings Scheme",
    amount: amountVal,
    method: methodVal,
    date: installmentData.date || todayStr,
    installment_number: instNum || 1,
    total_installments: totInst || 12,
    recorded_by: installmentData.recordedBy || "Owner",
    status: installmentData.status || "RECORDED",
  };

  const { data, error } = await supabase
    .from("installments")
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    console.error("Supabase recordInstallment error:", error.message || error);
    return { data: null, error: error.message };
  }

  const createdInstallment = mapRowToInstallment(data);

  // Automatically log to activity_logs table
  await logActivity({
    performedBy: installmentData.recordedBy || "Owner",
    entity: "Installment",
    action: "Installment Recorded",
    description: `Recorded ₹${amountVal.toLocaleString("en-IN")} via ${methodVal} for ${custName} (${newReceiptNo})`,
    customerId: custId,
  });

  return { data: createdInstallment, error: null };
}

/**
 * Update an existing installment in Supabase and write to activity_logs
 */
export async function updateInstallment(
  id: string,
  updates: Partial<Installment> & { notes?: string }
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Supabase client is not initialized or credentials missing." };
  }

  const updatePayload: Record<string, any> = {};
  if (updates.amount !== undefined && !isNaN(Number(updates.amount))) {
    updatePayload.amount = Number(updates.amount);
  }
  if (updates.date !== undefined && updates.date !== "") {
    updatePayload.date = updates.date;
  }
  if (updates.method !== undefined && updates.method !== "") {
    updatePayload.method = updates.method;
  }

  if (Object.keys(updatePayload).length === 0) {
    return { success: true, error: null };
  }

  const { data, error } = await supabase
    .from("installments")
    .update(updatePayload)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase updateInstallment error:", error.message || error);
    return { success: false, error: error.message };
  }

  const updatedRow = data && data.length > 0 ? data[0] : null;

  // Recalculate customer's paid amount & count
  if (updatedRow?.customer_id) {
    const { data: allInst } = await supabase
      .from("installments")
      .select("amount, status")
      .eq("customer_id", updatedRow.customer_id);

    if (allInst) {
      const rec = allInst.filter((i) => i.status === "RECORDED");
      const paidAmt = rec.reduce((sum, i) => sum + Number(i.amount), 0);
      await supabase
        .from("customers")
        .update({ installments_paid: rec.length, paid_amount: paidAmt })
        .eq("id", updatedRow.customer_id);
    }
  }

  await logActivity({
    performedBy: "Owner",
    entity: "Installment",
    action: "Installment Updated",
    description: `Updated installment ${id} details`,
    customerId: updatedRow?.customer_id,
  });

  return { success: true, error: null };
}

/**
 * Delete an installment from Supabase and write to activity_logs
 */
export async function deleteInstallment(
  id: string,
  customerId?: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Supabase client is not initialized or credentials missing." };
  }

  const { data: targetRows } = await supabase
    .from("installments")
    .select("customer_id, customer_name, id, amount")
    .eq("id", id);

  const targetRow = targetRows && targetRows.length > 0 ? targetRows[0] : null;
  const targetCustId = customerId || targetRow?.customer_id;

  const { error } = await supabase
    .from("installments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteInstallment error:", error.message || error);
    return { success: false, error: error.message };
  }

  // Recalculate customer's paid amount & count
  if (targetCustId) {
    const { data: remainingInst } = await supabase
      .from("installments")
      .select("amount, status")
      .eq("customer_id", targetCustId);

    const rec = (remainingInst || []).filter((i) => i.status === "RECORDED");
    const paidAmt = rec.reduce((sum, i) => sum + Number(i.amount), 0);

    await supabase
      .from("customers")
      .update({ installments_paid: rec.length, paid_amount: paidAmt })
      .eq("id", targetCustId);
  }

  await logActivity({
    performedBy: "Owner",
    entity: "Installment",
    action: "Installment Deleted",
    description: `Deleted installment record ${id}`,
    customerId: targetCustId,
  });

  return { success: true, error: null };
}
