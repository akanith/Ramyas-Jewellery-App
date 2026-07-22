"use client";

import { useState, useEffect } from "react";
import {
  Store,
  Layers,
  CreditCard,
  Receipt,
  Bell,
  Shield,
  Database,
  Upload,
  Download,
  FileSpreadsheet,
  History,
  Check,
  CheckCircle2,
  Sparkles,
  Info,
  Building2,
  Lock,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { fetchShopSettings, updateShopSettings } from "@/services/settings-service";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("shop-info");

  // Shop Information state
  const [shopName, setShopName] = useState("Ramyas Jewellers");
  const [contactPerson, setContactPerson] = useState("Ramyas Admin");
  const [mobileNumber, setMobileNumber] = useState("+91 98765 43210");
  const [storeEmail, setStoreEmail] = useState("contact@ramyasjewellers.com");
  const [storeAddress, setStoreAddress] = useState(
    "123, Gold Souk Road, T. Nagar, Chennai - 600017"
  );
  const [gstNumber, setGstNumber] = useState("33AAAAA0000A1Z5");

  // Scheme Config state
  const [defaultScheme, setDefaultScheme] = useState("Swarna Nidhi");
  const [monthlyInstallment, setMonthlyInstallment] = useState("1000");
  const [totalDuration, setTotalDuration] = useState("12");
  const [shopBonus, setShopBonus] = useState("1000");
  const [durationStandard, setDurationStandard] = useState("12 Months");

  // Payment Methods state
  const [cashEnabled, setCashEnabled] = useState(true);
  const [upiEnabled, setUpiEnabled] = useState(true);
  const [bankTransferEnabled, setBankTransferEnabled] = useState(false);

  // Receipt Settings state
  const [receiptHeader, setReceiptHeader] = useState(
    "Thank you for investing with Ramyas Jewellers — your trusted jewellery partner."
  );
  const [receiptTerms, setReceiptTerms] = useState(
    "1. Bonus applicable on timely payment. 2. Redemption strictly after 12 months. 3. GST & making charges as applicable."
  );
  const [autoPrint, setAutoPrint] = useState(true);

  // Notification Settings state
  const [whatsappReminders, setWhatsappReminders] = useState(true);
  const [smsPaymentAlerts, setSmsPaymentAlerts] = useState(false);
  const [redemptionAlerts, setRedemptionAlerts] = useState(true);

  // Security state
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState("90 Days");

  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    fetchShopSettings().then((res) => {
      if (res.data) {
        const s = res.data;
        setShopName(s.shopName);
        setContactPerson(s.contactPerson);
        setMobileNumber(s.mobile);
        setStoreEmail(s.email);
        setStoreAddress(s.address);
        setGstNumber(s.gstNumber);
        setReceiptHeader(s.receiptHeader);
        setReceiptTerms(s.receiptTerms);
        setAutoPrint(s.autoPrint);
        setWhatsappReminders(s.whatsappReminders);
        setSmsPaymentAlerts(s.smsAlerts);
        setRedemptionAlerts(s.redemptionAlerts);
        setTwoFactorAuth(s.twoFactorAuth);
        setPasswordExpiry(s.passwordExpiry);
      }
    });
  }, []);

  const handleSaveAll = async () => {
    await updateShopSettings({
      shopName,
      contactPerson,
      mobile: mobileNumber,
      email: storeEmail,
      address: storeAddress,
      gstNumber,
      receiptHeader,
      receiptTerms,
      autoPrint,
      whatsappReminders,
      smsAlerts: smsPaymentAlerts,
      redemptionAlerts,
      twoFactorAuth,
      passwordExpiry,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const navItems = [
    { id: "shop-info", label: "Shop Information", icon: Store },
    { id: "scheme-config", label: "Scheme Configuration", icon: Layers },
    { id: "payment-methods", label: "Payment Methods", icon: CreditCard },
    { id: "receipt-settings", label: "Receipt Settings", icon: Receipt },
    { id: "notification-settings", label: "Notification Settings", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "data-backup", label: "Data & Backup", icon: Database },
  ];

  return (
    <div className="min-h-full bg-cream-100 p-8 pb-28 space-y-6">
      
      {/* ── Page Header ─────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Manage your jewellery scheme application and operational preferences.
        </p>
      </div>

      {/* ── Main Layout: Left Navigation + Right Content ──── */}
      <div className="grid grid-cols-[260px_1fr] gap-8 items-start">
        
        {/* ── Left Sidebar Sub-Navigation ───────────────── */}
        <div className="space-y-6 sticky top-6">
          
          {/* Quick Links Menu */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-2 shadow-2xs space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left",
                    isActive
                      ? "bg-primary text-white shadow-2xs"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Pro Tip Card */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-2xs font-extrabold tracking-wider text-amber-800 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>PRO TIP</span>
            </div>
            <p className="text-2xs text-amber-900 leading-relaxed font-medium">
              Changes to bonus percentages and scheme durations will apply to new customer enrolments only.
            </p>
          </div>

        </div>

        {/* ── Right Content Panel (8 Sections) ──────────── */}
        <div className="space-y-8">
          
          {/* Section 1: Shop Information */}
          <section id="shop-info" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Store className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Shop Information</h2>
            </div>

            {/* Logo Upload Box */}
            <div className="flex items-center gap-5 p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
              <div className="w-16 h-16 rounded-xl bg-white border border-stone-200 flex flex-col items-center justify-center text-primary shadow-2xs">
                <Building2 className="w-6 h-6" />
                <span className="text-[9px] font-extrabold text-stone-700 mt-0.5">Ramyas Jeweller</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-stone-900">Ramyas Jewellers</p>
                <p className="text-2xs text-stone-400 mt-0.5">PNG, JPG or SVG format. Recommended 400x400px.</p>
                <button className="mt-2 text-2xs font-bold text-primary hover:underline flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Upload New Logo
                </button>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  SHOP LEGAL NAME
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  PRIMARY CONTACT PERSON
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  MOBILE NUMBER
                </label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  STORE EMAIL
                </label>
                <input
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                STORE ADDRESS
              </label>
              <textarea
                rows={2}
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                GST NUMBER
              </label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveAll}
                className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </section>

          {/* Section 2: Scheme Configuration */}
          <section id="scheme-config" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Scheme Configuration</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  DEFAULT SCHEME NAME
                </label>
                <select
                  value={defaultScheme}
                  onChange={(e) => setDefaultScheme(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Swarna Nidhi">Swarna Nidhi</option>
                  <option value="Diamond Monthly">Diamond Monthly</option>
                  <option value="Diwali Savings Scheme">Diwali Savings Scheme</option>
                </select>
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  MONTHLY INSTALLMENT (₹)
                </label>
                <input
                  type="text"
                  value={monthlyInstallment}
                  onChange={(e) => setMonthlyInstallment(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  TOTAL DURATION (MONTHS)
                </label>
                <select
                  value={totalDuration}
                  onChange={(e) => setTotalDuration(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="12">12</option>
                  <option value="11">11</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  SHOP BONUS (₹)
                </label>
                <input
                  type="text"
                  value={shopBonus}
                  onChange={(e) => setShopBonus(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                DURATION STANDARD
              </label>
              <input
                type="text"
                value={durationStandard}
                onChange={(e) => setDurationStandard(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </section>

          {/* Section 3: Payment Methods */}
          <section id="payment-methods" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Payment Methods</h2>
            </div>

            <div className="space-y-3">
              {/* Cash Payments */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Cash Payments</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Allow cash collection at shop counter.</p>
                </div>
                <button
                  onClick={() => setCashEnabled(!cashEnabled)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    cashEnabled ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      cashEnabled ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* GPay / PhonePe / UPI */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">GPay / PhonePe / UPI</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Enable UPI & QR code payment options.</p>
                </div>
                <button
                  onClick={() => setUpiEnabled(!upiEnabled)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    upiEnabled ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      upiEnabled ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Bank Transfer */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Bank Transfer (NEFT/RTGS)</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Allow direct bank transfer to store account.</p>
                </div>
                <button
                  onClick={() => setBankTransferEnabled(!bankTransferEnabled)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    bankTransferEnabled ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      bankTransferEnabled ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Section 4: Receipt Settings */}
          <section id="receipt-settings" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Receipt className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Receipt Settings</h2>
            </div>

            {/* Receipt Header Preview */}
            <div className="p-6 bg-stone-100/70 border border-stone-200 rounded-2xl text-center space-y-2">
              <div className="w-24 py-1.5 bg-white border border-stone-200 rounded-lg mx-auto shadow-2xs font-black text-2xs text-primary">
                Ramyas Jeweller
              </div>
              <p className="text-2xs font-semibold text-stone-400">Receipt Header Preview</p>
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                RECEIPT HEADER TEXT
              </label>
              <textarea
                rows={2}
                value={receiptHeader}
                onChange={(e) => setReceiptHeader(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                TERMS & CONDITIONS TEXT
              </label>
              <textarea
                rows={3}
                value={receiptTerms}
                onChange={(e) => setReceiptTerms(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Print Automatically */}
            <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-stone-900">Print Automatically</p>
                <p className="text-2xs text-stone-500 mt-0.5">Trigger browser print dialog after saving payment.</p>
              </div>
              <button
                onClick={() => setAutoPrint(!autoPrint)}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative p-0.5",
                  autoPrint ? "bg-primary" : "bg-stone-300"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                    autoPrint ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </section>

          {/* Section 5: Notification Settings */}
          <section id="notification-settings" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Notification Settings</h2>
            </div>

            <div className="space-y-3">
              {/* Due Date Reminders */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Due Date Reminders</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Send WhatsApp messages 3 days before due date.</p>
                </div>
                <button
                  onClick={() => setWhatsappReminders(!whatsappReminders)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    whatsappReminders ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      whatsappReminders ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Payment Recorded Alert */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Payment Recorded Alert</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Send SMS notification upon each payment recorded.</p>
                </div>
                <button
                  onClick={() => setSmsPaymentAlerts(!smsPaymentAlerts)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    smsPaymentAlerts ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      smsPaymentAlerts ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Redemption Eligibility Alert */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Redemption Eligibility Alert</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Notify customer when scheme matures & ready for claim.</p>
                </div>
                <button
                  onClick={() => setRedemptionAlerts(!redemptionAlerts)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    redemptionAlerts ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      redemptionAlerts ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Section 6: Security */}
          <section id="security" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Security</h2>
            </div>

            <div className="space-y-4">
              {/* Change Password Box */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Admin Account Password</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Update master admin password.</p>
                </div>
                <button className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold rounded-xl transition-colors shadow-2xs">
                  Change Password
                </button>
              </div>

              {/* 2FA Switch */}
              <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/80 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-stone-900">Two-Factor Authentication (2FA)</p>
                  <p className="text-2xs text-stone-500 mt-0.5">Require SMS OTP code for admin login.</p>
                </div>
                <button
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative p-0.5",
                    twoFactorAuth ? "bg-primary" : "bg-stone-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      twoFactorAuth ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Password Expiry Dropdown */}
              <div>
                <label className="block text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  PASSWORD EXPIRY
                </label>
                <select
                  value={passwordExpiry}
                  onChange={(e) => setPasswordExpiry(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="90 Days">90 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="Never">Never</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 7: Data & Backup */}
          <section id="data-backup" className="bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <Database className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-stone-900">Data & Backup</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center justify-center p-5 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-stone-100 transition-colors text-stone-800 font-bold text-xs gap-2 shadow-2xs">
                <Download className="w-5 h-5 text-primary" />
                <span>Download Backup</span>
              </button>
              <button className="flex flex-col items-center justify-center p-5 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-stone-100 transition-colors text-stone-800 font-bold text-xs gap-2 shadow-2xs">
                <FileSpreadsheet className="w-5 h-5 text-amber-700" />
                <span>Export All Data</span>
              </button>
              <button className="flex flex-col items-center justify-center p-5 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-stone-100 transition-colors text-stone-800 font-bold text-xs gap-2 shadow-2xs">
                <History className="w-5 h-5 text-stone-700" />
                <span>Audit Logs</span>
              </button>
            </div>
          </section>

          {/* Section 8: Ramyas Jeweller ERP Footer Card */}
          <div className="bg-cream-50 border border-cream-200/80 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm shadow-sm">
                RJ
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Ramyas Jeweller ERP
                </h3>
                <p className="text-xs text-stone-500">
                  Enterprise Jewellery Scheme Management
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-4 text-xs pt-1">
              <div>
                <p className="text-2xs text-stone-400 font-extrabold uppercase">SYSTEM STATUS</p>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  All Operational
                </div>
              </div>
              <div>
                <p className="text-2xs text-stone-400 font-extrabold uppercase">LAST BACKUP</p>
                <p className="font-bold text-stone-800 mt-1">10 mins ago</p>
              </div>
              <div>
                <p className="text-2xs text-stone-400 font-extrabold uppercase">LICENSE</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 text-2xs font-extrabold rounded-md">
                  Enterprise Plan
                </span>
              </div>
              <div>
                <p className="text-2xs text-stone-400 font-extrabold uppercase">VERSION</p>
                <p className="font-mono font-bold text-stone-800 mt-1">v2.4.0</p>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 pt-3 border-t border-cream-200 text-2xs font-bold text-stone-600">
              <a href="#" className="hover:underline">CONTACT SUPPORT</a>
              <a href="#" className="hover:underline">PRIVACY POLICY</a>
              <a href="#" className="hover:underline">TERMS OF SERVICE</a>
            </div>
          </div>

        </div>

      </div>

      {/* ── Fixed Bottom Sticky Action Bar ──────────────── */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-8 py-3.5 flex items-center justify-between z-30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Info className="w-4 h-4 text-stone-400" />
          <span>Unsaved changes: None detected</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-stone-300 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs transition-colors"
          >
            Reset Settings
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            {savedNotice ? (
              <>
                <Check className="w-4 h-4" /> Saved!
              </>
            ) : (
              "Save All Changes"
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
