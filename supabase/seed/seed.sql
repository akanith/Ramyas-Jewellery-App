-- ============================================================
-- Supabase Seed Data — V1 Development & Testing
-- ============================================================

-- ── 1. SHOP SETTINGS ─────────────────────────────────────────
INSERT INTO public.shop_settings (id, shop_name, contact_person, mobile, email, address, gst_number)
VALUES ('default', 'Ramyas Jewellers', 'Ramyas Admin', '+91 98765 43210', 'contact@ramyasjewellers.com', '123, Gold Souk Road, T. Nagar, Chennai - 600017', '33AAAAA0000A1Z5')
ON CONFLICT (id) DO NOTHING;

-- ── 2. CUSTOMERS ─────────────────────────────────────────────
INSERT INTO public.customers (id, name, initials, avatar_color, mobile, scheme_name, status, installments_paid, total_installments, percentage, paid_amount, remaining_credit, bonus_credit, total_eligible_value, join_date, address, notes)
VALUES
  ('RJ-2023-441', 'Ananya Sharma', 'AS', '#7B1C1C', '+91 98765 43210', 'Swarna Nidhi', 'active', 8, 12, 66, 8000.00, 4000.00, 1000.00, 13000.00, '2023-01-05', '123, Luxury Lane, Bangalore', 'Customer requested reminder via WhatsApp 2 days before the due date.'),
  ('RJ-2023-512', 'Rajesh Kumar', 'RK', '#C9A84C', '+91 99001 22334', 'Diamond Monthly', 'completed', 12, 12, 100, 12000.00, 0.00, 1000.00, 13000.00, '2023-02-10', '45, MG Road, Mysore', 'Prefers gold coins. Completed scheme on time.'),
  ('RJ-2023-102', 'Vikram Patil', 'VP', '#1C4E3D', '+91 91234 56789', 'Swarna Nidhi', 'active', 3, 12, 25, 3000.00, 9000.00, 1000.00, 13000.00, '2023-05-20', '78, Shivaji Nagar, Pune', 'New customer. First-time scheme member.'),
  ('RJ-2023-009', 'Meera Lakshmi', 'ML', '#6B7280', '+91 97765 11223', 'Gold Savings', 'ready_for_redemption', 12, 12, 100, 12000.00, 0.00, 1000.00, 13000.00, '2022-09-01', '12, Anna Nagar, Chennai', 'Ready to redeem. Appointment scheduled.'),
  ('RJ-2023-178', 'Priya Menon', 'PM', '#4C1D95', '+91 93456 78901', 'Swarna Nidhi', 'pending_installment', 5, 12, 42, 5000.00, 7000.00, 1000.00, 13000.00, '2023-03-15', '56, Koramangala, Bangalore', 'Payment overdue for August. Follow up required.'),
  ('RJ-2023-602', 'Priya Mehta', 'PM', '#9333EA', '+91 98111 22334', 'Swarna Nidhi', 'ready_for_redemption', 12, 12, 100, 60000.00, 0.00, 5000.00, 65000.00, '2022-10-12', '89, Park Street, Kolkata', 'Completed high-value 12-month scheme.')
ON CONFLICT (id) DO NOTHING;

-- ── 3. INSTALLMENTS ──────────────────────────────────────────
INSERT INTO public.installments (id, customer_id, customer_name, mobile, scheme, amount, method, date, installment_number, total_installments, recorded_by, status)
VALUES
  ('#RJ-8821', 'RJ-2023-441', 'Ananya Sharma', '+91 98765 43210', 'Swarna Nidhi', 1000.00, 'GPay', '2023-09-15', 8, 12, 'Owner', 'RECORDED'),
  ('#RJ-8820', 'RJ-2023-512', 'Rajesh Kumar', '+91 99001 22334', 'Diamond Monthly', 5000.00, 'Cash', '2023-09-14', 12, 12, 'Owner', 'RECORDED'),
  ('#RJ-8819', 'RJ-2023-102', 'Vikram Patil', '+91 91234 56789', 'Swarna Nidhi', 2500.00, 'Bank Transfer', '2023-09-14', 3, 12, 'Owner', 'RECORDED'),
  ('#RJ-8818', 'RJ-2023-178', 'Priya Menon', '+91 93456 78901', 'Swarna Nidhi', 1500.00, 'PhonePe', '2023-09-13', 5, 12, 'Owner', 'CANCELLED')
ON CONFLICT (id) DO NOTHING;

-- ── 4. REDEMPTIONS ───────────────────────────────────────────
INSERT INTO public.redemptions (id, customer_id, customer_name, scheme, total_paid_amount, shop_bonus, net_eligible_value, jewellery_category, sweet_box_given, festival_gift_given, status, processed_by)
VALUES
  ('RDM-2023-441', 'RJ-2023-441', 'Ananya Sharma', 'Swarna Nidhi', 12000.00, 1000.00, 13000.00, 'Gold Coins', false, false, 'Ready', 'Owner'),
  ('RDM-2023-512', 'RJ-2023-512', 'Rajesh Kumar', 'Diamond Monthly', 24000.00, 2000.00, 26000.00, 'Wedding Set', true, true, 'Redeemed', 'Owner'),
  ('RDM-2023-602', 'RJ-2023-602', 'Priya Mehta', 'Swarna Nidhi', 60000.00, 5000.00, 65000.00, 'Necklace Set', true, false, 'Pending Verification', 'Owner')
ON CONFLICT (id) DO NOTHING;

-- ── 5. ACTIVITY LOGS ─────────────────────────────────────────
INSERT INTO public.activity_logs (performed_by, entity, action, description, customer_id)
VALUES
  ('Owner', 'Customer', 'Customer Created', 'Ananya Sharma enrolled in Swarna Nidhi scheme', 'RJ-2023-441'),
  ('Owner', 'Installment', 'Installment Recorded', 'Recorded ₹1,000 via GPay for Ananya Sharma', 'RJ-2023-441'),
  ('Owner', 'Redemption', 'Redemption Completed', 'Completed scheme redemption for Rajesh Kumar', 'RJ-2023-512'),
  ('Owner', 'Settings', 'Settings Updated', 'Updated shop address and contact number', NULL)
ON CONFLICT DO NOTHING;
