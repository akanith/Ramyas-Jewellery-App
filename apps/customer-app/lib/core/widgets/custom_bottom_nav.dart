import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

class CustomBottomNavItem {
  final IconData icon;
  final String label;
  final String route;

  const CustomBottomNavItem({
    required this.icon,
    required this.label,
    required this.route,
  });
}

/// Custom Bottom Navigation Bar matching design specification with active gold pill highlight.
class CustomBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int index) onTap;

  const CustomBottomNav({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  static const List<CustomBottomNavItem> defaultItems = [
    CustomBottomNavItem(
      icon: Icons.home_outlined,
      label: 'Home',
      route: '/home',
    ),
    CustomBottomNavItem(
      icon: Icons.menu_book_outlined,
      label: 'Passbook',
      route: '/passbook',
    ),
    CustomBottomNavItem(
      icon: Icons.savings_outlined,
      label: 'Savings',
      route: '/receipt',
    ),
    CustomBottomNavItem(
      icon: Icons.person_outline,
      label: 'Profile',
      route: '/home',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          top: BorderSide(color: AppColors.border, width: 1),
        ),
      ),
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: SafeArea(
        top: false,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: List.generate(defaultItems.length, (index) {
            final item = defaultItems[index];
            final isSelected = index == currentIndex;

            return GestureDetector(
              onTap: () => onTap(index),
              behavior: HitTestBehavior.opaque,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.goldYellow : Colors.transparent,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      item.icon,
                      size: 22,
                      color: isSelected ? AppColors.textPrimary : AppColors.textSecondary,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      item.label,
                      style: AppTextStyles.labelSmall.copyWith(
                        color: isSelected ? AppColors.textPrimary : AppColors.textSecondary,
                        fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ),
      ),
    );
  }
}
