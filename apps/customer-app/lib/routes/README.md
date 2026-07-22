// ============================================================
// routes/ — GoRouter route definitions
// ============================================================
//
// Planned files:
//   routes/app_router.dart       — GoRouter instance (provider)
//   routes/route_names.dart      — Route name constants
//   routes/route_paths.dart      — Route path constants
//   routes/auth_guard.dart       — Redirect logic for unauthenticated users
//
// Route hierarchy:
//   /                     → Splash / redirect
//   /login                → auth/login_screen.dart
//   /otp                  → auth/otp_screen.dart
//   /home                 → home/home_screen.dart
//   /scheme/:id           → scheme/scheme_detail_screen.dart
//   /payments             → payment_history/payment_history_screen.dart
//   /notifications        → notifications/notifications_screen.dart
//   /profile              → profile/profile_screen.dart
