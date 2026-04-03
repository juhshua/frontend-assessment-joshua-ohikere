/**
 * Loading State for Listing Page
 *
 * Shown automatically by Next.js while page.tsx is fetching data.
 * Uses ProductSkeleton for better UX than a spinner.
 */

import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search bar skeleton */}
      <div className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-gray-200 animate-pulse rounded-lg" />
          <div className="w-48 h-12 bg-gray-200 animate-pulse rounded-lg" />
        </div>
        <div className="mt-4 h-4 w-32 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
