"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  MapPin,
  Gem,
  CreditCard,
  Edit3,
  Printer,
  CheckCircle2,
  Circle,
  AlertCircle,
  FileText,
  NotebookPen,
  ShoppingBag,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import ProgressBar from "@/components/common/ProgressBar";
import RedemptionDialog from "@/components/customers/RedemptionDialog";
import EditCustomerDialog from "@/components/customers/EditCustomerDialog";
import RecordPaymentModal from "@/components/payments/RecordPaymentModal";
import { fetchCustomerById } from "@/services/customer-service";
import {
  fetchInstallmentsByCustomerId,
  updateInstallment,
  deleteInstallment,
  type Installment,
} from "@/services/installment-service";
import { type Customer } from "@/lib/mock-data/customers";
import { formatINR, cn } from "@/lib/utils";

interface CustomerDetailClientProps {
  customer: Customer;
}

export default function CustomerDetailClient({
  customer: initialCustomer,
}: CustomerDetailClientProps) {
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [payments, setPayments] = useState<Installment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [showRedemption, setShowRedemption] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [showPassbookPreview, setShowPassbookPreview] = useState(false);

  // Edit Installment Modal State
  const [editingPayment, setEditingPayment] = useState<Installment | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editMethod, setEditMethod] = useState<string>("Cash");
  const [editNotes, setEditNotes] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete Installment Confirmation State
  const [deletingPayment, setDeletingPayment] = useState<Installment | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadPayments = async () => {
    setLoadingPayments(true);
    const res = await fetchInstallmentsByCustomerId(customer.id);
    if (res.data) {
      setPayments(res.data);
    }
    setLoadingPayments(false);
  };

  useEffect(() => {
    loadPayments();
  }, [customer.id]);

  const reloadCustomer = async () => {
    const res = await fetchCustomerById(customer.id);
    if (res.data) {
      setCustomer(res.data);
    }
    loadPayments();
  };

  const handleOpenEdit = (p: Installment) => {
    setEditingPayment(p);
    setEditDate(p.date);
    setEditAmount(p.amount.toString());
    setEditMethod(p.method);
    setEditNotes("");
  };

  const handleSaveEdit = async () => {
    if (!editingPayment) return;
    setSavingEdit(true);
    const res = await updateInstallment(editingPayment.id, {
      date: editDate,
      amount: Number(editAmount),
      method: editMethod,
    });
    setSavingEdit(false);
    if (res.success) {
      setEditingPayment(null);
      await reloadCustomer();
    } else if (res.error) {
      alert(`Error updating installment: ${res.error}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingPayment) return;
    setDeleting(true);
    const res = await deleteInstallment(deletingPayment.id, customer.id);
    setDeleting(false);
    if (res.success) {
      setDeletingPayment(null);
      await reloadCustomer();
    } else if (res.error) {
      alert(`Error deleting installment: ${res.error}`);
    }
  };

  return (
    <div className="min-h-full bg-cream-100">
      {/* ── Breadcrumb ────────────────────────────────── */}
      <header className="sticky top-0 z-20 flex items-center gap-2 px-7 py-3.5 bg-cream-100 border-b border-cream-200">
        <Link
          href="/customers"
          className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
        >
          Customers
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-sm font-semibold text-gray-800">
          {customer.name}
        </span>
      </header>

      <div className="px-7 py-5 space-y-5">
        {/* ── Profile + Scheme Progress ─────────────────── */}
        <div className="grid grid-cols-[280px_1fr] gap-5">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex flex-col items-center text-center mb-5">
              <div className="relative mb-3">
                <Avatar
                  name={customer.name}
                  src={customer.photo}
                  bgColor={customer.avatarColor}
                  size="xl"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-0.5">
                {customer.name}
              </h2>
              <p className="text-xs text-gray-400 mb-2.5">ID: {customer.id}</p>
              <Badge variant="active" dot>
                Active Member
              </Badge>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3.5">
              <div className="flex items-start gap-3">
                <Phone
                  className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-2xs text-gray-400 font-semibold uppercase tracking-wider">
                    Mobile
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {customer.mobile}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-2xs text-gray-400 font-semibold uppercase tracking-wider">
                    Address
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5 leading-relaxed">
                    {customer.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gem
                  className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-2xs text-gray-400 font-semibold uppercase tracking-wider">
                    Scheme &amp; Joined
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {customer.scheme} • {customer.joinDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scheme Progress Card */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Scheme Progress
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  12-Month Gold Accumulation Plan
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-primary">
                  {formatINR(customer.totalEligibleValue)}
                </p>
                <p className="text-2xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                  Total Eligible Value
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-semibold text-gray-700">
                  {customer.installmentsPaid} of {customer.totalInstallments} Months Completed
                </span>
                <span className="font-bold text-primary">
                  {customer.percentage}%
                </span>
              </div>
              <ProgressBar value={customer.percentage} size="md" />
              <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                <span>Started {customer.startDate}</span>
                <span>Matures {customer.matureDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  label: "Paid Amount",
                  value: formatINR(customer.paidAmount),
                  color: "text-gray-900",
                },
                {
                  label: "Remaining Credit",
                  value: formatINR(customer.remainingCredit),
                  color: "text-gray-700",
                },
                {
                  label: "Bonus Credit",
                  value: formatINR(customer.bonusCredit),
                  color: "text-gold-dark",
                },
                {
                  label: "Next Payment",
                  value: customer.nextPayment,
                  color: "text-primary",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="bg-cream-50 rounded-xl p-3 text-center border border-cream-200"
                >
                  <p className="text-2xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className={cn("text-base font-bold", color)}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Action Buttons ──────────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRecordPayment(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-150"
          >
            <CreditCard className="w-4 h-4" strokeWidth={2} />
            Record Installment
          </button>
          <button
            onClick={() => setShowEditDialog(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit3 className="w-4 h-4" strokeWidth={2} />
            Edit Customer
          </button>
          <button
            onClick={() => setShowPassbookPreview(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" strokeWidth={2} />
            Print Passbook
          </button>
          {customer.status === "ready_for_redemption" && (
            <button
              onClick={() => setShowRedemption(true)}
              className="ml-auto flex items-center gap-2 px-4 py-2.5 border border-gold bg-gold-50 rounded-xl text-sm font-semibold text-gold-dark hover:bg-gold-100 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              Redeem Scheme
            </button>
          )}
        </div>

        {/* ── Timeline + Sidebar ────────────────────────── */}
        <div className="grid grid-cols-[1fr_240px] gap-5">
          {/* Installment Timeline */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  Installment Timeline
                </h3>
                <p className="text-2xs text-gray-400 font-medium mt-0.5">
                  {customer.scheme} Schedule
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-400">
                12-Month Plan
              </span>
            </div>

            {loadingPayments ? (
              <div className="py-12 text-center text-xs text-gray-400 font-medium">
                Loading installment timeline...
              </div>
            ) : (() => {
              const recordedPayments = payments.filter((p) => p.status === "RECORDED");
              const totalSlots = customer.totalInstallments || 12;

              if (recordedPayments.length === 0 && payments.length === 0) {
                return (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                      <CreditCard className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      No installment records available yet.
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                      Click "Record Installment" to record the first payment for {customer.name}.
                    </p>
                  </div>
                );
              }

              return (
                <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
                  {Array.from({ length: totalSlots }).map((_, idx) => {
                    const slotNum = idx + 1;
                    const payment = recordedPayments[idx];

                    if (payment) {
                      return (
                        <div key={payment.id || idx} className="relative flex items-start gap-4 group">
                          <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center -translate-x-1/2 ring-4 ring-white">
                            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={2} />
                          </div>
                          
                          <div className="flex-1 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm hover:border-gray-200 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-primary px-2 py-0.5 bg-primary/10 rounded-md">
                                  {payment.installment || `${slotNum}/${totalSlots}`}
                                </span>
                                <span className="text-xs font-bold text-gray-900">
                                  {formatINR(payment.amount)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="paid">PAID</Badge>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleOpenEdit(payment)}
                                    className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 border border-stone-200 transition-colors"
                                    title="Edit Installment"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeletingPayment(payment)}
                                    className="p-1 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/60 transition-colors"
                                    title="Delete Installment"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-2xs text-gray-400 mt-2 pt-2 border-t border-gray-50">
                              <span>Date: <strong className="text-gray-600">{payment.date}</strong></span>
                              <span>Method: <strong className="text-gray-600">{payment.method}</strong></span>
                              <span>Receipt: <strong className="text-primary font-mono">{payment.id}</strong></span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (slotNum === recordedPayments.length + 1) {
                      return (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center -translate-x-1/2 ring-4 ring-white">
                            <AlertCircle className="w-4 h-4 text-amber-600" strokeWidth={2} />
                          </div>
                          
                          <div className="flex-1 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-amber-800 px-2 py-0.5 bg-amber-100 rounded-md">
                                  {slotNum}/{totalSlots}
                                </span>
                                <span className="text-xs font-bold text-amber-900">
                                  Next Payment Due
                                </span>
                              </div>
                              <Badge variant="pending">DUE</Badge>
                            </div>
                            <p className="text-2xs text-amber-700 mt-1">
                              Monthly installment expected for {customer.scheme}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className="relative flex items-start gap-4 opacity-50">
                        <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center -translate-x-1/2 ring-4 ring-white">
                          <Circle className="w-3 h-3 text-gray-400" strokeWidth={1.5} />
                        </div>
                        
                        <div className="flex-1 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-2xs font-semibold text-gray-500">
                              Installment {slotNum}/{totalSlots}
                            </span>
                            <span className="text-2xs text-gray-400 uppercase font-medium">Upcoming</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-2xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                Quick Actions
              </p>
              <div className="space-y-0.5">
                {[
                  {
                    icon: CreditCard,
                    label: "Record Installment",
                    action: () => setShowRecordPayment(true),
                  },
                  {
                    icon: Edit3,
                    label: "Edit Customer",
                    action: () => setShowEditDialog(true),
                  },
                  {
                    icon: ShoppingBag,
                    label: "Redeem Scheme",
                    action: () => setShowRedemption(true),
                  },
                  {
                    icon: FileText,
                    label: "Print Last Receipt",
                    action: () => window.print(),
                  },
                  {
                    icon: Printer,
                    label: "Print Passbook",
                    action: () => window.print(),
                  },
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                               text-sm font-medium text-gray-700
                               hover:bg-cream-50 hover:text-primary
                               transition-colors text-left group"
                  >
                    <Icon
                      className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0"
                      strokeWidth={1.8}
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-2xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                Recent Activity
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <CreditCard
                      className="w-3.5 h-3.5 text-primary"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Installment Recorded
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      July 04, 2023 • 10:20 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-green-500"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Customer Registered
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Jan 05, 2023 • 03:45 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Customer Notes ──────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <NotebookPen
                className="w-4.5 h-4.5 text-primary"
                strokeWidth={1.8}
              />
              <h3 className="font-bold text-gray-900">Customer Notes</h3>
            </div>
            <button className="text-xs font-semibold text-gold-dark hover:text-gold transition-colors">
              Edit Notes
            </button>
          </div>
          <div className="bg-cream-50 border border-cream-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 leading-relaxed italic">
              &quot;{customer.notes}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Redemption Dialog */}
      <RedemptionDialog
        customer={customer}
        isOpen={showRedemption}
        onClose={() => setShowRedemption(false)}
      />

      {/* Edit Customer Dialog */}
      <EditCustomerDialog
        open={showEditDialog}
        customer={customer}
        onClose={() => setShowEditDialog(false)}
        onUpdated={(updated) => setCustomer(updated)}
      />

      {/* Record Payment Modal */}
      <RecordPaymentModal
        open={showRecordPayment}
        onClose={() => setShowRecordPayment(false)}
        onSuccess={reloadCustomer}
      />

      {/* Edit Installment Modal */}
      {editingPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={() => setEditingPayment(null)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Edit Installment</h3>
                <p className="text-xs text-stone-500">
                  {customer.name} • {editingPayment.installment} ({editingPayment.id})
                </p>
              </div>
              <button onClick={() => setEditingPayment(null)} className="p-1 text-stone-400 hover:text-stone-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Payment Method
                </label>
                <select
                  value={editMethod}
                  onChange={(e) => setEditMethod(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Cash">Cash</option>
                  <option value="GPay">GPay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Receipt Number (Read Only)
                </label>
                <input
                  type="text"
                  value={editingPayment.id}
                  disabled
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-400 bg-stone-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Notes / Remarks (Optional)
                </label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Updated payment details"
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
              <button
                onClick={() => setEditingPayment(null)}
                className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
              >
                {savingEdit && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Installment Confirmation Modal */}
      {deletingPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={() => setDeletingPayment(null)} />
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl z-10 animate-scale-up text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-base font-bold text-stone-900 mb-1">Delete Installment</h3>
            <p className="text-xs text-stone-500 mb-6">
              Are you sure you want to delete this installment? This action cannot be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeletingPayment(null)}
                className="flex-1 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Official Passbook Preview & Print Modal ── */}
      {showPassbookPreview && (() => {
        const recordedList = payments.filter((p) => p.status === "RECORDED");
        const totalPaid = recordedList.reduce((sum, p) => sum + Number(p.amount), 0);
        const remAmount = Math.max(0, 12000 - totalPaid);
        const bonus = 1000;
        const totalEligible = totalPaid + bonus;

        return (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowPassbookPreview(false)} />
            <div className="relative bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl z-10 animate-scale-up max-h-[90vh] flex flex-col">
              
              {/* Modal Header Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 flex-shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Passbook Print Preview</h3>
                  <p className="text-xs text-stone-500">
                    {customer.name} ({customer.id}) • Diwali Savings Scheme
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    Print / Save PDF
                  </button>
                  <button
                    onClick={() => setShowPassbookPreview(false)}
                    className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Printable Passbook Document */}
              <div className="overflow-y-auto pt-6 pr-2 flex-1">
                <div id="passbook-print-area" className="font-sans text-stone-900 bg-white p-6 border border-stone-200 rounded-2xl">
                  
                  {/* Brand Header */}
                  <div className="border-b-2 border-primary pb-4 mb-6 text-center">
                    <h1 className="text-2xl font-black text-primary tracking-tight uppercase">RAMYAS JEWELLER</h1>
                    <p className="text-xs font-bold text-amber-800 tracking-widest uppercase mt-0.5">
                      DIWALI SAVINGS SCHEME PASSBOOK
                    </p>
                    <p className="text-3xs text-stone-500 mt-1">Official Customer Deposit Record & Savings Ledger</p>
                  </div>

                  {/* Customer Information Grid */}
                  <div className="grid grid-cols-2 gap-4 border border-stone-200 rounded-xl p-4 mb-6 bg-stone-50/50 text-xs">
                    <div className="space-y-1.5">
                      <p className="text-stone-600">Customer Name: <strong className="text-stone-900 font-bold">{customer.name}</strong></p>
                      <p className="text-stone-600">Customer ID: <strong className="text-stone-900 font-mono">{customer.id}</strong></p>
                      <p className="text-stone-600">Mobile Number: <strong className="text-stone-900">{customer.mobile}</strong></p>
                      <p className="text-stone-600">Scheme Name: <strong className="text-stone-900">Diwali Savings Scheme</strong></p>
                      <p className="text-stone-600">Scheme Start Date: <strong className="text-stone-900">{customer.joinDate || customer.startDate}</strong></p>
                      <p className="text-stone-600">Maturity Date: <strong className="text-stone-900">{customer.matureDate}</strong></p>
                    </div>
                    <div className="space-y-1.5 text-right">
                      <p className="text-stone-600">Monthly Deposit: <strong className="text-stone-900 font-bold">{formatINR(1000)}</strong></p>
                      <p className="text-stone-600">Total Scheme Value: <strong className="text-stone-900 font-bold">{formatINR(12000)}</strong></p>
                      <p className="text-stone-600">Total Installments: <strong className="text-stone-900">12 Months</strong></p>
                      <p className="text-stone-600">Completed Installments: <strong className="text-green-700 font-bold">{recordedList.length}</strong></p>
                      <p className="text-stone-600">Remaining Installments: <strong className="text-amber-700 font-bold">{Math.max(0, 12 - recordedList.length)}</strong></p>
                    </div>
                  </div>

                  {/* Installment Timeline Table */}
                  <div className="mb-6">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-2">
                      INSTALLMENT TIMELINE & DEPOSIT LEDGER
                    </h2>
                    <table className="w-full text-xs border-collapse border border-stone-200">
                      <thead>
                        <tr className="bg-stone-100 text-stone-700 font-bold text-left border-b border-stone-200">
                          <th className="p-2 border-r border-stone-200">Installment No.</th>
                          <th className="p-2 border-r border-stone-200">Payment Date</th>
                          <th className="p-2 border-r border-stone-200">Receipt No.</th>
                          <th className="p-2 border-r border-stone-200">Payment Method</th>
                          <th className="p-2 border-r border-stone-200">Amount</th>
                          <th className="p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 12 }).map((_, idx) => {
                          const slotNum = idx + 1;
                          const payment = recordedList[idx];
                          if (payment) {
                            return (
                              <tr key={payment.id || idx} className="border-b border-stone-200 font-medium">
                                <td className="p-2 border-r border-stone-200 font-bold text-primary">{payment.installment || `${slotNum}/12`}</td>
                                <td className="p-2 border-r border-stone-200">{payment.date}</td>
                                <td className="p-2 border-r border-stone-200 font-mono text-primary">{payment.id}</td>
                                <td className="p-2 border-r border-stone-200">{payment.method}</td>
                                <td className="p-2 border-r border-stone-200 font-bold">{formatINR(payment.amount)}</td>
                                <td className="p-2 text-green-700 font-bold">Paid</td>
                              </tr>
                            );
                          }
                          if (slotNum === recordedList.length + 1) {
                            return (
                              <tr key={idx} className="border-b border-stone-200 bg-amber-50/40">
                                <td className="p-2 border-r border-stone-200 font-bold text-amber-800">{slotNum}/12</td>
                                <td className="p-2 border-r border-stone-200 text-stone-400">Upcoming</td>
                                <td className="p-2 border-r border-stone-200 text-stone-300">--</td>
                                <td className="p-2 border-r border-stone-200 text-stone-300">--</td>
                                <td className="p-2 border-r border-stone-200 font-bold text-amber-800">{formatINR(1000)}</td>
                                <td className="p-2 text-amber-700 font-bold">Due</td>
                              </tr>
                            );
                          }
                          return (
                            <tr key={idx} className="border-b border-stone-200 text-stone-400">
                              <td className="p-2 border-r border-stone-200 font-semibold">{slotNum}/12</td>
                              <td className="p-2 border-r border-stone-200">Upcoming</td>
                              <td className="p-2 border-r border-stone-200 text-stone-300">--</td>
                              <td className="p-2 border-r border-stone-200 text-stone-300">--</td>
                              <td className="p-2 border-r border-stone-200 font-medium">{formatINR(1000)}</td>
                              <td className="p-2 text-stone-400 font-medium">Pending</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Financial Totals */}
                  <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/40 text-xs mb-8">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-3xs text-stone-400 font-bold uppercase">Total Paid Amount</p>
                        <p className="text-sm font-extrabold text-stone-900 mt-0.5">{formatINR(totalPaid)}</p>
                      </div>
                      <div>
                        <p className="text-3xs text-stone-400 font-bold uppercase">Remaining Amount</p>
                        <p className="text-sm font-extrabold text-stone-700 mt-0.5">{formatINR(remAmount)}</p>
                      </div>
                      <div>
                        <p className="text-3xs text-stone-400 font-bold uppercase">Shop Bonus</p>
                        <p className="text-sm font-extrabold text-emerald-700 mt-0.5">{formatINR(bonus)}</p>
                      </div>
                      <div>
                        <p className="text-3xs text-stone-400 font-bold uppercase">Total Eligible Value</p>
                        <p className="text-sm font-extrabold text-primary mt-0.5">{formatINR(totalEligible)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Stamp & Audit Line */}
                  <div className="flex justify-between items-end text-3xs text-stone-400 border-t border-stone-200 pt-4">
                    <div>
                      <p>Generated On: <strong className="text-stone-600">{new Date().toLocaleString()}</strong></p>
                      <p>Generated By: <strong className="text-stone-600">Owner (Ramyas Admin)</strong></p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-stone-300 w-36 mb-1 mx-auto" />
                      <p className="font-bold text-stone-600">Authorized Signatory</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
