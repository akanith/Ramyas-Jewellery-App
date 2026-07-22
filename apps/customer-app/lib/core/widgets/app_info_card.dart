import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Reusable Info Card Widget for support sections, policy blocks, scheme details, and highlight boxes.
class AppInfoCard extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData? headerIcon;
  final Color? headerIconColor;
  final Color backgroundColor;
  final Color borderColor;
  final Widget? child;
  final List<Widget>? actionButtons;
  final EdgeInsetsGeometry padding;
  final Widget? footerWidget;

  const AppInfoCard({
    super.key,
    required this.title,
    this.subtitle,
    this.headerIcon,
    this.headerIconColor,
    this.backgroundColor = Colors.white,
    this.borderColor = AppColors.border,
    this.child,
    this.actionButtons,
    this.padding = const EdgeInsets.all(20),
    this.footerWidget,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: borderColor, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header Row with optional Icon & Title
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              if (headerIcon != null) ...[
                Icon(
                  headerIcon,
                  color: headerIconColor ?? AppColors.primary,
                  size: 22,
                ),
                const SizedBox(width: 10),
              ],
              Expanded(
                child: Text(
                  title,
                  style: AppTextStyles.h3.copyWith(
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                    fontSize: 18,
                  ),
                ),
              ),
            ],
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 6),
            Text(
              subtitle!,
              style: AppTextStyles.bodyMedium.copyWith(
                color: AppColors.textSecondary,
                fontSize: 13,
                height: 1.4,
              ),
            ),
          ],
          if (child != null) ...[
            const SizedBox(height: 14),
            child!,
          ],
          if (actionButtons != null && actionButtons!.isNotEmpty) ...[
            const SizedBox(height: 16),
            Row(
              children: actionButtons!
                  .map((btn) => Expanded(child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: btn,
                      )))
                  .toList(),
            ),
          ],
          if (footerWidget != null) ...[
            const SizedBox(height: 14),
            footerWidget!,
          ],
        ],
      ),
    );
  }
}
