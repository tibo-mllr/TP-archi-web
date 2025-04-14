import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ReactElement } from "react";

import { theme } from "@/lib/MUITheme";

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </AppRouterCacheProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
