import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/app_empty_state.dart';

class NoInternetScreen extends StatelessWidget {
  const NoInternetScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar with Brand Logo & Close Action Button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 28,
                        height: 28,
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Icon(
                          Icons.menu_book,
                          color: Colors.white,
                          size: 16,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Ramyas',
                        style: AppTextStyles.h2.copyWith(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w700,
                          fontSize: 20,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    width: 36,
                    height: 36,
                    decoration: const BoxDecoration(
                      color: Color(0xFFEFEFEF),
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      padding: EdgeInsets.zero,
                      icon: const Icon(Icons.close, color: AppColors.textPrimary, size: 20),
                      onPressed: () => context.maybePop(),
                    ),
                  ),
                ],
              ),
            ),

            // Center Content using AppEmptyState component
            Expanded(
              child: Center(
                child: SingleChildScrollView(
                  child: AppEmptyState(
                    title: 'No Internet Connection',
                    description: 'Please check your internet and try again.',
                    referenceCode: 'Ref: ERR_NO_CONNECTION',
                    onRetry: () {
                      context.go('/home');
                    },
                    onSecondaryAction: () {
                      context.push('/visit-shop');
                    },
                    secondaryActionLabel: 'Contact Shop',
                    secondaryActionIcon: Icons.headset_mic_outlined,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
