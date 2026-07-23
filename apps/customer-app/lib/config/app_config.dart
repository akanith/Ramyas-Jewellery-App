/// App Configuration holding environment parameters and Supabase credentials.
class AppConfig {
  AppConfig._();

  // Supabase Configuration
  // Note: Standard Supabase URL & Anon key for Ramyas Jeweller project.
  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://icsqnkqwvlrgtncmtmqv.supabase.co',
  );

  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'sb_publishable_6u227x1Q3s7Pbd1wsKTUEg_pMJl_CUt',
  );

  // Auth Constants
  static const String defaultPassword = '12345';

  // App Metadata
  static const String appName = 'Ramyas Jeweller';
  static const String appVersion = '2.4.1';
}
