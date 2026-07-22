"use client";

import { useState } from "react";
import { X, User, Phone, MapPin, FileText, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { type Customer } from "@/lib/mock-data/customers";
import { updateCustomer } from "@/services/customer-service";

interface EditCustomerDialogProps {
  open: boolean;
  customer: Customer;
  onClose: () => void;
  onUpdated: (updatedCustomer: Customer) => void;
}

export default function EditCustomerDialog({
  open,
  customer,
  onClose,
  onUpdated,
}: EditCustomerDialogProps) {
  const [name, setName] = useState(customer.name);
  const [mobile, setMobile] = useState(customer.mobile);
  const [scheme, setScheme] = useState(customer.scheme);
  const [status, setStatus] = useState(customer.status);
  const [address, setAddress] = useState(customer.address);
  const [notes, setNotes] = useState(customer.notes || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await updateCustomer(customer.id, {
      name,
      mobile,
      scheme,
      status,
      address,
      notes,
    });

    setSaving(false);

    if (res.error) {
      setError(res.error);
    } else if (res.data) {
      onUpdated(res.data);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-cream-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Edit Customer Profile</h3>
              <p className="text-xs text-stone-500">ID: {customer.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 font-medium">
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Scheme Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending_installment">Pending Installment</option>
                <option value="ready_for_redemption">Ready for Redemption</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Scheme Name
            </label>
            <input
              type="text"
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Notes & Remarks
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl shadow-xs transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
