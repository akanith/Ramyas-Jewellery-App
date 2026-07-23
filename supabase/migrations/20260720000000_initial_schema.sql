-- ============================================================
-- Supabase Migration: Initial Schema for Ramyas Jeweller App
-- Description: Core tables, indexes, and RLS policies
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. CUSTOMERS TABLE ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    initials VARCHAR(10),
    avatar_color VARCHAR(20) DEFAULT '#7B1C1C',
    avatar_text_color VARCHAR(20) DEFAULT '#FFFFFF',
    photo_url TEXT,
    mobile VARCHAR(20) NOT NULL UNIQUE,
    alt_mobile VARCHAR(20),
    gender VARCHAR(10) DEFAULT 'Female',
    dob DATE,
    address TEXT,
    village VARCHAR(100),
    pincode VARCHAR(10),
    aadhaar VARCHAR(20),
    scheme_name VARCHAR(100) NOT NULL DEFAULT 'Diwali Savings Scheme',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    installments_paid INT NOT NULL DEFAULT 0,
    total_installments INT NOT NULL DEFAULT 12,
    percentage INT NOT NULL DEFAULT 0,
    paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    remaining_credit NUMERIC(12,2) NOT NULL DEFAULT 12000.00,
    bonus_credit NUMERIC(12,2) NOT NULL DEFAULT 1000.00,
    total_eligible_value NUMERIC(12,2) NOT NULL DEFAULT 13000.00,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    mature_date DATE,
    next_payment VARCHAR(20),
    nominee_name VARCHAR(255),
    nominee_relationship VARCHAR(50),
    nominee_mobile VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for searching customers
CREATE INDEX IF NOT EXISTS idx_customers_search ON public.customers (name, mobile, id);
CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers (status);

-- ── 2. SCHEME PLANS TABLE ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.scheme_plans (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    monthly_amount NUMERIC(10,2) NOT NULL,
    duration_months INT NOT NULL DEFAULT 12,
    bonus_amount NUMERIC(10,2) NOT NULL DEFAULT 1000.00,
    description TEXT,
    active_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ── 3. PAYMENTS TABLE ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payments (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    scheme VARCHAR(100) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    original_amount NUMERIC(10,2),
    method VARCHAR(50) NOT NULL, -- 'Cash', 'GPay', 'PhonePe', 'Bank Transfer', 'UPI'
    reference_no VARCHAR(100),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time VARCHAR(20),
    installment_number INT NOT NULL,
    total_installments INT NOT NULL DEFAULT 12,
    recorded_by VARCHAR(100) DEFAULT 'Owner',
    status VARCHAR(30) NOT NULL DEFAULT 'RECORDED', -- 'RECORDED', 'CANCELLED', 'PENDING'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for payment queries
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON public.payments (customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON public.payments (date);
CREATE INDEX IF NOT EXISTS idx_payments_method ON public.payments (method);

-- ── 4. REDEMPTIONS TABLE ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.redemptions (
    id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    scheme VARCHAR(100) NOT NULL,
    total_paid_amount NUMERIC(12,2) NOT NULL,
    shop_bonus NUMERIC(12,2) NOT NULL,
    net_eligible_value NUMERIC(12,2) NOT NULL,
    bill_number VARCHAR(100),
    bill_amount NUMERIC(12,2),
    jewellery_category VARCHAR(100),
    balance_paid NUMERIC(12,2) DEFAULT 0.00,
    sweet_box_given BOOLEAN DEFAULT FALSE,
    festival_gift_given BOOLEAN DEFAULT FALSE,
    remarks TEXT,
    completed_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'Ready', -- 'Ready', 'Redeemed', 'Pending Verification'
    processed_by VARCHAR(100) DEFAULT 'Owner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for redemptions
CREATE INDEX IF NOT EXISTS idx_redemptions_customer_id ON public.redemptions (customer_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_status ON public.redemptions (status);

-- ── 5. SHOP SETTINGS TABLE ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.shop_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    shop_name VARCHAR(255) NOT NULL DEFAULT 'Ramyas Jewellers',
    contact_person VARCHAR(255) DEFAULT 'Ramyas Admin',
    mobile VARCHAR(20) DEFAULT '+91 98765 43210',
    email VARCHAR(255) DEFAULT 'contact@ramyasjewellers.com',
    address TEXT DEFAULT '123, Gold Souk Road, T. Nagar, Chennai - 600017',
    gst_number VARCHAR(50) DEFAULT '33AAAAA0000A1Z5',
    receipt_header TEXT DEFAULT 'Thank you for investing with Ramyas Jewellers — your trusted jewellery partner.',
    receipt_terms TEXT DEFAULT '1. Bonus applicable on timely payment. 2. Redemption strictly after 12 months. 3. GST & making charges as applicable.',
    auto_print BOOLEAN DEFAULT TRUE,
    whatsapp_reminders BOOLEAN DEFAULT TRUE,
    sms_alerts BOOLEAN DEFAULT FALSE,
    redemption_alerts BOOLEAN DEFAULT TRUE,
    two_factor_auth BOOLEAN DEFAULT TRUE,
    password_expiry VARCHAR(20) DEFAULT '90 Days',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ── ROW LEVEL SECURITY (RLS) POLICIES ────────────────────────
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read/write for local development & owner dashboard
CREATE POLICY "Allow authenticated read/write customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write scheme_plans" ON public.scheme_plans FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write payments" ON public.payments FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write redemptions" ON public.redemptions FOR ALL USING (true);
CREATE POLICY "Allow authenticated read/write shop_settings" ON public.shop_settings FOR ALL USING (true);
