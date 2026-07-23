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
    String? schemeId,
    String? schemeName,
    String? id,
    String? name,
    required this.monthlyDeposit,
    int? totalInstallments,
    int? completedInstallments,
    int? totalInstallmentsCount,
    int? paidInstallmentsCount,
    double? totalPaidAmount,
    double? accumulatedTotal,
    double? remainingAmount,
    required this.nextDueDate,
    String? maturityDate,
    required this.maturityTotalValue,
    required this.shopBonus,
    this.status = 'Active',
  })  : schemeId = schemeId ?? id ?? '',
        schemeName = schemeName ?? name ?? '',
        totalInstallments = totalInstallments ?? totalInstallmentsCount ?? 12,
        completedInstallments = completedInstallments ?? paidInstallmentsCount ?? 0,
        totalPaidAmount = totalPaidAmount ?? accumulatedTotal ?? 0.0,
        remainingAmount = remainingAmount ?? (monthlyDeposit * (totalInstallments ?? totalInstallmentsCount ?? 12) - (totalPaidAmount ?? accumulatedTotal ?? 0.0)),
        maturityDate = maturityDate ?? 'N/A';

  String get id => schemeId;
  String get name => schemeName;
  int get paidInstallmentsCount => completedInstallments;
  int get totalInstallmentsCount => totalInstallments;
  double get accumulatedTotal => totalPaidAmount;

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

