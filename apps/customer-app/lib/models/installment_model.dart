import 'package:equatable/equatable.dart';

enum InstallmentStatus {
  paid,
  waiting,
  future,
}

/// Single installment record in the savings passbook.
class InstallmentModel extends Equatable {
  final String id;
  final int number;
  final double amount;
  final String dateText;
  final String monthYearLabel;
  final InstallmentStatus status;
  final String? receiptNumber;
  final String? paymentMethod;

  const InstallmentModel({
    this.id = '',
    int? number,
    int? installmentNumber,
    required this.amount,
    String? dateText,
    String? date,
    required this.monthYearLabel,
    required this.status,
    this.receiptNumber,
    this.paymentMethod,
  })  : number = number ?? installmentNumber ?? 1,
        dateText = dateText ?? date ?? '';

  int get installmentNumber => number;
  String get date => dateText;
  String get method => paymentMethod ?? 'Online';

  bool get isPaid => status == InstallmentStatus.paid;
  bool get isWaiting => status == InstallmentStatus.waiting;
  bool get isFuture => status == InstallmentStatus.future;

  @override
  List<Object?> get props => [id, number, amount, dateText, monthYearLabel, status, receiptNumber, paymentMethod];
}

