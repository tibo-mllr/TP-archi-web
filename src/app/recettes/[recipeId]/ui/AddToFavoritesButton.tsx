"use client";

// Use client necessary because we want to make authenticated calls from client
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { ReactElement } from "react";

import { apiPost } from "@/lib";
import { type Recipe } from "@/lib/types";

type AddToFavoritesButtonProps = {
  recipe: Recipe;
};

export default function AddToFavoritesButton({
  recipe,
}: AddToFavoritesButtonProps): ReactElement {
  function addRecipeToFavorites(): void {
    apiPost(
      "/users/sigma/favorites",
      {},
      { axiosConfig: { params: { recipeID: recipe.id } } },
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<FavoriteIcon />}
      onClick={addRecipeToFavorites}
    >
      Add to Favorites
    </Button>
  );
}
