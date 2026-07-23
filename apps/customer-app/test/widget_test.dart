import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:ramyas_customer_app/main.dart';

void main() {
  testWidgets('App smoke test initializes RamyasCustomerApp', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: RamyasCustomerApp(),
      ),
    );

    expect(find.byType(RamyasCustomerApp), findsOneWidget);
  });
}
