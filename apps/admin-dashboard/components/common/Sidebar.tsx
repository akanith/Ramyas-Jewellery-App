"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  CreditCard,
  Gift,
  BarChart2,
  Settings,
  UserCircle,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/redemption", label: "Redemption", icon: Gift },
  { href: "/reports", label: "Reports", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="flex flex-col w-[215px] min-h-screen bg-white border-r border-cream-300 flex-shrink-0">
      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="px-5 py-6 border-b border-cream-200">
        <div className="flex items-center gap-2.5">
          {/* Logo icon */}
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm flex-shrink-0">
            <Gem className="w-4.5 h-4.5 text-gold" strokeWidth={1.8} />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-primary tracking-tight">
              Ramyas Jeweller
            </p>
            <p className="text-[9px] font-semibold tracking-[0.15em] text-gray-400 uppercase mt-0.5">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto sidebar-scroll">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium",
                "transition-all duration-150 cursor-pointer group",
                active
                  ? "text-primary bg-primary-50 font-semibold border-l-[3px] border-primary pl-[calc(0.875rem-3px)]"
                  : "text-gray-500 hover:bg-cream-100 hover:text-gray-800"
              )}
            >
              <Icon
                className={cn(
                  "w-4.5 h-4.5 flex-shrink-0 transition-colors duration-150",
                  active
                    ? "text-primary"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="mx-5 border-t border-cream-200" />

      {/* ── Owner Profile ─────────────────────────────────── */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <UserCircle className="w-5 h-5 text-gray-400" strokeWidth={1.6} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-700">Owner Profile</p>
            <p className="text-xs text-gray-400">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
