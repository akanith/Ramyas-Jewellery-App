# Ramyas Jeweller — Admin Dashboard

## 🚀 Quick Start (Run Locally)

Open **PowerShell** or **Terminal**, navigate to this folder, then run:

```powershell
# 1. Navigate to admin-dashboard
cd "d:\Ramyas Jeweller App\Ramyas-App\apps\admin-dashboard"

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```
admin-dashboard/
├── app/
│   ├── globals.css              ← Tailwind + brand CSS variables
│   ├── layout.tsx               ← Root layout
│   ├── page.tsx                 ← Redirects to /login
│   ├── (auth)/
│   │   └── login/page.tsx       ← Login page (split-panel design)
│   └── (dashboard)/
│       ├── layout.tsx           ← Dashboard layout with Sidebar
│       ├── dashboard/page.tsx   ← Home / Overview page
│       ├── customers/
│       │   ├── page.tsx         ← Customer list with filters & table
│       │   └── [id]/page.tsx    ← Customer detail (server wrapper)
│       ├── payments/page.tsx    ← (Stub — Phase 2)
│       ├── redemption/page.tsx  ← (Stub — Phase 2)
│       ├── reports/page.tsx     ← (Stub — Phase 2)
│       └── settings/page.tsx    ← (Stub — Phase 2)
│
├── components/
│   ├── common/
│   │   ├── Sidebar.tsx          ← Fixed sidebar with nav items
│   │   ├── Avatar.tsx           ← Image + initials avatar
│   │   ├── Badge.tsx            ← Status badges (all variants)
│   │   ├── ProgressBar.tsx      ← Color-coded progress bar
│   │   ├── SearchBar.tsx        ← Search input with icon
│   │   └── StatCard.tsx         ← Metric card with trend
│   └── customers/
│       ├── CustomerDetailClient.tsx  ← Full customer detail UI
│       └── RedemptionDialog.tsx      ← Redemption slide-in panel
│
└── lib/
    ├── utils.ts                 ← cn(), formatINR(), getInitials()
    └── mock-data/
        ├── customers.ts         ← Customer profiles + installments
        ├── dashboard.ts         ← Dashboard stats, pending, activity
        ├── installments.ts      ← Payment records
        └── redemption.ts        ← Redemption records + scheme options
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Maroon) | `#7B1C1C` | Buttons, active nav, headings |
| Gold | `#C9A84C` | Accents, bonuses, completed |
| Background | `#F5F0EA` | Page background (warm cream) |
| Card | `#FFFFFF` | All card surfaces |
| Border | `#E5E0D8` | Dividers, card borders |

---

## 📄 Pages Built (Phase 1)

| Page | Route | Status |
|------|-------|--------|
| Login | `/login` | ✅ Complete |
| Dashboard | `/dashboard` | ✅ Complete |
| Customers List | `/customers` | ✅ Complete |
| Customer Detail | `/customers/[id]` | ✅ Complete |
| Redemption Dialog | (modal on detail) | ✅ Complete |
| Payments | `/payments` | 🔲 Phase 2 |
| Redemption Page | `/redemption` | 🔲 Phase 2 |
| Reports | `/reports` | 🔲 Phase 2 |
| Settings | `/settings` | 🔲 Phase 2 |

---

## 🔗 Demo Customer IDs

Use these IDs in the URL to see different customer detail states:

- `RJ-2023-441` — Ananya Sharma (Active, 66%)
- `RJ-2023-512` — Rajesh Kumar (Completed, 100%)
- `RJ-2023-102` — Vikram Patil (Active, 25%)
- `RJ-2023-009` — Meera Lakshmi (Ready for Redemption)
- `RJ-2023-178` — Priya Menon (Pending Installment)
- `RJ-2023-224` — Suresh Iyer (Inactive)

---

> **Phase 2** will replace all mock data with live Supabase queries and add real authentication.
