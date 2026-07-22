import '../services/supabase_service.dart';
import 'supabase_savings_repository.dart';

/// Legacy mock wrapper forwarding directly to SupabaseSavingsRepository.
class MockSavingsRepository extends SupabaseSavingsRepository {
  MockSavingsRepository() : super(SupabaseService());
}
