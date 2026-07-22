import { fetchInstallmentStats } from "./installment-service";
import { fetchCustomers } from "./customer-service";
import { fetchActivityLogs, type ActivityLog } from "./activity-service";

export interface DashboardOverview {
  todayInstallments: number;
  todayCollection: number;
  cashCollection: number;
  digitalCollection: number;
  activeCustomers: number;
  pendingCount: number;
  readyForRedemption: number;
  activities: ActivityLog[];
}

export async function fetchDashboardOverview(): Promise<{ data: DashboardOverview; error: string | null }> {
  const [instStatsRes, custRes, activityLogs] = await Promise.all([
    fetchInstallmentStats(),
    fetchCustomers(),
    fetchActivityLogs(),
  ]);

  const stats = instStatsRes.data;
  const customers = custRes.data || [];

  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const pendingCount = customers.filter((c) => c.status === "pending_installment").length;
  const readyForRedemption = customers.filter((c) => c.status === "ready_for_redemption").length;

  return {
    data: {
      todayInstallments: stats.todayInstallments,
      todayCollection: stats.todayCollection,
      cashCollection: stats.cashCollection,
      digitalCollection: stats.digitalCollection,
      activeCustomers,
      pendingCount,
      readyForRedemption,
      activities: activityLogs,
    },
    error: null,
  };
}
