import '../models/installment_model.dart';
import '../models/receipt_model.dart';
import '../models/scheme_model.dart';

abstract class ISavingsRepository {
  Future<SchemeModel> getSchemeSummary();
  Future<List<InstallmentModel>> getPassbookLedger();
  Future<List<InstallmentModel>> getRecentPayments();
  Future<ReceiptModel> getLatestReceipt();
}
