import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0–100
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2.5",
};

function getBarColor(value: number): string {
  if (value === 100) return "bg-green-600";
  if (value >= 75) return "bg-gold";
  if (value >= 50) return "bg-amber-500";
  return "bg-primary";
}

export default function ProgressBar({
  value,
  size = "sm",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor = getBarColor(clamped);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          sizeMap[size]
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
