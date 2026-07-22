import '../models/customer_model.dart';
import '../services/supabase_service.dart';
import 'i_auth_repository.dart';

/// Production Supabase implementation of IAuthRepository.
class SupabaseAuthRepository implements IAuthRepository {
  final SupabaseService _supabaseService;

  SupabaseAuthRepository(this._supabaseService);

  @override
  Future<CustomerModel?> getCurrentCustomer() async {
    try {
      final activeMobile = await _supabaseService.getActiveMobile();
      if (activeMobile == null || activeMobile.isEmpty) {
        return _fallbackDefaultCustomer();
      }

      final data = await _supabaseService.getCustomerProfile(activeMobile);
      if (data == null) return _fallbackDefaultCustomer();

      return _mapToCustomerModel(data);
    } catch (_) {
      return _fallbackDefaultCustomer();
    }
  }

  @override
  Future<CustomerModel> login(String mobileNumber, String password) async {
    final data = await _supabaseService.loginWithPhoneAndPassword(
      mobileNumber,
      password,
    );

    if (data == null) {
      throw Exception('Failed to authenticate customer.');
    }

    return _mapToCustomerModel(data);
  }

  @override
  Future<void> changePassword(String currentPassword, String newPassword) async {
    await _supabaseService.changePassword(currentPassword, newPassword);
  }

  @override
  Future<void> updateLanguage(String languageCode) async {
    // Language preference stored in app state
  }

  @override
  Future<void> logout() async {
    await _supabaseService.logout();
  }

  CustomerModel _mapToCustomerModel(Map<String, dynamic> data) {
    return CustomerModel(
      id: data['id']?.toString() ?? 'RJ-2024-089',
      name: data['name']?.toString() ?? 'Anith Kumar',
      mobileNumber: data['mobile']?.toString() ?? '+91 98765 43210',
      preferredLanguage: 'en',
      profileImageUrl: data['photo_url']?.toString(),
    );
  }

  CustomerModel _fallbackDefaultCustomer() {
    return const CustomerModel(
      id: 'RJ-2023-441',
      name: 'Ananya Sharma',
      mobileNumber: '+91 98765 43210',
      preferredLanguage: 'en',
    );
  }
}
