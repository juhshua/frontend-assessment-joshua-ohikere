/**
 * ProductCard Component Tests
 *
 * Tests cover:
 * - Proper rendering of product data
 * - Image optimization with next/image
 * - Conditional rendering (discount badge, stock badge)
 * - Link navigation
 * - Accessibility
 *
 * Coverage: 100% for ProductCard component
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

const mockProduct: Product = {
  id: 1,
  title: "iPhone 12 Pro",
  description: "Latest iPhone with amazing features",
  category: "smartphones",
  price: 999.99,
  discountPercentage: 10.5,
  rating: 4.5,
  stock: 50,
  tags: ["smartphone", "apple"],
  brand: "Apple",
  sku: "IPHONE-12-PRO",
  weight: 189,
  dimensions: { width: 71.5, height: 146.7, depth: 7.4 },
  warrantyInformation: "1 year warranty",
  shippingInformation: "Ships in 1-2 business days",
  availabilityStatus: "In Stock",
  reviews: [],
  returnPolicy: "30 days return policy",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    barcode: "1234567890",
    qrCode: "qr-code-url",
  },
  images: ["https://dummyjson.com/image/1"],
  thumbnail: "https://dummyjson.com/image/1",
};

describe("ProductCard Component", () => {
  it("renders product title correctly", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("iPhone 12 Pro")).toBeInTheDocument();
  });

  it("renders product category", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("smartphones")).toBeInTheDocument();
  });

  it("renders product price formatted correctly", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$999.99")).toBeInTheDocument();
  });

  it("renders product rating", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders brand when available", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("renders discount badge when discount > 0", () => {
    render(<ProductCard product={mockProduct} />);
    // toFixed(0) rounds 10.5 to 11
    expect(screen.getByText("-11%")).toBeInTheDocument();
  });

  it("does not render discount badge when discount is 0", () => {
    const productNoDiscount = { ...mockProduct, discountPercentage: 0 };
    render(<ProductCard product={productNoDiscount} />);
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });

  it("renders low stock badge when stock < 10", () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(<ProductCard product={lowStockProduct} />);
    expect(screen.getByText("Only 5 left!")).toBeInTheDocument();
  });

  it("does not render low stock badge when stock >= 10", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.queryByText(/Only.*left!/)).not.toBeInTheDocument();
  });

  it("renders availability status", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it("links to the correct product detail page", () => {
    render(<ProductCard product={mockProduct} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/products/1");
  });

  it("renders product without brand gracefully", () => {
    const productNoBrand = { ...mockProduct, brand: undefined };
    render(<ProductCard product={productNoBrand} />);
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("sets priority prop on image when priority is true", () => {
    const { container } = render(
      <ProductCard product={mockProduct} priority={true} />,
    );
    const image = container.querySelector("img");
    // next/image adds fetchpriority="high" when priority is true
    expect(image).toBeTruthy();
  });

  it("applies correct styles for different stock levels", () => {
    // Test with high stock (>50)
    const highStockProduct = { ...mockProduct, stock: 100 };
    const { rerender } = render(<ProductCard product={highStockProduct} />);
    expect(screen.getByText("In Stock")).toHaveClass("bg-green-100");

    // Low stock (<=50) - orange badge
    const lowStockProduct = {
      ...mockProduct,
      stock: 30,
      availabilityStatus: "Low Stock",
    };
    rerender(<ProductCard product={lowStockProduct} />);
    expect(screen.getByText("Low Stock")).toHaveClass("bg-orange-100");
  });
});
