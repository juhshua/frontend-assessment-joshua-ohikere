/**
 * EmptyState Component
 *
 * Shown when search/filter returns no results.
 * Provides helpful message and action button.
 */

import { Package } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  message?: string;
  showReset?: boolean;
}

export default function EmptyState({
  message = "No products found",
  showReset = true,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{message}</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Try adjusting your search or filters to find what you&apos;re looking
        for.
      </p>
      {showReset && (
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
        >
          Clear Filters
        </Link>
      )}
    </div>
  );
}
