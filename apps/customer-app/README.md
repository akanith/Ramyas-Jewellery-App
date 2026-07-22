# Customer Mobile App — Flutter

The customer-facing Flutter mobile application for Ramyas Jewellers' Jewellery Savings Scheme. Built with Flutter 3, Dart 3, Riverpod 2, and GoRouter.

## Quick Start

```bash
flutter pub get
cp lib/config/env.example.dart lib/config/env.dart
# Fill in your Supabase & Firebase credentials in env.dart
flutter run
```

## Code Generation

This project uses `build_runner` for code generation (Riverpod annotations, Freezed models, JSON serialization):

```bash
dart run build_runner build --delete-conflicting-outputs
# Or watch mode during development:
dart run build_runner watch --delete-conflicting-outputs
```

## Scripts

| Command | Description |
|---|---|
| `flutter run` | Run on connected device/emulator |
| `flutter test` | Run unit & widget tests |
| `flutter analyze` | Static analysis |
| `flutter build apk --release` | Build Android release APK |
| `flutter build appbundle` | Build Android App Bundle |
| `flutter build ios --release` | Build iOS release |

## Folder Structure

```
customer-app/
├── lib/
│   ├── core/               # App entry point, app widget, error handling
│   ├── config/             # Supabase, Firebase, and app config
│   ├── models/             # Freezed data models (+ JSON serialization)
│   ├── services/           # External services (Supabase, FCM, Storage)
│   ├── repositories/       # Data repository layer (abstracts services)
│   ├── providers/          # Riverpod providers & state notifiers
│   ├── screens/            # Full-page UI screens
│   │   ├── auth/           # Login, OTP, registration
│   │   ├── home/           # Dashboard / home screen
│   │   ├── payment_history/# Payment list & details
│   │   ├── scheme/         # Scheme details & progress
│   │   ├── notifications/  # Notification centre
│   │   └── profile/        # Customer profile & settings
│   ├── widgets/            # Reusable UI components
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── dialogs/
│   │   ├── inputs/
│   │   ├── progress/
│   │   └── common/
│   ├── routes/             # GoRouter route definitions
│   ├── utils/              # Pure Dart utilities & helpers
│   ├── constants/          # App-wide constants (strings, keys, etc.)
│   └── theme/              # ThemeData, colors, text styles, spacing
├── test/                   # Unit, widget, and integration tests
├── android/                # Android platform configuration
├── ios/                    # iOS platform configuration
└── assets/                 # Images, fonts, SVGs, animations
```
