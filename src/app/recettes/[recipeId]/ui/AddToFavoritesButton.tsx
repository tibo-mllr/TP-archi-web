"use client";

// Use client necessary because we want to make authenticated calls from client
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Grid2 } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactElement, useEffect, useState } from "react";

import { API } from "@/lib";

import FavoritesCount from "./FavoritesCount";

type AddToFavoritesButtonProps = {
  recipeId: string;
};

export default function AddToFavoritesButton({
  recipeId,
}: AddToFavoritesButtonProps): ReactElement {
  const [isInFavorites, setIsInFavorites] = useState(false);
  useEffect(() => {
    async function checkIsInFavorites(): Promise<void> {
      const favoriteIDs = (await API.getFavorites()).map((recipe) => recipe.id);
      setIsInFavorites(favoriteIDs.includes(recipeId));
    }
    checkIsInFavorites();
  }, [isInFavorites, recipeId]);

  async function addRecipeToFavorites(): Promise<void> {
    await API.addFavorite(recipeId);
    setIsInFavorites(true);
  }

  async function deleteRecipeFromFavorites(): Promise<void> {
    await API.deleteFavorite(recipeId);
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
        startIcon={
          <Grid2
            display="flex"
            flexDirection="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <FavoritesCount recipeId={recipeId} />
            <DeleteRoundedIcon />
          </Grid2>
        }
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
        startIcon={
          <Grid2
            display="flex"
            flexDirection="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <FavoritesCount recipeId={recipeId} />
            <FavoriteBorderRoundedIcon />
          </Grid2>
        }
        onClick={addRecipeToFavorites}
      >
        Add to Favorites
      </Button>
    );
  }
}
