import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

/// Reusable Empty / Offline State Component matching Image 2.
class AppEmptyState extends StatelessWidget {
  final String title;
  final String description;
  final String referenceCode;
  final VoidCallback onRetry;
  final VoidCallback? onSecondaryAction;
  final String secondaryActionLabel;
  final IconData secondaryActionIcon;

  const AppEmptyState({
    super.key,
    this.title = 'No Internet Connection',
    this.description = 'Please check your internet and try again.',
    this.referenceCode = 'Ref: ERR_NO_CONNECTION',
    required this.onRetry,
    this.onSecondaryAction,
    this.secondaryActionLabel = 'Contact Shop',
    this.secondaryActionIcon = Icons.headset_mic_outlined,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // Offline / Disconnected Graphic Box
        Container(
          width: double.infinity,
          height: 220,
          margin: const EdgeInsets.symmetric(horizontal: 20),
          decoration: BoxDecoration(
            color: const Color(0xFFF9F6F7),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Inner light rounded card graphic
              Container(
                width: 180,
                height: 180,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x06000000),
                      blurRadius: 10,
                      offset: Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Disconnected Wifi Badge Stack
                    Stack(
                      alignment: Alignment.topRight,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: const BoxDecoration(
                            color: Colors.transparent,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.wifi_off_rounded,
                            size: 54,
                            color: AppColors.primary,
                          ),
                        ),
                        Positioned(
                          right: 0,
                          top: 0,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Color(0xFFD32F2F),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.signal_wifi_off_rounded,
                              size: 14,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    // Gold bar line graphic
                    Container(
                      width: 50,
                      height: 4,
                      decoration: BoxDecoration(
                        color: AppColors.goldYellow,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ],
                ),
              ),

              // Sparkle Accents
              const Positioned(
                top: 25,
                right: 35,
                child: Icon(Icons.auto_awesome, size: 22, color: AppColors.goldYellow),
              ),
              const Positioned(
                bottom: 25,
                left: 35,
                child: Icon(Icons.diamond_outlined, size: 16, color: Color(0xFFE5C3C6)),
              ),
            ],
          ),
        ),

        const SizedBox(height: 32),

        // Title & Description
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            children: [
              Text(
                title,
                style: AppTextStyles.h1.copyWith(
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                description,
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                  fontSize: 14,
                  height: 1.4,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),

        const SizedBox(height: 28),

        // Action Buttons Box
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            children: [
              // Retry Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: onRetry,
                  icon: const Icon(Icons.refresh, size: 18, color: Colors.white),
                  label: Text(
                    'Retry',
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

              if (onSecondaryAction != null) ...[
                const SizedBox(height: 12),

                // Contact Shop / Secondary Action Button
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: onSecondaryAction,
                    icon: Icon(secondaryActionIcon, size: 18, color: AppColors.primary),
                    label: Text(
                      secondaryActionLabel,
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

        const SizedBox(height: 24),

        // Reference Code Footnote
        Text(
          referenceCode,
          style: AppTextStyles.bodySmall.copyWith(
            color: AppColors.textMuted,
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}
