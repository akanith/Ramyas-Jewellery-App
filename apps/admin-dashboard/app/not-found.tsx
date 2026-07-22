import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <SearchX className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark
                     text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
