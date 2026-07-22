// ============================================================
// TypeScript Database Schema Types for V1 Supabase Tables
// ============================================================

export type CustomerStatus =
  | "active"
  | "completed"
  | "pending_installment"
  | "ready_for_redemption"
  | "inactive";

export interface CustomerRow {
  id: string;
  name: string;
  initials?: string;
  avatar_color?: string;
  avatar_text_color?: string;
  photo_url?: string;
  mobile: string;
  alt_mobile?: string;
  gender?: string;
  dob?: string;
  address?: string;
  village?: string;
  pincode?: string;
  aadhaar?: string;
  scheme_name: string;
  status: CustomerStatus;
  installments_paid: number;
  total_installments: number;
  percentage: number;
  paid_amount: number;
  remaining_credit: number;
  bonus_credit: number;
  total_eligible_value: number;
  join_date: string;
  start_date?: string;
  mature_date?: string;
  next_payment?: string;
  nominee_name?: string;
  nominee_relationship?: string;
  nominee_mobile?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export type InstallmentMethod = "GPay" | "Cash" | "PhonePe" | "Bank Transfer" | "UPI";
export type InstallmentStatus = "RECORDED" | "CANCELLED" | "PENDING";

export interface InstallmentRow {
  id: string;
  customer_id: string;
  customer_name: string;
  mobile?: string;
  scheme: string;
  amount: number;
  original_amount?: number;
  method: InstallmentMethod;
  reference_no?: string;
  date: string;
  time?: string;
  installment_number: number;
  total_installments: number;
  recorded_by?: string;
  status: InstallmentStatus;
  created_at?: string;
}

export type RedemptionStatus = "Ready" | "Redeemed" | "Pending Verification";

export interface RedemptionRow {
  id: string;
  customer_id: string;
  customer_name: string;
  scheme: string;
  total_paid_amount: number;
  shop_bonus: number;
  net_eligible_value: number;
  bill_number?: string;
  bill_amount?: number;
  jewellery_category?: string;
  balance_paid?: number;
  sweet_box_given: boolean;
  festival_gift_given: boolean;
  remarks?: string;
  completed_date?: string;
  status: RedemptionStatus;
  processed_by?: string;
  created_at?: string;
}

export interface ShopSettingsRow {
  id: string;
  shop_name: string;
  contact_person?: string;
  mobile?: string;
  email?: string;
  address?: string;
  gst_number?: string;
  receipt_header?: string;
  receipt_terms?: string;
  auto_print?: boolean;
  default_scheme_name?: string;
  default_monthly_amount?: number;
  default_duration_months?: number;
  default_shop_bonus?: number;
  whatsapp_reminders?: boolean;
  sms_alerts?: boolean;
  redemption_alerts?: boolean;
  two_factor_auth?: boolean;
  password_expiry?: string;
  updated_at?: string;
}

export interface ActivityLogRow {
  id: string;
  timestamp: string;
  performed_by: string;
  entity: "Customer" | "Installment" | "Redemption" | "Settings" | "Auth";
  action: string;
  description?: string;
  customer_id?: string;
}
