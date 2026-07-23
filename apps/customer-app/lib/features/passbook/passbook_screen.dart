import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_bottom_nav.dart';
import '../../core/widgets/gold_card.dart';
import '../../core/widgets/primary_button.dart';
import '../../core/widgets/status_badge.dart';
import '../../models/installment_model.dart';
import '../../providers/providers.dart';

class PassbookScreen extends ConsumerWidget {
  const PassbookScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final schemeAsync = ref.watch(schemeProvider);
    final ledgerAsync = ref.watch(passbookProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: CustomAppBar(
        showBackButton: true,
        onBackPressed: () => context.go('/home'),
        title: 'Digital Passbook',
        actions: [
          IconButton(
            icon: const Icon(Icons.help_outline, color: AppColors.textSecondary),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Card: Gold Savings Scheme Card (Passbook Variant)
            schemeAsync.when(
              data: (scheme) => GoldCard(
                scheme: scheme,
                customerName: 'Anith Kumar',
                variant: GoldCardVariant.passbook,
              ),
              loading: () => const SizedBox(height: 180),
              error: (_, __) => const SizedBox(),
            ),

            const SizedBox(height: 16),

            // Completion Status Card
            schemeAsync.when(
              data: (scheme) => Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'COMPLETION STATUS',
                      style: AppTextStyles.labelSmall.copyWith(
                        color: AppColors.textMuted,
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '${scheme.completedInstallments} / ${scheme.totalInstallments} Months',
                          style: AppTextStyles.h2.copyWith(
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                            fontSize: 20,
                          ),
                        ),
                        Text(
                          '${scheme.completionPercentage.toInt()}% Paid',
                          style: AppTextStyles.titleMedium.copyWith(
                            color: AppColors.primary,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: scheme.completionPercentage / 100,
                        minHeight: 10,
                        backgroundColor: const Color(0xFFEFEFEF),
                        valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                      ),
                    ),
                  ],
                ),
              ),
              loading: () => const SizedBox(height: 80),
              error: (_, __) => const SizedBox(),
            ),

            const SizedBox(height: 20),

            // Payment Ledger Card Container
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border, width: 1),
              ),
              child: Column(
                children: [
                  // Header Bar
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'PAYMENT LEDGER',
                          style: AppTextStyles.titleMedium.copyWith(
                            color: AppColors.primary,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 0.5,
                            fontSize: 14,
                          ),
                        ),
                        Text(
                          'FY 2024-25',
                          style: AppTextStyles.labelSmall.copyWith(
                            color: AppColors.textMuted,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const Divider(height: 1, color: AppColors.border),

                  // Installments List
                  ledgerAsync.when(
                    data: (ledger) => Column(
                      children: List.generate(ledger.length, (index) {
                        final item = ledger[index];
                        final isLast = index == ledger.length - 1;

                        return _buildLedgerRow(item: item, isLast: isLast);
                      }),
                    ),
                    loading: () => const Padding(
                      padding: EdgeInsets.all(30),
                      child: CircularProgressIndicator(),
                    ),
                    error: (_, __) => const SizedBox(),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Download Passbook Button
            PrimaryButton(
              label: 'Download Passbook',
              icon: Icons.file_download_outlined,
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Passbook PDF downloaded to device storage!'),
                    backgroundColor: AppColors.success,
                  ),
                );
              },
            ),

            const SizedBox(height: 24),
          ],
        ),
      ),

      // Bottom Navigation Bar with Passbook active tab
      bottomNavigationBar: CustomBottomNav(
        currentIndex: 1,
        onTap: (index) {
          if (index == 0) context.go('/home');
          if (index == 2) context.go('/notifications');
          if (index == 3) context.go('/profile');
        },
      ),
    );
  }

  Widget _buildLedgerRow({required InstallmentModel item, required bool isLast}) {
    final isWaiting = item.status == InstallmentStatus.waiting;
    final isPaid = item.status == InstallmentStatus.paid;

    return Container(
      decoration: BoxDecoration(
        color: isWaiting ? AppColors.goldLight : Colors.transparent,
        border: isLast
            ? null
            : const Border(
                bottom: BorderSide(
                  color: AppColors.border,
                  width: 1,
                ),
              ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      child: Row(
        children: [
          // Circle Number Badge
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: isPaid
                  ? AppColors.primarySoft
                  : (isWaiting ? AppColors.goldYellow : Colors.transparent),
              shape: BoxShape.circle,
              border: isPaid || isWaiting
                  ? null
                  : Border.all(
                      color: AppColors.textMuted.withValues(alpha: 0.4),
                      width: 1.5,
                    ),
            ),
            alignment: Alignment.center,
            child: Text(
              '${item.number}',
              style: AppTextStyles.titleMedium.copyWith(
                color: isPaid
                    ? AppColors.primary
                    : (isWaiting ? AppColors.textPrimary : AppColors.textMuted),
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: 14),

          // Title & Date Subtitle
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Installment ${item.number}',
                  style: AppTextStyles.titleMedium.copyWith(
                    fontWeight: FontWeight.w700,
                    color: item.isFuture ? AppColors.textMuted : AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  item.dateText,
                  style: AppTextStyles.bodySmall.copyWith(
                    color: AppColors.textMuted,
                  ),
                ),
              ],
            ),
          ),

          // Right Status Pill Badge
          if (isPaid)
            const StatusBadge(type: StatusBadgeType.paid)
          else if (isWaiting)
            const StatusBadge(type: StatusBadgeType.waiting)
          else
            const StatusBadge(type: StatusBadgeType.future),
        ],
      ),
    );
  }
}
