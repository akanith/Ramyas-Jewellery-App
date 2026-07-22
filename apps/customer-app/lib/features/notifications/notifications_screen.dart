import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/app_list_tile.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_bottom_nav.dart';
import '../../models/notification_model.dart';
import '../../providers/app_data_providers.dart';

class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notificationsAsync = ref.watch(notificationsProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: CustomAppBar(
        title: 'Notifications',
        showBackButton: true,
        onBackPressed: () => context.maybePop(),
        actions: [
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined, color: AppColors.primary),
                onPressed: () {},
              ),
              Positioned(
                right: 8,
                top: 8,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: AppColors.primary,
                    shape: BoxShape.circle,
                  ),
                  constraints: const BoxConstraints(
                    minWidth: 16,
                    minHeight: 16,
                  ),
                  child: Text(
                    '3',
                    style: AppTextStyles.labelSmall.copyWith(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Hero Promo Banner Card
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: Container(
                  width: double.infinity,
                  height: 140,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(18),
                    gradient: const LinearGradient(
                      colors: [
                        Color(0xFF5E0B2B),
                        Color(0xFF8C1D40),
                        Color(0xFF3B061A),
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    boxShadow: const [
                      BoxShadow(
                        color: Color(0x1A000000),
                        blurRadius: 10,
                        offset: Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Stack(
                    children: [
                      // Decorative background circles
                      Positioned(
                        right: -20,
                        bottom: -20,
                        child: Container(
                          width: 140,
                          height: 140,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white.withOpacity(0.08),
                          ),
                        ),
                      ),
                      Positioned(
                        right: 40,
                        top: -30,
                        child: Container(
                          width: 100,
                          height: 100,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white.withOpacity(0.05),
                          ),
                        ),
                      ),
                      // Text Content
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'New Arrivals',
                              style: AppTextStyles.h1.copyWith(
                                color: Colors.white,
                                fontSize: 22,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const SizedBox(height: 6),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.65,
                              child: Text(
                                'Check out our latest 22K Gold Temple Collection.',
                                style: AppTextStyles.bodyMedium.copyWith(
                                  color: Colors.white.withOpacity(0.9),
                                  fontSize: 13,
                                  height: 1.3,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 10),

              // Grouped Notifications List
              notificationsAsync.when(
                data: (notifications) {
                  final todayList = notifications
                      .where((n) => n.group == NotificationGroup.today)
                      .toList();
                  final thisWeekList = notifications
                      .where((n) => n.group == NotificationGroup.thisWeek)
                      .toList();
                  final earlierList = notifications
                      .where((n) => n.group == NotificationGroup.earlier)
                      .toList();

                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (todayList.isNotEmpty) ...[
                        _buildSectionHeader('TODAY'),
                        ...todayList.map((item) => _buildNotificationItem(item)),
                      ],
                      if (thisWeekList.isNotEmpty) ...[
                        _buildSectionHeader('THIS WEEK'),
                        ...thisWeekList.map((item) => _buildNotificationItem(item)),
                      ],
                      if (earlierList.isNotEmpty) ...[
                        _buildSectionHeader('EARLIER'),
                        ...earlierList.map((item) => _buildNotificationItem(item)),
                      ],
                    ],
                  );
                },
                loading: () => const Center(
                  padding: EdgeInsets.all(30),
                  child: CircularProgressIndicator(color: AppColors.primary),
                ),
                error: (err, stack) => Text('Error: $err'),
              ),

              const SizedBox(height: 20),
            ],
          ),
        ),
      ),

      // Custom Bottom Navigation Bar
      bottomNavigationBar: CustomBottomNav(
        currentIndex: 2, // Updates tab active
        onTap: (index) {
          if (index == 0) context.go('/home');
          if (index == 1) context.go('/passbook');
          if (index == 2) context.go('/receipt');
          if (index == 3) context.go('/profile');
        },
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      color: const Color(0xFFF7F7F7),
      child: Text(
        title,
        style: AppTextStyles.labelSmall.copyWith(
          color: AppColors.textSecondary,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.8,
          fontSize: 12,
        ),
      ),
    );
  }

  Widget _buildNotificationItem(NotificationModel item) {
    IconData icon;
    Color bgColor;
    Color iconColor;

    switch (item.type) {
      case NotificationType.installment:
        icon = Icons.check_circle_outline;
        bgColor = const Color(0xFFD4F5E2);
        iconColor = const Color(0xFF1E8E3E);
        break;
      case NotificationType.goldRate:
        icon = Icons.trending_up;
        bgColor = AppColors.goldYellow;
        iconColor = AppColors.textPrimary;
        break;
      case NotificationType.reminder:
        icon = Icons.access_time;
        bgColor = const Color(0xFFFFEAD0);
        iconColor = const Color(0xFFD97706);
        break;
      case NotificationType.offer:
        icon = Icons.celebration_outlined;
        bgColor = const Color(0xFFFFDDE4);
        iconColor = const Color(0xFFD81B60);
        break;
      case NotificationType.shopHoliday:
        icon = Icons.storefront_outlined;
        bgColor = const Color(0xFFE5E7EB);
        iconColor = AppColors.textSecondary;
        break;
    }

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(color: AppColors.border, width: 0.8),
        ),
      ),
      child: AppListTile(
        title: item.title,
        subtitle: item.description,
        timeText: item.timestamp,
        isUnread: item.isUnread,
        showBorder: false,
        trailingIcon: null,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        leadingWidget: Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: bgColor,
            shape: BoxShape.circle,
          ),
          child: Icon(
            icon,
            color: iconColor,
            size: 22,
          ),
        ),
      ),
    );
  }
}
