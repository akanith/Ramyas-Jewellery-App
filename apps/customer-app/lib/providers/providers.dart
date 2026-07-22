import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/customer_model.dart';
import '../models/installment_model.dart';
import '../models/receipt_model.dart';
import '../models/scheme_model.dart';
import '../repositories/i_auth_repository.dart';
import '../repositories/i_savings_repository.dart';
import '../repositories/supabase_auth_repository.dart';
import '../repositories/supabase_savings_repository.dart';
import '../services/supabase_service.dart';

// Services
final supabaseServiceProvider = Provider<SupabaseService>((ref) {
  return SupabaseService();
});

// Repositories
final authRepositoryProvider = Provider<IAuthRepository>((ref) {
  return SupabaseAuthRepository(ref.watch(supabaseServiceProvider));
});

final savingsRepositoryProvider = Provider<ISavingsRepository>((ref) {
  return SupabaseSavingsRepository(ref.watch(supabaseServiceProvider));
});

// Selected Language Provider ('en' or 'ta')
final selectedLanguageProvider = StateProvider<String>((ref) => 'en');

// Customer State Provider
final customerProvider = FutureProvider<CustomerModel?>((ref) async {
  final repo = ref.watch(authRepositoryProvider);
  return repo.getCurrentCustomer();
});

// Scheme Details Provider
final schemeProvider = FutureProvider<SchemeModel>((ref) async {
  final repo = ref.watch(savingsRepositoryProvider);
  return repo.getSchemeSummary();
});

// Passbook Ledger Provider
final passbookProvider = FutureProvider<List<InstallmentModel>>((ref) async {
  final repo = ref.watch(savingsRepositoryProvider);
  return repo.getPassbookLedger();
});

// Recent Payments Provider
final recentPaymentsProvider = FutureProvider<List<InstallmentModel>>((ref) async {
  final repo = ref.watch(savingsRepositoryProvider);
  return repo.getRecentPayments();
});

// Receipt Details Provider
final receiptProvider = FutureProvider<ReceiptModel>((ref) async {
  final repo = ref.watch(savingsRepositoryProvider);
  return repo.getLatestReceipt();
});
