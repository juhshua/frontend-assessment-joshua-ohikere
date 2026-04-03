/**
 * Product Detail Page (Server Component)
 *
 * Features:
 * - Dynamic route: /products/[id]
 * - Server-side data fetching
 * - SEO metadata (title, description, OG tags)
 * - Breadcrumb navigation
 * - Full product details with image gallery
 *
 * This demonstrates:
 * - Dynamic routes in App Router
 * - generateMetadata for SEO
 * - Server Component data fetching
 */

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import { ChevronLeft, Star, Package, Truck, Shield } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProductById(id);
  } catch (error) {
    // If product not found, show 404
    console.error(error);
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
      </nav>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <Image
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${product.title} - ${index + 2}`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {product.title}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="text-lg font-bold text-gray-800">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">
              {product.reviews.length} review
              {product.reviews.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-6 border-b border-gray-200">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {product.discountPercentage.toFixed(0)}% OFF
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-200">
            <Package
              className={`w-5 h-5 ${product.stock > 50 ? "text-green-600" : "text-orange-600"}`}
            />
            <span
              className={`font-semibold ${product.stock > 50 ? "text-green-700" : "text-orange-700"}`}
            >
              {product.availabilityStatus} - {product.stock} in stock
            </span>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-lg font-bold mb-3 text-gray-900">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Product Details
            </h2>

            {product.brand && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Brand:</span>
                <span className="font-semibold text-gray-900">
                  {product.brand}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">SKU:</span>
              <span className="font-mono text-sm font-semibold text-gray-900">
                {product.sku}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Weight:</span>
              <span className="font-semibold text-gray-900">
                {product.weight} kg
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Dimensions:</span>
              <span className="font-semibold text-gray-900">
                {product.dimensions.width} × {product.dimensions.height} ×{" "}
                {product.dimensions.depth} cm
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Min. Order:</span>
              <span className="font-semibold text-gray-900">
                {product.minimumOrderQuantity} units
              </span>
            </div>
          </div>

          {/* Shipping & Warranty */}
          {/* Shipping & Warranty */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 space-y-4">
            <div className="flex gap-3">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Shipping</p>
                <p className="text-sm text-gray-700">
                  {product.shippingInformation}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Warranty</p>
                <p className="text-sm text-gray-700">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="pt-6">
              <h2 className="text-lg font-bold mb-3 text-white drop-shadow-md">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-medium rounded-full border border-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-900">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-gray-800">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
