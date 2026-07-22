import 'package:equatable/equatable.dart';

/// Shop Information data model.
class ShopInfoModel extends Equatable {
  final String name;
  final double rating;
  final int trustedSinceYear;
  final String tagline;
  final bool isOpenNow;
  final String closingTime;
  final String address;
  final String workingHours;
  final String weeklyHoliday;
  final String email;
  final String phone;
  final String whatsapp;
  final String mapUrl;

  const ShopInfoModel({
    required this.name,
    required this.rating,
    required this.trustedSinceYear,
    required this.tagline,
    required this.isOpenNow,
    required this.closingTime,
    required this.address,
    required this.workingHours,
    required this.weeklyHoliday,
    required this.email,
    required this.phone,
    required this.whatsapp,
    required this.mapUrl,
  });

  @override
  List<Object?> get props => [
        name,
        rating,
        trustedSinceYear,
        tagline,
        isOpenNow,
        closingTime,
        address,
        workingHours,
        weeklyHoliday,
        email,
        phone,
        whatsapp,
        mapUrl,
      ];
}
