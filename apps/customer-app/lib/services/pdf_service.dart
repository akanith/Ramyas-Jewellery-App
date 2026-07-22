import '../models/customer_model.dart';
import '../models/installment_model.dart';
import '../models/scheme_model.dart';

/// PDF Service for generating downloadable digital passbooks.
class PdfService {
  /// Generates printable HTML string for Customer Passbook
  String generatePassbookHtml({
    required CustomerModel customer,
    required SchemeModel scheme,
    required List<InstallmentModel> installments,
  }) {
    final rows = installments.map((item) {
      return '''
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">#${item.installmentNumber}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.monthYearLabel} (${item.date})</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">₹${item.amount.toInt()}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.method}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #1E8E3E; font-weight: bold;">PAID</td>
        </tr>
      ''';
    }).join('\n');

    return '''
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Passbook Statement - ${customer.name}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #2D2D2D; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #8C1D40; padding-bottom: 15px; }
          .title { color: #8C1D40; font-size: 24px; font-weight: bold; margin: 0; }
          .subtitle { color: #666; font-size: 13px; margin-top: 4px; }
          .card { background: #FAFAFA; border: 1px solid #EAEAEA; border-radius: 12px; padding: 20px; margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #8C1D40; color: white; padding: 10px; text-align: left; font-size: 12px; }
          .footer { text-align: center; margin-top: 40px; color: #888; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">Ramyas Jeweller</h1>
            <p class="subtitle">Digital Savings Passbook Statement</p>
          </div>
          <div style="text-align: right;">
            <strong>Customer ID:</strong> ${customer.id}<br>
            <strong>Date:</strong> ${DateTime.now().toString().split(' ')[0]}
          </div>
        </div>

        <div class="card">
          <h3 style="margin-top:0; color: #8C1D40;">${scheme.name} Summary</h3>
          <p><strong>Customer Name:</strong> ${customer.name} (${customer.mobileNumber})</p>
          <p><strong>Paid Installments:</strong> ${scheme.paidInstallmentsCount} of ${scheme.totalInstallmentsCount}</p>
          <p><strong>Total Accumulated:</strong> ₹${scheme.accumulatedTotal.toInt()} | <strong>Maturity Value:</strong> ₹${scheme.maturityTotalValue.toInt()}</p>
        </div>

        <h3>Installment Payment History</h3>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>DATE / MONTH</th>
              <th>AMOUNT</th>
              <th>METHOD</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            $rows
          </tbody>
        </table>

        <div class="footer">
          <p>Thank you for investing with Ramyas Jeweller. Official digital copy.</p>
        </div>
      </body>
      </html>
    ''';
  }
}
