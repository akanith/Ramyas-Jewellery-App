# Ramyas App 💍

> **Production-Ready Jewellery Savings Scheme Management System**

A full-stack monorepo powering both the **Admin Dashboard** (web) and the **Customer Mobile App** for Ramyas Jewellers — enabling end-to-end management of jewellery savings schemes, customer payments, redemptions, and real-time notifications.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Folder Structure](#folder-structure)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Development Workflow](#development-workflow)
7. [Naming Conventions](#naming-conventions)
8. [Git Branch Strategy](#git-branch-strategy)

---

## Project Overview

Ramyas App is a **Jewellery Savings Scheme Management System** that allows:

- **Shop Admins** to manage customers, track monthly payments, handle scheme redemptions, generate reports, and configure scheme plans via a web-based admin dashboard.
- **Customers** to view their scheme status, payment history, upcoming payments, and receive real-time push notifications via a Flutter mobile app.

The system is built on **Supabase** (PostgreSQL + Auth + Realtime + Storage + Edge Functions) as the backend, with **Firebase Cloud Messaging** for push notifications.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Ramyas-App Monorepo                       │
│                                                                  │
│   ┌─────────────────────┐    ┌──────────────────────────────┐   │
│   │  Admin Dashboard    │    │    Customer Mobile App        │   │
│   │  (Next.js 15 / TS)  │    │    (Flutter / Dart)          │   │
│   └────────┬────────────┘    └───────────┬──────────────────┘   │
│            │                             │                       │
│            └──────────────┬──────────────┘                       │
│                           ▼                                      │
│              ┌────────────────────────┐                          │
│              │        Supabase        │                          │
│              │  ┌──────────────────┐  │                          │
│              │  │   PostgreSQL DB   │  │                          │
│              │  ├──────────────────┤  │                          │
│              │  │  Supabase Auth   │  │                          │
│              │  ├──────────────────┤  │                          │
│              │  │ Supabase Storage │  │                          │
│              │  ├──────────────────┤  │                          │
│              │  │ Supabase Realtime│  │                          │
│              │  ├──────────────────┤  │                          │
│              │  │  Edge Functions  │  │                          │
│              │  └──────────────────┘  │                          │
│              └────────────────────────┘                          │
│                           │                                      │
│              ┌────────────▼───────────┐                          │
│              │  Firebase Cloud        │                          │
│              │  Messaging (FCM)       │                          │
│              └────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

### Architectural Principles

- **Clean Architecture**: Domain logic is fully separated from UI layers.
- **Repository Pattern**: All data access is abstracted behind repository interfaces.
- **Feature-First Organisation**: Code is grouped by business domain, not technical layer.
- **Type Safety**: End-to-end TypeScript (web) and Dart strong typing (mobile).
- **Row-Level Security**: Every Supabase table is protected by RLS policies.
- **Zero-Trust Secrets**: No credentials are committed; all secrets live in environment variables.

---

## Folder Structure

```
Ramyas-App/
│
├── apps/
│   ├── admin-dashboard/          # Next.js 15 Admin Web App
│   │   ├── app/                  # App Router pages & layouts
│   │   │   ├── (auth)/           # Auth route group
│   │   │   ├── (dashboard)/      # Protected dashboard group
│   │   │   │   ├── customers/
│   │   │   │   ├── payments/
│   │   │   │   ├── reports/
│   │   │   │   ├── redemption/
│   │   │   │   └── settings/
│   │   │   ├── api/              # API route handlers
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── customers/
│   │   │   ├── payments/
│   │   │   ├── reports/
│   │   │   ├── redemption/
│   │   │   ├── settings/
│   │   │   └── common/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── public/
│   │   ├── middleware/
│   │   └── config/
│   │
│   └── customer-app/             # Flutter Customer Mobile App
│       └── lib/
│           ├── core/
│           ├── config/
│           ├── models/
│           ├── services/
│           ├── repositories/
│           ├── providers/
│           ├── screens/
│           │   ├── auth/
│           │   ├── home/
│           │   ├── payment_history/
│           │   ├── scheme/
│           │   ├── notifications/
│           │   └── profile/
│           ├── widgets/
│           │   ├── buttons/
│           │   ├── cards/
│           │   ├── dialogs/
│           │   ├── inputs/
│           │   ├── progress/
│           │   └── common/
│           ├── routes/
│           ├── utils/
│           ├── constants/
│           └── theme/
│
├── supabase/
│   ├── migrations/               # Versioned SQL migrations
│   ├── seed/                     # Seed data SQL scripts
│   ├── functions/                # Supabase Edge Functions (Deno)
│   └── policies/                 # RLS policy SQL files
│
├── shared/
│   ├── assets/
│   │   ├── icons/
│   │   └── logos/
│   ├── branding/
│   │   ├── color-palette/
│   │   ├── typography/
│   │   └── component-guidelines/
│   ├── docs/
│   │   ├── api/
│   │   ├── database/
│   │   └── design-system/
│   ├── constants/
│   └── types/
│
├── scripts/                      # Dev, CI/CD, and utility scripts
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Admin Web — Framework** | Next.js | 15.x |
| **Admin Web — Language** | TypeScript | 5.x |
| **Admin Web — UI Library** | shadcn/ui + Radix UI | Latest |
| **Admin Web — Styling** | Tailwind CSS | 4.x |
| **Admin Web — State** | Zustand | 5.x |
| **Mobile — Framework** | Flutter | 3.x |
| **Mobile — Language** | Dart | 3.x |
| **Mobile — State** | Riverpod | 2.x |
| **Mobile — Navigation** | GoRouter | Latest |
| **Backend — Platform** | Supabase | Latest |
| **Backend — Database** | PostgreSQL | 15+ |
| **Backend — Auth** | Supabase Auth (JWT) | Latest |
| **Backend — Storage** | Supabase Storage | Latest |
| **Backend — Realtime** | Supabase Realtime | Latest |
| **Backend — Functions** | Supabase Edge Functions (Deno) | Latest |
| **Push Notifications** | Firebase Cloud Messaging | Latest |
| **Version Control** | Git | Latest |

---

## Getting Started

### Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | 20 LTS |
| pnpm | 9.x |
| Flutter SDK | 3.x |
| Dart SDK | 3.x |
| Supabase CLI | Latest |
| Firebase CLI | Latest |
| Git | 2.x |

### 1. Clone the Repository

```bash
git clone https://github.com/ramyas-jewellers/ramyas-app.git
cd ramyas-app
```

### 2. Install Admin Dashboard Dependencies

```bash
cd apps/admin-dashboard
pnpm install
```

### 3. Configure Admin Dashboard Environment

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc.
```

### 4. Start Admin Dashboard Dev Server

```bash
pnpm dev
# Runs on http://localhost:3000
```

### 5. Set Up Flutter Customer App

```bash
cd apps/customer-app
flutter pub get
```

### 6. Configure Flutter Environment

```bash
# Copy and fill in lib/config/env.dart with Supabase & FCM credentials
cp lib/config/env.example.dart lib/config/env.dart
```

### 7. Run Flutter App

```bash
flutter run
```

### 8. Start Supabase Locally

```bash
cd supabase
supabase start
supabase db reset   # Applies migrations + seed data
```

---

## Development Workflow

### Admin Dashboard

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm type-check   # TypeScript check
pnpm test         # Run tests (Jest + Testing Library)
```

### Customer App

```bash
flutter run           # Run on connected device / emulator
flutter test          # Run unit & widget tests
flutter analyze       # Static analysis
flutter build apk     # Build Android APK
flutter build ios     # Build iOS IPA
dart run build_runner build   # Generate code (Riverpod, Freezed, JSON)
```

### Supabase

```bash
supabase start            # Start local Supabase stack
supabase stop             # Stop local stack
supabase db diff          # Diff schema changes
supabase db push          # Push migrations to remote
supabase functions serve  # Serve Edge Functions locally
supabase functions deploy # Deploy Edge Functions
```

---

## Naming Conventions

### General

| Item | Convention | Example |
|---|---|---|
| Files (TS/TSX) | kebab-case | `customer-card.tsx` |
| Files (Dart) | snake_case | `customer_card.dart` |
| Folders | kebab-case (TS), snake_case (Dart) | `payment-history/` |
| Database Tables | snake_case, plural | `scheme_members` |
| SQL Columns | snake_case | `created_at` |
| Edge Functions | kebab-case | `send-payment-reminder` |
| Environment Vars | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_SUPABASE_URL` |

### TypeScript / Next.js

| Item | Convention | Example |
|---|---|---|
| React Components | PascalCase | `CustomerCard` |
| Hooks | camelCase with `use` prefix | `useCustomerData` |
| Types / Interfaces | PascalCase | `SchemePayment` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_SCHEME_MONTHS` |
| Functions | camelCase | `formatCurrency` |
| Zustand Stores | camelCase with `Store` suffix | `useCustomerStore` |

### Dart / Flutter

| Item | Convention | Example |
|---|---|---|
| Classes | PascalCase | `SchemeProvider` |
| Files | snake_case | `scheme_provider.dart` |
| Variables / Functions | camelCase | `fetchPayments` |
| Constants | camelCase (or `k` prefix) | `kPrimaryColor` |
| Riverpod Providers | camelCase with `Provider` suffix | `schemeListProvider` |
| Freezed Models | PascalCase | `CustomerModel` |

---

## Git Branch Strategy

This project follows **GitHub Flow** with structured branch naming.

### Branch Types

| Prefix | Purpose | Example |
|---|---|---|
| `main` | Production-ready code | `main` |
| `develop` | Integration branch | `develop` |
| `feature/` | New feature development | `feature/customer-registration` |
| `fix/` | Bug fixes | `fix/payment-date-calculation` |
| `hotfix/` | Critical production fixes | `hotfix/auth-token-expiry` |
| `release/` | Release preparation | `release/v1.2.0` |
| `chore/` | Maintenance tasks | `chore/update-dependencies` |
| `docs/` | Documentation updates | `docs/api-reference` |

### Workflow

```
main ◄──── release/v* ◄──── develop ◄──── feature/*
                                     ◄──── fix/*
main ◄──── hotfix/* (emergency only)
```

### Commit Message Format (Conventional Commits)

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

**Examples**:
```
feat(customers): add bulk import from CSV
fix(payments): correct due date calculation for leap years
docs(api): update scheme endpoint documentation
chore(deps): upgrade supabase-js to v2.45.0
```

### Pull Request Rules

- All PRs target `develop` (except hotfixes → `main`)
- Minimum **1 reviewer** approval required
- CI must pass (lint + type-check + tests)
- Branch must be up-to-date with target before merge
- Squash-merge for feature branches; merge commits for releases

---

*Built with ❤️ for Ramyas Jewellers*
