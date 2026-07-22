import '../services/supabase_service.dart';
import 'supabase_auth_repository.dart';

/// Legacy mock wrapper forwarding directly to SupabaseAuthRepository.
class MockAuthRepository extends SupabaseAuthRepository {
  MockAuthRepository() : super(SupabaseService());
}
