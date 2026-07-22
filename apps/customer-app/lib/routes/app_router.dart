import 'package:go_router/go_router.dart';

import '../features/auth/language/language_screen.dart';
import '../features/auth/login/login_screen.dart';
import '../features/common/error_screen.dart';
import '../features/common/no_internet_screen.dart';
import '../features/help_center/help_center_screen.dart';
import '../features/home/home_screen.dart';
import '../features/notifications/notifications_screen.dart';
import '../features/passbook/passbook_screen.dart';
import '../features/privacy_policy/privacy_policy_screen.dart';
import '../features/profile/profile_screen.dart';
import '../features/receipt/receipt_screen.dart';
import '../features/shop/visit_shop_screen.dart';
import '../features/splash/splash_screen.dart';

/// Central GoRouter configuration mapping all Phase 1 & Phase 2 screens.
final appRouter = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/language',
      builder: (context, state) => const LanguageScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/passbook',
      builder: (context, state) => const PassbookScreen(),
    ),
    GoRoute(
      path: '/receipt',
      builder: (context, state) => const ReceiptScreen(),
    ),
    GoRoute(
      path: '/notifications',
      builder: (context, state) => const NotificationsScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/visit-shop',
      builder: (context, state) => const VisitShopScreen(),
    ),
    GoRoute(
      path: '/help-center',
      builder: (context, state) => const HelpCenterScreen(),
    ),
    GoRoute(
      path: '/privacy-policy',
      builder: (context, state) => const PrivacyPolicyScreen(),
    ),
    GoRoute(
      path: '/error',
      builder: (context, state) => const ErrorScreen(),
    ),
    GoRoute(
      path: '/no-internet',
      builder: (context, state) => const NoInternetScreen(),
    ),
  ],
);

