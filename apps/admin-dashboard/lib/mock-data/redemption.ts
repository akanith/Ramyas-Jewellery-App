// ============================================================
// Mock Data — Redemption & Settlement
// ============================================================

export interface RedemptionRecord {
  id: string;
  customerId: string;
  customerName: string;
  scheme: string;
  totalPaidAmount: number; // e.g. 12,000
  shopBonus: number; // e.g. 1,000
  netEligibleValue: number; // e.g. 13,000
  goldRateAtMaturity: number; // e.g. 6,850 per gram
  equivalentGoldGrams: number; // e.g. 1.897g
  status: "pending_approval" | "approved" | "redeemed" | "cancelled";
  redemptionType?: "gold_ornament" | "gold_coin" | "cash_voucher";
  maturedDate: string;
  redeemedDate?: string;
  approvedBy?: string;
}

export const redemptionRecords: RedemptionRecord[] = [
  {
    id: "RDM-2023-441",
    customerId: "RJ-2023-441",
    customerName: "Ananya Sharma",
    scheme: "Diwali Savings Scheme",
    totalPaidAmount: 12000,
    shopBonus: 1000,
    netEligibleValue: 13000,
    goldRateAtMaturity: 6850,
    equivalentGoldGrams: 1.897,
    status: "approved",
    redemptionType: "gold_ornament",
    maturedDate: "2023-09-01",
    approvedBy: "Rajesh Kumar (Owner)",
  },
  {
    id: "RDM-2023-602",
    customerId: "RJ-2023-602",
    customerName: "Priya Mehta",
    scheme: "Diwali Savings Scheme",
    totalPaidAmount: 60000,
    shopBonus: 5000,
    netEligibleValue: 65000,
    goldRateAtMaturity: 6850,
    equivalentGoldGrams: 9.489,
    status: "pending_approval",
    maturedDate: "2023-09-10",
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
    id: "diwali-savings-scheme",
    name: "Diwali Savings Scheme",
    monthlyAmount: 1000,
    duration: 12,
    bonusAmount: 1000,
    description: "12-month Diwali gold accumulation scheme with 1 month bonus",
  },
];
