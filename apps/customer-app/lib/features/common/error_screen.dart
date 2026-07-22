import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/app_error_widget.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_bottom_nav.dart';

class ErrorScreen extends StatelessWidget {
  const ErrorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: CustomAppBar(
        title: 'Error',
        showBackButton: true,
        onBackPressed: () => context.maybePop(),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Text(
              'Ramyas',
              style: AppTextStyles.h2.copyWith(
                color: AppColors.primary,
                fontWeight: FontWeight.w700,
                fontSize: 18,
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 20),
            child: AppErrorWidget(
              title: 'Something went wrong.',
              description:
                  'We encountered an unexpected error while processing your request. Please try again or return to the home screen.',
              errorCode: 'ERR_VD_JEWEL_500',
              onTryAgain: () {
                context.go('/home');
              },
              onGoHome: () {
                context.go('/home');
              },
            ),
          ),
        ),
      ),
      bottomNavigationBar: CustomBottomNav(
        currentIndex: 0,
        onTap: (index) {
          if (index == 0) context.go('/home');
          if (index == 1) context.go('/passbook');
          if (index == 2) context.go('/receipt');
          if (index == 3) context.go('/profile');
        },
      ),
    );
  }
}
