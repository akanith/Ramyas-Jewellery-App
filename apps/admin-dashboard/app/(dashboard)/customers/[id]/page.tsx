// Server component — resolves async params (Next.js 15 requirement),
// then fetches customer exclusively from Supabase customer-service.
import { notFound } from "next/navigation";
import { fetchCustomerById } from "@/services/customer-service";
import CustomerDetailClient from "@/components/customers/CustomerDetailClient";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetchCustomerById(id);

  if (res.error || !res.data) {
    notFound();
  }

  return <CustomerDetailClient customer={res.data} />;
}
