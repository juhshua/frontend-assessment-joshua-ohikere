/**
 * ProductSkeleton Component
 *
 * Loading skeleton for ProductCard.
 * Shows while data is being fetched.
 * Better UX than a spinner!
 */

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-100" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="h-4 w-20 bg-blue-100 rounded-full" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded-lg" />
          <div className="h-5 w-1/2 bg-gray-200 rounded-lg" />
        </div>

        {/* Rating & Brand */}
        <div className="flex justify-between pt-2">
          <div className="h-8 w-16 bg-yellow-100 rounded-lg" />
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
        </div>

        {/* Price */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="h-8 w-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg" />
          <div className="h-7 w-24 bg-green-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
