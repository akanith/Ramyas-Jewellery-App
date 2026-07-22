// ============================================================
// Mock Data — Customers
// ============================================================

export type CustomerStatus =
  | "active"
  | "completed"
  | "pending_installment"
  | "ready_for_redemption"
  | "inactive";

export interface InstallmentRecord {
  month: string;
  monthNumber: number;
  date: string | null;
  paymentMethod: string | null;
  reference?: string;
  status: "paid" | "pending" | "upcoming" | "grouped";
  groupLabel?: string;
  amount?: number;
}

export interface Customer {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatarTextColor: string;
  photo?: string;
  mobile: string;
  scheme: string;
  status: CustomerStatus;
  installmentsPaid: number;
  totalInstallments: number;
  percentage: number;
  joinDate: string;
  address: string;
  paidAmount: number;
  remainingCredit: number;
  bonusCredit: number;
  nextPayment: string;
  matureDate: string;
  startDate: string;
  totalEligibleValue: number;
  notes: string;
  installments: InstallmentRecord[];
}

export const customers: Customer[] = [
  {
    id: "RJ-2023-441",
    name: "Ananya Sharma",
    initials: "AS",
    avatarColor: "#7B1C1C",
    avatarTextColor: "#fff",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    mobile: "+91 98765 43210",
    scheme: "Swarna Nidhi",
    status: "active",
    installmentsPaid: 8,
    totalInstallments: 12,
    percentage: 66,
    joinDate: "Jan 05, 2023",
    address: "123, Luxury Lane, Bangalore",
    paidAmount: 8000,
    remainingCredit: 4000,
    bonusCredit: 1000,
    nextPayment: "AUGUST",
    matureDate: "Dec 2023",
    startDate: "Jan 2023",
    totalEligibleValue: 13000,
    notes:
      "Customer requested reminder via WhatsApp 2 days before the due date. Interested in the Diwali 2024 limited collection. Prefers antique finish jewelry.",
    installments: [
      {
        month: "January 2023",
        monthNumber: 1,
        date: "Jan 05",
        paymentMethod: "Cash Payment",
        status: "paid",
        amount: 1000,
      },
      {
        month: "February 2023",
        monthNumber: 2,
        date: "Feb 02",
        paymentMethod: "GPay",
        reference: "Ref: 992811",
        status: "paid",
        amount: 1000,
      },
      {
        month: "March 2023",
        monthNumber: 3,
        date: "Mar 04",
        paymentMethod: "Cash Payment",
        status: "paid",
        amount: 1000,
      },
      {
        month: "April — July Payments Completed",
        monthNumber: 4,
        date: null,
        paymentMethod: null,
        status: "grouped",
        groupLabel: "April — July Payments Completed",
        amount: 4000,
      },
      {
        month: "August 2023",
        monthNumber: 8,
        date: "Due by Aug 15",
        paymentMethod: "Recurring ₹1,000",
        status: "pending",
        amount: 1000,
      },
      {
        month: "Sept — Dec 2023",
        monthNumber: 9,
        date: null,
        paymentMethod: null,
        status: "upcoming",
        groupLabel: "UPCOMING CYCLES",
      },
    ],
  },
  {
    id: "RJ-2023-512",
    name: "Rajesh Kumar",
    initials: "RK",
    avatarColor: "#C9A84C",
    avatarTextColor: "#fff",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    mobile: "+91 99001 22334",
    scheme: "Diamond Monthly",
    status: "completed",
    installmentsPaid: 12,
    totalInstallments: 12,
    percentage: 100,
    joinDate: "Feb 10, 2023",
    address: "45, MG Road, Mysore",
    paidAmount: 12000,
    remainingCredit: 0,
    bonusCredit: 1000,
    nextPayment: "—",
    matureDate: "Jan 2024",
    startDate: "Feb 2023",
    totalEligibleValue: 13000,
    notes: "Prefers gold coins. Completed scheme on time. Regular customer since 2019.",
    installments: [
      { month: "February 2023", monthNumber: 1, date: "Feb 10", paymentMethod: "GPay", status: "paid", amount: 1000 },
      { month: "March 2023", monthNumber: 2, date: "Mar 10", paymentMethod: "Cash", status: "paid", amount: 1000 },
      { month: "Apr–Dec 2023", monthNumber: 3, date: null, paymentMethod: null, status: "grouped", groupLabel: "Apr — Dec 2023 Payments Completed", amount: 9000 },
      { month: "January 2024", monthNumber: 12, date: "Jan 10", paymentMethod: "GPay", status: "paid", amount: 1000 },
    ],
  },
  {
    id: "RJ-2023-102",
    name: "Vikram Patil",
    initials: "VP",
    avatarColor: "#1C4E3D",
    avatarTextColor: "#fff",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    mobile: "+91 91234 56789",
    scheme: "Swarna Nidhi",
    status: "active",
    installmentsPaid: 3,
    totalInstallments: 12,
    percentage: 25,
    joinDate: "May 20, 2023",
    address: "78, Shivaji Nagar, Pune",
    paidAmount: 3000,
    remainingCredit: 9000,
    bonusCredit: 1000,
    nextPayment: "AUGUST",
    matureDate: "Apr 2024",
    startDate: "May 2023",
    totalEligibleValue: 13000,
    notes: "New customer. First-time scheme member. Prefers phone call reminders.",
    installments: [
      { month: "May 2023", monthNumber: 1, date: "May 20", paymentMethod: "Cash", status: "paid", amount: 1000 },
      { month: "June 2023", monthNumber: 2, date: "Jun 20", paymentMethod: "PhonePe", status: "paid", amount: 1000 },
      { month: "July 2023", monthNumber: 3, date: "Jul 20", paymentMethod: "Cash", status: "paid", amount: 1000 },
      { month: "August 2023", monthNumber: 4, date: "Due by Aug 20", paymentMethod: "Recurring ₹1,000", status: "pending", amount: 1000 },
      { month: "Sept 2023 — Apr 2024", monthNumber: 5, date: null, paymentMethod: null, status: "upcoming", groupLabel: "UPCOMING CYCLES" },
    ],
  },
  {
    id: "RJ-2023-009",
    name: "Meera Lakshmi",
    initials: "ML",
    avatarColor: "#6B7280",
    avatarTextColor: "#fff",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    mobile: "+91 97765 11223",
    scheme: "Gold Savings",
    status: "ready_for_redemption",
    installmentsPaid: 12,
    totalInstallments: 12,
    percentage: 100,
    joinDate: "Sep 01, 2022",
    address: "12, Anna Nagar, Chennai",
    paidAmount: 12000,
    remainingCredit: 0,
    bonusCredit: 1000,
    nextPayment: "—",
    matureDate: "Aug 2023",
    startDate: "Sep 2022",
    totalEligibleValue: 13000,
    notes: "Ready to redeem. Interested in wedding jewellery set. Appointment scheduled for Sept 20.",
    installments: [
      { month: "Sep 2022 — Aug 2023", monthNumber: 1, date: null, paymentMethod: null, status: "grouped", groupLabel: "All 12 Payments Completed", amount: 12000 },
    ],
  },
  {
    id: "RJ-2023-178",
    name: "Priya Menon",
    initials: "PM",
    avatarColor: "#4C1D95",
    avatarTextColor: "#fff",
    photo: "https://randomuser.me/api/portraits/women/26.jpg",
    mobile: "+91 93456 78901",
    scheme: "Swarna Nidhi",
    status: "pending_installment",
    installmentsPaid: 5,
    totalInstallments: 12,
    percentage: 42,
    joinDate: "Mar 15, 2023",
    address: "56, Koramangala, Bangalore",
    paidAmount: 5000,
    remainingCredit: 7000,
    bonusCredit: 1000,
    nextPayment: "AUGUST",
    matureDate: "Feb 2024",
    startDate: "Mar 2023",
    totalEligibleValue: 13000,
    notes: "Payment overdue for August. Follow up required.",
    installments: [
      { month: "Mar–Jul 2023", monthNumber: 1, date: null, paymentMethod: null, status: "grouped", groupLabel: "Mar — Jul 2023 Completed", amount: 5000 },
      { month: "August 2023", monthNumber: 6, date: "Due by Aug 15", paymentMethod: "Recurring ₹1,000", status: "pending", amount: 1000 },
      { month: "Sept 2023 — Feb 2024", monthNumber: 7, date: null, paymentMethod: null, status: "upcoming", groupLabel: "UPCOMING CYCLES" },
    ],
  },
  {
    id: "RJ-2023-224",
    name: "Suresh Iyer",
    initials: "SI",
    avatarColor: "#0F4C81",
    avatarTextColor: "#fff",
    photo: "https://randomuser.me/api/portraits/men/62.jpg",
    mobile: "+91 87654 32109",
    scheme: "Diamond Monthly",
    status: "inactive",
    installmentsPaid: 2,
    totalInstallments: 12,
    percentage: 17,
    joinDate: "Jun 10, 2023",
    address: "90, Adyar, Chennai",
    paidAmount: 2000,
    remainingCredit: 10000,
    bonusCredit: 1000,
    nextPayment: "—",
    matureDate: "May 2024",
    startDate: "Jun 2023",
    totalEligibleValue: 13000,
    notes: "Account temporarily inactive. Customer to be contacted.",
    installments: [
      { month: "June 2023", monthNumber: 1, date: "Jun 10", paymentMethod: "Cash", status: "paid", amount: 1000 },
      { month: "July 2023", monthNumber: 2, date: "Jul 10", paymentMethod: "GPay", status: "paid", amount: 1000 },
      { month: "Aug 2023 — May 2024", monthNumber: 3, date: null, paymentMethod: null, status: "upcoming", groupLabel: "UPCOMING CYCLES" },
    ],
  },
];

