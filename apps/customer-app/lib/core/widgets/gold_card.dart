import 'package:flutter/material.dart';

import '../../models/scheme_model.dart';
import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';
import 'status_badge.dart';

enum GoldCardVariant {
  passbook,
  home,
}

/// Signature Maroon Scheme Progress Card matching Image 1 and Image 3 designs.
class GoldCard extends StatelessWidget {
  final SchemeModel scheme;
  final String customerName;
  final GoldCardVariant variant;

  const GoldCard({
    super.key,
    required this.scheme,
    required this.customerName,
    this.variant = GoldCardVariant.home,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1F8C1D40),
            blurRadius: 16,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Stack(
          children: [
            // Background Star Motif Pattern Effect
            Positioned(
              right: -20,
              top: -20,
              child: Opacity(
                opacity: 0.08,
                child: Icon(
                  Icons.star_rate_rounded,
                  size: 160,
                  color: Colors.white,
                ),
              ),
            ),

            if (variant == GoldCardVariant.passbook) ...[
              // Ticket Cutout Left & Right
              Positioned(
                left: -12,
                top: 100,
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: const BoxDecoration(
                    color: AppColors.background,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
              Positioned(
                right: -12,
                top: 100,
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: const BoxDecoration(
                    color: AppColors.background,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ],

            Padding(
              padding: const EdgeInsets.all(20),
              child: variant == GoldCardVariant.passbook
                  ? _buildPassbookContent()
                  : _buildHomeContent(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPassbookContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  scheme.schemeName,
                  style: AppTextStyles.labelMedium.copyWith(
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  customerName,
                  style: AppTextStyles.h2.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  'ID: ${scheme.schemeId}',
                  style: AppTextStyles.bodyMedium.copyWith(
                    color: Colors.white70,
                  ),
                ),
              ],
            ),

            // Badge Icon
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(
                Icons.verified_outlined,
                color: Colors.white,
                size: 24,
              ),
            ),
          ],
        ),

        const SizedBox(height: 16),
        // Dotted Divider
        LayoutBuilder(
          builder: (context, constraints) {
            final dashCount = (constraints.maxWidth / 8).floor();
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(
                dashCount,
                (_) => const SizedBox(
                  width: 4,
                  height: 1,
                  child: DecoratedBox(
                    decoration: BoxDecoration(color: Colors.white30),
                  ),
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 16),

        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'MONTHLY DEPOSIT',
                  style: AppTextStyles.labelSmall.copyWith(
                    color: Colors.white70,
                    letterSpacing: 0.8,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '₹${scheme.monthlyDeposit.toInt()}',
                  style: AppTextStyles.amountMedium.copyWith(
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 8),
                const StatusBadge(type: StatusBadgeType.active),
              ],
            ),

            // Circular Months Ring
            Column(
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    SizedBox(
                      width: 54,
                      height: 54,
                      child: CircularProgressIndicator(
                        value: scheme.completionPercentage / 100,
                        backgroundColor: Colors.white24,
                        valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                        strokeWidth: 5,
                      ),
                    ),
                    Text(
                      '${scheme.completedInstallments}/${scheme.totalInstallments}',
                      style: AppTextStyles.titleMedium.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  'Months',
                  style: AppTextStyles.labelSmall.copyWith(
                    color: Colors.white70,
                  ),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildHomeContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              scheme.schemeName.toUpperCase(),
              style: AppTextStyles.labelSmall.copyWith(
                color: Colors.white70,
                letterSpacing: 0.8,
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                'ID: ${scheme.schemeId}',
                style: AppTextStyles.labelSmall.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          crossAxisAlignment: CrossAxisAlignment.baseline,
          textBaseline: TextBaseline.alphabetic,
          children: [
            Text(
              '₹${scheme.totalPaidAmount.toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
              style: AppTextStyles.amountLarge.copyWith(
                color: Colors.white,
                fontSize: 32,
              ),
            ),
            const SizedBox(width: 8),
            Text(
              'Paid',
              style: AppTextStyles.titleMedium.copyWith(
                color: Colors.white70,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '${scheme.completedInstallments} of ${scheme.totalInstallments} Months Completed',
              style: AppTextStyles.labelMedium.copyWith(
                color: Colors.white,
              ),
            ),
            Text(
              '${scheme.completionPercentage.toInt()}%',
              style: AppTextStyles.labelMedium.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(6),
          child: LinearProgressIndicator(
            value: scheme.completionPercentage / 100,
            minHeight: 8,
            backgroundColor: Colors.black26,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.goldYellow),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Next Maturity',
                  style: AppTextStyles.labelSmall.copyWith(
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  scheme.maturityDate,
                  style: AppTextStyles.titleLarge.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  'Remaining',
                  style: AppTextStyles.labelSmall.copyWith(
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  '₹${scheme.remainingAmount.toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                  style: AppTextStyles.titleLarge.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
