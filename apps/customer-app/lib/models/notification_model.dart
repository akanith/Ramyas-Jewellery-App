import 'package:equatable/equatable.dart';

enum NotificationType {
  installment,
  goldRate,
  reminder,
  offer,
  shopHoliday,
}

enum NotificationGroup {
  today,
  thisWeek,
  earlier,
}

/// Notification item data model.
class NotificationModel extends Equatable {
  final String id;
  final String title;
  final String description;
  final String timestamp;
  final NotificationGroup group;
  final NotificationType type;
  final bool isUnread;

  const NotificationModel({
    required this.id,
    required this.title,
    required this.description,
    required this.timestamp,
    required this.group,
    required this.type,
    this.isUnread = false,
  });

  @override
  List<Object?> get props => [
        id,
        title,
        description,
        timestamp,
        group,
        type,
        isUnread,
      ];
}
