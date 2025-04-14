"use client";

// Use client necessary because we want to make authenticated calls from client
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Button from "@mui/material/Button";
import { ReactElement, useEffect, useState } from "react";

import { api, apiPost, getFavorites } from "@/lib";
import { type Recipe } from "@/lib/types";

type AddToFavoritesButtonProps = {
  recipe: Recipe;
};

export default function AddToFavoritesButton({
  recipe,
}: AddToFavoritesButtonProps): ReactElement {
  const [isInFavorites, setIsInFavorites] = useState(false);
  useEffect(() => {
    async function checkIsInFavorites(): Promise<void> {
      const favoriteIDs = (await getFavorites()).map((recipe) => recipe.id);
      setIsInFavorites(favoriteIDs.includes(recipe.id));
    }
    checkIsInFavorites();
  }, [isInFavorites, recipe.id]);

  async function addRecipeToFavorites(): Promise<void> {
    // TODO: Do this properly, by getting the username of the currently loggedin user
    await apiPost(
      "/users/sigma/favorites",
      {},
      { axiosConfig: { params: { recipeID: recipe.id } } },
    );
    setIsInFavorites(true);
  }

  async function deleteRecipeFromFavorites(): Promise<void> {
    // TODO: Do this properly, by getting the username of the currently loggedin user
    await api.delete("/users/sigma/favorites", {
      params: { recipeID: recipe.id },
    });
    setIsInFavorites(false);
  }

  if (isInFavorites) {
    return (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ED2C2C",
          color: "white",
          "&:hover": { backgroundColor: "#F58A8A" },
          textAlign: "center",
        }}
        startIcon={<DeleteRoundedIcon />}
        onClick={deleteRecipeFromFavorites}
      >
        Unfavorite
      </Button>
    );
  } else {
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
}
