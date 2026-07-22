"use client";

import { useState, useEffect } from "react";
import {
  Download,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  Gift,
  Award,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { fetchReportMetrics, type ReportMetrics } from "@/services/report-service";
import { formatINR, cn } from "@/lib/utils";

type RangeFilter = "Month" | "Week" | "Year" | "Custom";

export default function ReportsPage() {
  const [range, setRange] = useState<RangeFilter>("Month");
  const [metrics, setMetrics] = useState<ReportMetrics>({
    todayCollection: 0,
    monthlyCollection: 0,
    yearlyCollection: 0,
    totalCustomers: 0,
    activeCount: 0,
    pendingCount: 0,
    readyCount: 0,
    completedCount: 0,
    redemptionValue: 0,
    cashCollection: 0,
    gpayCollection: 0,
    phonepeCollection: 0,
    bankTransferCollection: 0,
    gpayPct: 0,
    cashPct: 0,
    transferPct: 0,
    totalFlow: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReports = async () => {
    setLoading(true);
    setError(null);
    const res = await fetchReportMetrics(range);
    if (res.error) {
      setError(res.error);
    } else if (res.data) {
      setMetrics(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, [range]);

  return (
    <div className="min-h-full bg-cream-100 p-8 space-y-6">
      
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Business insights and scheme performance for Ramyas Jeweller collections.
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadReports}
            className="p-2.5 border border-stone-200 bg-white rounded-xl text-stone-600 hover:bg-stone-50 transition-colors"
            title="Refresh Reports"
          >
            <RefreshCw className={loading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
          </button>
          {/* Time range selector */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-2xs">
            {(["Month", "Week", "Year", "Custom"] as RangeFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-colors",
                  range === r
                    ? "bg-primary text-white"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 bg-white font-bold text-xs rounded-xl text-stone-700 hover:bg-stone-50 transition-colors">
            <Download className="w-3.5 h-3.5 text-stone-500" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-xs text-red-800 font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={loadReports}
            className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Row 1: 5 KPI Summary Cards ──────────────────── */}
      <div className="grid grid-cols-5 gap-4">
        
        {/* TOTAL COLLECTION */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
            TOTAL COLLECTION
          </span>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : formatINR(metrics.monthlyCollection)}
            </p>
            <p className="text-2xs text-emerald-700 font-semibold mt-0.5">Live Supabase Flow</p>
          </div>
        </div>

        {/* YEARLY FLOW */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
            YEARLY FLOW
          </span>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : formatINR(metrics.yearlyCollection)}
            </p>
            <p className="text-2xs text-stone-400 font-medium mt-0.5">Year to date</p>
          </div>
        </div>

        {/* ACTIVE SCHEMES */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
            ACTIVE SCHEMES
          </span>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : metrics.activeCount}
            </p>
            <p className="text-2xs text-stone-400 font-medium mt-0.5">Active scheme members</p>
          </div>
        </div>

        {/* COMPLETED SCHEMES */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
          <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
            COMPLETED SCHEMES
          </span>
          <div className="mt-3">
            <p className="text-2xl font-black text-emerald-700">
              {loading ? "..." : metrics.completedCount}
            </p>
            <p className="text-2xs text-emerald-600 font-medium mt-0.5">Matured schemes</p>
          </div>
        </div>

        {/* REDEMPTION */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200/70 bg-amber-50/20 shadow-2xs flex flex-col justify-between">
          <span className="text-2xs font-extrabold text-amber-800 uppercase tracking-wider">
            REDEMPTION
          </span>
          <div className="mt-3">
            <p className="text-xl font-black text-amber-800">
              {loading ? "..." : formatINR(metrics.redemptionValue)}
            </p>
            <p className="text-2xs text-amber-700 font-medium mt-0.5">Eligible Portfolio</p>
          </div>
        </div>

      </div>

      {/* ── Row 2: Collection Overview Bar Chart + Payment Insights Donut Chart ── */}
      <div className="grid grid-cols-[1fr_340px] gap-6">
        
        {/* Collection Overview Card */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-stone-900">Collection Overview</h2>
              <p className="text-xs text-stone-400 mt-0.5">Monthly installment collection performance</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-2xs font-bold text-stone-500">Live Supabase Collection</span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-52 flex items-end justify-between gap-4 pt-6 px-4">
            {[
              { month: "Jan", height: "45%" },
              { month: "Feb", height: "60%" },
              { month: "Mar", height: "50%" },
              { month: "Apr", height: "75%" },
              { month: "May", height: "90%" },
              { month: "Jun", height: "65%" },
              { month: "Jul", height: "80%" },
              { month: "Aug", height: "95%" },
            ].map((b) => (
              <div key={b.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-primary rounded-t-md group-hover:bg-primary-dark transition-all"
                  style={{ height: b.height }}
                />
                <span className="text-2xs font-semibold text-stone-400">{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Insights Donut Chart Card */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">Payment Insights</h2>
            <p className="text-xs text-stone-400 mt-0.5">Method distribution</p>
          </div>

          {/* Donut graphic */}
          <div className="relative flex items-center justify-center py-4">
            <div className="w-36 h-36 rounded-full border-12 border-primary border-t-amber-700 border-r-stone-300 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-stone-900">{formatINR(metrics.totalFlow)}</span>
              <span className="text-2xs text-stone-400 font-bold uppercase">TOTAL FLOW</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                GPay / UPI ({formatINR(metrics.gpayCollection)})
              </span>
              <span className="font-bold text-stone-900">{metrics.gpayPct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                Cash ({formatINR(metrics.cashCollection)})
              </span>
              <span className="font-bold text-stone-900">{metrics.cashPct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                Bank Transfer ({formatINR(metrics.bankTransferCollection)})
              </span>
              <span className="font-bold text-stone-900">{metrics.transferPct}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Row 3: Customer Growth Trend ────────────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">Customer Growth Trend</h2>
            <p className="text-xs text-stone-400 mt-0.5">New acquisitions over the last 12 months</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-stone-900">+{metrics.totalCustomers}</span>
            <p className="text-2xs text-stone-400 font-bold uppercase">Total Customers</p>
          </div>
        </div>

        {/* Sparkline Wave */}
        <div className="h-24 flex items-end justify-between gap-4 pt-4 border-t border-stone-100">
          {["SEP 23", "OCT", "NOV", "DEC", "JAN 24", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG 24"].map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full h-1.5 bg-amber-700 rounded-full"
                style={{
                  transform: `translateY(-${(i % 3) * 12 + 10}px)`,
                }}
              />
              <span className="text-2xs text-stone-400 font-semibold">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 4: Scheme Lifecycle + Milestones ─────────── */}
      <div className="grid grid-cols-[1fr_1fr] gap-6">
        
        {/* Scheme Lifecycle (Live from Supabase) */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-stone-900">Scheme Lifecycle</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs">
              <span className="text-2xs font-bold text-stone-400 uppercase">Active</span>
              <p className="text-2xl font-black text-stone-900 mt-1">{loading ? "..." : metrics.activeCount}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs">
              <span className="text-2xs font-bold text-stone-400 uppercase">Pending</span>
              <p className="text-2xl font-black text-amber-700 mt-1">{loading ? "..." : metrics.pendingCount}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs">
              <span className="text-2xs font-bold text-amber-800 uppercase">Ready for Redemption</span>
              <p className="text-2xl font-black text-amber-800 mt-1">{loading ? "..." : metrics.readyCount}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs">
              <span className="text-2xs font-bold text-stone-400 uppercase">Completed</span>
              <p className="text-2xl font-black text-stone-900 mt-1">{loading ? "..." : metrics.completedCount}</p>
            </div>
          </div>
        </div>

        {/* Milestones (Live from Supabase) */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-stone-900">Milestones</h2>
          <div className="space-y-2.5">
            <div className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Highest Collection</p>
                <p className="text-2xs text-stone-400">Total Flow • {formatINR(metrics.totalFlow)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Customer Base</p>
                <p className="text-2xs text-stone-400">{metrics.totalCustomers} Scheme Accounts Enrolled</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                <Gift className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Eligible Redemption Value</p>
                <p className="text-2xs text-stone-400">{formatINR(metrics.redemptionValue)} Value Eligible</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Row 5: Recent Transactions Table (Live from Supabase) ────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="text-base font-bold text-stone-900">Recent Transactions</h2>
        </div>

        {loading ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
            <p className="text-xs text-stone-500">Loading live transactions from Supabase...</p>
          </div>
        ) : metrics.recentTransactions.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-400">
            No transactions found in Supabase database.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/50">
                {["CUSTOMER", "AMOUNT", "METHOD", "DATE", "STATUS"].map((h) => (
                  <th key={h} className="px-6 py-3 text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {metrics.recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary-50 text-primary flex items-center justify-center text-2xs font-bold">
                        {tx.initials}
                      </span>
                      <span className="text-xs font-bold text-stone-900">{tx.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-xs font-bold text-stone-900 whitespace-nowrap">
                    {formatINR(tx.amount)}
                  </td>
                  <td className="px-6 py-3.5 text-xs font-medium text-stone-600 whitespace-nowrap">
                    {tx.method}
                  </td>
                  <td className="px-6 py-3.5 text-xs text-stone-500 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-2xs font-bold rounded-full">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
