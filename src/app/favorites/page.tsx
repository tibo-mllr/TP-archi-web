"use client";

import { List, ListItem } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";

import { RecipeCard } from "@/components";
import { apiGet } from "@/lib";
import { Recipe } from "@/lib/types";

export async function getFavorites(): Promise<Recipe[]> {
  const recipeResults = await apiGet<{ recipe: Recipe }[]>("/favorites", {
    defaultResult: [],
  });
  return recipeResults.map((outerRecipeObj) => outerRecipeObj.recipe);
}

export default function FavoritesPage(): ReactElement {
  // Now we know we are authenticated
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getFavorites().then((recipes) => setRecipes(recipes));
  }, []);

  return (
    <List>
      {recipes == null ? (
        <p>Tu n&apos;as pas de recettes favories !</p>
      ) : (
        recipes.map((recipe) => (
          <ListItem key={recipe.id}>
            <RecipeCard recipe={recipe} imageSizes="100vw" />
          </ListItem>
        ))
      )}
    </List>
  );
}
