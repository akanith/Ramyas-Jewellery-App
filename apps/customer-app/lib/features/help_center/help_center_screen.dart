import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/theme/app_colors.dart';
import '../../core/theme/app_text_styles.dart';
import '../../core/widgets/accordion_tile.dart';
import '../../core/widgets/custom_app_bar.dart';
import '../../core/widgets/custom_bottom_nav.dart';
import '../../providers/app_data_providers.dart';

class HelpCenterScreen extends ConsumerStatefulWidget {
  const HelpCenterScreen({super.key});

  @override
  ConsumerState<HelpCenterScreen> createState() => _HelpCenterScreenState();
}

class _HelpCenterScreenState extends ConsumerState<HelpCenterScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final faqsAsync = ref.watch(faqsProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: CustomAppBar(
        title: 'Help Center',
        showBackButton: true,
        onBackPressed: () => Navigator.of(context).maybePop(),
        actions: [
          IconButton(
            icon: const Icon(Icons.search, color: AppColors.primary),
            onPressed: () {},
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Search Input Field
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border, width: 1),
                ),
                child: TextField(
                  controller: _searchController,
                  onChanged: (val) {
                    setState(() {
                      _searchQuery = val.toLowerCase();
                    });
                  },
                  decoration: InputDecoration(
                    hintText: 'Search for help',
                    hintStyle: AppTextStyles.bodyMedium.copyWith(
                      color: AppColors.textMuted,
                      fontSize: 14,
                    ),
                    prefixIcon: const Icon(
                      Icons.search,
                      color: AppColors.textMuted,
                      size: 22,
                    ),
                    filled: true,
                    fillColor: Colors.white,
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 24),

              // Section Title: Popular Questions
              Text(
                'Popular Questions',
                style: AppTextStyles.h2.copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),

              const SizedBox(height: 16),

              // Accordion List Tiles
              faqsAsync.when(
                data: (faqs) {
                  final filteredFaqs = faqs.where((faq) {
                    if (_searchQuery.isEmpty) return true;
                    return faq.question.toLowerCase().contains(_searchQuery) ||
                        faq.answer.toLowerCase().contains(_searchQuery);
                  }).toList();

                  if (filteredFaqs.isEmpty) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 24),
                      child: Center(
                        child: Text(
                          'No matching questions found.',
                          style: AppTextStyles.bodyMedium.copyWith(color: AppColors.textMuted),
                        ),
                      ),
                    );
                  }

                  return Column(
                    children: filteredFaqs.map((faq) {
                      return AccordionTile(
                        title: faq.question,
                        content: faq.answer,
                      );
                    }).toList(),
                  );
                },
                loading: () => const Padding(
                  padding: EdgeInsets.all(24),
                  child: Center(
                    child: CircularProgressIndicator(color: AppColors.primary),
                  ),
                ),
                error: (err, stack) => Text('Error loading FAQs: $err'),
              ),

              const SizedBox(height: 20),

              // "Still need help?" Info Card with headset graphic
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.border, width: 1),
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 20, right: 20, top: 24, bottom: 20),
                      child: Column(
                        children: [
                          Text(
                            'Still need help?',
                            style: AppTextStyles.h2.copyWith(
                              fontSize: 22,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Our support team is here to assist you.',
                            style: AppTextStyles.bodyMedium.copyWith(
                              color: AppColors.textSecondary,
                              fontSize: 14,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 20),
                          Row(
                            children: [
                              Expanded(
                                child: ElevatedButton.icon(
                                  onPressed: () {},
                                  icon: const Icon(Icons.phone_outlined, size: 18),
                                  label: const Text(
                                    'Call Shop',
                                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                                  ),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(vertical: 12),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(25),
                                    ),
                                    elevation: 0,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: ElevatedButton.icon(
                                  onPressed: () {},
                                  icon: const Icon(Icons.chat_outlined, size: 18),
                                  label: const Text(
                                    'WhatsApp\nShop',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, height: 1.1),
                                  ),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(vertical: 10),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(25),
                                    ),
                                    elevation: 0,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    // Headset Support Graphic Container
                    Container(
                      width: double.infinity,
                      height: 100,
                      decoration: const BoxDecoration(
                        color: Color(0xFFF2F2F2),
                        borderRadius: BorderRadius.vertical(bottom: Radius.circular(19)),
                      ),
                      child: Center(
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: const BoxDecoration(
                            color: Colors.transparent,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.headset_mic_outlined,
                            size: 48,
                            color: AppColors.textMuted,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),

      // Custom Bottom Navigation Bar
      bottomNavigationBar: CustomBottomNav(
        currentIndex: 3, // Active Help / Account tab
        onTap: (index) {
          if (index == 0) context.go('/home');
          if (index == 1) context.go('/passbook');
          if (index == 2) context.go('/notifications');
          if (index == 3) context.go('/profile');
        },
      ),
    );
  }
}
