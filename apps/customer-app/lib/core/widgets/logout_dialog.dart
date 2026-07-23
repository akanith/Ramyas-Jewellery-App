import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import 'app_dialog.dart';

/// Logout Dialog component matching Image 3.
class LogoutDialog extends StatelessWidget {
  final VoidCallback onConfirmLogout;
  final VoidCallback? onCancel;

  const LogoutDialog({
    super.key,
    required this.onConfirmLogout,
    this.onCancel,
  });

  @override
  Widget build(BuildContext context) {
    return AppDialog(
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      primaryButtonLabel: 'Logout',
      primaryButtonIcon: Icons.logout,
      isDestructive: true,
      onPrimaryPressed: onConfirmLogout,
      secondaryButtonLabel: 'Cancel',
      onSecondaryPressed: onCancel ?? () => Navigator.of(context).pop(),
      headerWidget: Container(
        width: 80,
        height: 80,
        decoration: const BoxDecoration(
          color: Color(0xFFF7F7F7),
          shape: BoxShape.circle,
        ),
        child: Center(
          child: Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Container(
              margin: const EdgeInsets.all(8),
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.logout,
                color: Colors.white,
                size: 24,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Helper function to show Logout Confirmation Dialog
Future<bool?> showLogoutDialog(
  BuildContext context, {
  required VoidCallback onConfirm,
}) {
  return showDialog<bool>(
    context: context,
    barrierDismissible: true,
    builder: (BuildContext ctx) {
      return LogoutDialog(
        onConfirmLogout: () {
          Navigator.of(ctx).pop(true);
          onConfirm();
        },
        onCancel: () {
          Navigator.of(ctx).pop(false);
        },
      );
    },
  );
}
