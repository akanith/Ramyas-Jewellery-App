import 'package:equatable/equatable.dart';

/// FAQ item data model for Help Center.
class FaqItemModel extends Equatable {
  final String id;
  final String question;
  final String answer;

  const FaqItemModel({
    required this.id,
    required this.question,
    required this.answer,
  });

  @override
  List<Object?> get props => [id, question, answer];
}
