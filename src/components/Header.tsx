"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactElement } from "react";

import { ImageWithFallback } from "./ImageWithFallback";
import { LoginButton } from "./loginButton";

export function Header(): ReactElement {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  const navLinks: ReactElement = (
    <>
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
    </>
  );

  return (
    <AppBar position="static" color="inherit" enableColorOnDark>
      <Toolbar
        sx={{
          paddingY: 2,
          gap: 2,
        }}
      >
        {/* Logo and site name, centered inside the whole nav */}
        <ImageWithFallback src="/logo.webp" alt="Logo" width={60} height={60} />
        <Typography variant="h5">Sigma cooking</Typography>

        {/* Navigation */}
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              sx={{ marginLeft: "auto" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{
                  width: "35vw",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: 3,
                }}
                role="presentation"
                onClick={() => setOpen(false)}
              >
                {navLinks}
              </Box>
            </Drawer>
          </>
        ) : (
          navLinks
        )}
      </Toolbar>
    </AppBar>
  );
}
