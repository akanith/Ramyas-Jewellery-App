// ============================================================
// Utility helpers used across the admin dashboard.
// ============================================================
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian Rupee currency. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a number as INR without the symbol (e.g. "12,000"). */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/** Returns initials (up to 2 chars) from a full name. */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Deterministic avatar background colour from a string seed. */
const AVATAR_COLORS = [
  "#7B1C1C", // primary maroon
  "#C9A84C", // gold
  "#1C4E3D", // forest green
  "#0F4C81", // navy blue
  "#4C1D95", // purple
  "#6B7280", // gray
  "#B45309", // amber-brown
  "#065F46", // emerald
];

export function getAvatarBg(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Truncate a string to a max length with ellipsis. */
export function truncate(str: string, max = 28): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}
