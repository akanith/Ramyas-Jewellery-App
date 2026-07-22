import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Reusable Modal Dialog component matching Material 3 design specs.
class AppDialog extends StatelessWidget {
  final String title;
  final String message;
  final Widget? headerWidget;
  final String primaryButtonLabel;
  final VoidCallback onPrimaryPressed;
  final IconData? primaryButtonIcon;
  final Color primaryButtonColor;
  final String? secondaryButtonLabel;
  final VoidCallback? onSecondaryPressed;
  final bool isDestructive;

  const AppDialog({
    super.key,
    required this.title,
    required this.message,
    this.headerWidget,
    required this.primaryButtonLabel,
    required this.onPrimaryPressed,
    this.primaryButtonIcon,
    this.primaryButtonColor = AppColors.primary,
    this.secondaryButtonLabel,
    this.onSecondaryPressed,
    this.isDestructive = false,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.transparent,
      elevation: 10,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
      ),
      insetPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Header graphic or icon
            if (headerWidget != null) ...[
              headerWidget!,
              const SizedBox(height: 16),
            ],

            // Title
            Text(
              title,
              style: AppTextStyles.h2.copyWith(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),

            // Message Body
            Text(
              message,
              style: AppTextStyles.bodyMedium.copyWith(
                color: AppColors.textSecondary,
                fontSize: 14,
                height: 1.4,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),

            // Primary Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: onPrimaryPressed,
                icon: primaryButtonIcon != null
                    ? Icon(primaryButtonIcon, size: 18, color: Colors.white)
                    : const SizedBox.shrink(),
                label: Text(
                  primaryButtonLabel,
                  style: AppTextStyles.titleMedium.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: isDestructive ? const Color(0xFF8C1D40) : primaryButtonColor,
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
              ),
            ),

            // Secondary Button (Cancel)
            if (secondaryButtonLabel != null) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: onSecondaryPressed ?? () => Navigator.of(context).pop(),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.primary,
                    side: const BorderSide(color: AppColors.primary, width: 1.2),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                    ),
                  ),
                  child: Text(
                    secondaryButtonLabel!,
                    style: AppTextStyles.titleMedium.copyWith(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
