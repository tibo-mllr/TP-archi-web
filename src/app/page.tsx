import { Box, Grid2 } from "@mui/material";
import Image from "next/image";
import { type ReactElement } from "react";

import { RecipeCard } from "@/components";
import { api } from "@/lib";
import { type Recipe } from "@/lib/types";

export default async function Home(): Promise<ReactElement> {
  const recipes = await api
    .get<Recipe[]>("/recipes")
    .then((response) => response.data);

  return (
    <>
      <Box position="relative" width="100%" height="100vh" display="flex">
        <Image
          src="/cuisine.webp"
          fill
          sizes="100vw"
          alt="background"
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
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
