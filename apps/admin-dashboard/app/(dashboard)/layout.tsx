import Sidebar from "@/components/common/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-cream-100 overflow-hidden">
      {/* Fixed sidebar */}
      <Sidebar />
      {/* Scrollable main content area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
