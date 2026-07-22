import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';

enum StatusBadgeType {
  paid,
  waiting,
  future,
  active,
  onTime,
}

/// Status Pill Badge component matching design specs for Paid, Waiting, Future, Active.
class StatusBadge extends StatelessWidget {
  final StatusBadgeType type;
  final String? customText;

  const StatusBadge({
    super.key,
    required this.type,
    this.customText,
  });

  @override
  Widget build(BuildContext context) {
    switch (type) {
      case StatusBadgeType.paid:
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.check_circle, size: 18, color: AppColors.success),
            const SizedBox(width: 4),
            Text(
              customText ?? 'Paid',
              style: AppTextStyles.labelMedium.copyWith(
                color: AppColors.success,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        );

      case StatusBadgeType.waiting:
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.hourglass_empty, size: 18, color: AppColors.warning),
            const SizedBox(width: 4),
            Text(
              customText ?? 'Waiting',
              style: AppTextStyles.labelMedium.copyWith(
                color: AppColors.warning,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        );

      case StatusBadgeType.future:
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.access_time, size: 18, color: AppColors.textMuted),
            const SizedBox(width: 4),
            Text(
              customText ?? 'Future',
              style: AppTextStyles.labelMedium.copyWith(
                color: AppColors.textMuted,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        );

      case StatusBadgeType.active:
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            color: Colors.black26,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.check_circle, size: 14, color: Colors.white),
              const SizedBox(width: 4),
              Text(
                customText ?? 'Active',
                style: AppTextStyles.labelMedium.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        );

      case StatusBadgeType.onTime:
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: AppColors.successLight,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            customText ?? 'ON TIME',
            style: AppTextStyles.labelSmall.copyWith(
              color: AppColors.success,
              fontWeight: FontWeight.w700,
            ),
          ),
        );
    }
  }
}
