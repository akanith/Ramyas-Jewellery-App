// ============================================================
// Mock Data — Installments / Payment Records
// ============================================================

export interface PaymentRecord {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: "GPay" | "Cash" | "PhonePe" | "UPI" | "NetBanking";
  reference?: string;
  date: string;
  time: string;
  installmentNumber: number;
  totalInstallments: number;
  status: "paid" | "failed" | "pending";
  recordedBy: string;
}

export const installmentRecords: PaymentRecord[] = [
  {
    id: "INS-2023-001",
    customerId: "RJ-2023-441",
    customerName: "Ananya Sharma",
    amount: 1000,
    method: "Cash",
    date: "Jan 05, 2023",
    time: "10:30 AM",
    installmentNumber: 1,
    totalInstallments: 12,
    status: "paid",
    recordedBy: "Owner",
  },
  {
    id: "INS-2023-002",
    customerId: "RJ-2023-441",
    customerName: "Ananya Sharma",
    amount: 1000,
    method: "GPay",
    reference: "992811",
    date: "Feb 02, 2023",
    time: "11:15 AM",
    installmentNumber: 2,
    totalInstallments: 12,
    status: "paid",
    recordedBy: "Owner",
  },
  {
    id: "INS-2023-003",
    customerId: "RJ-2023-441",
    customerName: "Ananya Sharma",
    amount: 1000,
    method: "Cash",
    date: "Mar 04, 2023",
    time: "10:00 AM",
    installmentNumber: 3,
    totalInstallments: 12,
    status: "paid",
    recordedBy: "Owner",
  },
  {
    id: "INS-2023-010",
    customerId: "RJ-2023-512",
    customerName: "Rajesh Kumar",
    amount: 1000,
    method: "GPay",
    reference: "GUY8829",
    date: "Feb 10, 2023",
    time: "09:45 AM",
    installmentNumber: 1,
    totalInstallments: 12,
    status: "paid",
    recordedBy: "Owner",
  },
  {
    id: "INS-2023-020",
    customerId: "RJ-2023-102",
    customerName: "Vikram Patil",
    amount: 1000,
    method: "PhonePe",
    date: "Jun 20, 2023",
    time: "02:30 PM",
    installmentNumber: 2,
    totalInstallments: 12,
    status: "paid",
    recordedBy: "Owner",
  },
];

export const getInstallmentsByCustomerId = (
  customerId: string
): PaymentRecord[] =>
  installmentRecords.filter((r) => r.customerId === customerId);
