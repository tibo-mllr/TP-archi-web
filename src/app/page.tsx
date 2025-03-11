import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { type ReactElement } from "react";

import { api } from "@/lib";
import { type Recipe } from "@/lib/types";

export default async function Home(): Promise<ReactElement> {
  const recipes = await api
    .get<Recipe[]>("/recipes")
    .then((response) => response.data);

  return (
    <Grid2 container columns={{ xs: 4, sm: 8, md: 12 }} spacing={3}>
      {recipes.map(({ id, image_url, name, description }) => (
        <Grid2 key={id} size={{ xs: 2, sm: 4, md: 4 }}>
          <Card
            // Use a NextJS Link so that we can click without re-rendering everything (but use MUI Card styles)
            component={Link}
            href={`/recettes/${id}`}
            sx={{
              // Hacked styles from normal Card start here
              display: "inline-block",
              borderRadius: "4px",
              boxShadow: "var(--Paper-shadow)",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              // Hacked styles from normal Card end here
              position: "relative",
              height: "100%",
              // When hover, display the description
              "&:hover .content": {
                maxHeight: "50px",
                opacity: 1,
              },
            }}
          >
            <CardMedia
              component="img"
              image={image_url}
              alt={name}
              sx={{ height: "100%" }}
            />
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0))",
              }}
            >
              <Typography variant="h6">{name}</Typography>
              <Typography
                className="content" // Necessary in order to display this part on hover
                variant="body2"
                sx={{
                  overflow: "hidden",
                  maxHeight: 0, // Changes on hover
                  opacity: 0, // Changes on hover
                  transition:
                    "max-height 0.4s ease-in, opacity 0.3s ease-in 0.1s", // Transition for hover
                }}
              >
                {!!description && description.length > 160
                  ? description.substring(0, 157) + "..."
                  : description}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
