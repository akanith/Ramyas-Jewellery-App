import Avatar from "@/components/common/Avatar";
import { formatINR, cn } from "@/lib/utils";

export type RedemptionStatus = "Ready" | "Redeemed" | "Pending Verification";

export interface RedemptionItem {
  id: string; // e.g. "RJ-2023-441"
  name: string;
  phone: string;
  avatarInitials: string;
  avatarBg?: string;
  avatarPhoto?: string;
  scheme: string;
  paidAmount: number;
  bonusAmount: number;
  eligibleValue: number;
  status: RedemptionStatus;
}

export const redemptionList: RedemptionItem[] = [
  {
    id: "RJ-2023-441",
    name: "Ananya Sharma",
    phone: "+91 98765 43210",
    avatarInitials: "AS",
    avatarPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    scheme: "Diwali Savings Scheme",
    paidAmount: 12000,
    bonusAmount: 1000,
    eligibleValue: 13000,
    status: "Ready",
  },
  {
    id: "RJ-2023-512",
    name: "Rajesh Kumar",
    phone: "+91 99001 22334",
    avatarInitials: "RK",
    avatarPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    scheme: "Diwali Savings Scheme",
    paidAmount: 24000,
    bonusAmount: 2000,
    eligibleValue: 26000,
    status: "Redeemed",
  },
  {
    id: "RJ-2023-602",
    name: "Priya Mehta",
    phone: "+91 91223 34455",
    avatarInitials: "PM",
    avatarPhoto: "https://randomuser.me/api/portraits/women/26.jpg",
    scheme: "Diwali Savings Scheme",
    paidAmount: 60000,
    bonusAmount: 5000,
    eligibleValue: 65000,
    status: "Pending Verification",
  },
  {
    id: "RJ-2023-388",
    name: "Suresh Varma",
    phone: "+91 95566 77889",
    avatarInitials: "SV",
    avatarBg: "#E0E7FF",
    scheme: "Diwali Savings Scheme",
    paidAmount: 12000,
    bonusAmount: 1000,
    eligibleValue: 13000,
    status: "Ready",
  },
];

interface RedemptionTableProps {
  items: RedemptionItem[];
}

export default function RedemptionTable({ items }: RedemptionTableProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-stone-400">
        No redemption records match the filter.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-stone-100 bg-stone-50/50">
            {[
              "CUSTOMER ID",
              "CUSTOMER NAME",
              "SCHEME NAME",
              "PAID AMOUNT",
              "BONUS",
              "ELIGIBLE VALUE",
              "STATUS",
            ].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-2xs font-extrabold tracking-wider text-stone-400 uppercase whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-cream-50/80 transition-colors">
              
              {/* CUSTOMER ID */}
              <td className="px-5 py-4 text-xs font-bold text-stone-800 whitespace-nowrap">
                {item.id}
              </td>

              {/* CUSTOMER NAME */}
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={item.name}
                    src={item.avatarPhoto}
                    bgColor={item.avatarBg}
                    size="sm"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-2xs text-stone-400 mt-0.5 font-medium">
                      {item.phone}
                    </p>
                  </div>
                </div>
              </td>

              {/* SCHEME NAME */}
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block px-3 py-1 bg-amber-100/70 text-amber-900 text-2xs font-bold rounded-full">
                  {item.scheme}
                </span>
              </td>

              {/* PAID AMOUNT */}
              <td className="px-5 py-4 text-xs font-bold text-stone-800 whitespace-nowrap">
                {formatINR(item.paidAmount)}
              </td>

              {/* BONUS */}
              <td className="px-5 py-4 text-xs font-bold text-emerald-700 whitespace-nowrap">
                + {formatINR(item.bonusAmount)}
              </td>

              {/* ELIGIBLE VALUE */}
              <td className="px-5 py-4 text-xs font-extrabold text-stone-900 whitespace-nowrap">
                {formatINR(item.eligibleValue)}
              </td>

              {/* STATUS */}
              <td className="px-5 py-4 whitespace-nowrap">
                {item.status === "Ready" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-2xs font-bold bg-emerald-100/70 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Ready
                  </span>
                )}
                {item.status === "Redeemed" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-2xs font-bold bg-stone-200/70 text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                    Redeemed
                  </span>
                )}
                {item.status === "Pending Verification" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-2xs font-bold bg-amber-100 text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    Pending Verification
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
