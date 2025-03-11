"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header className="dark:bg-gray-700 bg-gray-100 p-4">
      <nav className="flex justify-between items-center">
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

        {/* Logo and site name */}
        <div className="flex space-x-2 items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={212}
            height={212}
            style={{ maxHeight: "8vh", maxWidth: "8vh", aspectRatio: 1 }}
          />
          <h1 className="text-2xl text-center inline-block">Sigma cooking</h1>
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
