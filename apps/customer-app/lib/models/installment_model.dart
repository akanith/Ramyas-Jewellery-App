import 'package:equatable/equatable.dart';

enum InstallmentStatus {
  paid,
  waiting,
  future,
}

/// Single installment record in the savings passbook.
class InstallmentModel extends Equatable {
  final int number;
  final double amount;
  final String dateText;
  final String monthYearLabel;
  final InstallmentStatus status;

  const InstallmentModel({
    required this.number,
    required this.amount,
    required this.dateText,
    required this.monthYearLabel,
    required this.status,
  });

  bool get isPaid => status == InstallmentStatus.paid;
  bool get isWaiting => status == InstallmentStatus.waiting;
  bool get isFuture => status == InstallmentStatus.future;

  @override
  List<Object?> get props => [number, amount, dateText, monthYearLabel, status];
}
