// ============================================================
// Mock Data — Redemption Records
// ============================================================

export type RedemptionStatus =
  | "pending_approval"
  | "completed"
  | "cancelled";

export interface RedemptionRecord {
  id: string;
  customerId: string;
  customerName: string;
  scheme: string;
  totalPaidAmount: number;
  shopBonus: number;
  netEligibleValue: number;
  billNumber?: string;
  billAmount?: number;
  jewelleryCategory?: string;
  balancePaid?: number;
  sweetBoxGiven: boolean;
  festivalGiftGiven: boolean;
  remarks?: string;
  completedDate?: string;
  status: RedemptionStatus;
  processedBy: string;
}

export const redemptionRecords: RedemptionRecord[] = [
  {
    id: "RDM-2023-001",
    customerId: "RJ-2023-009",
    customerName: "Meera Lakshmi",
    scheme: "Gold Savings",
    totalPaidAmount: 12000,
    shopBonus: 1000,
    netEligibleValue: 13000,
    billNumber: "INV-8829",
    billAmount: 28500,
    jewelleryCategory: "Wedding Set",
    balancePaid: 15500,
    sweetBoxGiven: true,
    festivalGiftGiven: false,
    remarks: "Customer chose a wedding jewellery set. Very happy with the scheme.",
    completedDate: "Aug 20, 2023",
    status: "completed",
    processedBy: "Owner",
  },
];

export const getRedemptionsByCustomerId = (
  customerId: string
): RedemptionRecord[] =>
  redemptionRecords.filter((r) => r.customerId === customerId);

export const getPendingRedemptions = (): RedemptionRecord[] =>
  redemptionRecords.filter((r) => r.status === "pending_approval");

export const schemeOptions = [
  {
    id: "swarna-nidhi",
    name: "Swarna Nidhi",
    monthlyAmount: 1000,
    duration: 12,
    bonusAmount: 1000,
    description: "12-month gold accumulation plan with ₹1,000 bonus",
  },
  {
    id: "diamond-monthly",
    name: "Diamond Monthly",
    monthlyAmount: 2000,
    duration: 12,
    bonusAmount: 2000,
    description: "Premium 12-month plan with higher bonus",
  },
  {
    id: "gold-savings",
    name: "Gold Savings",
    monthlyAmount: 1000,
    duration: 12,
    bonusAmount: 1000,
    description: "Flexible gold savings scheme",
  },
];
