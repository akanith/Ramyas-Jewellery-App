# Supabase — Backend Configuration

This directory contains all Supabase-related configuration, migrations, functions, and policies.

## Directory Structure

```
supabase/
├── migrations/       # Versioned SQL migration files
│   └── YYYYMMDDHHMMSS_description.sql
├── seed/             # Seed data for development & testing
│   └── seed.sql
├── functions/        # Supabase Edge Functions (Deno TypeScript)
│   ├── send-payment-reminder/
│   │   └── index.ts
│   ├── process-scheme-maturity/
│   │   └── index.ts
│   └── send-fcm-notification/
│       └── index.ts
└── policies/         # Row Level Security policy SQL files
    ├── customers_rls.sql
    ├── payments_rls.sql
    ├── schemes_rls.sql
    └── notifications_rls.sql
```

## Migration Naming Convention

```
YYYYMMDDHHMMSS_short_description.sql
```

Example: `20260101120000_create_customers_table.sql`

## Planned Tables

| Table | Description |
|---|---|
| `profiles` | Customer profile data (extends auth.users) |
| `scheme_plans` | Scheme configuration (monthly amount, duration) |
| `scheme_members` | Customer enrollment in a scheme |
| `payments` | Individual monthly payment records |
| `redemptions` | Scheme redemption requests |
| `notifications` | Push notification history |
| `admin_users` | Admin user roles and permissions |

## Commands

```bash
# Start local Supabase
supabase start

# Apply migrations to local DB
supabase db reset

# Create new migration
supabase migration new <description>

# Push to remote
supabase db push

# Deploy Edge Functions
supabase functions deploy <function-name>

# Serve functions locally
supabase functions serve
```
