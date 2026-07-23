import 'package:equatable/equatable.dart';

/// Digital Installment Receipt data model.
class ReceiptModel extends Equatable {
  final String receiptNumber;
  final String customerName;
  final String customerId;
  final String schemeName;
  final int installmentIndex;
  final int totalInstallments;
  final String paymentDate;
  final String collectedBy;
  final double amount;
  final String paymentMethod;
  final String collectedAt;
  final double paidSoFar;
  final double remainingAmount;
  final double bonusAmount;
  final String nextDueDate;
  final double nextDueAmount;
  final String shopName;
  final String shopAddress;
  final String mobileNumber;
  final String installmentMonth;

  const ReceiptModel({
    String? receiptNumber,
    String? customerName,
    String? customerId,
    String? schemeName,
    int? installmentIndex,
    int? installmentNumber,
    int? totalInstallments,
    String? paymentDate,
    String? transactionDate,
    String? collectedBy,
    double? amount,
    double? amountPaid,
    String? paymentMethod,
    String? collectedAt,
    double? paidSoFar,
    double? accumulatedBalance,
    double? remainingAmount,
    double? bonusAmount,
    double? shopBonusAccumulated,
    String? nextDueDate,
    double? nextDueAmount,
    String? shopName,
    String? shopAddress,
    String? mobileNumber,
    String? installmentMonth,
  })  : receiptNumber = receiptNumber ?? '#RJ-8821',
        customerName = customerName ?? 'Customer',
        customerId = customerId ?? 'RJ-0000',
        schemeName = schemeName ?? 'Gold Savings Scheme',
        installmentIndex = installmentIndex ?? installmentNumber ?? 1,
        totalInstallments = totalInstallments ?? 12,
        paymentDate = paymentDate ?? transactionDate ?? 'Today',
        collectedBy = collectedBy ?? 'Admin',
        amount = amount ?? amountPaid ?? 1000.0,
        paymentMethod = paymentMethod ?? 'Online',
        collectedAt = collectedAt ?? 'Store',
        paidSoFar = paidSoFar ?? accumulatedBalance ?? 1000.0,
        remainingAmount = remainingAmount ?? 11000.0,
        bonusAmount = bonusAmount ?? shopBonusAccumulated ?? 1000.0,
        nextDueDate = nextDueDate ?? 'Next Month',
        nextDueAmount = nextDueAmount ?? 1000.0,
        shopName = shopName ?? 'Ramyas Jeweller',
        shopAddress = shopAddress ?? 'Coimbatore',
        mobileNumber = mobileNumber ?? '+91 98765 43210',
        installmentMonth = installmentMonth ?? 'Current Month';

  int get installmentNumber => installmentIndex;
  double get amountPaid => amount;
  double get accumulatedBalance => paidSoFar;
  double get shopBonusAccumulated => bonusAmount;
  String get transactionDate => paymentDate;

  @override
  List<Object?> get props => [
        receiptNumber,
        customerName,
        customerId,
        schemeName,
        installmentIndex,
        totalInstallments,
        paymentDate,
        collectedBy,
        amount,
        paymentMethod,
        collectedAt,
        paidSoFar,
        remainingAmount,
        bonusAmount,
        nextDueDate,
        nextDueAmount,
        shopName,
        shopAddress,
        mobileNumber,
        installmentMonth,
      ];
}

