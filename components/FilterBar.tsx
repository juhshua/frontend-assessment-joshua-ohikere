/**
 * FilterBar Component
 *
 * Category filter dropdown that updates URL params.
 * Works alongside SearchBar for combined filtering.
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

interface FilterBarProps {
  categories: string[];
}

export default function FilterBar({ categories }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
      params.delete("page"); // Reset to page 1 on filter change
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <Filter className="text-gray-400 w-5 h-5" />
      <select
        value={currentCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white cursor-pointer text-gray-700"
        aria-label="Filter by category"
      >
        <option value="" className="text-gray-700">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() +
              category.slice(1).replace(/-/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
