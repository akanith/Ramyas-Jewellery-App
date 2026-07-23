import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/app_list_tile.dart';
import '../../core/widgets/change_password_dialog.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_bottom_nav.dart';
import '../../core/widgets/logout_dialog.dart';
import '../../core/widgets/status_chip.dart';
import '../../providers/providers.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final customerAsync = ref.watch(customerProvider);
    final schemeAsync = ref.watch(schemeProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: CustomAppBar(
        title: 'My Profile',
        showBackButton: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.edit_outlined, color: AppColors.primary),
            onPressed: () {},
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Customer Summary Card
              customerAsync.when(
                data: (customer) => Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.border, width: 1),
                  ),
                  child: Column(
                    children: [
                      // Avatar with verified badge
                      Stack(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(3),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(color: AppColors.primary, width: 2),
                            ),
                            child: const CircleAvatar(
                              radius: 36,
                              backgroundColor: AppColors.primarySoft,
                              child: Icon(
                                Icons.person,
                                color: AppColors.primary,
                                size: 44,
                              ),
                            ),
                          ),
                          Positioned(
                            right: 0,
                            bottom: 0,
                            child: Container(
                              padding: const EdgeInsets.all(4),
                              decoration: const BoxDecoration(
                                color: AppColors.goldYellow,
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(
                                Icons.verified,
                                color: AppColors.textPrimary,
                                size: 16,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // User Name & ID
                      Text(
                        customer?.name ?? 'Anith Kumar',
                        style: AppTextStyles.h1.copyWith(
                          fontSize: 20,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'ID: ${customer?.id ?? "GS-2024-089"}',
                        style: AppTextStyles.bodySmall.copyWith(
                          color: AppColors.textMuted,
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        customer?.mobileNumber ?? '+91 98765 43210',
                        style: AppTextStyles.bodyMedium.copyWith(
                          color: AppColors.textSecondary,
                          fontWeight: FontWeight.w500,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(height: 14),

                      // Scheme Pill Chip
                      StatusChip.schemePill(label: 'DIWALI SAVINGS SCHEME'),
                    ],
                  ),
                ),
                loading: () => const SizedBox(height: 150),
                error: (_, __) => const SizedBox(),
              ),

              const SizedBox(height: 16),

              // Current Scheme Card
              schemeAsync.when(
                data: (scheme) {
                  final paidCount = scheme.paidInstallmentsCount;
                  final totalCount = scheme.totalInstallmentsCount;
                  final progress = paidCount / totalCount;

                  return Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: AppColors.border, width: 1),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Header
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'CURRENT SCHEME',
                              style: AppTextStyles.labelSmall.copyWith(
                                color: AppColors.primary,
                                fontWeight: FontWeight.w700,
                                letterSpacing: 0.8,
                              ),
                            ),
                            const Icon(
                              Icons.savings_outlined,
                              color: AppColors.primary,
                              size: 20,
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),

                        // Title & Paid count
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.baseline,
                          textBaseline: TextBaseline.alphabetic,
                          children: [
                            Text(
                              scheme.name,
                              style: AppTextStyles.h2.copyWith(
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            RichText(
                              text: TextSpan(
                                children: [
                                  TextSpan(
                                    text: '$paidCount/$totalCount',
                                    style: AppTextStyles.h2.copyWith(
                                      color: AppColors.textPrimary,
                                      fontWeight: FontWeight.w800,
                                      fontSize: 18,
                                    ),
                                  ),
                                  TextSpan(
                                    text: '\nPaid',
                                    style: AppTextStyles.bodySmall.copyWith(
                                      color: AppColors.textMuted,
                                      fontSize: 11,
                                    ),
                                  ),
                                ],
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ],
                        ),
                        const SizedBox(height: 2),

                        // Monthly deposit text
                        Text(
                          '₹${scheme.monthlyDeposit.toInt()} Monthly | $totalCount Months',
                          style: AppTextStyles.bodyMedium.copyWith(
                            color: AppColors.textSecondary,
                            fontSize: 13,
                          ),
                        ),
                        const SizedBox(height: 14),

                        // Progress Bar
                        ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: LinearProgressIndicator(
                            value: progress,
                            minHeight: 10,
                            backgroundColor: const Color(0xFFEBEBEB),
                            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                          ),
                        ),
                        const SizedBox(height: 10),

                        // Next payment due date
                        Text(
                          'Next payment due: ${scheme.nextDueDate}',
                          style: AppTextStyles.bodySmall.copyWith(
                            color: AppColors.textMuted,
                            fontStyle: FontStyle.italic,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  );
                },
                loading: () => const SizedBox(height: 120),
                error: (_, __) => const SizedBox(),
              ),

              const SizedBox(height: 16),

              // Personal Details Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.border, width: 1),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'PERSONAL DETAILS',
                      style: AppTextStyles.labelSmall.copyWith(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 14),
                    _buildDetailRow(
                      icon: Icons.location_on_outlined,
                      label: 'ADDRESS',
                      value: 'No. 45, Gandhi Street, T. Nagar,\nChennai - 600017',
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Expanded(
                          child: _buildDetailRow(
                            icon: Icons.calendar_today_outlined,
                            label: 'JOIN DATE',
                            value: '15 Jan 2024',
                          ),
                        ),
                        Expanded(
                          child: _buildDetailRow(
                            icon: Icons.person_add_alt_1_outlined,
                            label: 'NOMINEE',
                            value: 'S. Meena\n(Wife)',
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Quick Actions Header
              Padding(
                padding: const EdgeInsets.only(left: 4, bottom: 10),
                child: Text(
                  'QUICK ACTIONS',
                  style: AppTextStyles.labelSmall.copyWith(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.8,
                  ),
                ),
              ),

              // Quick Actions List Tiles
              AppListTile(
                title: 'Change Password',
                leadingIcon: Icons.lock_outline,
                onTap: () {
                  showChangePasswordDialog(
                    context,
                    onChangePassword: (curr, next) async {
                      await ref.read(authRepositoryProvider).changePassword(curr, next);
                    },
                  );
                },
              ),
              const SizedBox(height: 8),
              AppListTile(
                title: 'View Passbook',
                leadingIcon: Icons.menu_book_outlined,
                onTap: () => context.go('/passbook'),
              ),
              const SizedBox(height: 8),
              AppListTile(
                title: 'Download Passbook PDF',
                leadingIcon: Icons.picture_as_pdf_outlined,
                trailingIcon: Icons.download_outlined,
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Passbook PDF statement generated successfully!'),
                      backgroundColor: AppColors.success,
                    ),
                  );
                },
              ),
              const SizedBox(height: 8),
              AppListTile(
                title: 'Contact Shop',
                leadingIcon: Icons.storefront_outlined,
                trailingIcon: Icons.phone_outlined,
                onTap: () => context.push('/visit-shop'),
              ),
              const SizedBox(height: 8),
              AppListTile(
                title: 'Help & Support',
                leadingIcon: Icons.headset_mic_outlined,
                onTap: () => context.push('/help-center'),
              ),
              const SizedBox(height: 8),
              AppListTile(
                title: 'About Ramyas Jeweller',
                leadingIcon: Icons.info_outline,
                onTap: () => context.push('/privacy-policy'),
              ),
              const SizedBox(height: 8),
              AppListTile(
                title: 'Rate App',
                leadingIcon: Icons.star_outline,
                onTap: () {},
              ),

              const SizedBox(height: 24),

              // Logout Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    showLogoutDialog(
                      context,
                      onConfirm: () async {
                        await ref.read(authRepositoryProvider).logout();
                        if (context.mounted) {
                          context.go('/login');
                        }
                      },
                    );
                  },
                  icon: const Icon(Icons.logout, size: 18, color: AppColors.primary),
                  label: Text(
                    'Logout',
                    style: AppTextStyles.titleMedium.copyWith(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFFEBEF),
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // App Version Footnote
              Center(
                child: Text(
                  'App Version 2.4.1 • Made in India',
                  style: AppTextStyles.bodySmall.copyWith(
                    color: AppColors.textMuted,
                    fontSize: 11,
                  ),
                ),
              ),

              const SizedBox(height: 20),
            ],
          ),
        ),
      ),

      // Custom Bottom Navigation Bar
      bottomNavigationBar: CustomBottomNav(
        currentIndex: 3, // Profile tab active
        onTap: (index) {
          if (index == 0) context.go('/home');
          if (index == 1) context.go('/passbook');
          if (index == 2) context.go('/notifications');
        },
      ),
    );
  }

  Widget _buildDetailRow({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: const BoxDecoration(
            color: AppColors.inputBackground,
            shape: BoxShape.circle,
          ),
          child: Icon(
            icon,
            color: AppColors.primary,
            size: 18,
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: AppTextStyles.bodySmall.copyWith(
                  color: AppColors.textMuted,
                  fontSize: 10,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: AppTextStyles.titleMedium.copyWith(
                  color: AppColors.textPrimary,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  height: 1.3,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
