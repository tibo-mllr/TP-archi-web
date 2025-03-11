"use client";

import Button from "@mui/material";
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
    /* == Note on logout ==
      1.Since the login cookie is httpOnly, we cannot delete it from JS - we *need* a response from the server with the appropriate Set-Cookie header to clear it.
        The easiest way to do this is to make a request to the /logout route.
      
      2.The /logout API route actually returns a 302 towards gourmet.cours.quimerch.com/.
        Axios is forced to honor this redirect (see https://github.com/axios/axios/issues/3924), and so the logout request is forwarded to the above URL.
        Now of course this route is not able to return any JSON, as it is the front page for the prof's website ! It returns HTML.
      
      3.This would lead to a 406 Error we would not be able to silence, so we override the headers for this request specifically to accept any content type to avoid that
        This is a bit of a hack, but it works.
        Notably this means we pull the HTML for the prof's frontpage on each logout (couple kB of data).
        But as it is not rendered this is not too big a deal. If we had control over the API and could prevent this 302 response we could avoid this.
    */
    await api
      .get("/logout", { headers: { Accept: "*/*" } })
      .catch(() => {
        console.error("Failed to logout");
      })
      .finally(() => setIsLoggedIn(false));
  }

  if (isLoggedIn) {
    return (
      <button onClick={logout} className="mx-3 my-2">
        Logout
      </button>
    );
  }
  return (
    <Link href="/login" className="ml-auto">
      <Button variant={pathname == "/login" ? "contained" : "outlined"}>
        Login
      </Button>
    </Link>
  );
}
