import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';

/// Real-time connectivity listener service.
class ConnectivityService {
  final Connectivity _connectivity = Connectivity();
  final StreamController<bool> _controller = StreamController<bool>.broadcast();

  ConnectivityService() {
    _init();
  }

  Stream<bool> get isConnectedStream => _controller.stream;

  void _init() {
    _connectivity.onConnectivityChanged.listen((List<ConnectivityResult> results) {
      final isConnected = results.any((r) => r != ConnectivityResult.none);
      _controller.add(isConnected);
    });
  }

  Future<bool> checkConnection() async {
    final results = await _connectivity.checkConnectivity();
    return results.any((r) => r != ConnectivityResult.none);
  }

  void dispose() {
    _controller.close();
  }
}
