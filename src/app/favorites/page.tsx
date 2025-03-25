"use client";

import { List, ListItem } from "@mui/material";
import { redirect } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import { RecipeCard } from "@/components";
import { api } from "@/lib";
import { Recipe } from "@/lib/types";

function getFavorites(): Promise<Recipe[]> {
  return (
    api
      .get<{ recipe: Recipe }[]>("/favorites")
      .then((response) =>
        response.data.map((outerRecipeObj) => outerRecipeObj.recipe),
      )
      // Redirect to /login in case of 401
      .catch((error) => {
        if (error.response.status == 401) {
          redirect("/login");
        }
        return [];
      })
  );
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
