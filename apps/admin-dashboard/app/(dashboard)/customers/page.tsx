"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Search,
  Download,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Loader2,
  Users,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import ProgressBar from "@/components/common/ProgressBar";
import {
  type Customer,
  type CustomerStatus,
  getProgressColor,
  getPercentageTextColor,
} from "@/lib/mock-data/customers";
import { fetchCustomers } from "@/services/customer-service";
import { cn } from "@/lib/utils";

type FilterTab = "all" | CustomerStatus;

const filterTabs: { label: string; value: FilterTab }[] = [
  { label: "All Customers", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Pending Installment", value: "pending_installment" },
  { label: "Ready for Redemption", value: "ready_for_redemption" },
  { label: "Inactive", value: "inactive" },
];

export default function CustomersPage() {
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    const res = await fetchCustomers();
    if (res.error) {
      setError(res.error);
    } else {
      setCustomerList(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const ITEMS_PER_PAGE = 6;

  const filtered = customerList.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || c.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeCount = customerList.filter((c) => c.status === "active").length;
  const pendingCount = customerList.filter(
    (c) => c.status === "pending_installment"
  ).length;
  const redemptionCount = customerList.filter(
    (c) => c.status === "ready_for_redemption"
  ).length;

  return (
    <div className="min-h-full bg-cream-100">
      {/* ── Top Bar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-3 bg-cream-100 border-b border-cream-200">
        <div className="relative w-[400px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            strokeWidth={1.8}
          />
          <input
            type="text"
            placeholder="Global Search..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-white
                       text-sm text-gray-700 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
            <Calendar className="w-4 h-4" strokeWidth={1.8} />
            September 15, 2023
          </span>
          <button className="relative w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Bell className="w-4.5 h-4.5 text-gray-500" strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* ── Page header ───────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-primary">Customers</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all jewellery savings scheme customers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadCustomers}
              className="p-2.5 border border-gray-200 bg-white rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              title="Refresh Customers"
            >
              <RefreshCw className={cn("w-4 h-4", loading ? "animate-spin" : "")} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-500" strokeWidth={1.8} />
              Export
            </button>
            <Link
              href="/customers/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <UserPlus className="w-4 h-4" strokeWidth={2.5} />
              Add New Customer
            </Link>
          </div>
        </div>

        {/* ── Error Banner ─────────────────────────────── */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-xs text-red-800 font-medium">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={loadCustomers}
              className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Metric Cards Row ──────────────────────────── */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Total Customers */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                <Users className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600">
                <TrendingUp className="w-3 h-3" />
                Live
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900">
              {loading ? "..." : customerList.length}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Total Registered</p>
          </div>

          {/* Active Members */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-4.5 h-4.5 text-green-600" strokeWidth={2} />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900">
              {loading ? "..." : activeCount}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Active Schemes</p>
          </div>

          {/* Pending Installments */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-600" strokeWidth={2} />
              </div>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                  Attention
                </span>
              )}
            </div>
            <p className="text-2xl font-black text-amber-600">
              {loading ? "..." : pendingCount}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Pending Installment</p>
          </div>

          {/* Ready for Redemption */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-gold-50 flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5 text-gold-dark" strokeWidth={2} />
              </div>
            </div>
            <p className="text-2xl font-black text-gold-dark">
              {loading ? "..." : redemptionCount}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Ready for Redemption</p>
          </div>
        </div>

        {/* ── Main Layout: Table + Summary Sidebar ──────── */}
        <div className="grid grid-cols-[1fr_300px] gap-6">
          
          {/* Table Container Card */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {/* Filter Tabs Bar */}
            <div className="flex items-center gap-1 px-5 pt-4 pb-0 border-b border-gray-100 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveFilter(tab.value);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-3.5 py-2 text-xs font-semibold rounded-t-xl border-b-2 transition-all whitespace-nowrap",
                    activeFilter === tab.value
                      ? "border-primary text-primary bg-primary-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  strokeWidth={1.8}
                />
                <input
                  type="text"
                  placeholder="Filter by name, mobile, or ID..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl bg-white
                             text-xs text-gray-700 placeholder:text-gray-400
                             focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30"
                />
              </div>

              <span className="text-xs font-semibold text-gray-400">
                {filtered.length} customer{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Table or Loading / Empty States */}
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                <p className="text-sm font-semibold text-gray-600">Loading customers from Supabase...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-5 py-3 text-2xs font-semibold text-gray-400 uppercase tracking-wider">
                        Customer ID
                      </th>
                      <th className="px-4 py-3 text-2xs font-semibold text-gray-400 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-4 py-3 text-2xs font-semibold text-gray-400 uppercase tracking-wider">
                        Mobile Number
                      </th>
                      <th className="px-4 py-3 text-2xs font-semibold text-gray-400 uppercase tracking-wider">
                        Scheme Name
                      </th>
                      <th className="px-4 py-3 text-2xs font-semibold text-gray-400 uppercase tracking-wider">
                        Installment Progress
                      </th>
                      <th className="px-4 py-3 text-2xs font-semibold text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-16 text-sm text-gray-400"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Users className="w-10 h-10 text-gray-300 mb-2" />
                            <p className="font-semibold text-gray-600">No customers found.</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {search || activeFilter !== "all"
                                ? "Try clearing your filters or search terms."
                                : "Click 'Add New Customer' above to register your first scheme customer."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginated.map((customer, i) => (
                        <tr
                          key={customer.id}
                          className={cn(
                            "hover:bg-cream-50 transition-colors group",
                            i < paginated.length - 1
                              ? "border-b border-gray-50"
                              : ""
                          )}
                        >
                          {/* Customer ID */}
                          <td className="px-5 py-4 text-xs font-semibold text-gray-500 whitespace-nowrap">
                            {customer.id}
                          </td>

                          {/* Name + Avatar */}
                          <td className="px-4 py-4">
                            <Link
                              href={`/customers/${customer.id}`}
                              className="flex items-center gap-3"
                            >
                              <Avatar
                                name={customer.name}
                                bgColor={customer.avatarColor}
                                textColor={customer.avatarTextColor}
                                size="sm"
                              />
                              <span className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                {customer.name}
                              </span>
                            </Link>
                          </td>

                          {/* Mobile */}
                          <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                            {customer.mobile}
                          </td>

                          {/* Scheme */}
                          <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                            {customer.scheme}
                          </td>

                          {/* Installments */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2 min-w-[130px]">
                              <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
                                {customer.installmentsPaid}/
                                {customer.totalInstallments}
                              </span>
                              <div className="flex-1">
                                <ProgressBar
                                  value={customer.percentage}
                                  size="xs"
                                />
                              </div>
                              <span
                                className={cn(
                                  "text-xs font-bold whitespace-nowrap",
                                  getPercentageTextColor(customer.percentage)
                                )}
                              >
                                {customer.percentage}%
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <Badge
                              variant={
                                customer.status === "active"
                                  ? "active"
                                  : customer.status === "completed"
                                  ? "completed"
                                  : customer.status === "pending_installment"
                                  ? "pending"
                                  : customer.status === "ready_for_redemption"
                                  ? "ready_for_redemption"
                                  : "inactive"
                              }
                              dot
                            >
                              {customer.status === "active"
                                ? "Active"
                                : customer.status === "completed"
                                ? "Completed"
                                : customer.status === "pending_installment"
                                ? "Pending"
                                : customer.status === "ready_for_redemption"
                                ? "Ready"
                                : "Inactive"}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!loading && paginated.length > 0 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
                  {filtered.length} customers
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg
                               text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed
                               transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-xs font-semibold transition-colors",
                        currentPage === i + 1
                          ? "bg-primary text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg
                               text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed
                               transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Quick Summary</p>
                  <p className="text-xs text-gray-400">Database Record Breakdown</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs text-gray-500">Total Customers</p>
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600">
                      <ArrowUpRight className="w-3 h-3" />
                      Live DB
                    </span>
                  </div>
                  <p className="text-2xl font-black text-gray-900">
                    {loading ? "..." : customerList.length}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Active Schemes</p>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">
                    {loading ? "..." : activeCount}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Pending Installments</p>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <p className="text-xl font-bold text-amber-600 mt-0.5">
                    {loading ? "..." : pendingCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Support Notice Card */}
            <div className="bg-gold-50/60 border border-gold-200/50 rounded-2xl p-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-gold-dark mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Customer Support</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Need help registering a customer or modifying scheme terms? Contact store admin support.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
