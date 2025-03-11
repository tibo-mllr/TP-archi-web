"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import { api } from "@/lib";

async function checkLogin(): Promise<boolean> {
  return await api
    .get("/me")
    .then((response) => response.status == 200)
    .catch(() => false)
    .finally(() => false);
}

export function LoginButton(): ReactElement {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLogin().then((loggedIn) => setIsLoggedIn(loggedIn));
  }, []);

  async function logout(): Promise<void> {
    await api.get("/logout").catch((response) => {
      // 406 is expected - the /logout route actually returns a 302 towards gourmet.cours.quimerch.com/
      // Axios is forced to honor this redirect, and so the logout request is forwarded to the URL
      // Now of course this route is not able to return any JSON, as it is the front page for the prof's website ! It returns HTML.
      // So the server responds with a 406: not able to return the requested content type.
      if (response.status !== 406 && response.status !== 200) {
        console.error("Failed to logout");
      }
    });
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <button onClick={logout} className="mx-3 my-2">
        Logout
      </button>
    );
  }
  return (
    <Link
      href="/login"
      className={`mx-3 my-2 ${pathname === "/login" ? "underline" : ""}`}
    >
      Login
    </Link>
  );
}
