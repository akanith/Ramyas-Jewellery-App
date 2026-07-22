import { getSupabaseClient } from "@/lib/supabase/client";
import { type ShopSettingsRow } from "@/types/database";
import { logActivity } from "./activity-service";

export interface ShopSettings {
  shopName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  address: string;
  gstNumber: string;
  receiptHeader: string;
  receiptTerms: string;
  autoPrint: boolean;
  whatsappReminders: boolean;
  smsAlerts: boolean;
  redemptionAlerts: boolean;
  twoFactorAuth: boolean;
  passwordExpiry: string;
}

export const defaultSettings: ShopSettings = {
  shopName: "Ramyas Jewellers",
  contactPerson: "Ramyas Admin",
  mobile: "+91 98765 43210",
  email: "contact@ramyasjewellers.com",
  address: "123, Gold Souk Road, T. Nagar, Chennai - 600017",
  gstNumber: "33AAAAA0000A1Z5",
  receiptHeader: "Thank you for investing with Ramyas Jewellers — your trusted jewellery partner.",
  receiptTerms: "1. Bonus applicable on timely payment. 2. Redemption strictly after 12 months. 3. GST & making charges as applicable.",
  autoPrint: true,
  whatsappReminders: true,
  smsAlerts: false,
  redemptionAlerts: true,
  twoFactorAuth: true,
  passwordExpiry: "90 Days",
};

export async function fetchShopSettings(): Promise<{ data: ShopSettings; error: string | null }> {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: defaultSettings, error: "Supabase client is not initialized or credentials missing." };
  }

  const { data, error } = await supabase
    .from("shop_settings")
    .select("*")
    .eq("id", "default")
    .single();

  if (error || !data) {
    console.error("Supabase fetchShopSettings error:", error);
    return { data: defaultSettings, error: error?.message || null };
  }

  return { data: mapRowToSettings(data), error: null };
}

export async function updateShopSettings(settings: Partial<ShopSettings>): Promise<{ success: boolean; error: string | null }> {
  const supabase = await getSupabaseClient();
  
  Object.assign(defaultSettings, settings);

  if (supabase) {
    const { error } = await supabase
      .from("shop_settings")
      .upsert({
        id: "default",
        shop_name: settings.shopName,
        contact_person: settings.contactPerson,
        mobile: settings.mobile,
        email: settings.email,
        address: settings.address,
        gst_number: settings.gstNumber,
        receipt_header: settings.receiptHeader,
        receipt_terms: settings.receiptTerms,
        auto_print: settings.autoPrint,
        whatsapp_reminders: settings.whatsappReminders,
        sms_alerts: settings.smsAlerts,
        redemption_alerts: settings.redemptionAlerts,
        two_factor_auth: settings.twoFactorAuth,
        password_expiry: settings.passwordExpiry,
      });

    if (error) {
      console.error("Supabase updateShopSettings error:", error);
      return { success: false, error: error.message };
    }

    // Automatically log settings update in activity_logs
    await logActivity({
      performedBy: "Owner",
      entity: "Settings",
      action: "Settings Updated",
      description: "Updated shop information, receipt headers, and system preferences",
    });
  }

  return { success: true, error: null };
}

function mapRowToSettings(row: ShopSettingsRow): ShopSettings {
  return {
    shopName: row.shop_name,
    contactPerson: row.contact_person || defaultSettings.contactPerson,
    mobile: row.mobile || defaultSettings.mobile,
    email: row.email || defaultSettings.email,
    address: row.address || defaultSettings.address,
    gstNumber: row.gst_number || defaultSettings.gstNumber,
    receiptHeader: row.receipt_header || defaultSettings.receiptHeader,
    receiptTerms: row.receipt_terms || defaultSettings.receiptTerms,
    autoPrint: row.auto_print ?? true,
    whatsappReminders: row.whatsapp_reminders ?? true,
    smsAlerts: row.sms_alerts ?? false,
    redemptionAlerts: row.redemption_alerts ?? true,
    twoFactorAuth: row.two_factor_auth ?? true,
    passwordExpiry: row.password_expiry || "90 Days",
  };
}
