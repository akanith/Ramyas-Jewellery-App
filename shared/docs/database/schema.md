# Ramyas App — Database Documentation

## Overview

The Ramyas App uses **PostgreSQL** (via Supabase) as its primary database.

## Schema Diagram (Planned)

```
auth.users (Supabase managed)
    │
    └── profiles (1:1)
            │
            └── scheme_members (1:N)
                    │
                    ├── payments (1:N)
                    │
                    └── redemptions (1:N)

scheme_plans (1:N) ──► scheme_members

profiles (1:N) ──► notifications
```

## Planned Tables

### `profiles`
Extends `auth.users` with customer-specific data.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` (PK, FK → auth.users) | Supabase Auth user ID |
| `full_name` | `text` | Customer full name |
| `phone` | `text` | Mobile number (unique) |
| `email` | `text` | Email (optional) |
| `address` | `text` | Customer address |
| `fcm_token` | `text` | Firebase push notification token |
| `avatar_url` | `text` | Supabase Storage URL |
| `created_at` | `timestamptz` | Registration timestamp |
| `updated_at` | `timestamptz` | Last update timestamp |

---

### `scheme_plans`
Configuration for different jewellery savings scheme options.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` (PK) | Scheme plan ID |
| `name` | `text` | Plan name (e.g., "Gold Saver 11") |
| `monthly_amount` | `numeric` | Monthly payment amount (INR) |
| `duration_months` | `integer` | Total scheme duration |
| `bonus_month` | `integer` | Free bonus month number |
| `is_active` | `boolean` | Whether plan is accepting enrollment |
| `created_at` | `timestamptz` | — |

---

### `scheme_members`
Customer enrollment records for scheme plans.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` (PK) | Enrollment ID |
| `customer_id` | `uuid` (FK → profiles) | Customer |
| `plan_id` | `uuid` (FK → scheme_plans) | Plan enrolled in |
| `status` | `enum` | active / matured / cancelled |
| `start_date` | `date` | Enrollment start date |
| `next_due_date` | `date` | Next payment due date |
| `payments_made` | `integer` | Count of confirmed payments |
| `created_at` | `timestamptz` | — |

---

### `payments`
Individual monthly payment records.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` (PK) | Payment ID |
| `scheme_member_id` | `uuid` (FK → scheme_members) | Linked enrollment |
| `amount` | `numeric` | Amount paid (INR) |
| `payment_date` | `date` | Date of payment |
| `month_number` | `integer` | Which month (1–12) |
| `payment_method` | `text` | cash / upi / card |
| `reference_number` | `text` | Receipt / transaction reference |
| `recorded_by` | `uuid` (FK → auth.users) | Admin who recorded |
| `created_at` | `timestamptz` | — |

---

### `redemptions`
Scheme redemption requests.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` (PK) | Redemption ID |
| `scheme_member_id` | `uuid` (FK → scheme_members) | Linked enrollment |
| `requested_at` | `timestamptz` | Request timestamp |
| `status` | `enum` | pending / approved / rejected |
| `approved_by` | `uuid` (FK → auth.users) | Approving admin |
| `notes` | `text` | Admin notes |

---

## Naming Conventions

- All table names: `snake_case`, plural
- All column names: `snake_case`
- Primary keys: `id` (UUID, default `gen_random_uuid()`)
- Timestamps: `created_at`, `updated_at` (auto-managed with trigger)
- Foreign keys: `<table_singular>_id` (e.g., `customer_id`)
