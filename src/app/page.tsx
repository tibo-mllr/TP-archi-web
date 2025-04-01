import { Grid2 } from "@mui/material";
import { type ReactElement } from "react";

import { RecipeCard } from "@/components";
import { apiGet } from "@/lib";
import { type Recipe } from "@/lib/types";

export default async function Home(): Promise<ReactElement> {
  const recipes = await apiGet<Recipe[]>("/recipes");

  return (
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
  );
}
