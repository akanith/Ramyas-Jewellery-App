// ============================================================
// Supabase Edge Function — send-fcm-notification
// Deno TypeScript — deployed to Supabase Edge Runtime
// ============================================================
// Triggered by: Supabase Database Webhook or direct HTTP call
// Purpose: Send FCM push notification to a customer device
// ============================================================
// NOTE: Full implementation in the Notifications phase.

Deno.serve(async (_req: Request) => {
  // TODO: Implement FCM notification dispatch
  // 1. Parse request body (customer_id, title, body, data)
  // 2. Fetch FCM token from customer profile
  // 3. Call Firebase Admin SDK via HTTP v1 API
  // 4. Log result to notifications table
  return new Response(
    JSON.stringify({ message: 'placeholder — not yet implemented' }),
    { headers: { 'Content-Type': 'application/json' } },
  );
});
