import '../services/supabase_service.dart';
import 'supabase_savings_repository.dart';

/// Legacy mock wrapper forwarding to Supabase service.
class MockShopRepository extends SupabaseSavingsRepository {
  MockShopRepository() : super(SupabaseService());
}
