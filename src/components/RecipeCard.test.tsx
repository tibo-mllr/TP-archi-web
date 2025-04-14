import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  render,
  RenderOptions,
  RenderResult,
  screen,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import { ReactElement } from "react";

import { theme } from "@/lib/MUITheme";

import { RecipeCard } from "./RecipeCard";

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

const mockRecipe = {
  id: "1",
  name: "Delicious Dish",
  description: "This is a very delicious dish that you will love.",
  image_url: "/testImage.webp",
};

describe("RecipeCard", () => {
  it("should render the recipe name and image", () => {
    customRender(<RecipeCard recipe={mockRecipe} imageSizes="100vw" />);

    expect(screen.getByText("Delicious Dish")).toBeInTheDocument();

    const image = screen.getByAltText("Delicious Dish");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("testImage.webp"),
    );
  });

  it("should render an image even if none is provided", () => {
    customRender(
      <RecipeCard
        recipe={{ ...mockRecipe, image_url: undefined }}
        imageSizes="100vw"
      />,
    );

    const image = screen.getByAltText("Delicious Dish");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("defaultDishImage.webp"),
    );
  });

  it("should render an alternative text even if none is provided", () => {
    customRender(
      <RecipeCard
        recipe={{ ...mockRecipe, name: undefined }}
        imageSizes="100vw"
      />,
    );

    const image = screen.getByAltText("An image of the dish");
    expect(image).toBeInTheDocument();
  });

  it("should truncate long descriptions", () => {
    const longDescriptionRecipe = {
      ...mockRecipe,
      description: "A".repeat(200),
    };

    customRender(
      <RecipeCard recipe={longDescriptionRecipe} imageSizes="100vw" />,
    );

    const truncatedDescription = screen.getByText(/A{157}\.\.\./);
    expect(truncatedDescription).toBeInTheDocument();
  });

  it("renders the correct styles for hover state", () => {
    const { container } = customRender(
      <RecipeCard recipe={mockRecipe} imageSizes="100vw" />,
    );

    expect(container).toMatchSnapshot();
  });
});
