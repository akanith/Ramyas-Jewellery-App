import Avatar from "@/components/common/Avatar";
import { type Payment } from "@/lib/mock-data/payments";
import { formatINR, cn } from "@/lib/utils";

interface PaymentTableProps {
  payments: Payment[];
}

const methodBadges: Record<string, string> = {
  GPay: "bg-amber-100/70 text-amber-800 border-amber-200/50",
  Cash: "bg-stone-100 text-stone-700 border-stone-200",
  "Bank Transfer": "bg-sky-100 text-sky-800 border-sky-200",
  PhonePe: "bg-purple-100/70 text-purple-800 border-purple-200/50",
  UPI: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function PaymentTable({ payments }: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-stone-400">
        No payment records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-stone-100 bg-stone-50/50">
            {[
              "RECEIPT NO.",
              "DATE",
              "CUSTOMER",
              "INSTALLMENT",
              "AMOUNT",
              "METHOD",
              "RECORDED BY",
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
          {payments.map((p) => {
            const isCancelled = p.status === "CANCELLED";
            return (
              <tr
                key={p.id}
                className="hover:bg-cream-50/80 transition-colors group"
              >
                {/* RECEIPT NO */}
                <td className="px-5 py-4 text-xs font-bold text-primary whitespace-nowrap">
                  {p.id}
                </td>

                {/* DATE */}
                <td className="px-5 py-4 text-xs text-stone-700 font-medium whitespace-nowrap">
                  <div className="leading-tight">
                    <span className="block font-bold">{p.date.split(" ")[0]}</span>
                    <span className="block text-stone-400 text-2xs">
                      {p.date.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                </td>

                {/* CUSTOMER */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={p.customerName}
                      src={p.customerAvatar}
                      bgColor={p.avatarBg}
                      size="sm"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900 leading-tight">
                        {p.customerName}
                      </p>
                      <p className="text-2xs text-stone-400 font-mono mt-0.5">
                        ID: {p.customerId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* INSTALLMENT */}
                <td className="px-5 py-4 text-xs font-semibold text-stone-700 whitespace-nowrap">
                  {p.installment}
                </td>

                {/* AMOUNT */}
                <td className="px-5 py-4 text-xs font-bold text-stone-900 whitespace-nowrap">
                  {isCancelled ? (
                    <span className="line-through text-stone-400">
                      {formatINR(p.originalAmount ?? p.amount)}
                    </span>
                  ) : (
                    formatINR(p.amount)
                  )}
                </td>

                {/* METHOD */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "inline-block px-2.5 py-0.5 text-2xs font-extrabold tracking-wider uppercase rounded-md border",
                      methodBadges[p.method] ?? "bg-stone-100 text-stone-700"
                    )}
                  >
                    {p.method}
                  </span>
                </td>

                {/* RECORDED BY */}
                <td className="px-5 py-4 text-xs font-medium text-stone-700 whitespace-nowrap">
                  {p.recordedBy}
                </td>

                {/* STATUS */}
                <td className="px-5 py-4 whitespace-nowrap">
                  {p.status === "RECORDED" ? (
                    <span className="inline-flex items-center gap-1.5 text-2xs font-extrabold text-emerald-700 tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      RECORDED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-2xs font-extrabold text-rose-600 tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      CANCELLED
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
