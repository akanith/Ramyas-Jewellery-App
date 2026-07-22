"use client";

import { useState, useEffect } from "react";
import {
  Download,
  Plus,
  UserCheck,
  CalendarCheck,
  Award,
  Coins,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  ArrowUpDown,
  RefreshCw,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import RedemptionTable, {
  type RedemptionItem,
  type RedemptionStatus,
} from "@/components/redemption/RedemptionTable";
import { fetchRedemptions } from "@/services/redemption-service";
import { cn } from "@/lib/utils";

type TabFilter = "All" | "Ready for Redemption" | "Redeemed" | "Pending Verification";

const tabs: TabFilter[] = [
  "All",
  "Ready for Redemption",
  "Redeemed",
  "Pending Verification",
];

export default function RedemptionPage() {
  const [items, setItems] = useState<RedemptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabFilter>("All");

  const loadRedemptions = async () => {
    setLoading(true);
    setError(null);
    const res = await fetchRedemptions();
    if (res.error) {
      setError(res.error);
    } else {
      setItems(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRedemptions();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Ready for Redemption") return item.status === "Ready";
    if (activeTab === "Redeemed") return item.status === "Redeemed";
    if (activeTab === "Pending Verification") return item.status === "Pending Verification";
    return true;
  });

  return (
    <div className="min-h-full bg-cream-100 p-8 space-y-6">
      
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Redemption
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage customers eligible to redeem their jewellery savings scheme.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadRedemptions}
            className="p-2.5 border border-stone-200 bg-white rounded-xl text-stone-600 hover:bg-stone-50 transition-colors"
            title="Refresh Redemptions"
          >
            <RefreshCw className={loading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 bg-white font-bold text-xs rounded-xl text-stone-700 hover:bg-stone-50 transition-colors">
            <Download className="w-3.5 h-3.5 text-stone-500" />
            Export Report
          </button>
        </div>
      </div>

      {/* ── Error Banner ─────────────────────────────── */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-xs text-red-800 font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={loadRedemptions}
            className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── 4 Top Stat Cards ────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-gold-50 flex items-center justify-center text-gold-dark">
              <Award className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              ELIGIBLE
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : items.filter((i) => i.status === "Ready").length}
            </p>
            <p className="text-xs text-stone-500 mt-1">Ready for Redemption</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              REDEEMED
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : items.filter((i) => i.status === "Redeemed").length}
            </p>
            <p className="text-xs text-stone-500 mt-1">Completed Redemptions</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              VERIFICATION
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : items.filter((i) => i.status === "Pending Verification").length}
            </p>
            <p className="text-xs text-stone-500 mt-1">Pending Check</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
              <Coins className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              TOTAL VALUE
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading
                ? "..."
                : `₹${(
                    items.reduce((sum, i) => sum + i.eligibleValue, 0) / 100000
                  ).toFixed(1)}L`}
            </p>
            <p className="text-xs text-stone-500 mt-1">Net Eligible Portfolio</p>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Table + Verification Checklist Sidebar ─ */}
      <div className="grid grid-cols-[1fr_320px] gap-6 items-start">
        
        {/* Left: Table Container Card */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          {/* Tabs Filter Bar */}
          <div className="flex items-center gap-1 px-5 pt-4 border-b border-stone-100 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3.5 py-2 text-xs font-semibold rounded-t-xl border-b-2 transition-all whitespace-nowrap",
                  activeTab === tab
                    ? "border-primary text-primary bg-primary-50/50"
                    : "border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table Container with Loading and Empty States */}
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-sm font-semibold text-stone-600">Loading redemption records from Supabase...</p>
            </div>
          ) : (
            <RedemptionTable items={filteredItems} onRefresh={loadRedemptions} />
          )}
        </div>

        {/* Right: Pre-Redemption Checklist Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-5">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-stone-100">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
              <h3 className="text-sm font-bold text-stone-900">Pre-Redemption Checklist</h3>
            </div>
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Verify 12 monthly installments completed.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Verify Original Passbook & ID Card.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Calculate Eligible Shop Bonus (₹1,000).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Issue Sweet Box & Festival Gift on billing.</span>
              </div>
            </div>
          </div>

          {/* Store Policy Note */}
          <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-4 text-xs">
            <p className="font-bold text-amber-900 mb-1">Owner Guidelines</p>
            <p className="text-amber-800/90 leading-relaxed">
              Ensure customer signature is obtained on the redemption voucher before handing over gold items.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
