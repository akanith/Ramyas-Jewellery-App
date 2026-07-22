import '../models/customer_model.dart';

abstract class IAuthRepository {
  Future<CustomerModel?> getCurrentCustomer();
  Future<CustomerModel> login(String mobileNumber, String password);
  Future<void> changePassword(String currentPassword, String newPassword);
  Future<void> updateLanguage(String languageCode);
  Future<void> logout();
}
