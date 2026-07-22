// ============================================================
// Customer App — Environment Configuration Template
// Copy this file to lib/config/env.dart and fill in values.
// NEVER commit env.dart to version control.
// ============================================================

class AppEnv {
  // Supabase
  static const String supabaseUrl = 'https://your-project-ref.supabase.co';
  static const String supabaseAnonKey = 'your-anon-key-here';

  // Firebase
  static const String firebaseProjectId = 'your-firebase-project-id';

  // App
  static const String appName = 'Ramyas';
  static const String appVersion = '1.0.0';
  static const bool enableDebugBanner = true;
}
