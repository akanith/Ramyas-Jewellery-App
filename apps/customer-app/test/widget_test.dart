import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:ramyas_customer_app/main.dart';

void main() {
  testWidgets('App smoke test initializes RamyasCustomerApp and settles splash timer', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: RamyasCustomerApp(),
      ),
    );

    expect(find.byType(RamyasCustomerApp), findsOneWidget);

    // Advance fake timer past the 2-second splash screen navigation delay
    await tester.pumpAndSettle(const Duration(seconds: 3));
  });
}
