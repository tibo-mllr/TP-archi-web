import { render, screen } from "@/test-utils";

import "@testing-library/jest-dom";

import { RecipeCard } from "./RecipeCard";

const mockRecipe = {
  id: "1",
  name: "Delicious Dish",
  description: "This is a very delicious dish that you will love.",
  image_url: "/testImage.webp",
};

describe("RecipeCard", () => {
  it("should render the recipe name and image", () => {
    render(<RecipeCard recipe={mockRecipe} imageSizes="100vw" />);

    expect(screen.getByText("Delicious Dish")).toBeInTheDocument();

    const image = screen.getByAltText("Delicious Dish");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("testImage.webp"),
    );
  });

  it("should render an image even if none is provided", () => {
    render(
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
    render(
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

    render(<RecipeCard recipe={longDescriptionRecipe} imageSizes="100vw" />);

    const truncatedDescription = screen.getByText(/A{157}\.\.\./);
    expect(truncatedDescription).toBeInTheDocument();
  });

  it("renders the correct styles for hover state", () => {
    const { container } = render(
      <RecipeCard recipe={mockRecipe} imageSizes="100vw" />,
    );

    expect(container).toMatchSnapshot();
  });
});
