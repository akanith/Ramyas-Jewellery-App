"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "py-2 pl-9 pr-3 text-sm",
  md: "py-2.5 pl-10 pr-4 text-sm",
  lg: "py-3 pl-11 pr-4",
};

const iconSizeMap = {
  sm: "left-2.5 w-4 h-4",
  md: "left-3 w-4 h-4",
  lg: "left-3.5 w-5 h-5",
};

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className,
  size = "md",
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
          iconSizeMap[size]
        )}
        strokeWidth={1.8}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full border border-gray-200 rounded-xl bg-white text-gray-800",
          "placeholder:text-gray-400 focus:outline-none focus:ring-2",
          "focus:ring-primary/15 focus:border-primary/30 transition-all duration-150",
          sizeMap[size]
        )}
      />
    </div>
  );
}
