"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Download,
  Calendar,
  Wallet,
  Banknote,
  CreditCard,
  ChevronDown,
  Filter,
  RefreshCw,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { type Payment } from "@/lib/mock-data/payments";
import { fetchInstallments, fetchInstallmentStats } from "@/services/installment-service";
import { formatINR } from "@/lib/utils";
import PaymentTable from "@/components/payments/PaymentTable";
import RecordPaymentModal from "@/components/payments/RecordPaymentModal";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState({
    todayInstallments: 0,
    todayCollection: 0,
    cashCollection: 0,
    digitalCollection: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [selectedMethod, setSelectedMethod] = useState("All");

  const loadData = async () => {
    setLoading(true);
    setError(null);

    const [instRes, statsRes] = await Promise.all([
      fetchInstallments(),
      fetchInstallmentStats(),
    ]);

    if (instRes.error) {
      setError(instRes.error);
    } else {
      setPayments(instRes.data);
    }

    if (statsRes.data) {
      setStats(statsRes.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = payments.filter((p) => {
    const query = search.toLowerCase();
    const matchSearch =
      query === "" ||
      p.customerName.toLowerCase().includes(query) ||
      p.customerId.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query);
    const matchMethod = selectedMethod === "All" || p.method === selectedMethod;
    return matchSearch && matchMethod;
  });

  return (
    <div className="min-h-full bg-cream-100 p-8 space-y-6">
      
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Installment History
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            View and manage all recorded customer installments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 border border-stone-200 bg-white rounded-xl text-stone-600 hover:bg-stone-50 transition-colors"
            title="Refresh Installments"
          >
            <RefreshCw className={loading ? "animate-spin w-4 h-4" : "w-4 h-4"} />
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            Record Installment
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
            onClick={loadData}
            className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── 4 Stat Cards Row ────────────────────────────── */}
      <div className="grid grid-cols-4 gap-5">
        {/* Card 1: TODAY */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              TODAY
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : stats.todayInstallments}
            </p>
            <p className="text-xs text-stone-500 mt-1">Today&apos;s Installments</p>
            <div className="mt-3 h-1 w-full bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "65%" }} />
            </div>
          </div>
        </div>

        {/* Card 2: COLLECTED */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-100/60 flex items-center justify-center text-amber-800">
              <Wallet className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              COLLECTED
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : formatINR(stats.todayCollection)}
            </p>
            <p className="text-xs text-stone-500 mt-1">Today&apos;s Collection</p>
            <div className="mt-3 h-1 w-full bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-700 rounded-full" style={{ width: "80%" }} />
            </div>
          </div>
        </div>

        {/* Card 3: HARD CASH */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
              <Banknote className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              HARD CASH
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : formatINR(stats.cashCollection)}
            </p>
            <p className="text-xs text-stone-500 mt-1">Cash Collection</p>
            <div className="mt-3 h-1 w-full bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-stone-700 rounded-full" style={{ width: "25%" }} />
            </div>
          </div>
        </div>

        {/* Card 4: ONLINE */}
        <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700">
              <CreditCard className="w-4.5 h-4.5" />
            </div>
            <span className="text-2xs font-extrabold tracking-widest text-stone-400 uppercase">
              ONLINE
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {loading ? "..." : formatINR(stats.digitalCollection)}
            </p>
            <p className="text-xs text-stone-500 mt-1">Digital Collection</p>
            <div className="mt-3 h-1 w-full bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-rose-600 rounded-full" style={{ width: "75%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Table Card & Search Controls ─────────────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by Customer Name, ID or Receipt No..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-xl bg-stone-50/50 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Method Filter */}
            <div className="flex items-center gap-1.5 bg-stone-100/60 p-1 rounded-xl">
              {["All", "Cash", "GPay", "PhonePe", "Bank Transfer"].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedMethod === method
                      ? "bg-white text-stone-900 shadow-2xs"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-3.5 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors">
              <Download className="w-3.5 h-3.5 text-stone-500" />
              Export
            </button>
          </div>
        </div>

        {/* Table Rendering with Loading & Empty State */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-sm font-semibold text-stone-600">Loading installment records from Supabase...</p>
          </div>
        ) : (
          <PaymentTable payments={filtered} />
        )}
      </div>

      {/* Record Payment Drawer Modal */}
      <RecordPaymentModal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={() => loadData()}
      />
    </div>
  );
}
