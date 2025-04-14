"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import { API } from "@/lib";

export function LoginButton(): ReactElement {
  const pathname = usePathname();
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(API.getLoggedInUser());
  }, [pathname]);

  async function logout(): Promise<void> {
    await API.logout().catch(() => {});
    setLoggedInUser("");
  }

  if (loggedInUser) {
    return (
      <Button
        onClick={logout}
        sx={{ marginLeft: "auto" }}
        variant={pathname == "/login" ? "contained" : "outlined"}
      >
        {loggedInUser} (Logout)
      </Button>
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
