import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Reusable List Tile component for profile quick actions, settings, notifications, and info items.
class AppListTile extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData? leadingIcon;
  final Widget? leadingWidget;
  final Color? leadingBackgroundColor;
  final Color? leadingIconColor;
  final Widget? trailingWidget;
  final IconData? trailingIcon;
  final VoidCallback? onTap;
  final bool showBorder;
  final bool isUnread;
  final String? timeText;
  final EdgeInsetsGeometry padding;

  const AppListTile({
    super.key,
    required this.title,
    this.subtitle,
    this.leadingIcon,
    this.leadingWidget,
    this.leadingBackgroundColor,
    this.leadingIconColor,
    this.trailingWidget,
    this.trailingIcon = Icons.chevron_right,
    this.onTap,
    this.showBorder = true,
    this.isUnread = false,
    this.timeText,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
  });

  @override
  Widget build(BuildContext context) {
    final tileContent = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(16),
        border: showBorder ? Border.all(color: AppColors.border, width: 1) : null,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Leading Icon or Custom Widget
          if (leadingWidget != null) ...[
            leadingWidget!,
            const SizedBox(width: 14),
          ] else if (leadingIcon != null) ...[
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                color: leadingBackgroundColor ?? AppColors.inputBackground,
                shape: BoxShape.circle,
              ),
              child: Icon(
                leadingIcon,
                color: leadingIconColor ?? AppColors.primary,
                size: 20,
              ),
            ),
            const SizedBox(width: 14),
          ],

          // Content Title & Subtitle
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: AppTextStyles.titleMedium.copyWith(
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                          fontSize: 15,
                        ),
                      ),
                    ),
                    if (timeText != null) ...[
                      const SizedBox(width: 8),
                      Row(
                        children: [
                          Text(
                            timeText!,
                            style: AppTextStyles.bodySmall.copyWith(
                              color: AppColors.textMuted,
                              fontSize: 11,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          if (isUnread) ...[
                            const SizedBox(width: 6),
                            Container(
                              width: 7,
                              height: 7,
                              decoration: const BoxDecoration(
                                color: Colors.blue,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ],
                  ],
                ),
                if (subtitle != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    subtitle!,
                    style: AppTextStyles.bodyMedium.copyWith(
                      color: AppColors.textSecondary,
                      fontSize: 13,
                      height: 1.3,
                    ),
                  ),
                ],
              ],
            ),
          ),

          // Trailing Action Widget or Chevron
          if (trailingWidget != null) ...[
            const SizedBox(width: 12),
            trailingWidget!,
          ] else if (trailingIcon != null) ...[
            const SizedBox(width: 12),
            Icon(
              trailingIcon,
              color: AppColors.textMuted,
              size: 20,
            ),
          ],
        ],
      ),
    );

    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(16),
      child: onTap == null
          ? tileContent
          : InkWell(
              onTap: onTap,
              borderRadius: BorderRadius.circular(16),
              child: tileContent,
            ),
    );
  }
}
