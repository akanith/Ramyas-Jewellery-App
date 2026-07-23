import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/custom_bottom_nav.dart';
import '../../core/widgets/gold_card.dart';
import '../../core/widgets/primary_button.dart';
import '../../core/widgets/status_badge.dart';
import '../../providers/providers.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final customerAsync = ref.watch(customerProvider);
    final schemeAsync = ref.watch(schemeProvider);
    final recentPaymentsAsync = ref.watch(recentPaymentsProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Row: Greeting & Avatar
              customerAsync.when(
                data: (customer) => Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              'Good Morning ',
                              style: AppTextStyles.bodyMedium.copyWith(
                                color: AppColors.textSecondary,
                              ),
                            ),
                            const Text('👋', style: TextStyle(fontSize: 14)),
                          ],
                        ),
                        const SizedBox(height: 2),
                        Text(
                          customer?.name ?? 'Ramya Krishnan',
                          style: AppTextStyles.h1.copyWith(
                            color: AppColors.primary,
                            fontSize: 22,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),

                    Row(
                      children: [
                        // Bell Notification Icon
                        Stack(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: const BoxDecoration(
                                color: Colors.transparent,
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(
                                Icons.notifications_none_outlined,
                                color: AppColors.primary,
                                size: 26,
                              ),
                            ),
                            Positioned(
                              right: 10,
                              top: 10,
                              child: Container(
                                width: 8,
                                height: 8,
                                decoration: const BoxDecoration(
                                  color: Colors.red,
                                  shape: BoxShape.circle,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(width: 8),

                        // Avatar
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: AppColors.primarySoft,
                          child: const Icon(
                            Icons.person,
                            color: AppColors.primary,
                            size: 26,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                loading: () => const SizedBox(height: 50),
                error: (_, __) => const SizedBox(),
              ),

              const SizedBox(height: 20),

              // Main Scheme Progress Card
              schemeAsync.when(
                data: (scheme) => GoldCard(
                  scheme: scheme,
                  customerName: 'Ramya Krishnan',
                  variant: GoldCardVariant.home,
                ),
                loading: () => Container(
                  height: 200,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Center(
                    child: CircularProgressIndicator(color: Colors.white),
                  ),
                ),
                error: (e, s) => Text('Error loading scheme: $e'),
              ),

              const SizedBox(height: 20),

              // Next Payment Reminder Card
              schemeAsync.when(
                data: (scheme) => Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.border, width: 1),
                    boxShadow: const [
                      BoxShadow(
                        color: Color(0x0A000000),
                        blurRadius: 12,
                        offset: Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: AppColors.background,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Icon(
                                  Icons.calendar_month_outlined,
                                  color: AppColors.primary,
                                  size: 22,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Text(
                                'Next Payment',
                                style: AppTextStyles.labelMedium.copyWith(
                                  color: AppColors.textSecondary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                          const StatusBadge(type: StatusBadgeType.onTime),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Text(
                        scheme.nextDueDate,
                        style: AppTextStyles.h2.copyWith(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.w700,
                          fontSize: 22,
                        ),
                      ),
                      Text(
                        '₹${scheme.monthlyDeposit.toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                        style: AppTextStyles.amountMedium.copyWith(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const SizedBox(height: 16),
                      PrimaryButton(
                        label: 'Pay at Shop',
                        icon: Icons.storefront_outlined,
                        backgroundColor: AppColors.goldYellow,
                        textColor: AppColors.textPrimary,
                        onPressed: () {
                          context.go('/receipt');
                        },
                      ),
                    ],
                  ),
                ),
                loading: () => const SizedBox(height: 120),
                error: (_, __) => const SizedBox(),
              ),

              const SizedBox(height: 16),

              // Maturity Bonus Highlight Box (Dashed Gold Border)
              schemeAsync.when(
                data: (scheme) => Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.goldLight,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: AppColors.goldBorder,
                      width: 1.5,
                      style: BorderStyle.solid,
                    ),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.accent.withValues(alpha: 0.2),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.card_giftcard_outlined,
                          color: AppColors.goldDark,
                          size: 24,
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'You will receive ₹${scheme.maturityTotalValue.toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                              style: AppTextStyles.titleLarge.copyWith(
                                color: AppColors.textPrimary,
                                fontWeight: FontWeight.w700,
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Includes ₹${scheme.shopBonus.toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')} Shop Bonus at maturity.',
                              style: AppTextStyles.bodySmall.copyWith(
                                color: AppColors.textSecondary,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                loading: () => const SizedBox(),
                error: (_, __) => const SizedBox(),
              ),

              const SizedBox(height: 24),

              // Recent Payments Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Recent Payments',
                    style: AppTextStyles.h3.copyWith(
                      fontWeight: FontWeight.w700,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  GestureDetector(
                    onTap: () => context.go('/passbook'),
                    child: Row(
                      children: [
                        Text(
                          'View Full Passbook',
                          style: AppTextStyles.labelMedium.copyWith(
                            color: AppColors.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(width: 4),
                        const Icon(
                          Icons.arrow_forward,
                          size: 14,
                          color: AppColors.primary,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Recent Payments Table Container
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border, width: 1),
                ),
                child: Column(
                  children: [
                    // Table Header
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      decoration: const BoxDecoration(
                        color: Color(0xFFF7F7F7),
                        borderRadius: BorderRadius.vertical(top: Radius.circular(15)),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            flex: 3,
                            child: Text(
                              'MONTH',
                              style: AppTextStyles.labelSmall.copyWith(
                                color: AppColors.textMuted,
                              ),
                            ),
                          ),
                          Expanded(
                            flex: 3,
                            child: Text(
                              'AMOUNT',
                              style: AppTextStyles.labelSmall.copyWith(
                                color: AppColors.textMuted,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                          Expanded(
                            flex: 2,
                            child: Text(
                              'STATUS',
                              style: AppTextStyles.labelSmall.copyWith(
                                color: AppColors.textMuted,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Table Rows
                    recentPaymentsAsync.when(
                      data: (payments) => Column(
                        children: List.generate(payments.length, (index) {
                          final item = payments[index];
                          final isLast = index == payments.length - 1;

                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                            decoration: BoxDecoration(
                              border: isLast
                                  ? null
                                  : const Border(
                                      bottom: BorderSide(
                                        color: AppColors.border,
                                        width: 1,
                                      ),
                                    ),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  flex: 3,
                                  child: Text(
                                    item.monthYearLabel,
                                    style: AppTextStyles.titleMedium.copyWith(
                                      fontWeight: FontWeight.w700,
                                      color: AppColors.textPrimary,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 3,
                                  child: Text(
                                    '₹${item.amount.toInt()}',
                                    style: AppTextStyles.titleMedium.copyWith(
                                      fontWeight: FontWeight.w700,
                                      color: AppColors.textPrimary,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                                const Expanded(
                                  flex: 2,
                                  child: Align(
                                    alignment: Alignment.centerRight,
                                    child: StatusBadge(type: StatusBadgeType.paid),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }),
                      ),
                      loading: () => const Padding(
                        padding: EdgeInsets.all(20),
                        child: CircularProgressIndicator(),
                      ),
                      error: (_, __) => const SizedBox(),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Announcement Banner Card
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: const Color(0xFFF2F2F2),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.campaign_outlined,
                        color: AppColors.textSecondary,
                        size: 20,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Shop closed on Sunday. Happy Holidays!',
                        style: AppTextStyles.bodyMedium.copyWith(
                          color: AppColors.textSecondary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),

      // Custom Bottom Navigation Bar
      bottomNavigationBar: CustomBottomNav(
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) context.go('/passbook');
          if (index == 2) context.go('/notifications');
          if (index == 3) context.go('/profile');
        },
      ),
    );
  }
}
