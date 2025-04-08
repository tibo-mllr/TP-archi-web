import { Box, Grid2 } from "@mui/material";
import Image from "next/image";
import { type ReactElement } from "react";

import { RecipeCard } from "@/components";
import { apiGet } from "@/lib";
import { type Recipe } from "@/lib/types";

export default async function Home(): Promise<ReactElement> {
  const recipes = await apiGet<Recipe[]>("/recipes");

  return (
    <>
      {/* Background Image */}
      <Image
        src="/cuisine.webp"
        alt="Background"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
      />

      {/* Black filter for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "70%",
          background: "rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* Gradient overlay at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "30%",
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, var(--background) 100%)`,
        }}
      />
      <Grid2 container columns={{ xs: 4, sm: 8, md: 12 }} spacing={3}>
        {recipes.map((recipe) => (
          <Grid2 key={recipe.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <RecipeCard
              recipe={recipe}
              imageSizes="(max-width: 900px) 50vw, 33vw"
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
