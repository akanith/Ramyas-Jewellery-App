import { Edit3, CheckCircle2 } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface SchemeCardProps {
  id: string;
  name: string;
  monthlyAmount: number;
  duration: number;
  bonusAmount: number;
  description: string;
  activeCount?: number;
}

export default function SchemeCard({
  name,
  monthlyAmount,
  duration,
  bonusAmount,
  description,
  activeCount,
}: SchemeCardProps) {
  const totalValue = monthlyAmount * duration + bonusAmount;

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 border border-gray-100 hover:border-primary/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-gray-900">{name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
        <button className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
          <Edit3 className="w-3.5 h-3.5 text-gray-500" strokeWidth={2} />
        </button>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-cream-50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-gray-900">{formatINR(monthlyAmount)}</p>
          <p className="text-2xs text-gray-400 mt-0.5">Monthly</p>
        </div>
        <div className="bg-cream-50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-gray-900">{duration}</p>
          <p className="text-2xs text-gray-400 mt-0.5">Months</p>
        </div>
        <div className="bg-gold-50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-gold-dark">+{formatINR(bonusAmount)}</p>
          <p className="text-2xs text-gray-400 mt-0.5">Bonus</p>
        </div>
      </div>

      {/* Total value */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p className="text-2xs text-gray-400 uppercase tracking-wider">Total Eligible Value</p>
          <p className="text-base font-black text-primary mt-0.5">{formatINR(totalValue)}</p>
        </div>
        {activeCount !== undefined && (
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" strokeWidth={2} />
            <span className="text-xs font-semibold text-gray-600">
              {activeCount} active customers
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
