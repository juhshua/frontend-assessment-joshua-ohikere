/**
 * API Layer for DummyJSON Products
 * Documentation: https://dummyjson.com/docs/products
 * 
 * This abstraction layer ensures:
 * - Centralized API calls (components don't call fetch directly)
 * - Consistent error handling
 * - Type safety with TypeScript
 * - Easy testing and maintenance
 */

import { Product, ProductsResponse } from '@/types';

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch products with optional search, category filter, and pagination
 * Uses Next.js fetch with appropriate caching strategy
 */
export async function getProducts(params: {
  search?: string;
  category?: string;
  skip?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const { search, category, skip = 0, limit = 20 } = params;

  let url: string;

  if (search) {
    // Search endpoint
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    // Category filter endpoint
    url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    // Default: all products
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  }

  try {
    const response = await fetch(url, {
      // Cache for 5 minutes for listing pages (good balance between freshness and performance)
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
}

/**
 * Fetch a single product by ID
 * Used for the detail page
 */
export async function getProductById(id: string): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;

  try {
    const response = await fetch(url, {
      // Cache product details for 1 hour (they change less frequently)
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch all available product categories
 * Used for the filter dropdown
 */
export async function getCategories(): Promise<string[]> {
  const url = `${BASE_URL}/products/categories`;

  try {
    const response = await fetch(url, {
      // Categories rarely change, cache for 24 hours
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories: { slug: string; name: string; url: string }[] = await response.json();
    return categories.map((cat) => cat.slug);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array on error (graceful degradation)
  }
}
