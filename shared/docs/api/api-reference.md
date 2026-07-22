# Ramyas App — API Documentation

## Overview

The Ramyas App backend is powered by Supabase. All API calls go through:
- **Supabase JavaScript Client** (Admin Dashboard)
- **Supabase Dart Client** (Customer App)
- **Supabase Edge Functions** (Server-side operations)

## Authentication

All requests require a valid JWT issued by Supabase Auth.

```
Authorization: Bearer <supabase-jwt>
```

## Supabase REST API Base URL

```
https://<project-ref>.supabase.co/rest/v1/
```

## Edge Function Base URL

```
https://<project-ref>.supabase.co/functions/v1/
```

---

## Edge Functions Reference

### POST `/functions/v1/send-fcm-notification`

Send a push notification to a customer device.

**Request Body**:
```json
{
  "customer_id": "uuid",
  "title": "Payment Reminder",
  "body": "Your payment is due on 25th July",
  "data": {
    "type": "payment_reminder",
    "scheme_id": "uuid"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message_id": "fcm-message-id"
}
```

---

### POST `/functions/v1/send-payment-reminder`

Trigger bulk payment reminders for upcoming due dates.

**Request Body**:
```json
{
  "days_ahead": 3
}
```

---

### POST `/functions/v1/process-scheme-maturity`

Process schemes that have reached maturity.

**Request Body**: None (processes all eligible schemes)

---

## Database Tables (REST API)

All tables are accessible via Supabase REST API with RLS enforced.

> Full table schemas will be documented after the database migration phase.

| Endpoint | Table | Description |
|---|---|---|
| `/profiles` | `profiles` | Customer profiles |
| `/scheme_plans` | `scheme_plans` | Available scheme configurations |
| `/scheme_members` | `scheme_members` | Customer-scheme enrollments |
| `/payments` | `payments` | Payment records |
| `/redemptions` | `redemptions` | Redemption requests |
| `/notifications` | `notifications` | Notification history |
