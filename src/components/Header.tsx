"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header className="dark:bg-gray-700 bg-gray-100 p-4">
      <nav className="flex justify-between">
        {/* Main nav */}
        <div>
          <Link
            href="/"
            className={`mx-3 my-2 ${pathname === "/" ? "underline" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={`mx-3 my-2 ${pathname === "/favorites" ? "underline" : ""}`}
          >
            Favorites
          </Link>
        </div>

        {/* Auth nav */}
        <div>
          <Link
            href="/login"
            className={`mx-3 my-2 ${pathname === "/login" ? "underline" : ""}`}
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
