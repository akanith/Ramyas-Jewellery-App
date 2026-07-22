/// App Configuration holding environment parameters and Supabase credentials.
class AppConfig {
  AppConfig._();

  // Supabase Configuration
  // Note: Standard Supabase URL & Anon key for Ramyas Jeweller project.
  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://xyzcompany.supabase.co',
  );

  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3MjUxMjAwMCwiZXhwIjoy03ODc4NDAwMH0.dummyAnonKeyTokenPlaceholder',
  );

  // Auth Constants
  static const String defaultPassword = '12345';

  // App Metadata
  static const String appName = 'Ramyas Jeweller';
  static const String appVersion = '2.4.1';
}
