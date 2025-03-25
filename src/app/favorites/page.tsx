"use client";

import { List, ListItem } from "@mui/material";
import { ReactElement, useState } from "react";

import { RecipeCard } from "@/components";
import { apiGet } from "@/lib";
import { Recipe } from "@/lib/types";

function getFavorites(): Promise<Recipe[]> {
  return apiGet<Recipe[]>("/favorites");
}

export default function FavoritesPage(): ReactElement {
  // Now we know we are authenticated
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  getFavorites().then((recipes) => setRecipes(recipes));

  return (
    <List>
      {recipes == null ? (
        <p>Tu n&apos;as pas de recettes favories !</p>
      ) : (
        recipes.map((recipe) => (
          <ListItem key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </ListItem>
        ))
      )}
    </List>
  );
}
