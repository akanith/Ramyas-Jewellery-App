import { getSupabaseClient } from "@/lib/supabase/client";
import { type ActivityLogRow } from "@/types/database";

export interface ActivityLog {
  id: string;
  timestamp: string;
  performedBy: string;
  entity: "Customer" | "Installment" | "Redemption" | "Settings" | "Auth";
  action: string;
  description?: string;
  customerId?: string;
}

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(20);

  if (error || !data) {
    console.error("Supabase fetchActivityLogs error:", error);
    return [];
  }

  return data.map(mapRowToActivity);
}

export async function logActivity(log: Omit<ActivityLog, "id" | "timestamp">): Promise<void> {
  const supabase = await getSupabaseClient();
  if (!supabase) return;

  const { error } = await supabase.from("activity_logs").insert([
    {
      performed_by: log.performedBy || "Owner",
      entity: log.entity,
      action: log.action,
      description: log.description,
      customer_id: log.customerId,
    },
  ]);

  if (error) {
    console.error("Supabase logActivity error:", error);
  }
}

function formatRelativeTime(ts: string): string {
  if (!ts) return "Just now";
  if (ts.includes("ago") || ts.includes("now") || ts.length < 12) return ts;

  try {
    const date = new Date(ts);
    if (isNaN(date.getTime())) return ts;

    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  } catch (err) {
    return ts;
  }
}

function mapRowToActivity(row: ActivityLogRow): ActivityLog {
  return {
    id: row.id,
    timestamp: formatRelativeTime(row.timestamp),
    performedBy: row.performed_by,
    entity: row.entity,
    action: row.action,
    description: row.description,
    customerId: row.customer_id,
  };
}
