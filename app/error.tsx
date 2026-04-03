/**
 * Error Boundary
 *
 * Catches errors in the page and shows a friendly message.
 * Required by the assessment for proper error handling.
 */

"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          We encountered an error while loading the page. This could be due to a
          network issue or server problem.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Go Home
          </a>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 p-4 bg-red-50 rounded-lg max-w-2xl w-full">
            <summary className="cursor-pointer font-semibold text-red-800">
              Error Details (Development Only)
            </summary>
            <pre className="mt-4 text-sm text-red-700 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
