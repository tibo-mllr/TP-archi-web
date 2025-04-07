import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

import { Recipe } from "@/lib/types";

import { ImageWithFallback } from "./ImageWithFallback";

type RecipeCardProps = {
  recipe: Recipe;
  imageSizes: string;
};

export function RecipeCard({
  recipe,
  imageSizes,
}: RecipeCardProps): ReactElement {
  const { id, name, description, image_url } = recipe;

  return (
    <Card
      // Use a NextJS Link so that we can click without re-rendering everything (but use MUI Card styles)
      component={Link}
      href={`/recettes/${id}`}
      sx={{
        // Hacked styles from normal Card start here
        display: "block",
        borderRadius: "4px",
        boxShadow: "var(--Paper-shadow)",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        // Hacked styles from normal Card end here
        position: "relative",
        height: "100%",
        width: "100%",
        // When hover, display the description
        "&:hover .content": {
          maxHeight: "50px",
          opacity: 1,
        },
      }}
    >
      <CardMedia
        sx={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}
      >
        <ImageWithFallback
          src={image_url}
          alt={name ?? "An image of the dish"}
          fill
          sizes={imageSizes}
          style={{ objectFit: "cover" }}
        />
      </CardMedia>
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0))",
          color: "white",
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography
          className="content" // Necessary in order to display this part on hover
          variant="body2"
          sx={{
            overflow: "hidden",
            maxHeight: 0, // Changes on hover
            opacity: 0, // Changes on hover
            transition: "max-height 0.4s ease-in, opacity 0.3s ease-in 0.1s", // Transition for hover
          }}
        >
          {!!description && description.length > 160
            ? description.substring(0, 157) + "..."
            : description}
        </Typography>
      </CardContent>
    </Card>
  );
}
