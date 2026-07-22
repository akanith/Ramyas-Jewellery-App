import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ramyas Jeweller — Management System",
    template: "%s | Ramyas Jeweller",
  },
  description:
    "Jewellery Savings Scheme Management System for Ramyas Jewellers — manage customers, payments, and redemptions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