export const getCustomerById = (id: string): Customer | undefined =>
  customers.find((c) => c.id === id);

export const getStatusLabel = (status: CustomerStatus): string => {
  const labels: Record<CustomerStatus, string> = {
    active: "Active",
    completed: "Completed",
    pending_installment: "Pending Installment",
    ready_for_redemption: "Ready for Redemption",
    inactive: "Inactive",
  };
  return labels[status];
};

export const getStatusColors = (
  status: CustomerStatus
): { bg: string; text: string } => {
  const colors: Record<CustomerStatus, { bg: string; text: string }> = {
    active: { bg: "bg-green-50", text: "text-green-700" },
    completed: { bg: "bg-blue-50", text: "text-blue-700" },
    pending_installment: { bg: "bg-amber-50", text: "text-amber-700" },
    ready_for_redemption: { bg: "bg-purple-50", text: "text-purple-700" },
    inactive: { bg: "bg-gray-100", text: "text-gray-600" },
  };
  return colors[status];
};

export const getProgressColor = (pct: number): string => {
  if (pct === 100) return "bg-green-600";
  if (pct >= 60) return "bg-gold";
  if (pct >= 30) return "bg-amber-500";
  return "bg-primary";
};

export const getPercentageTextColor = (pct: number): string => {
  if (pct === 100) return "text-green-600";
  if (pct >= 60) return "text-gold-dark";
  if (pct >= 30) return "text-amber-600";
  return "text-primary";
};
