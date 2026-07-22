import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/faq_model.dart';
import '../models/notification_model.dart';
import '../models/shop_info_model.dart';
import '../services/connectivity_service.dart';
import '../services/pdf_service.dart';
import 'providers.dart';

final pdfServiceProvider = Provider<PdfService>((ref) {
  return PdfService();
});

final connectivityServiceProvider = Provider<ConnectivityService>((ref) {
  return ConnectivityService();
});

final connectivityStreamProvider = StreamProvider<bool>((ref) {
  return ref.watch(connectivityServiceProvider).isConnectedStream;
});

final notificationsProvider = FutureProvider<List<NotificationModel>>((ref) async {
  return const [
    NotificationModel(
      id: 'n1',
      title: 'Installment Recorded',
      description: '₹1000 received for Sept installment.',
      timestamp: '10:30 AM',
      group: NotificationGroup.today,
      type: NotificationType.installment,
      isUnread: false,
    ),
    NotificationModel(
      id: 'n2',
      title: 'Gold Rate Update',
      description: "Today's 22K Gold Rate: ₹6,850/gm",
      timestamp: '09:15 AM',
      group: NotificationGroup.today,
      type: NotificationType.goldRate,
      isUnread: true,
    ),
    NotificationModel(
      id: 'n3',
      title: 'Installment Reminder',
      description: 'Oct installment due in 5 days.',
      timestamp: 'Yesterday',
      group: NotificationGroup.thisWeek,
      type: NotificationType.reminder,
      isUnread: true,
    ),
    NotificationModel(
      id: 'n4',
      title: 'Festival Offer',
      description: 'Diwali Special: No making charges! Visit our store today to explore...',
      timestamp: '2 days ago',
      group: NotificationGroup.thisWeek,
      type: NotificationType.offer,
      isUnread: false,
    ),
    NotificationModel(
      id: 'n5',
      title: 'Shop Holiday',
      description: 'Shop closed on Ganesh Chaturthi.',
      timestamp: 'Last Week',
      group: NotificationGroup.earlier,
      type: NotificationType.shopHoliday,
      isUnread: false,
    ),
  ];
});

final faqsProvider = FutureProvider<List<FaqItemModel>>((ref) async {
  return const [
    FaqItemModel(
      id: 'faq1',
      question: 'How do I pay?',
      answer: 'You can pay your installments in person at our store using Cash, UPI, Credit/Debit cards, or Net Banking. Present your scheme ID or registered phone number.',
    ),
    FaqItemModel(
      id: 'faq2',
      question: 'When will my scheme mature?',
      answer: 'Your scheme matures after completing all 12 monthly installments. On maturity, you can redeem your total deposited amount plus the bonus worth 1 month installment.',
    ),
    FaqItemModel(
      id: 'faq3',
      question: 'Can I pay late?',
      answer: 'Yes, we offer a 7-day grace period for monthly payments. If you experience unexpected delays, please reach out to our support team.',
    ),
    FaqItemModel(
      id: 'faq4',
      question: 'How do I download my passbook?',
      answer: 'Navigate to Profile > Quick Actions > Download Passbook PDF, or visit the Passbook screen and tap on the download button at the top right.',
    ),
    FaqItemModel(
      id: 'faq5',
      question: 'How do I change my password?',
      answer: 'Go to Profile > Quick Actions > Change Password to update your passcode or password securely.',
    ),
  ];
});

final shopInfoProvider = FutureProvider<ShopInfoModel>((ref) async {
  try {
    final supabase = ref.watch(supabaseServiceProvider);
    final settings = await supabase.getShopSettings();

    if (settings != null) {
      return ShopInfoModel(
        name: settings['shop_name']?.toString() ?? 'Ramyas Jeweller',
        rating: 5.0,
        trustedSinceYear: 1995,
        tagline: 'Premium Jewellery Savings Partner',
        isOpenNow: true,
        closingTime: '8:30 PM',
        address: settings['address']?.toString() ?? 'No. 124, Temple View Road, Coimbatore - 641001',
        workingHours: '10:00 AM - 08:30 PM',
        weeklyHoliday: 'Tuesday',
        email: settings['email']?.toString() ?? 'contact@ramyasjewellers.com',
        phone: settings['mobile']?.toString() ?? '+91 98765 43210',
        whatsapp: settings['mobile']?.toString() ?? '+91 98765 43210',
        mapUrl: 'https://maps.google.com',
      );
    }
  } catch (_) {}

  return const ShopInfoModel(
    name: 'Ramyas Jeweller',
    rating: 5.0,
    trustedSinceYear: 1995,
    tagline: 'Premium Jewellery Savings Partner',
    isOpenNow: true,
    closingTime: '8:30 PM',
    address: 'No. 124, Temple View Road, Opp. Sivan Temple, Retail Hub, Coimbatore - 641001',
    workingHours: '10:00 AM - 08:30 PM',
    weeklyHoliday: 'Tuesday',
    email: 'contact@ramyasjewellers.com',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    mapUrl: 'https://maps.google.com',
  );
});
