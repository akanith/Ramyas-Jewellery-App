import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Reusable Error Widget matching Image 1.
class AppErrorWidget extends StatelessWidget {
  final String title;
  final String description;
  final String errorCode;
  final VoidCallback onTryAgain;
  final VoidCallback? onGoHome;

  const AppErrorWidget({
    super.key,
    this.title = 'Something went wrong.',
    this.description =
        'We encountered an unexpected error while processing your request. Please try again or return to the home screen.',
    this.errorCode = 'ERR_VD_JEWEL_500',
    required this.onTryAgain,
    this.onGoHome,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // Graphic Illustration Container (Broken Diamond)
        Container(
          width: double.infinity,
          height: 200,
          margin: const EdgeInsets.symmetric(horizontal: 20),
          decoration: BoxDecoration(
            color: const Color(0xFFF9F9F9),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Light glowing background ring
              Container(
                width: 140,
                height: 140,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primarySoft.withOpacity(0.5),
                ),
              ),
              // Broken Diamond Graphic representation
              Stack(
                alignment: Alignment.center,
                children: [
                  Icon(
                    Icons.diamond_outlined,
                    size: 84,
                    color: AppColors.primary.withOpacity(0.85),
                  ),
                  // Scattered golden crystal fragments
                  const Positioned(
                    top: 25,
                    right: 45,
                    child: Icon(Icons.auto_awesome, size: 24, color: AppColors.accent),
                  ),
                  const Positioned(
                    bottom: 25,
                    left: 45,
                    child: Icon(Icons.auto_awesome, size: 20, color: AppColors.goldDark),
                  ),
                ],
              ),
            ],
          ),
        ),

        const SizedBox(height: 24),

        // Error Details Card Container
        Container(
          width: double.infinity,
          margin: const EdgeInsets.symmetric(horizontal: 20),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AppColors.border, width: 1),
            boxShadow: const [
              BoxShadow(
                color: Color(0x08000000),
                blurRadius: 12,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              Text(
                title,
                style: AppTextStyles.h2.copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              Text(
                description,
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                  fontSize: 13,
                  height: 1.4,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),

              // Try Again Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: onTryAgain,
                  icon: const Icon(Icons.refresh, size: 18, color: Colors.white),
                  label: Text(
                    'Try Again',
                    style: AppTextStyles.titleMedium.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                    ),
                  ),
                ),
              ),

              if (onGoHome != null) ...[
                const SizedBox(height: 12),

                // Go Home Button
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: onGoHome,
                    icon: const Icon(Icons.home_outlined, size: 18, color: AppColors.primary),
                    label: Text(
                      'Go Home',
                      style: AppTextStyles.titleMedium.copyWith(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.primary,
                      side: const BorderSide(color: AppColors.primary, width: 1.5),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),

        const SizedBox(height: 20),

        // Error Code Footnote
        Text(
          'Error Code: $errorCode',
          style: AppTextStyles.bodySmall.copyWith(
            color: AppColors.textMuted,
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}
