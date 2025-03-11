"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

export function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <header
      className="dark:bg-gray-700 bg-gray-100 p-4 items-center content-center"
      style={{
        maxHeight: "10vh",
        paddingTop: "2vh",
        paddingBottom: "2vh",
        minHeight: "40px",
      }}
    >
      <nav className="flex justify-between items-center relative">
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

        {/* Logo and site name, centered inside the whole nav */}
        <div className="flex space-x-2 items-center absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={212}
            height={212}
            style={{
              maxHeight: "5vh",
              maxWidth: "5vh",
              aspectRatio: 1,
              minHeight: "30px",
              minWidth: "30px",
            }}
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
