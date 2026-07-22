// ============================================================
// Shared Constants — Business Rules & Configuration
// ============================================================
// These constants are documented here for reference.
// Implement platform-specific versions in each app.
// ============================================================

/**
 * SCHEME RULES
 * 
 * Standard 11-month scheme:
 *   - Customer pays for 11 months
 *   - 12th month is free (bonus)
 *   - Total value = 12 × monthly_amount
 *   - Customer redeems for jewellery purchase
 *
 * PAYMENT_GRACE_PERIOD_DAYS: 5
 *   - Days after due date before payment is marked overdue
 *
 * REMINDER_DAYS_BEFORE_DUE: [3, 1]
 *   - Send reminders 3 days and 1 day before due date
 *
 * MAX_ACTIVE_SCHEMES_PER_CUSTOMER: 5
 *   - Maximum schemes a single customer can be enrolled in
 */

/**
 * API KEYS & IDENTIFIERS (document only — store in env)
 * 
 * SUPABASE_PROJECT_REF: <from .env>
 * FIREBASE_PROJECT_ID: <from .env>
 */
