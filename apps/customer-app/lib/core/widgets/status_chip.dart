import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Reusable Status Chip for verified badges, scheme pill highlights, open/close status, and custom tags.
class StatusChip extends StatelessWidget {
  final String label;
  final IconData? icon;
  final Widget? leadingWidget;
  final Color backgroundColor;
  final Color textColor;
  final Color? borderColor;
  final bool isVerified;
  final EdgeInsetsGeometry padding;
  final double borderRadius;
  final TextStyle? textStyle;

  const StatusChip({
    super.key,
    required this.label,
    this.icon,
    this.leadingWidget,
    this.backgroundColor = AppColors.goldLight,
    this.textColor = AppColors.primary,
    this.borderColor,
    this.isVerified = false,
    this.padding = const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
    this.borderRadius = 20,
    this.textStyle,
  });

  /// Factory for Diwali Savings Scheme Chip
  factory StatusChip.schemePill({required String label}) {
    return StatusChip(
      label: label,
      icon: Icons.workspace_premium_outlined,
      backgroundColor: const Color(0xFFF9D670), // Gold Yellow pill fill
      textColor: const Color(0xFF6B4500),
      borderRadius: 20,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      textStyle: AppTextStyles.labelMedium.copyWith(
        fontWeight: FontWeight.w700,
        letterSpacing: 0.5,
        fontSize: 11,
        color: const Color(0xFF6B4500),
      ),
    );
  }

  /// Factory for Store Open Status Pill
  factory StatusChip.openStatus({
    required String label,
    bool isOpen = true,
    bool isVerified = true,
  }) {
    return StatusChip(
      label: label,
      leadingWidget: Container(
        width: 8,
        height: 8,
        decoration: BoxDecoration(
          color: isOpen ? const Color(0xFF00C853) : Colors.red,
          shape: BoxShape.circle,
        ),
      ),
      backgroundColor: const Color(0xFFE8F8F0),
      textColor: const Color(0xFF00897B),
      isVerified: isVerified,
      borderRadius: 20,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      textStyle: AppTextStyles.labelMedium.copyWith(
        color: const Color(0xFF00897B),
        fontWeight: FontWeight.w600,
        fontSize: 12,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
        border: borderColor != null ? Border.all(color: borderColor!, width: 1) : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (leadingWidget != null) ...[
            leadingWidget!,
            const SizedBox(width: 6),
          ] else if (icon != null) ...[
            Icon(icon, size: 14, color: textColor),
            const SizedBox(width: 6),
          ],
          Text(
            label,
            style: textStyle ??
                AppTextStyles.labelMedium.copyWith(
                  color: textColor,
                  fontWeight: FontWeight.w600,
                  fontSize: 12,
                ),
          ),
          if (isVerified) ...[
            const SizedBox(width: 6),
            const Icon(
              Icons.verified,
              size: 14,
              color: Colors.blue,
            ),
          ],
        ],
      ),
    );
  }
}
