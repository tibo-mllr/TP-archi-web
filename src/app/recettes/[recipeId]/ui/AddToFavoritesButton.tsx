"use client";

// Use client necessary because we want to make authenticated calls from client
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Button from "@mui/material/Button";
import { ReactElement } from "react";

import { api } from "@/lib";
import { type Recipe } from "@/lib/types";

type AddToFavoritesButtonProps = {
  recipe: Recipe;
};

export default function AddToFavoritesButton({
  recipe,
}: AddToFavoritesButtonProps): ReactElement {
  function addRecipeToFavorites(): void {
    // TODO: Do this properly, by getting the username of the currently loggedin user
    api.post("/users/sigma/favorites", {}, { params: { recipeID: recipe.id } });
  }

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#F75D8F",
        color: "white",
        "&:hover": { backgroundColor: "#FF407F" },
        textAlign: "center",
      }}
      startIcon={<FavoriteBorderRoundedIcon />}
      onClick={addRecipeToFavorites}
    >
      Add to Favorites
    </Button>
  );
}
