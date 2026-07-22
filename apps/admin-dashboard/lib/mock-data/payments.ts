// ============================================================
// Mock Data — Payments Page (Matching Mockup Image 1)
// ============================================================

export type PaymentMethod = "GPay" | "Cash" | "PhonePe" | "Bank Transfer" | "UPI";
export type PaymentStatus = "RECORDED" | "CANCELLED" | "PENDING";

export interface Payment {
  id: string; // Receipt No., e.g. "#RJ-8821"
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  avatarInitials: string;
  avatarBg?: string;
  installment: string; // e.g. "8/12"
  amount: number;
  originalAmount?: number; // for strikethrough if cancelled
  method: PaymentMethod;
  date: string;
  recordedBy: string;
  status: PaymentStatus;
}

export const allPayments: Payment[] = [
  {
    id: "#RJ-8821",
    customerId: "44920",
    customerName: "Aditi Sharma",
    avatarInitials: "AS",
    customerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    installment: "8/12",
    amount: 1000,
    method: "GPay",
    date: "15 Sep 2023",
    recordedBy: "Rajesh Kumar",
    status: "RECORDED",
  },
  {
    id: "#RJ-8820",
    customerId: "44815",
    customerName: "Vikram Singh",
    avatarInitials: "VS",
    customerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    installment: "2/10",
    amount: 5000,
    method: "Cash",
    date: "14 Sep 2023",
    recordedBy: "Meera Iyer",
    status: "RECORDED",
  },
  {
    id: "#RJ-8819",
    customerId: "44782",
    customerName: "Rohan Joshi",
    avatarInitials: "RJ",
    avatarBg: "#E0E7FF",
    installment: "12/12",
    amount: 2500,
    method: "Bank Transfer",
    date: "14 Sep 2023",
    recordedBy: "Rajesh Kumar",
    status: "RECORDED",
  },
  {
    id: "#RJ-8818",
    customerId: "44102",
    customerName: "Sneha Reddy",
    avatarInitials: "SR",
    customerAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    installment: "5/12",
    amount: 1500,
    originalAmount: 1500,
    method: "PhonePe",
    date: "13 Sep 2023",
    recordedBy: "Meera Iyer",
    status: "CANCELLED",
  },
  {
    id: "#RJ-8817",
    customerId: "44089",
    customerName: "Ananya Sharma",
    avatarInitials: "AS",
    customerAvatar: "https://randomuser.me/api/portraits/women/26.jpg",
    installment: "8/12",
    amount: 1000,
    method: "GPay",
    date: "12 Sep 2023",
    recordedBy: "Rajesh Kumar",
    status: "RECORDED",
  },
  {
    id: "#RJ-8816",
    customerId: "43990",
    customerName: "Suresh Iyer",
    avatarInitials: "SI",
    avatarBg: "#FEE2E2",
    installment: "3/12",
    amount: 2000,
    method: "Cash",
    date: "11 Sep 2023",
    recordedBy: "Meera Iyer",
    status: "RECORDED",
  },
];

export const paymentStats = {
  todayInstallments: 24,
  todayCollection: 48000,
  cashCollection: 12000,
  digitalCollection: 36000,
};
