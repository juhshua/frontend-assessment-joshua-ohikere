/**
 * ProductCard Component
 *
 * Displays a single product in a card format.
 * Used in the listing page grid.
 *
 * Performance optimizations:
 * - Uses next/image for automatic image optimization
 * - Lazy loads images below the fold
 * - Responsive sizing with Tailwind
 */

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean; // Set true for above-the-fold images
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative w-full h-56 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={priority}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{product.discountPercentage.toFixed(0)}%
          </div>
        )}
        {/* Stock Badge */}
        {product.stock < 10 && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Metadata: Rating & Brand */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-sm font-bold text-gray-800">
              {product.rating.toFixed(1)}
            </span>
          </div>
          {product.brand && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.brand}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
              product.stock > 50
                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                : "bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700"
            }`}
          >
            {product.availabilityStatus}
          </span>
        </div>
      </div>
    </Link>
  );
}
