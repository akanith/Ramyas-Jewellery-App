"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Calendar,
  Check,
  CreditCard,
  Building2,
  Smartphone,
  Banknote,
  CheckCircle2,
  Search,
  User,
  ArrowLeft,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import { formatINR, cn } from "@/lib/utils";
import { fetchCustomers, updateCustomer } from "@/services/customer-service";
import { recordInstallment } from "@/services/installment-service";
import { type Customer } from "@/lib/mock-data/customers";

interface RecordPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type PaymentMethodType = "Cash" | "GPay" | "PhonePe" | "Transfer";

const methodOptions: { id: PaymentMethodType; label: string; icon: React.ElementType }[] = [
  { id: "Cash", label: "Cash", icon: Banknote },
  { id: "GPay", label: "GPay", icon: CreditCard },
  { id: "PhonePe", label: "PhonePe", icon: Smartphone },
  { id: "Transfer", label: "Transfer", icon: Building2 },
];

export default function RecordPaymentModal({ open, onClose, onSuccess }: RecordPaymentModalProps) {
  // Step 1 = Customer Search, Step 2 = Record Form
  const [step, setStep] = useState<1 | 2>(1);

  // Customer List & Search State
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Selected Customer State
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Form State
  const [method, setMethod] = useState<PaymentMethodType>("Cash");
  const [amount, setAmount] = useState("1000");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [referenceNo, setReferenceNo] = useState("");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset and load customers when modal opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setSearchQuery("");
      setSelectedCustomer(null);
      setSubmitted(false);
      setError(null);
      setSelectedIndex(0);

      // Load live customers
      setLoadingCustomers(true);
      fetchCustomers().then((res) => {
        setCustomers(res.data || []);
        setLoadingCustomers(false);
      });

      // Auto-focus search field
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Filtered customer list
  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.mobile.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  });

  // Select customer helper
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setAmount("1000");
    setReferenceNo("");
    setNotes("");
    setStep(2);
  };

  // Keyboard navigation for search (ArrowUp, ArrowDown, Enter, ESC)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (step === 1) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCustomers.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filteredCustomers.length > 0) {
        e.preventDefault();
        const chosen = filteredCustomers[selectedIndex] || filteredCustomers[0];
        if (chosen) handleSelectCustomer(chosen);
      }
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Final submit handler
  const handleRecordSubmit = async () => {
    if (!selectedCustomer) return;

    const amountVal = Number(amount);
    if (!amountVal || amountVal <= 0) {
      setError("Please enter a valid installment amount.");
      return;
    }

    setRecording(true);
    setError(null);

    const nextInstNumber = (selectedCustomer.installmentsPaid || 0) + 1;
    const newPaidAmount = (selectedCustomer.paidAmount || 0) + amountVal;
    const newRemCredit = Math.max(0, (selectedCustomer.remainingCredit || 0) - amountVal);
    const newPercentage = Math.min(
      100,
      Math.round((nextInstNumber / selectedCustomer.totalInstallments) * 100)
    );
    const isCompleted = nextInstNumber >= selectedCustomer.totalInstallments;

    // 1. Record Installment in Supabase
    const instRes = await recordInstallment({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      amount: amountVal,
      method: method === "Transfer" ? "Bank Transfer" : method,
      date: paymentDate,
      status: "RECORDED",
    });

    if (instRes.error) {
      setRecording(false);
      setError(instRes.error);
      return;
    }

    // 2. Update Customer Profile in Supabase
    await updateCustomer(selectedCustomer.id, {
      installmentsPaid: nextInstNumber,
      paidAmount: newPaidAmount,
      status: isCompleted ? "completed" : "active",
    });

    setRecording(false);
    setSubmitted(true);

    // Refresh views immediately
    onSuccess?.();

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Right Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-in">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-cream-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
                  title="Back to Customer Search"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  {step === 1 ? "Select Customer" : "Record Installment"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {step === 1
                    ? "Search and select a customer to record scheme payment."
                    : `Recording installment for ${selectedCustomer?.name}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">
                Installment Recorded!
              </h3>
              <p className="text-sm text-stone-500">
                ₹{amount} recorded for {selectedCustomer?.name} via {method}.
              </p>
            </div>
          ) : step === 1 ? (
            /* ── STEP 1: CUSTOMER SEARCH SCREEN ──────────────── */
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Search Box */}
              <div className="p-4 border-b border-stone-100 bg-cream-50/50">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by Customer Name, Mobile Number or Customer ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 px-1 text-3xs font-semibold text-stone-400">
                  <span>Use ↑ ↓ arrow keys & Press Enter to select</span>
                  <span>{filteredCustomers.length} Customers</span>
                </div>
              </div>

              {/* Customer Search Results List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {loadingCustomers ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center">
                    <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                    <p className="text-xs text-stone-500">Searching customers in Supabase...</p>
                  </div>
                ) : filteredCustomers.length === 0 ? (
                  <div className="py-16 text-center text-stone-400 space-y-2">
                    <User className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
                    <p className="text-sm font-bold text-stone-600">No customers found</p>
                    <p className="text-xs text-stone-400">No matches found for &quot;{searchQuery}&quot;</p>
                  </div>
                ) : (
                  filteredCustomers.map((c, index) => {
                    const isFocused = index === selectedIndex;
                    return (
                      <div
                        key={c.id}
                        onClick={() => handleSelectCustomer(c)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          "p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3",
                          isFocused
                            ? "bg-primary-50/50 border-primary/40 shadow-xs"
                            : "bg-white border-stone-200/80 hover:border-stone-300"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar name={c.name} src={c.photo} size="sm" />
                            <div>
                              <p className="text-sm font-bold text-stone-900">{c.name}</p>
                              <p className="text-2xs text-stone-500 font-medium">
                                ID: {c.id} &nbsp;|&nbsp; MOB: {c.mobile}
                              </p>
                            </div>
                          </div>
                          <Badge variant={c.status}>{c.status.replace("_", " ")}</Badge>
                        </div>

                        {/* Scheme Bar */}
                        <div className="bg-stone-50 rounded-xl p-2.5 flex items-center justify-between border border-stone-100 text-xs">
                          <div>
                            <p className="text-2xs font-bold text-amber-800 uppercase tracking-wider">{c.scheme}</p>
                            <p className="text-2xs text-stone-500 font-semibold">{c.installmentsPaid} / {c.totalInstallments} Paid</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectCustomer(c);
                            }}
                            className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-2xs rounded-lg transition-colors shadow-xs"
                          >
                            Select Customer
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          ) : (
            /* ── STEP 2: RECORD INSTALLMENT FORM ─────────────── */
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              
              {/* Error Banner */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-800">
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Selected Customer Card Box */}
              {selectedCustomer && (
                <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4 flex items-center gap-3.5">
                  <Avatar name={selectedCustomer.name} src={selectedCustomer.photo} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-stone-900 truncate">
                        {selectedCustomer.name}
                      </h3>
                      <Badge variant={selectedCustomer.status}>
                        {selectedCustomer.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-2xs text-stone-500 mt-0.5">
                      ID: {selectedCustomer.id} &nbsp;|&nbsp; MOB: {selectedCustomer.mobile}
                    </p>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-800 text-2xs font-semibold rounded-md">
                      Scheme: {selectedCustomer.scheme}
                    </span>
                  </div>
                </div>
              )}

              {/* Scheme Progress */}
              {selectedCustomer && (
                <div>
                  <div className="flex justify-between text-2xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                    <span>Scheme Progress</span>
                    <span className="text-stone-900 font-extrabold">
                      {selectedCustomer.installmentsPaid} / {selectedCustomer.totalInstallments} Months
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100 overflow-hidden mb-4">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${Math.round(
                          (selectedCustomer.installmentsPaid / selectedCustomer.totalInstallments) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  {/* 4 Metric Boxes */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white border border-stone-200 rounded-xl p-3">
                      <p className="text-2xs text-stone-500 font-medium">Paid</p>
                      <p className="text-lg font-bold text-stone-900 mt-0.5">
                        {formatINR(selectedCustomer.paidAmount || 0)}
                      </p>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl p-3">
                      <p className="text-2xs text-stone-500 font-medium">Remaining</p>
                      <p className="text-lg font-bold text-stone-900 mt-0.5">
                        {formatINR(selectedCustomer.remainingCredit || 0)}
                      </p>
                    </div>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                      <p className="text-2xs text-amber-700 font-medium">Bonus</p>
                      <p className="text-lg font-bold text-amber-700 mt-0.5">
                        {formatINR(selectedCustomer.bonusCredit || 1000)}
                      </p>
                    </div>
                    <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3">
                      <p className="text-2xs text-emerald-800 font-medium">Eligible Value</p>
                      <p className="text-lg font-bold text-emerald-800 mt-0.5">
                        {formatINR(selectedCustomer.totalEligibleValue || 13000)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Input Fields */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    INSTALLMENT AMOUNT (₹)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Payment Method Radio Options */}
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    PAYMENT METHOD
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {methodOptions.map((opt) => {
                      const Icon = opt.icon;
                      const active = method === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setMethod(opt.id)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all",
                            active
                              ? "bg-primary-50 border-primary text-primary font-bold shadow-xs"
                              : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reference Number */}
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    REFERENCE / UTR NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UPI/123456789"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Payment Date */}
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    PAYMENT DATE
                  </label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    REMARKS / NOTES
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Additional payment details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Drawer Footer Actions */}
          {!submitted && (
            <div className="p-5 border-t border-stone-100 bg-white flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancel
              </button>

              {step === 2 && (
                <button
                  type="button"
                  disabled={recording}
                  onClick={handleRecordSubmit}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {recording ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Recording...
                    </>
                  ) : (
                    "Record Installment"
                  )}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
