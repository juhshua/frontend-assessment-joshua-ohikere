/**
 * Main Listing Page (Server Component)
 *
 * Features:
 * - Server-side data fetching with Next.js fetch caching
 * - Search & category filtering via URL params
 * - Pagination (20 items per page)
 * - Responsive grid layout
 * - SEO-optimized metadata
 *
 * Why Server Component?
 * - Better performance (data fetching on server)
 * - SEO benefits (pre-rendered HTML)
 * - Smaller client bundle
 */

import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";

const ITEMS_PER_PAGE = 20;

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;
  const search = params.search;
  const category = params.category;
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch data in parallel for better performance
  const [productsData, categories] = await Promise.all([
    getProducts({ search, category, skip, limit: ITEMS_PER_PAGE }),
    getCategories(),
  ]);

  const { products, total } = productsData;
  const hasNoResults = products.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search & Filter Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-6">
          {search
            ? `Search results for "${search}"`
            : category
              ? `Browse ${category}`
              : "Discover Products"}
        </h2>

        <Suspense
          fallback={
            <div className="h-14 bg-gray-200 animate-pulse rounded-xl" />
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SearchBar />
            <FilterBar categories={categories} />
          </div>
        </Suspense>

        {/* Results Count */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {search && (
            <span className="bg-blue-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
              Search: &quot;{search}&quot;
            </span>
          )}
          {category && (
            <span className="bg-purple-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
              Category: {category}
            </span>
          )}
          <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full font-semibold border border-gray-200">
            {total} product{total !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* Empty State */}
      {hasNoResults && (
        <EmptyState
          message={
            search ? `No products found for "${search}"` : "No products found"
          }
        />
      )}

      {/* Products Grid */}
      {!hasNoResults && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4} // Priority load first 4 images (above the fold)
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      )}
    </div>
  );
}
