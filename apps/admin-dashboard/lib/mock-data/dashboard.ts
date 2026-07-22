// ============================================================
// Mock Data — Dashboard
// ============================================================

export interface PendingPayment {
  id: string;
  customerName: string;
  customerId: string;
  mobile: string;
  installmentLabel: string;
  installmentSlot: string;
  amount: number;
  method: "GPay" | "Cash" | "PhonePe" | "UPI";
  status: "overdue" | "due_today" | "due_soon";
}

export interface RecentPayment {
  id: string;
  customerName: string;
  method: string;
  time: string;
  amount: number;
}

export interface ActivityItem {
  id: string;
  type: "customer_added" | "payment_recorded" | "scheme_completed" | "customer_edited";
  title: string;
  subtitle: string;
  time: string;
  color: string;
}

export const pendingPayments: PendingPayment[] = [
  {
    id: "PP-001",
    customerName: "Ananya Sharma",
    customerId: "RJ-2023-441",
    mobile: "+91 98765 43210",
    installmentLabel: "₹2,500",
    installmentSlot: "(6/11)",
    amount: 2500,
    method: "GPay",
    status: "overdue",
  },
  {
    id: "PP-002",
    customerName: "Rajesh Kumar",
    customerId: "RJ-2023-512",
    mobile: "+91 91234 56789",
    installmentLabel: "₹5,000",
    installmentSlot: "(3/11)",
    amount: 5000,
    method: "Cash",
    status: "due_today",
  },
  {
    id: "PP-003",
    customerName: "Meera Iyer",
    customerId: "RJ-2023-302",
    mobile: "+91 88888 77777",
    installmentLabel: "₹1,000",
    installmentSlot: "(11/11)",
    amount: 1000,
    method: "PhonePe",
    status: "due_today",
  },
];

export const recentPayments: RecentPayment[] = [
  { id: "RP-001", customerName: "Sanjay Patel", method: "Cash", time: "10:45 AM", amount: 3000 },
  { id: "RP-002", customerName: "Divya Rao", method: "GPay", time: "09:30 AM", amount: 2000 },
  { id: "RP-003", customerName: "Lakshmi P.", method: "PhonePe", time: "08:15 AM", amount: 5000 },
  { id: "RP-004", customerName: "Varun Bajaj", method: "Cash", time: "Yesterday", amount: 1500 },
  { id: "RP-005", customerName: "Priya M.", method: "GPay", time: "Yesterday", amount: 2500 },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "ACT-001",
    type: "customer_added",
    title: "Customer Added",
    subtitle: "Rohan V. • 10m ago",
    time: "10m ago",
    color: "text-primary bg-primary-50",
  },
  {
    id: "ACT-002",
    type: "payment_recorded",
    title: "Payment Recorded",
    subtitle: "Sunita G. • 24m ago",
    time: "24m ago",
    color: "text-green-600 bg-green-50",
  },
  {
    id: "ACT-003",
    type: "scheme_completed",
    title: "Scheme Completed",
    subtitle: "Karan J. • 1h ago",
    time: "1h ago",
    color: "text-gold-dark bg-gold-50",
  },
  {
    id: "ACT-004",
    type: "customer_edited",
    title: "Customer Edited",
    subtitle: "Vikas D. • 2h ago",
    time: "2h ago",
    color: "text-blue-600 bg-blue-50",
  },
];

export const dashboardStats = {
  todayCollection: 18000,
  todayCollectionChange: 12,
  activeCustomers: 286,
  pendingPayments: 18,
  completedSchemes: 82,
};
