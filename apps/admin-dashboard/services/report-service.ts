import { getSupabaseClient } from "@/lib/supabase/client";

export interface ReportMetrics {
  todayCollection: number;
  monthlyCollection: number;
  yearlyCollection: number;
  totalCustomers: number;
  activeCount: number;
  pendingCount: number;
  readyCount: number;
  completedCount: number;
  redemptionValue: number;
  cashCollection: number;
  gpayCollection: number;
  phonepeCollection: number;
  bankTransferCollection: number;
  gpayPct: number;
  cashPct: number;
  transferPct: number;
  totalFlow: number;
  recentTransactions: Array<{
    id: string;
    name: string;
    amount: number;
    method: string;
    date: string;
    status: string;
    initials: string;
  }>;
}

export async function fetchReportMetrics(range: string): Promise<{ data: ReportMetrics; error: string | null }> {
  const supabase = await getSupabaseClient();
  const emptyMetrics: ReportMetrics = {
    todayCollection: 0,
    monthlyCollection: 0,
    yearlyCollection: 0,
    totalCustomers: 0,
    activeCount: 0,
    pendingCount: 0,
    readyCount: 0,
    completedCount: 0,
    redemptionValue: 0,
    cashCollection: 0,
    gpayCollection: 0,
    phonepeCollection: 0,
    bankTransferCollection: 0,
    gpayPct: 0,
    cashPct: 0,
    transferPct: 0,
    totalFlow: 0,
    recentTransactions: [],
  };

  if (!supabase) {
    return { data: emptyMetrics, error: "Supabase client is not initialized or credentials missing." };
  }

  try {
    // 1. Query installments
    const { data: installments } = await supabase
      .from("installments")
      .select("*")
      .order("created_at", { ascending: false });

    // 2. Query customers
    const { data: customers } = await supabase.from("customers").select("*");

    // 3. Query redemptions
    const { data: redemptions } = await supabase.from("redemptions").select("*");

    const todayStr = new Date().toISOString().split("T")[0];
    const currentYearStr = new Date().getFullYear().toString();
    const currentMonthStr = new Date().toISOString().slice(0, 7);

    const validInst = (installments || []).filter((i) => i.status === "RECORDED");

    const todayCollection = validInst
      .filter((i) => i.date === todayStr)
      .reduce((sum, i) => sum + Number(i.amount), 0);

    const monthlyCollection = validInst
      .filter((i) => i.date && i.date.startsWith(currentMonthStr))
      .reduce((sum, i) => sum + Number(i.amount), 0);

    const yearlyCollection = validInst
      .filter((i) => i.date && i.date.startsWith(currentYearStr))
      .reduce((sum, i) => sum + Number(i.amount), 0);

    const cashCollection = validInst.filter((i) => i.method === "Cash").reduce((sum, i) => sum + Number(i.amount), 0);
    const gpayCollection = validInst.filter((i) => i.method === "GPay" || i.method === "PhonePe").reduce((sum, i) => sum + Number(i.amount), 0);
    const bankTransferCollection = validInst.filter((i) => i.method === "Bank Transfer" || i.method === "Transfer").reduce((sum, i) => sum + Number(i.amount), 0);

    const totalFlow = validInst.reduce((sum, i) => sum + Number(i.amount), 0);
    const gpayPct = totalFlow > 0 ? Math.round((gpayCollection / totalFlow) * 100) : 0;
    const cashPct = totalFlow > 0 ? Math.round((cashCollection / totalFlow) * 100) : 0;
    const transferPct = totalFlow > 0 ? Math.round((bankTransferCollection / totalFlow) * 100) : 0;

    const totalCust = customers?.length || 0;
    const activeCount = customers?.filter((c) => c.status === "active").length || 0;
    const pendingCount = customers?.filter((c) => c.status === "pending_installment").length || 0;
    const readyCount = customers?.filter((c) => c.status === "ready_for_redemption").length || 0;
    const completedCount = customers?.filter((c) => c.status === "completed").length || 0;

    const redemptionVal = (redemptions || []).reduce((sum, r) => sum + Number(r.net_eligible_value), 0);

    const recentTransactions = (installments || []).slice(0, 5).map((row) => ({
      id: row.id,
      name: row.customer_name || "Customer",
      amount: Number(row.amount),
      method: row.method || "Cash",
      date: row.date || todayStr,
      status: row.status || "RECORDED",
      initials: (row.customer_name || "C").split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2),
    }));

    return {
      data: {
        todayCollection,
        monthlyCollection: monthlyCollection || todayCollection,
        yearlyCollection: yearlyCollection || monthlyCollection || todayCollection,
        totalCustomers: totalCust,
        activeCount,
        pendingCount,
        readyCount,
        completedCount,
        redemptionValue: redemptionVal,
        cashCollection,
        gpayCollection,
        phonepeCollection: gpayCollection,
        bankTransferCollection,
        gpayPct,
        cashPct,
        transferPct,
        totalFlow,
        recentTransactions,
      },
      error: null,
    };
  } catch (err: any) {
    console.error("Supabase fetchReportMetrics error:", err);
    return { data: emptyMetrics, error: err.message || "Failed to load report metrics." };
  }
}
