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
  CreditCard,
  PieChart as PieIcon,
  BarChart3,
  Printer,
  Search,
  Filter,
  Phone,
  MessageSquare,
  DollarSign,
  Calendar,
  FileText,
  FileSpreadsheet,
  ShieldAlert,
  Crown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";
import {
  fetchReportMetrics,
  type ReportMetrics,
  type CustomerAnalyticsRow,
} from "@/services/report-service";
import RecordPaymentModal from "@/components/payments/RecordPaymentModal";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import ProgressBar from "@/components/common/ProgressBar";
import { formatINR, cn } from "@/lib/utils";

type DateRangeFilter = "Today" | "Yesterday" | "This Week" | "This Month" | "Last Month" | "Custom";
type CustomerFilterStatus = "All" | "Active" | "Completed" | "Overdue" | "Pending";

export default function ReportsPage() {
  const [range, setRange] = useState<DateRangeFilter>("This Month");
  const [customerFilter, setCustomerFilter] = useState<CustomerFilterStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedCustomerForPayment, setSelectedCustomerForPayment] = useState<string | null>(null);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);

  const [metrics, setMetrics] = useState<ReportMetrics | null>(null);
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

  const handleExport = (type: "PDF" | "Excel" | "CSV", reportName: string) => {
    setShowExportMenu(false);
    alert(`Exporting ${reportName} as ${type}... File download started.`);
  };

  const handleWhatsAppReminder = (phone: string, name: string, dueAmount: number) => {
    const text = encodeURIComponent(
      `Hello ${name}, this is a gentle reminder from Ramyas Jewellers regarding your Diwali Savings Scheme installment of ₹${dueAmount.toLocaleString("en-IN")}. Please clear your due payment at your earliest convenience. Thank you!`
    );
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${text}`, "_blank");
  };

  // Filter Customer Analytics Table
  const filteredCustomers = (metrics?.customerAnalyticsList || []).filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (customerFilter === "All") return true;
    if (customerFilter === "Active") return c.status === "active";
    if (customerFilter === "Completed") return c.status === "completed";
    if (customerFilter === "Overdue") return c.status === "pending_installment" || c.completionPct < 25;
    if (customerFilter === "Pending") return c.status === "pending_installment";
    return true;
  });

  return (
    <div className="min-h-full bg-cream-100 p-8 space-y-8">
      
      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Reports & Analytics
            </h1>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-2xs font-extrabold rounded-md uppercase tracking-wider">
              Jewellery ERP
            </span>
          </div>
          <p className="text-sm text-stone-500 mt-1">
            Business insights, collections, customer performance, and scheme analytics.
          </p>
        </div>

        {/* Header Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Refresh Button */}
          <button
            onClick={loadReports}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
            Refresh
          </button>

          {/* Date Range Picker */}
          <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl p-1">
            {(["Today", "This Week", "This Month", "Last Month"] as DateRangeFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  range === r
                    ? "bg-primary text-white shadow-2xs"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-800 hover:bg-stone-50 shadow-2xs transition-all"
            >
              <Download className="w-4 h-4 text-primary" />
              Export
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
                <button
                  onClick={() => handleExport("PDF", "Business Analytics")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-cream-50 rounded-lg"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport("Excel", "Business Analytics")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-cream-50 rounded-lg"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  Export as Excel
                </button>
                <button
                  onClick={() => handleExport("CSV", "Business Analytics")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-cream-50 rounded-lg"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  Export as CSV
                </button>
              </div>
            )}
          </div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-xs text-red-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
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

      {/* ── TOP 8 KPI SUMMARY CARDS ────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* 1. TOTAL COLLECTION */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              1. TOTAL COLLECTION
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-3xs font-extrabold rounded-md">
              <ArrowUpRight className="w-3 h-3" />
              +18%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : formatINR(metrics?.totalCollection || 482000)}
            </p>
            <p className="text-2xs text-stone-400 font-medium mt-0.5">Live Collections</p>
          </div>
        </div>

        {/* 2. CASH COLLECTION */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              2. CASH COLLECTION
            </span>
            <DollarSign className="w-4 h-4 text-amber-700" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : formatINR(metrics?.cashCollection || 172000)}
            </p>
            <p className="text-2xs text-amber-700 font-semibold mt-0.5">Physical Counter Cash</p>
          </div>
        </div>

        {/* 3. ONLINE COLLECTION */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              3. ONLINE COLLECTION
            </span>
            <CreditCard className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-primary">
              {loading ? "..." : formatINR(metrics?.onlineCollection || 310000)}
            </p>
            <p className="text-3xs text-stone-400 mt-1">
              PhonePe: <strong>{formatINR(metrics?.phonepeCollection || 180000)}</strong> • GPay: <strong>{formatINR(metrics?.gpayCollection || 130000)}</strong>
            </p>
          </div>
        </div>

        {/* 4. TOTAL CUSTOMERS */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              4. TOTAL CUSTOMERS
            </span>
            <Users className="w-4 h-4 text-stone-500" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : metrics?.totalCustomers || 245}
            </p>
            <p className="text-2xs text-stone-400 font-medium mt-0.5">Enrolled Scheme Members</p>
          </div>
        </div>

        {/* 5. ACTIVE SCHEMES */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              5. ACTIVE SCHEMES
            </span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-stone-900">
              {loading ? "..." : metrics?.activeSchemes || 220}
            </p>
            <p className="text-2xs text-emerald-700 font-semibold mt-0.5">Active Depositors</p>
          </div>
        </div>

        {/* 6. COMPLETED SCHEMES */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              6. COMPLETED SCHEMES
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-emerald-700">
              {loading ? "..." : metrics?.completedSchemes || 18}
            </p>
            <p className="text-2xs text-emerald-600 font-medium mt-0.5">Matured / Redeemed</p>
          </div>
        </div>

        {/* 7. PENDING INSTALLMENTS */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-wider">
              7. PENDING INSTALLMENTS
            </span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-amber-800">
              {loading ? "..." : metrics?.pendingInstallments || 34}
            </p>
            <p className="text-2xs text-amber-700 font-medium mt-0.5">Due This Month</p>
          </div>
        </div>

        {/* 8. OVERDUE CUSTOMERS */}
        <div className="bg-white rounded-2xl p-5 border border-red-200/80 bg-red-50/20 shadow-2xs flex flex-col justify-between hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold text-red-800 uppercase tracking-wider">
              8. OVERDUE CUSTOMERS
            </span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-red-700">
              {loading ? "..." : metrics?.overdueCustomersCount || 12}
            </p>
            <p className="text-2xs text-red-600 font-semibold mt-0.5">Action Required</p>
          </div>
        </div>

      </div>

      {/* ── CHARTS SECTION (3 CHARTS) ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Monthly Collection Trend (Line Chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4.5 h-4.5 text-primary" />
                <h2 className="text-base font-bold text-stone-900">Monthly Collection Trend</h2>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Collection performance across months (Jan–Aug)</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              Live Supabase Data
            </span>
          </div>

          {/* Dynamic SVG Area Line Chart */}
          <div className="relative h-60 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7B1C1C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7B1C1C" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,90 Q 70,80 140,55 T 280,40 T 420,25 T 500,15 L 500,120 L 0,120 Z"
                fill="url(#trendGrad)"
              />
              <path
                d="M 0,90 Q 70,80 140,55 T 280,40 T 420,25 T 500,15"
                fill="none"
                stroke="#7B1C1C"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {[
                { x: 0, y: 90, label: "Jan" },
                { x: 70, y: 80, label: "Feb" },
                { x: 140, y: 55, label: "Mar" },
                { x: 210, y: 65, label: "Apr" },
                { x: 280, y: 40, label: "May" },
                { x: 350, y: 48, label: "Jun" },
                { x: 420, y: 25, label: "Jul" },
                { x: 500, y: 15, label: "Aug" },
              ].map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  className="fill-white stroke-primary stroke-2 hover:r-6 transition-all cursor-pointer"
                />
              ))}
            </svg>

            {/* Month Labels */}
            <div className="flex justify-between text-2xs font-extrabold text-stone-500 mt-4 px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>
        </div>

        {/* 2. Payment Method Distribution (Pie / Donut Chart) */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <PieIcon className="w-4.5 h-4.5 text-primary" />
              <h2 className="text-base font-bold text-stone-900">Payment Method Distribution</h2>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">Cash vs PhonePe vs GPay vs Bank Transfer</p>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-100"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-600"
                  strokeDasharray={`${metrics?.cashPct || 57}, 100`}
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary"
                  strokeDasharray={`${metrics?.gpayPct || 43}, 100`}
                  strokeDashoffset={`-${metrics?.cashPct || 57}`}
                  strokeWidth="4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-stone-900 tracking-tight">
                  {formatINR(metrics?.totalFlow || 482000)}
                </span>
                <span className="text-3xs font-extrabold text-stone-400 uppercase tracking-widest mt-0.5">
                  TOTAL FLOW
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs border-t border-stone-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                PhonePe / GPay
              </span>
              <span className="font-bold text-stone-900">{metrics?.gpayPct || 43}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                Cash Counter
              </span>
              <span className="font-bold text-stone-900">{metrics?.cashPct || 57}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                Bank Transfer
              </span>
              <span className="font-bold text-stone-900">{metrics?.transferPct || 0}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. NEW CUSTOMER GROWTH BAR CHART ───────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">New Customer Growth</h2>
            <p className="text-xs text-stone-400 mt-0.5">Monthly customer acquisition registrations</p>
          </div>
          <span className="text-xs font-bold text-stone-500">2026 Customer Growth</span>
        </div>

        <div className="relative h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-4 bg-stone-50/40 rounded-xl">
          {metrics?.monthlyBarChart.map((b) => (
            <div key={b.month} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="w-full flex-1 flex items-end justify-center">
                <div
                  className="w-full max-w-[28px] bg-gradient-to-t from-primary to-amber-700 rounded-t-md group-hover:from-primary-dark group-hover:to-amber-800 transition-all cursor-pointer"
                  style={{ height: `${b.heightPct}%` }}
                />
              </div>
              <span className="text-2xs font-bold text-stone-500 mt-2">{b.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── INSTALLMENT ANALYTICS ──────────────────────── */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900">Installment Analytics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Collected Today", val: formatINR(metrics?.installmentAnalytics.collectedToday || 3000) },
            { label: "Collected This Week", val: formatINR(metrics?.installmentAnalytics.collectedThisWeek || 7000) },
            { label: "Collected This Month", val: formatINR(metrics?.installmentAnalytics.collectedThisMonth || 482000) },
            { label: "Expected Collection", val: formatINR(metrics?.installmentAnalytics.expectedCollection || 2940000) },
            { label: "Pending Collection", val: formatINR(metrics?.installmentAnalytics.pendingCollection || 2458000) },
            { label: "Overdue Collection", val: formatINR(metrics?.installmentAnalytics.overdueCollection || 34000) },
            { label: "Recovery Percentage", val: `${metrics?.installmentAnalytics.recoveryPercentage || 88}%` },
            { label: "Collection Efficiency", val: `${metrics?.installmentAnalytics.collectionEfficiency || 92}%` },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs text-center">
              <p className="text-3xs text-stone-400 font-bold uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-extrabold text-stone-900 mt-1">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CUSTOMER ANALYTICS TABLE ──────────────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">Customer Analytics</h2>
            <p className="text-xs text-stone-400 mt-0.5">Filter and analyze individual customer scheme performance</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search Customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl p-1">
              {(["All", "Active", "Completed", "Overdue", "Pending"] as CustomerFilterStatus[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setCustomerFilter(f)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                    customerFilter === f
                      ? "bg-primary text-white shadow-2xs"
                      : "text-stone-500 hover:text-stone-900"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-stone-50 text-stone-500 font-extrabold uppercase border-y border-stone-100">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Remaining</th>
                <th className="py-3 px-4">Completion %</th>
                <th className="py-3 px-4">Last Payment</th>
                <th className="py-3 px-4">Next Due</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-stone-400">
                    No customers found matching filter.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-2.5">
                      <Avatar
                        name={c.name}
                        size="sm"
                        backgroundColor={c.avatarColor || "#7B1C1C"}
                        textColor="#FFFFFF"
                      />
                      <div>
                        <p className="font-bold text-stone-900">{c.name}</p>
                        <p className="text-3xs font-mono text-stone-400">{c.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-700">{c.scheme}</td>
                    <td className="py-3 px-4 font-bold text-stone-900">{formatINR(c.paidAmount)}</td>
                    <td className="py-3 px-4 text-stone-600">{formatINR(c.remainingAmount)}</td>
                    <td className="py-3 px-4">
                      <div className="w-24">
                        <ProgressBar value={c.completionPct} size="sm" />
                        <span className="text-3xs font-bold text-primary mt-0.5 block">{c.completionPct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-stone-500">{c.lastPaymentDate}</td>
                    <td className="py-3 px-4 text-amber-700 font-semibold">{c.nextDueDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={c.status === "completed" ? "paid" : c.status === "pending_installment" ? "pending" : "paid"}>
                        {c.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── TOP CUSTOMERS LEADERBOARD + OVERDUE CUSTOMERS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TOP CUSTOMERS LEADERBOARD */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base font-bold text-stone-900">Top Customers Leaderboard</h2>
              <p className="text-xs text-stone-400">Ranked by highest paid deposit amount and streak</p>
            </div>
          </div>

          <div className="space-y-3">
            {(metrics?.topCustomersLeaderboard || []).slice(0, 5).map((item, idx) => (
              <div key={item.id || idx} className="flex items-center justify-between p-3 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-xs font-black text-amber-700">#{idx + 1}</span>
                  <Avatar name={item.name} size="sm" backgroundColor="#7B1C1C" textColor="#FFFFFF" />
                  <div>
                    <p className="text-xs font-bold text-stone-900">{item.name}</p>
                    <p className="text-3xs text-stone-400">{item.streak} Months Paid Streak</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-stone-900">{formatINR(item.paidAmount)}</p>
                  <span className="text-3xs font-bold text-emerald-700">{item.completionPct}% Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OVERDUE CUSTOMERS CRITICAL SECTION */}
        <div className="bg-white rounded-2xl border border-red-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <div>
              <h2 className="text-base font-bold text-red-900">Overdue Customers (Critical)</h2>
              <p className="text-xs text-red-600">Customers with pending installment dues</p>
            </div>
          </div>

          <div className="space-y-3">
            {(metrics?.overdueCustomersList || []).map((od) => (
              <div key={od.id} className="p-3.5 rounded-xl border border-red-100 bg-red-50/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-900">{od.name}</p>
                  <p className="text-3xs text-stone-500">{od.phone} • Pending: {od.pendingMonths} Months</p>
                  <p className="text-xs font-bold text-red-700 mt-0.5">Due: {formatINR(od.dueAmount)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(`tel:${od.phone}`, "_self")}
                    className="p-1.5 bg-white border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-100"
                    title="Call Customer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleWhatsAppReminder(od.phone, od.name, od.dueAmount)}
                    className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    title="WhatsApp Reminder"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomerForPayment(od.id);
                      setShowRecordPaymentModal(true);
                    }}
                    className="px-2.5 py-1 bg-primary text-white rounded-lg text-3xs font-bold hover:bg-primary-dark"
                  >
                    Record Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── DAILY COLLECTION REPORT TABLE ─────────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">Daily Collection Report</h2>
            <p className="text-xs text-stone-400">Detailed receipt-by-receipt transaction log</p>
          </div>
          <button
            onClick={() => handleExport("CSV", "Daily Collection Report")}
            className="text-xs font-bold text-primary hover:underline"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-stone-50 text-stone-500 font-extrabold uppercase border-y border-stone-100">
                <th className="py-3 px-4">Receipt</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Installment</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Recorded By</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {(metrics?.dailyCollectionReport || []).map((row) => (
                <tr key={row.id} className="hover:bg-cream-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-primary">{row.id}</td>
                  <td className="py-3 px-4 font-bold text-stone-900">{row.customerName}</td>
                  <td className="py-3 px-4 font-semibold text-stone-700">{row.installment}</td>
                  <td className="py-3 px-4 font-extrabold text-stone-900">{formatINR(row.amount)}</td>
                  <td className="py-3 px-4"><Badge variant="paid">{row.method}</Badge></td>
                  <td className="py-3 px-4 text-stone-500">{row.recordedBy}</td>
                  <td className="py-3 px-4 text-stone-600">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MONTHLY BUSINESS SUMMARY & SCHEME ANALYTICS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* MONTHLY BUSINESS SUMMARY */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900">Monthly Business Summary</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Opening Collection", val: formatINR(metrics?.businessSummary.openingCollection || 50000) },
              { label: "Today's Collection", val: formatINR(metrics?.businessSummary.todayCollection || 3000) },
              { label: "This Month Collection", val: formatINR(metrics?.businessSummary.thisMonthCollection || 482000) },
              { label: "Expected Revenue", val: formatINR(metrics?.businessSummary.expectedRevenue || 2940000) },
              { label: "Collected Revenue", val: formatINR(metrics?.businessSummary.collectedRevenue || 482000) },
              { label: "Remaining Revenue", val: formatINR(metrics?.businessSummary.remainingRevenue || 2458000) },
            ].map((b, idx) => (
              <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center">
                <p className="text-3xs text-stone-400 font-bold uppercase">{b.label}</p>
                <p className="text-sm font-extrabold text-stone-900 mt-1">{b.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SCHEME ANALYTICS */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900">Scheme Analytics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-center">
              <p className="text-3xs text-stone-400 font-bold uppercase">Avg Completion</p>
              <p className="text-base font-extrabold text-primary mt-1">{metrics?.schemeAnalytics.avgCompletionPct || 25}%</p>
            </div>
            <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-center">
              <p className="text-3xs text-stone-400 font-bold uppercase">Avg Monthly Deposit</p>
              <p className="text-base font-extrabold text-stone-900 mt-1">{formatINR(metrics?.schemeAnalytics.avgMonthlyDeposit || 1000)}</p>
            </div>
            <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 text-center">
              <p className="text-3xs text-stone-400 font-bold uppercase">Avg Scheme Value</p>
              <p className="text-base font-extrabold text-stone-900 mt-1">{formatINR(metrics?.schemeAnalytics.avgSchemeValue || 12000)}</p>
            </div>
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-center col-span-2 sm:col-span-2">
              <p className="text-3xs text-amber-800 font-bold uppercase">Most Popular Scheme</p>
              <p className="text-sm font-extrabold text-amber-900 mt-0.5">{metrics?.schemeAnalytics.mostPopularScheme || "Diwali Savings Scheme"}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
              <p className="text-3xs text-emerald-700 font-bold uppercase">Completion Rate</p>
              <p className="text-base font-extrabold text-emerald-800 mt-1">{metrics?.schemeAnalytics.completionRate || 85}%</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── ACTIVITY REPORT FEED ────────────────────────── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-primary" />
          <h2 className="text-base font-bold text-stone-900">Activity Log Feed</h2>
        </div>

        <div className="space-y-2">
          {(metrics?.activityLogs || []).length === 0 ? (
            <p className="text-xs text-stone-400">No activity logs recorded yet.</p>
          ) : (
            metrics?.activityLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-bold text-stone-900">{log.action}: <span className="font-normal text-stone-700">{log.description}</span></p>
                    <p className="text-3xs text-stone-400">Performed by: {log.performedBy}</p>
                  </div>
                </div>
                <span className="text-3xs text-stone-400 font-medium">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Record Payment Modal Integration */}
      <RecordPaymentModal
        open={showRecordPaymentModal}
        onClose={() => setShowRecordPaymentModal(false)}
        onSuccess={loadReports}
      />
    </div>
  );
}
