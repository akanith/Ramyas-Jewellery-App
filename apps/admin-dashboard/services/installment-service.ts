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
    console.error("Supabase fetchInstallments error:", error);
    return { data: [], error: error.message };
  }

  return { data: (data || []).map(mapRowToInstallment), error: null };
}

/**
 * Fetch installments for a specific customer from Supabase
 */
export async function fetchInstallmentsByCustomerId(customerId: string): Promise<{ data: Installment[]; error: string | null }> {
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
    console.error("Supabase fetchInstallmentsByCustomerId error:", error);
    return { data: [], error: error.message };
  }

  return { data: (data || []).map(mapRowToInstallment), error: null };
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
    console.error("Supabase fetchInstallmentStats error:", error);
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
  installmentData: Partial<Installment>
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

  const insertPayload = {
    id: newReceiptNo,
    customer_id: custId,
    customer_name: custName,
    scheme: "Swarna Nidhi",
    amount: amountVal,
    method: methodVal,
    date: installmentData.date || todayStr,
    installment_number: 9,
    total_installments: 12,
    recorded_by: installmentData.recordedBy || "Owner",
    status: installmentData.status || "RECORDED",
  };

  const { data, error } = await supabase
    .from("installments")
    .insert([insertPayload])
    .select()
    .single();

  if (error) {
    console.error("Supabase recordInstallment error:", error);
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

function mapRowToInstallment(row: InstallmentRow): Installment {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    avatarInitials: row.customer_name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    installment: `${row.installment_number}/${row.total_installments}`,
    amount: Number(row.amount),
    originalAmount: row.original_amount ? Number(row.original_amount) : undefined,
    method: row.method,
    date: row.date,
    recordedBy: row.recorded_by || "Owner",
    status: row.status,
  };
}
