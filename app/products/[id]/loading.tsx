/**
 * Loading state for product detail page
 */

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb skeleton */}
      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-12 w-40 bg-gray-200 animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
