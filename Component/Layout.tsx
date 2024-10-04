"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            E-Shop
          </Link>
          <div className="flex items-center">
            <Link href="/" className="mr-4 hover:text-blue-200">
              Home
            </Link>
            <Link
              href="/cart"
              className="flex items-center hover:text-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Cart ({cartItemsCount})
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-3 text-center">
          © 2023 E-Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
