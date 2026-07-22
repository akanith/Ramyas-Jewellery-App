// ============================================================
// Supabase Edge Function — send-payment-reminder
// ============================================================
// Purpose: Send payment reminder notifications to customers
//          whose payment due date is approaching.
// Trigger: Scheduled via pg_cron or Supabase Cron (daily)
// ============================================================

Deno.serve(async (_req: Request) => {
  // TODO: Implement payment reminder logic
  // 1. Query scheme_members where next_due_date = today + N days
  // 2. For each customer, call send-fcm-notification function
  // 3. Log reminder sent to notifications table
  return new Response(
    JSON.stringify({ message: 'placeholder — not yet implemented' }),
    { headers: { 'Content-Type': 'application/json' } },
  );
});
