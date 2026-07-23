"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  User,
  Layers,
  FileText,
  Gem,
  Info,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { createCustomer } from "@/services/customer-service";
import { recordInstallment } from "@/services/installment-service";

export default function NewCustomerPage() {
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [gender, setGender] = useState("Female");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const [schemeName, setSchemeName] = useState("Diwali Savings Scheme");
  const [monthlyInstallment, setMonthlyInstallment] = useState("1000");
  const [totalInstallments, setTotalInstallments] = useState("12");
  const [shopBonus, setShopBonus] = useState("1000");
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split("T")[0]);
  const [firstDueDate, setFirstDueDate] = useState("2026-08-20");

  const [nomineeName, setNomineeName] = useState("");
  const [relationship, setRelationship] = useState("Spouse");
  const [nomineeMobile, setNomineeMobile] = useState("");
  const [remarks, setRemarks] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setError("Please enter Customer Full Name.");
      return false;
    }
    if (!mobile.trim() || mobile.trim().length < 8) {
      setError("Please enter a valid Mobile Number (at least 8 digits).");
      return false;
    }
    return true;
  };

  /**
   * Action 1: Save Customer Profile Only
   */
  const handleSaveProfileOnly = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    const fullAddr = [address, village, pincode].filter(Boolean).join(", ");
    const res = await createCustomer({
      name: fullName.trim(),
      mobile: mobile.trim(),
      scheme: schemeName,
      status: "active",
      installmentsPaid: 0,
      totalInstallments: Number(totalInstallments) || 12,
      paidAmount: 0,
      address: fullAddr,
      notes: remarks,
    });

    setSaving(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSuccessMsg("Customer profile saved successfully! Redirecting...");
      setTimeout(() => {
        router.push("/customers");
      }, 1000);
    }
  };

  /**
   * Action 2: Save Customer Profile & Record First Installment
   */
  const handleSaveAndRecordFirstPay = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    const firstAmount = Number(monthlyInstallment) || 1000;
    const fullAddr = [address, village, pincode].filter(Boolean).join(", ");

    // 1. Create customer row
    const custRes = await createCustomer({
      name: fullName.trim(),
      mobile: mobile.trim(),
      scheme: schemeName,
      status: "active",
      installmentsPaid: 1,
      totalInstallments: Number(totalInstallments) || 12,
      paidAmount: firstAmount,
      address: fullAddr,
      notes: remarks,
    });

    if (custRes.error || !custRes.data) {
      setSaving(false);
      setError(custRes.error || "Failed to create customer.");
      return;
    }

    // 2. Record first installment row
    await recordInstallment({
      customerId: custRes.data.id,
      customerName: custRes.data.name,
      amount: firstAmount,
      method: "Cash",
      date: joiningDate,
      status: "RECORDED",
    });

    setSaving(false);
    setSuccessMsg("Customer & First Installment recorded successfully! Redirecting...");
    setTimeout(() => {
      router.push("/customers");
    }, 1000);
  };

  return (
    <div className="min-h-full bg-cream-100 p-8 space-y-6 max-w-6xl mx-auto">
      
      {/* ── Breadcrumb & Header ──────────────────────────── */}
      <div>
        <Link
          href="/customers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-primary transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Customers
        </Link>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Add New Customer
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Register a customer for the Jewellery Savings Scheme.
        </p>
      </div>

      {/* ── Error & Success Banners ───────────────────────── */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800 font-medium animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 font-medium animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ── Main Layout: 2 Columns ───────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveAndRecordFirstPay();
        }}
        className="grid grid-cols-[1fr_320px] gap-6 items-start"
      >
        
        {/* Left Column: Form Sections */}
        <div className="space-y-6">
          
          {/* Section 1: Customer Information */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-stone-900">
                Customer Information
              </h2>
            </div>

            <div className="flex gap-6 items-start">
              {/* Photo Box */}
              <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors cursor-pointer flex-shrink-0">
                <Camera className="w-6 h-6 mb-1 text-stone-400" />
                <span className="text-2xs font-bold">Photo</span>
              </div>

              {/* Input Fields Grid */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    FULL NAME*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter customer full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      MOBILE NUMBER*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 00000 00000"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      ALT MOBILE
                    </label>
                    <input
                      type="text"
                      placeholder="Alternative number"
                      value={altMobile}
                      onChange={(e) => setAltMobile(e.target.value)}
                      className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  GENDER
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  DATE OF BIRTH
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                ADDRESS
              </label>
              <textarea
                rows={2}
                placeholder="Full residential address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  VILLAGE/TOWN
                </label>
                <input
                  type="text"
                  placeholder="Enter locality"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  PINCODE
                </label>
                <input
                  type="text"
                  placeholder="6-digit code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                AADHAAR NUMBER (OPTIONAL)
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Section 2: Scheme Information */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-stone-900">
                Scheme Information
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  SCHEME PLAN
                </label>
                <select
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Diwali Savings Scheme">Diwali Savings Scheme (Standard 12 Months)</option>
                </select>
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  MONTHLY INSTALLMENT (₹)
                </label>
                <input
                  type="number"
                  value={monthlyInstallment}
                  onChange={(e) => setMonthlyInstallment(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  TOTAL DURATION (MONTHS)
                </label>
                <input
                  type="number"
                  value={totalInstallments}
                  onChange={(e) => setTotalInstallments(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  ESTIMATED SHOP BONUS (₹)
                </label>
                <input
                  type="number"
                  value={shopBonus}
                  onChange={(e) => setShopBonus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Nominee Details */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-stone-900">
                Nominee & Remarks
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  NOMINEE NAME
                </label>
                <input
                  type="text"
                  placeholder="Enter nominee name"
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  RELATIONSHIP
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                </select>
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  NOMINEE MOBILE
                </label>
                <input
                  type="text"
                  placeholder="+91 00000 00000"
                  value={nomineeMobile}
                  onChange={(e) => setNomineeMobile(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                ADDITIONAL REMARKS
              </label>
              <textarea
                rows={2}
                placeholder="Special notes or store preferences..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Registration Summary Sidebar */}
        <div className="space-y-4 sticky top-6">
          
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between text-white">
              <h3 className="font-bold text-sm">Registration Summary</h3>
              <Gem className="w-4 h-4 text-amber-300" />
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Customer</span>
                <span className="font-bold text-stone-900">{fullName || "—"}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Scheme</span>
                <span className="font-bold text-stone-900 text-right">{schemeName}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Installment</span>
                <span className="font-bold text-stone-900">₹{monthlyInstallment}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500">Shop Bonus</span>
                <span className="font-bold text-emerald-700">₹{shopBonus}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-stone-500">Expected Maturity</span>
                <span className="font-bold text-stone-900">May 2027</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveAndRecordFirstPay}
                  className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Customer...
                    </>
                  ) : (
                    "Save & Record First Pay"
                  )}
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveProfileOnly}
                  className="w-full py-2.5 border border-primary text-primary hover:bg-primary/5 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Customer Profile"
                  )}
                </button>
                <div className="text-center pt-1">
                  <Link
                    href="/customers"
                    className="text-2xs font-semibold text-stone-500 hover:underline"
                  >
                    Cancel & Return
                  </Link>
                </div>
              </div>

              {/* Info Notice Box */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-2xs text-amber-900 leading-relaxed">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  Recording the first installment immediately activates the digital passbook for the customer.
                </span>
              </div>
            </div>
          </div>

          {/* Jewellery Image Banner */}
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xs h-36 bg-gradient-to-r from-stone-800 to-stone-900 relative flex items-center justify-center text-white">
            <span className="text-xs font-bold text-stone-300">💍 Ramyas Jewellers</span>
          </div>

        </div>

      </form>
    </div>
  );
}
