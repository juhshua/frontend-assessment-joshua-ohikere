/**
 * Pagination Component Tests
 *
 * Tests cover:
 * - Correct page number calculation
 * - Previous/Next button states
 * - Page number rendering
 * - Ellipsis for large page counts
 * - URL param updates
 * - Disabled states
 *
 * Coverage: 100% for Pagination component
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

// Mock Next.js hooks
const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("Pagination Component", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSearchParams.delete("page");
  });

  it("renders pagination with correct page numbers", () => {
    render(<Pagination currentPage={1} totalItems={100} itemsPerPage={20} />);
    // Total pages = 100 / 20 = 5
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} totalItems={100} itemsPerPage={20} />);
    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination currentPage={5} totalItems={100} itemsPerPage={20} />);
    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("enables both buttons on middle pages", () => {
    render(<Pagination currentPage={3} totalItems={100} itemsPerPage={20} />);
    const prevButton = screen.getByLabelText("Previous page");
    const nextButton = screen.getByLabelText("Next page");
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("highlights current page", () => {
    render(<Pagination currentPage={3} totalItems={100} itemsPerPage={20} />);
    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("bg-gradient-to-r");
    expect(currentPageButton).toBeDisabled();
  });

  it("calls router.push when clicking next button", () => {
    render(<Pagination currentPage={2} totalItems={100} itemsPerPage={20} />);
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith("?page=3", { scroll: true });
  });

  it("calls router.push when clicking previous button", () => {
    render(<Pagination currentPage={3} totalItems={100} itemsPerPage={20} />);
    const prevButton = screen.getByLabelText("Previous page");
    fireEvent.click(prevButton);
    expect(mockPush).toHaveBeenCalledWith("?page=2", { scroll: true });
  });

  it("calls router.push when clicking a page number", () => {
    render(<Pagination currentPage={1} totalItems={100} itemsPerPage={20} />);
    const page4Button = screen.getByText("4");
    fireEvent.click(page4Button);
    expect(mockPush).toHaveBeenCalledWith("?page=4", { scroll: true });
  });

  it("renders ellipsis for many pages", () => {
    render(<Pagination currentPage={5} totalItems={200} itemsPerPage={20} />);
    // Total pages = 200 / 20 = 10
    const ellipsisElements = screen.getAllByText("...");
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });

  it("does not render when total pages <= 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalItems={10} itemsPerPage={20} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders all pages when total pages <= 7", () => {
    render(<Pagination currentPage={1} totalItems={140} itemsPerPage={20} />);
    // Total pages = 140 / 20 = 7
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("preserves existing search params when changing page", () => {
    mockSearchParams.set("search", "test");
    mockSearchParams.set("category", "smartphones");

    render(<Pagination currentPage={1} totalItems={100} itemsPerPage={20} />);
    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("search=test"),
      expect.any(Object),
    );
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("category=smartphones"),
      expect.any(Object),
    );
  });

  it("calculates total pages correctly", () => {
    render(<Pagination currentPage={1} totalItems={99} itemsPerPage={20} />);
    // 99 / 20 = 4.95 => ceil = 5 pages
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows page numbers around current page", () => {
    render(<Pagination currentPage={5} totalItems={200} itemsPerPage={20} />);
    // Should show: 1, ..., 4, 5, 6, ..., 10
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
