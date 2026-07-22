import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_text_styles.dart';
import 'primary_button.dart';

/// Change Password Modal Dialog.
class ChangePasswordDialog extends StatefulWidget {
  final Future<void> Function(String currentPassword, String newPassword) onChangePassword;

  const ChangePasswordDialog({
    super.key,
    required this.onChangePassword,
  });

  @override
  State<ChangePasswordDialog> createState() => _ChangePasswordDialogState();
}

class _ChangePasswordDialogState extends State<ChangePasswordDialog> {
  final _formKey = GlobalKey<FormState>();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    if (_newPasswordController.text.trim() != _confirmPasswordController.text.trim()) {
      setState(() {
        _errorMessage = 'New passwords do not match.';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await widget.onChangePassword(
        _currentPasswordController.text.trim(),
        _newPasswordController.text.trim(),
      );
      if (mounted) {
        Navigator.of(context).pop(true);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Password updated successfully!'),
            backgroundColor: AppColors.success,
          ),
        );
      }
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceAll('Exception: ', '');
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.transparent,
      elevation: 10,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Change Password',
                      style: AppTextStyles.h2.copyWith(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                        color: AppColors.primary,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: AppColors.textMuted),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                if (_errorMessage != null) ...[
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFEBEE),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      _errorMessage!,
                      style: const TextStyle(color: Colors.red, fontSize: 12),
                    ),
                  ),
                  const SizedBox(height: 12),
                ],

                // Current Password (Default is 12345 for first time)
                Text(
                  'Current Password (Default: 12345)',
                  style: AppTextStyles.labelSmall.copyWith(color: AppColors.textSecondary),
                ),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _currentPasswordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    hintText: 'Enter current password',
                    prefixIcon: Icon(Icons.lock_outline, size: 20),
                  ),
                  validator: (val) => val == null || val.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 14),

                // New Password
                Text(
                  'New Password',
                  style: AppTextStyles.labelSmall.copyWith(color: AppColors.textSecondary),
                ),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _newPasswordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    hintText: 'Enter new password',
                    prefixIcon: Icon(Icons.lock_reset_outlined, size: 20),
                  ),
                  validator: (val) => val == null || val.length < 4 ? 'At least 4 chars' : null,
                ),
                const SizedBox(height: 14),

                // Confirm New Password
                Text(
                  'Confirm New Password',
                  style: AppTextStyles.labelSmall.copyWith(color: AppColors.textSecondary),
                ),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _confirmPasswordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    hintText: 'Confirm new password',
                    prefixIcon: Icon(Icons.lock_reset_outlined, size: 20),
                  ),
                  validator: (val) => val == null || val.isEmpty ? 'Required' : null,
                ),
                const SizedBox(height: 24),

                PrimaryButton(
                  label: _isLoading ? 'Updating...' : 'Update Password',
                  onPressed: _isLoading ? null : _submit,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

Future<void> showChangePasswordDialog(
  BuildContext context, {
  required Future<void> Function(String currentPassword, String newPassword) onChangePassword,
}) {
  return showDialog(
    context: context,
    builder: (ctx) => ChangePasswordDialog(onChangePassword: onChangePassword),
  );
}
