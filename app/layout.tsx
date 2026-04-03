import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Product Explorer | DummyJSON Store",
    template: "%s | Product Explorer",
  },
  description:
    "Browse and search thousands of products with our modern product explorer. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["products", "shopping", "e-commerce", "next.js", "typescript"],
  authors: [{ name: "Joshua Ohikere" }],
  openGraph: {
    title: "Product Explorer",
    description: "Browse and search thousands of products",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Product Explorer
                </h1>
                <p className="text-xs text-gray-500">
                  Discover amazing products
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-100 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <p className="text-sm text-gray-600">
              Built with Next.js, TypeScript & Tailwind CSS | Data from
              DummyJSON
            </p>
            <p className="mt-2 text-xs text-gray-500">© 2026 Joshua Ohikere</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
