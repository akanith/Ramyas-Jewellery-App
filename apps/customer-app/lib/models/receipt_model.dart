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

  const ReceiptModel({
    required this.receiptNumber,
    required this.customerName,
    required this.customerId,
    required this.schemeName,
    required this.installmentIndex,
    required this.totalInstallments,
    required this.paymentDate,
    required this.collectedBy,
    required this.amount,
    required this.paymentMethod,
    required this.collectedAt,
    required this.paidSoFar,
    required this.remainingAmount,
    required this.bonusAmount,
    required this.nextDueDate,
    required this.nextDueAmount,
    required this.shopName,
    required this.shopAddress,
  });

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
      ];
}
