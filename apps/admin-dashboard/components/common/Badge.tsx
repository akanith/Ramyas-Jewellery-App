import { cn } from "@/lib/utils";

type BadgeVariant =
  | "active"
  | "completed"
  | "pending"
  | "overdue"
  | "due_today"
  | "due_soon"
  | "ready_for_redemption"
  | "inactive"
  | "paid"
  | "upcoming"
  | "gold"
  | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-green-50 text-green-700 border-green-100",
  completed: "bg-blue-50 text-blue-700 border-blue-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  overdue: "bg-red-50 text-red-600 border-red-100",
  due_today: "bg-amber-50 text-amber-700 border-amber-100",
  due_soon: "bg-blue-50 text-blue-700 border-blue-100",
  ready_for_redemption: "bg-purple-50 text-purple-700 border-purple-100",
  inactive: "bg-gray-100 text-gray-500 border-gray-200",
  paid: "bg-green-50 text-green-700 border-green-100",
  upcoming: "bg-gray-100 text-gray-500 border-gray-200",
  gold: "bg-gold-50 text-gold-dark border-gold-100",
  default: "bg-gray-100 text-gray-600 border-gray-200",
};

const dotStyles: Record<BadgeVariant, string> = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  pending: "bg-amber-500",
  overdue: "bg-red-500",
  due_today: "bg-amber-500",
  due_soon: "bg-blue-400",
  ready_for_redemption: "bg-purple-500",
  inactive: "bg-gray-400",
  paid: "bg-green-500",
  upcoming: "bg-gray-400",
  gold: "bg-gold",
  default: "bg-gray-400",
};

export default function Badge({
  variant = "default",
  children,
  className,
  dot,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            dotStyles[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
