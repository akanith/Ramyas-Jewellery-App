import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../config/app_config.dart';

/// Centralized service handling Supabase Auth & Database queries.
class SupabaseService {
  final SupabaseClient _client = Supabase.instance.client;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const String _sessionMobileKey = 'user_mobile';
  static const String _sessionPasswordKey = 'user_password';

  SupabaseClient get client => _client;

  /// Authenticate customer by Mobile Number & Password.
  /// First-time customers use default password '12345'.
  Future<Map<String, dynamic>?> loginWithPhoneAndPassword(
      String mobile, String password) async {
    final cleanMobile = mobile.trim();
    final cleanPassword = password.trim();

    // Query customer by mobile number from Supabase
    final response = await _client
        .from('customers')
        .select()
        .or('mobile.eq.$cleanMobile,mobile.eq.+91 $cleanMobile,mobile.eq.${cleanMobile.replaceAll("+91 ", "")}')
        .maybeSingle();

    if (response == null) {
      throw Exception('Customer account not found for mobile number $cleanMobile.');
    }

    // Verify Password (Stored password or default password '12345')
    final storedPassword = await _storage.read(key: '${_sessionPasswordKey}_$cleanMobile') ?? AppConfig.defaultPassword;

    if (cleanPassword != storedPassword && cleanPassword != AppConfig.defaultPassword) {
      throw Exception('Incorrect password. Please try again or use default password 12345.');
    }

    // Save session locally
    await _storage.write(key: _sessionMobileKey, value: cleanMobile);

    return response;
  }

  /// Change Customer Password
  Future<void> changePassword(String currentPassword, String newPassword) async {
    final activeMobile = await _storage.read(key: _sessionMobileKey);
    if (activeMobile == null) {
      throw Exception('No active session found.');
    }

    final storedPassword = await _storage.read(key: '${_sessionPasswordKey}_$activeMobile') ?? AppConfig.defaultPassword;

    if (currentPassword != storedPassword && currentPassword != AppConfig.defaultPassword) {
      throw Exception('Current password does not match.');
    }

    await _storage.write(key: '${_sessionPasswordKey}_$activeMobile', value: newPassword.trim());
  }

  /// Logout active customer
  Future<void> logout() async {
    await _storage.delete(key: _sessionMobileKey);
  }

  /// Get Current Logged-In Mobile
  Future<String?> getActiveMobile() async {
    return await _storage.read(key: _sessionMobileKey);
  }

  /// Fetch Customer Profile from Supabase
  Future<Map<String, dynamic>?> getCustomerProfile(String mobile) async {
    final cleanMobile = mobile.trim();
    return await _client
        .from('customers')
        .select()
        .or('mobile.eq.$cleanMobile,mobile.eq.+91 $cleanMobile,mobile.eq.${cleanMobile.replaceAll("+91 ", "")}')
        .maybeSingle();
  }

  /// Fetch Installments Ledger for Customer
  Future<List<Map<String, dynamic>>> getInstallments(String customerId) async {
    final response = await _client
        .from('installments')
        .select()
        .eq('customer_id', customerId)
        .order('date', ascending: false);

    return List<Map<String, dynamic>>.from(response);
  }

  /// Fetch Shop Settings from Supabase
  Future<Map<String, dynamic>?> getShopSettings() async {
    return await _client
        .from('shop_settings')
        .select()
        .eq('id', 'default')
        .maybeSingle();
  }
}
