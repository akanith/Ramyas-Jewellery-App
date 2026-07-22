"use client";

import { useState } from "react";
import { X, CheckCircle2, Printer, BadgeCheck } from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Badge from "@/components/common/Badge";
import { type Customer } from "@/lib/mock-data/customers";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RedemptionDialogProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

export default function RedemptionDialog({
  customer,
  isOpen,
  onClose,
}: RedemptionDialogProps) {
  const [billNumber, setBillNumber] = useState("");
  const [billAmount, setBillAmount] = useState("28500");
  const [jewelleryCategory, setJewelleryCategory] = useState("");
  const [sweetBoxGiven, setSweetBoxGiven] = useState(false);
  const [festivalGiftGiven, setFestivalGiftGiven] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);

  if (!isOpen) return null;

  const schemeValue = customer.totalEligibleValue;
  const balance = Number(billAmount || 0) - schemeValue;

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      setIsCompleting(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-end pr-0">
        <div
          className="relative bg-white w-full max-w-[420px] h-full overflow-y-auto shadow-dialog animate-slide-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Complete Redemption
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Finalize the customer&apos;s jewellery savings scheme.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-6 py-5 space-y-5">
            {/* Customer info card */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  name={customer.name}
                  src={customer.photo}
                  bgColor={customer.avatarColor}
                  size="md"
                />
                <div>
                  <p className="font-semibold text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-500">ID: {customer.id}</p>
                  <p className="text-xs text-gray-500">{customer.mobile}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-400 uppercase tracking-wider text-2xs font-semibold mb-0.5">
                    Scheme
                  </p>
                  <p className="font-semibold text-gray-800">{customer.scheme}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 uppercase tracking-wider text-2xs font-semibold mb-0.5">
                    Joined
                  </p>
                  <p className="font-semibold text-gray-800">
                    {customer.joinDate}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-wider text-2xs font-semibold mb-0.5">
                    Status
                  </p>
                  <Badge variant="ready_for_redemption">Ready for Redemption</Badge>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 uppercase tracking-wider text-2xs font-semibold mb-0.5">
                    Completed
                  </p>
                  <p className="font-semibold text-gray-800">Dec 24, 2023</p>
                </div>
              </div>
            </div>

            {/* Value summary — dark maroon card */}
            <div className="bg-primary rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-2xs text-white/60 uppercase tracking-wider font-semibold mb-0.5">
                    Total Paid Amount
                  </p>
                  <p className="text-xl font-bold text-white">
                    {formatINR(customer.paidAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xs text-white/60 uppercase tracking-wider font-semibold mb-0.5">
                    Shop Bonus
                  </p>
                  <p className="text-xl font-bold text-gold">
                    {formatINR(customer.bonusCredit)}
                  </p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-2xs text-white/60 uppercase tracking-wider font-semibold mb-0.5">
                    Net Eligible Value
                  </p>
                  <p className="text-2xl font-black text-white">
                    {formatINR(customer.totalEligibleValue)}
                  </p>
                </div>
                <BadgeCheck className="w-7 h-7 text-gold opacity-90" strokeWidth={1.5} />
              </div>
            </div>

            {/* Purchase Details */}
            <div>
              <p className="text-2xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
                Purchase Details
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Bill Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. INV-8829"
                      value={billNumber}
                      onChange={(e) => setBillNumber(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm
                                 text-gray-800 placeholder:text-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Bill Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm
                                 text-gray-800 placeholder:text-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Jewellery Category
                  </label>
                  <select
                    value={jewelleryCategory}
                    onChange={(e) => setJewelleryCategory(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm
                               text-gray-700 bg-white
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                  >
                    <option value="">Select category...</option>
                    <option value="necklace">Necklace</option>
                    <option value="bangles">Bangles</option>
                    <option value="rings">Rings</option>
                    <option value="earrings">Earrings</option>
                    <option value="chain">Chain</option>
                    <option value="coins">Gold Coins</option>
                    <option value="set">Wedding Set</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-cream-50 rounded-xl p-4 text-sm">
              <div className="text-2xs text-gray-400 uppercase font-semibold tracking-widest mb-3">
                Authorized by Ramyas Luxury Jewelry Management System
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total Bill Amount</span>
                  <span className="font-semibold text-gray-800">
                    {formatINR(Number(billAmount || 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between text-green-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                    Scheme Value Applied
                  </span>
                  <span className="font-semibold">
                    -{formatINR(schemeValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="font-semibold text-gray-900">
                    Balance to be Paid
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatINR(Math.max(0, balance))}
                  </span>
                </div>
              </div>
            </div>

            {/* Gifts */}
            <div className="flex gap-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sweetBoxGiven}
                  onChange={(e) => setSweetBoxGiven(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-gray-600">Sweet Box Given</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={festivalGiftGiven}
                  onChange={(e) => setFestivalGiftGiven(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-gray-600">Festival Gift Given</span>
              </label>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Remarks / Customer Notes
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add any specific details about the redemption process..."
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm
                           text-gray-800 placeholder:text-gray-400 resize-none
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4" strokeWidth={2} />
                Print Summary
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary
                           hover:bg-primary-dark text-white rounded-xl text-sm font-bold
                           shadow-sm transition-all duration-150 disabled:opacity-70"
              >
                {isCompleting ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Redemption
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
