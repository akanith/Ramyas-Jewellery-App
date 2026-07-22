import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  change?: number;
  icon?: LucideIcon;
  className?: string;
  valueClassName?: string;
}

export default function StatCard({
  label,
  value,
  subtext,
  change,
  icon: Icon,
  className,
  valueClassName,
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("bg-white rounded-2xl p-5 shadow-card", className)}>
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
          <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
        </div>
      )}
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p
        className={cn(
          "text-2xl font-bold text-gray-900 tracking-tight",
          valueClassName
        )}
      >
        {value}
      </p>
      {(subtext || change !== undefined) && (
        <div className="flex items-center gap-1 mt-1">
          {change !== undefined && (
            <span
              className={cn(
                "text-xs font-semibold flex items-center gap-0.5",
                isPositive ? "text-green-600" : "text-red-500"
              )}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(change)}%
            </span>
          )}
          {subtext && (
            <span className="text-xs text-gray-400">{subtext}</span>
          )}
        </div>
      )}
    </div>
  );
}
