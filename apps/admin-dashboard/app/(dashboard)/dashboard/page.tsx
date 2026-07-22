"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Calendar,
  CreditCard,
  UserPlus,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  UserRound,
  Receipt,
  Award,
  Edit3,
  RefreshCw,
  Loader2,
  Activity,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import { fetchCustomers, type Customer } from "@/services/customer-service";
import { fetchInstallments, fetchInstallmentStats, type Installment } from "@/services/installment-service";
import { fetchActivityLogs, type ActivityLog } from "@/services/activity-service";
import { formatINR } from "@/lib/utils";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    todayInstallments: 0,
    todayCollection: 0,
    cashCollection: 0,
    digitalCollection: 0,
  });

  const [pendingList, setPendingList] = useState<Customer[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardStats = async () => {
    setLoading(true);
    const [statsRes, custRes, activityRes] = await Promise.all([
      fetchInstallmentStats(),
      fetchCustomers(),
      fetchActivityLogs(),
    ]);

    if (statsRes.data) {
      setStats(statsRes.data);
    }
    if (custRes.data) {
      const pending = custRes.data.filter(
        (c) => c.status === "pending_installment" || c.status === "active"
      );
      setPendingList(pending.slice(0, 4));
    }
    if (activityRes) {
      setActivityLogs(activityRes.slice(0, 4));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  return (
    <div className="min-h-full bg-cream-100">
      {/* ── Top Navigation Bar ─────────────────────────── */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 bg-cream-100 border-b border-cream-200">
        {/* Greeting */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Good Morning 👋
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Live Supabase Dashboard</p>
        </div>

        {/* Search bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search customers, payments..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white
                       text-sm text-gray-700 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardStats}
            className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Refresh Dashboard"
          >
            <RefreshCw className={loading ? "animate-spin w-4 h-4 text-gray-500" : "w-4 h-4 text-gray-500"} />
          </button>
          <button className="relative w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Bell className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      <div className="px-8 py-6 space-y-6">
        {/* ── Today's Tasks ──────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Today&apos;s Tasks</h3>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {pendingList.length} Active Scheme Members
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Record Payment card */}
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-md transition-shadow group relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                <CreditCard className="w-28 h-28 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Record Installment</h4>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Update customer&apos;s monthly installment for their gold scheme.
              </p>
              <Link
                href="/payments"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                Open Installment Ledger
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Add Customer card */}
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-md transition-shadow group relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                <UserPlus className="w-28 h-28 text-gold" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center mb-4">
                <UserPlus className="w-5 h-5 text-gold-dark" strokeWidth={2} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Add Customer</h4>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Register a new savings scheme for a walk-in customer.
              </p>
              <Link
                href="/customers/new"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                Create New Account
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats Row ──────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-4">
          {/* Live Today's Collection Card */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Today&apos;s Collection</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              {loading ? "..." : formatINR(stats.todayCollection)}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs font-semibold text-green-600">
                Live Supabase Ledger
              </span>
            </div>
          </div>

          {/* Today's Installment Count Card */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Today&apos;s Installments</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              {loading ? "..." : stats.todayInstallments}
            </p>
            <p className="text-xs text-gray-400 mt-1.5">Recorded today</p>
          </div>

          {/* Cash Collection */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Hard Cash</p>
            <p className="text-2xl font-bold text-amber-700 tracking-tight">
              {loading ? "..." : formatINR(stats.cashCollection)}
            </p>
            <p className="text-xs text-gray-400 mt-1.5">Cash in register</p>
          </div>

          {/* Digital Collection */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Digital Collection</p>
            <p className="text-2xl font-bold text-rose-700 tracking-tight">
              {loading ? "..." : formatINR(stats.digitalCollection)}
            </p>
            <p className="text-xs text-gray-400 mt-1.5">GPay, PhonePe, Transfer</p>
          </div>
        </div>

        {/* ── Pending Payments + Recent Activity Logs ─────── */}
        <div className="grid grid-cols-[1fr_340px] gap-5">
          {/* Live Pending Payments */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">Pending Installments</h3>
              <Link
                href="/payments"
                className="text-xs font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                View All
              </Link>
            </div>
            <div>
              {/* Table header */}
              <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_80px] px-6 py-2.5 border-b border-gray-50">
                {["Customer", "Installment", "Method", "Status", "Action"].map(
                  (h) => (
                    <span
                      key={h}
                      className="text-2xs font-semibold tracking-widest text-gray-400 uppercase"
                    >
                      {h}
                    </span>
                  )
                )}
              </div>

              {pendingList.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-400">
                  No pending installments in Supabase database.
                </div>
              ) : (
                pendingList.map((p) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-[2fr_1.2fr_1fr_1fr_80px] px-6 py-4 items-center border-b border-gray-50 hover:bg-cream-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} src={p.photo} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400">{p.scheme}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {formatINR(1000)}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      Cash
                    </span>
                    <div>
                      <Badge variant="pending">Pending</Badge>
                    </div>
                    <Link
                      href="/payments"
                      className="text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      Record
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Logs Stream (Live from Supabase) */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-gray-900">Activity Logs</h3>
              </div>
              <span className="text-2xs font-semibold text-stone-400 uppercase">Live Audit</span>
            </div>
            <div className="space-y-3">
              {activityLogs.length === 0 ? (
                <p className="text-xs text-stone-400 text-center py-6">No activity logged in Supabase yet.</p>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-50/70 border border-cream-200/50 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-stone-900 truncate">{log.action}</p>
                        <span className="text-3xs font-semibold text-stone-400 whitespace-nowrap bg-stone-100 px-1.5 py-0.5 rounded">{log.timestamp}</span>
                      </div>
                      <p className="text-2xs text-stone-500 mt-1 leading-relaxed break-words">{log.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
