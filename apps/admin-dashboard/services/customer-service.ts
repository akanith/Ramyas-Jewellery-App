import { getSupabaseClient } from "@/lib/supabase/client";
import { type Customer } from "@/lib/mock-data/customers";
import { type CustomerRow } from "@/types/database";
import { logActivity } from "./activity-service";

/**
 * Fetch all customers from Supabase customers table and compute live installment progress
 */
export async function fetchCustomers(): Promise<{ data: Customer[]; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: [], error: "Supabase client is not initialized or credentials missing." };
  }

  const { data: customerRows, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetchCustomers error:", error);
    return { data: [], error: error.message };
  }

  // Query recorded installments to compute live installment counts per customer
  const { data: installmentRows } = await supabase
    .from("installments")
    .select("customer_id, customer_name, status, amount");

  const recordedCountMap = new Map<string, number>();
  const totalPaidMap = new Map<string, number>();

  if (installmentRows) {
    for (const inst of installmentRows) {
      if (inst.status === "RECORDED") {
        const key = inst.customer_id || inst.customer_name;
        recordedCountMap.set(key, (recordedCountMap.get(key) || 0) + 1);
        totalPaidMap.set(key, (totalPaidMap.get(key) || 0) + Number(inst.amount));
      }
    }
  }

  const customers = (customerRows || []).map((row) => {
    const cust = mapRowToCustomer(row);
    const key = row.id;
    const keyByName = row.name;

    // Use live recorded payments count if available, fallback to DB column
    const realCount = recordedCountMap.has(key)
      ? recordedCountMap.get(key)!
      : recordedCountMap.get(keyByName) ?? row.installments_paid ?? 0;

    const realPaidAmt = totalPaidMap.has(key)
      ? totalPaidMap.get(key)!
      : totalPaidMap.get(keyByName) ?? row.paid_amount ?? 0;

    const totalInst = cust.totalInstallments || 12;
    cust.installmentsPaid = realCount;
    cust.paidAmount = realPaidAmt;
    cust.percentage = Math.min(100, Math.round((realCount / totalInst) * 100));
    cust.scheme = "Diwali Savings Scheme";

    return cust;
  });

  return { data: customers, error: null };
}

/**
 * Fetch single customer by ID from Supabase customers table and compute live progress
 */
export async function fetchCustomerById(id: string): Promise<{ data: Customer | null; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: "Supabase client is not initialized or credentials missing." };
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Supabase fetchCustomerById error:", error);
    return { data: null, error: error?.message || "Customer not found." };
  }

  const customer = mapRowToCustomer(data);
  customer.scheme = "Diwali Savings Scheme";

  // Calculate live recorded installments count & total paid amount for this customer
  const { data: installmentRows } = await supabase
    .from("installments")
    .select("amount, status")
    .eq("customer_id", id);

  if (installmentRows) {
    const recordedList = installmentRows.filter((i) => i.status === "RECORDED");
    customer.installmentsPaid = recordedList.length;
    customer.paidAmount = recordedList.reduce((sum, i) => sum + Number(i.amount), 0);
    customer.percentage = Math.min(100, Math.round((customer.installmentsPaid / customer.totalInstallments) * 100));
  }

  return { data: customer, error: null };
}

/**
 * Create a new customer in Supabase customers table
 */
export async function createCustomer(customerData: Partial<Customer>): Promise<{ data: Customer | null; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: "Supabase client is not initialized or credentials missing." };
  }
  
  const newId = `RJ-2023-${Math.floor(100 + Math.random() * 900)}`;
  const totalInst = customerData.totalInstallments || 12;
  const paidAmt = customerData.paidAmount || 1000;
  const remCredit = Math.max(0, totalInst * 1000 - paidAmt);
  const bonusCred = 1000;
  const totalEligible = (totalInst * 1000) + bonusCred;

  const insertPayload = {
    id: customerData.id || newId,
    name: customerData.name || "New Customer",
    mobile: customerData.mobile || "+91 90000 00000",
    scheme_name: "Diwali Savings Scheme",
    status: customerData.status || "active",
    installments_paid: customerData.installmentsPaid || 1,
    total_installments: totalInst,
    paid_amount: paidAmt,
    remaining_credit: remCredit,
    bonus_credit: bonusCred,
    total_eligible_value: totalEligible,
    address: customerData.address || "",
    notes: customerData.notes || "",
  };

  const { data, error } = await supabase
    .from("customers")
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    console.error("Supabase createCustomer error:", error);
    return { data: null, error: error.message };
  }

  const createdCustomer = mapRowToCustomer(data);

  // Automatically log to activity_logs
  await logActivity({
    performedBy: "Owner",
    entity: "Customer",
    action: "Customer Created",
    description: `Enrolled ${createdCustomer.name} in ${createdCustomer.scheme} scheme`,
    customerId: createdCustomer.id,
  });

  return { data: createdCustomer, error: null };
}

/**
 * Update an existing customer in Supabase customers table
 */
export async function updateCustomer(id: string, updates: Partial<Customer>): Promise<{ data: Customer | null; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: "Supabase client is not initialized or credentials missing." };
  }

  const updatePayload: Record<string, any> = {};
  if (updates.name !== undefined) updatePayload.name = updates.name;
  if (updates.mobile !== undefined) updatePayload.mobile = updates.mobile;
  if (updates.scheme !== undefined) updatePayload.scheme_name = updates.scheme;
  if (updates.status !== undefined) updatePayload.status = updates.status;
  if (updates.address !== undefined) updatePayload.address = updates.address;
  if (updates.notes !== undefined) updatePayload.notes = updates.notes;
  if (updates.installmentsPaid !== undefined) updatePayload.installments_paid = updates.installmentsPaid;
  if (updates.paidAmount !== undefined) updatePayload.paid_amount = updates.paidAmount;

  const { data, error } = await supabase
    .from("customers")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateCustomer error:", error);
    return { data: null, error: error.message };
  }

  const updatedCustomer = mapRowToCustomer(data);

  // Automatically log to activity_logs
  await logActivity({
    performedBy: "Owner",
    entity: "Customer",
    action: "Customer Updated",
    description: `Updated customer profile details for ${updatedCustomer.name}`,
    customerId: updatedCustomer.id,
  });

  return { data: updatedCustomer, error: null };
}

function mapRowToCustomer(row: CustomerRow): Customer {
  const totalInst = row.total_installments || 12;
  const instPaid = row.installments_paid || 0;
  return {
    id: row.id,
    name: row.name,
    initials: row.initials || row.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    avatarColor: row.avatar_color || "#7B1C1C",
    avatarTextColor: row.avatar_text_color || "#FFFFFF",
    photo: row.photo_url,
    mobile: row.mobile,
    scheme: "Diwali Savings Scheme",
    status: row.status,
    installmentsPaid: instPaid,
    totalInstallments: totalInst,
    percentage: Math.min(100, Math.round((instPaid / totalInst) * 100)),
    joinDate: row.join_date,
    address: row.address || "",
    paidAmount: Number(row.paid_amount),
    remainingCredit: Number(row.remaining_credit),
    bonusCredit: Number(row.bonus_credit),
    nextPayment: row.next_payment || "UPCOMING",
    matureDate: row.mature_date || "2024",
    startDate: row.start_date || "2023",
    totalEligibleValue: Number(row.total_eligible_value),
    notes: row.notes || "",
    installments: [],
  };
}
