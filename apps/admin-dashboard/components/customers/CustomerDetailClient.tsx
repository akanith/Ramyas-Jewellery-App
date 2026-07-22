"use client";

import { useState } from "react";
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
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import ProgressBar from "@/components/common/ProgressBar";
import RedemptionDialog from "@/components/customers/RedemptionDialog";
import EditCustomerDialog from "@/components/customers/EditCustomerDialog";
import RecordPaymentModal from "@/components/payments/RecordPaymentModal";
import { fetchCustomerById } from "@/services/customer-service";
import { type Customer } from "@/lib/mock-data/customers";
import { formatINR, cn } from "@/lib/utils";

interface CustomerDetailClientProps {
  customer: Customer;
}

export default function CustomerDetailClient({
  customer: initialCustomer,
}: CustomerDetailClientProps) {
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [showRedemption, setShowRedemption] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  const reloadCustomer = async () => {
    const res = await fetchCustomerById(customer.id);
    if (res.data) {
      setCustomer(res.data);
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
            onClick={() => window.print()}
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
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-base">
                Installment Timeline
              </h3>
              <span className="text-xs font-semibold text-gray-400">
                2023 Payment Schedule
              </span>
            </div>

            <div className="space-y-2.5">
              {customer.installments.map((inst, i) => {
                /* Grouped (April–July completed) */
                if (inst.status === "grouped") {
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-3 px-4 rounded-xl bg-green-50 border border-green-100"
                    >
                      <CheckCircle2
                        className="w-5 h-5 text-green-500 flex-shrink-0"
                        strokeWidth={1.8}
                      />
                      <span className="text-sm font-semibold text-green-700">
                        {inst.groupLabel}
                      </span>
                      <CheckCircle2
                        className="w-4 h-4 text-green-400 ml-auto"
                        strokeWidth={1.8}
                      />
                    </div>
                  );
                }

                /* Upcoming */
                if (inst.status === "upcoming") {
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-gray-50"
                    >
                      <Circle
                        className="w-4 h-4 text-gray-300 flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {inst.month}
                        </p>
                        <p className="text-xs text-gray-400">
                          {inst.groupLabel}
                        </p>
                      </div>
                    </div>
                  );
                }

                /* Pending */
                if (inst.status === "pending") {
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-3 px-4 rounded-xl bg-amber-50 border border-amber-100"
                    >
                      <AlertCircle
                        className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5"
                        strokeWidth={1.8}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-amber-800">
                            {inst.month}
                          </p>
                          <Badge variant="pending">PENDING</Badge>
                        </div>
                        <p className="text-xs text-amber-600 mt-0.5">
                          {inst.date} • {inst.paymentMethod}
                        </p>
                      </div>
                    </div>
                  );
                }

                /* Paid */
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 px-4 rounded-xl border border-gray-100 hover:bg-cream-50 transition-colors"
                  >
                    <CheckCircle2
                      className="w-4.5 h-4.5 text-green-500 flex-shrink-0 mt-0.5"
                      strokeWidth={1.8}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">
                          {inst.month}
                        </p>
                        <Badge variant="paid">PAID</Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {inst.date} • {inst.paymentMethod}
                        {inst.reference && (
                          <span className="ml-1 text-gray-300">
                            ({inst.reference})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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
    </div>
  );
}
