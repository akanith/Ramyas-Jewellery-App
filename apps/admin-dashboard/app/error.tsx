"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl
                     text-sm font-semibold transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
