/**
 * SearchBar Component
 *
 * Client-side search input with debounce (300ms as per requirement).
 * Updates URL search params for shareable state.
 *
 * Key concepts:
 * - useSearchParams: Next.js hook to read/write URL query params
 * - useRouter: For programmatic navigation
 * - useTransition: For smoother UI during search
 * - Debounce: Prevents excessive API calls while typing
 */

"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  // Debounced search effect
  useEffect(() => {
    // Wait 300ms after user stops typing before updating URL
    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        params.set("search", searchValue);
        params.delete("page"); // Reset to page 1 on new search
      } else {
        params.delete("search");
      }

      // Use startTransition for non-blocking navigation
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    }, 300); // 300ms debounce as per requirement

    return () => clearTimeout(debounceTimer);
  }, [searchValue, router, searchParams]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

        {/* Input */}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          aria-label="Search products"
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
