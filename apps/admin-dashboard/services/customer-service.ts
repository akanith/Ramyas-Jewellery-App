import { getSupabaseClient } from "@/lib/supabase/client";
import { type Customer } from "@/lib/mock-data/customers";
import { type CustomerRow } from "@/types/database";
import { logActivity } from "./activity-service";

/**
 * Fetch all customers from Supabase customers table
 */
export async function fetchCustomers(): Promise<{ data: Customer[]; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: [], error: "Supabase client is not initialized or credentials missing." };
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetchCustomers error:", error);
    return { data: [], error: error.message };
  }

  return { data: (data || []).map(mapRowToCustomer), error: null };
}

/**
 * Fetch single customer by ID from Supabase customers table
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

  return { data: mapRowToCustomer(data), error: null };
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
    scheme_name: customerData.scheme || "Swarna Nidhi",
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
  return {
    id: row.id,
    name: row.name,
    initials: row.initials || row.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    avatarColor: row.avatar_color || "#7B1C1C",
    avatarTextColor: row.avatar_text_color || "#FFFFFF",
    photo: row.photo_url,
    mobile: row.mobile,
    scheme: row.scheme_name,
    status: row.status,
    installmentsPaid: row.installments_paid,
    totalInstallments: row.total_installments,
    percentage: row.percentage || Math.round((row.installments_paid / row.total_installments) * 100),
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
