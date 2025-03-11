"use client";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import { LoginButton } from "./loginButton";

export function Header(): ReactElement {
  const pathname = usePathname();

  return (
    <AppBar position="static" color="inherit" enableColorOnDark>
      <Toolbar
        sx={{
          paddingY: 2,
          gap: 2,
        }}
      >
        {/* Logo and site name, centered inside the whole nav */}
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
        <Typography variant="h5">Sigma cooking</Typography>

        {/* Main nav */}
        <Link href="/">
          <Button variant={pathname == "/" ? "contained" : "outlined"}>
            Home
          </Button>
        </Link>
        <Link href="/favorites">
          <Button variant={pathname == "/favorites" ? "contained" : "outlined"}>
            Favorites
          </Button>
        </Link>

        {/* Auth nav */}
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
}
