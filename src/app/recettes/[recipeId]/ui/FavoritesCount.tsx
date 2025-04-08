"use client";

import { Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";

type FavoritesCountProps = {
  recipeId: string;
};

export default function FavoritesCount({
  recipeId,
}: FavoritesCountProps): ReactElement {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource(
      `https://gourmet.cours.quimerch.com/recipes/${recipeId}/stars`,
    );

    const handleCount = (event: MessageEvent<number>): void => {
      setFavoritesCount(event.data);
    };

    eventSource.addEventListener("count", handleCount);

    // Cleanup function
    return () => {
      eventSource.removeEventListener("count", handleCount);
      eventSource.close();
    };
  }, [recipeId]);

  return (
    <Typography variant="body2" color="text.secondary">
      {favoritesCount}
    </Typography>
  );
}
