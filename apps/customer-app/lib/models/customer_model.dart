import 'package:equatable/equatable.dart';

/// Customer profile data model.
class CustomerModel extends Equatable {
  final String id;
  final String name;
  final String mobileNumber;
  final String preferredLanguage;
  final String? profileImageUrl;

  const CustomerModel({
    required this.id,
    required this.name,
    required this.mobileNumber,
    this.preferredLanguage = 'en',
    this.profileImageUrl,
  });

  CustomerModel copyWith({
    String? id,
    String? name,
    String? mobileNumber,
    String? preferredLanguage,
    String? profileImageUrl,
  }) {
    return CustomerModel(
      id: id ?? this.id,
      name: name ?? this.name,
      mobileNumber: mobileNumber ?? this.mobileNumber,
      preferredLanguage: preferredLanguage ?? this.preferredLanguage,
      profileImageUrl: profileImageUrl ?? this.profileImageUrl,
    );
  }

  @override
  List<Object?> get props => [id, name, mobileNumber, preferredLanguage, profileImageUrl];
}
