import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const sizeMap = {
  xs: "w-7 h-7 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Avatar({
  name,
  src,
  size = "md",
  bgColor = "#7B1C1C",
  textColor = "#fff",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold flex-shrink-0 overflow-hidden",
        sizeMap[size],
        className
      )}
      style={!src ? { backgroundColor: bgColor, color: textColor } : {}}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials on error
            const target = e.currentTarget;
            target.style.display = "none";
            target.parentElement!.style.backgroundColor = bgColor;
            target.parentElement!.style.color = textColor;
            target.parentElement!.textContent = getInitials(name);
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
