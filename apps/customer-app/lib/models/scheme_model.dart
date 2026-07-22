import 'package:equatable/equatable.dart';

/// Gold Savings Scheme data model.
class SchemeModel extends Equatable {
  final String schemeId;
  final String schemeName;
  final double monthlyDeposit;
  final int totalInstallments;
  final int completedInstallments;
  final double totalPaidAmount;
  final double remainingAmount;
  final String nextDueDate;
  final String maturityDate;
  final double maturityTotalValue;
  final double shopBonus;
  final String status;

  const SchemeModel({
    required this.schemeId,
    required this.schemeName,
    required this.monthlyDeposit,
    required this.totalInstallments,
    required this.completedInstallments,
    required this.totalPaidAmount,
    required this.remainingAmount,
    required this.nextDueDate,
    required this.maturityDate,
    required this.maturityTotalValue,
    required this.shopBonus,
    this.status = 'Active',
  });

  double get completionPercentage =>
      totalInstallments > 0 ? (completedInstallments / totalInstallments) * 100 : 0;

  @override
  List<Object?> get props => [
        schemeId,
        schemeName,
        monthlyDeposit,
        totalInstallments,
        completedInstallments,
        totalPaidAmount,
        remainingAmount,
        nextDueDate,
        maturityDate,
        maturityTotalValue,
        shopBonus,
        status,
      ];
}
