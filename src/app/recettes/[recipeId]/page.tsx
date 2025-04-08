import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ClassIcon from "@mui/icons-material/Class";
import EuroIcon from "@mui/icons-material/Euro";
import PeopleIcon from "@mui/icons-material/People";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import {
  Card,
  CardMedia,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Metadata, ResolvingMetadata } from "next";
import { ReactElement } from "react";

import { ImageWithFallback, RecipeCard } from "@/components";
import { api, capitalizeFirstLetter } from "@/lib";
import { Recipe } from "@/lib/types";

type RecipePageProps = {
  params: Promise<{ recipeId: string }>;
};

export async function generateMetadata(
  { params }: RecipePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { recipeId } = await params;

  let recipe: Recipe;
  try {
    recipe = await api
      .get<Recipe>(`/recipes/${recipeId}`)
      .then((response) => response.data);
  } catch (error) {
    console.error(error);
    return {}; // If error, don't change metadata
  }

  const globalTitle = (await parent).title?.absolute;

  return {
    title: `${recipe.name || ""} | ${globalTitle}`,
  };
}

function parseInstructions(instructions?: string): ReactElement {
  const lines = instructions?.split("\n");
  let isList = false;
  const elements = lines?.map((line, index) => {
    if (line.startsWith("-")) {
      isList = true;
      return <li key={index}>{line.slice(1).trim()}</li>;
    }
    return <p key={index}>{line}</p>;
  });

  if (isList) return <ul>{elements}</ul>;

  return <div>{elements}</div>;
}

export default async function RecipePage({
  params,
}: RecipePageProps): Promise<ReactElement> {
  const { recipeId } = await params;

  let recipe: Recipe;
  try {
    recipe = await api
      .get<Recipe>(`/recipes/${recipeId}`)
      .then((response) => response.data);
  } catch (error) {
    console.error(error);
    return <i>An error occured. Please try again later</i>;
  }

  const relatedRecipes = await api
    .get<Recipe[]>(`/recipes/${recipeId}/related`)
    .then((response) => response.data)
    .catch(() => []);
  const hasRelated = relatedRecipes.length > 0;

  const {
    calories,
    category,
    cook_time,
    cost,
    created_at,
    created_by,
    description,
    disclaimer,
    image_url,
    instructions,
    name,
    prep_time,
    published,
    servings,
    when_to_eat,
  } = recipe;

  return (
    <Grid2 container spacing={5}>
      {/* Main article */}
      <Grid2
        container
        size={{ xs: 12, md: hasRelated ? 9 : 12 }}
        direction="column"
        spacing={2}
      >
        {/* Name and description */}
        <Grid2 size={12}>
          <Typography variant="h2">{name}</Typography>
        </Grid2>
        <Grid2 size={12}>
          <Typography variant="subtitle1">{description}</Typography>
        </Grid2>

        {/* Image and summary */}
        <Grid2 container size={12}>
          {!!image_url && (
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardMedia
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                  }}
                >
                  <ImageWithFallback
                    src={image_url}
                    alt={name ?? "An image of the dish"}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 67vw, 50vw"
                    style={{ objectFit: "contain" }}
                    priority
                    hideIfNoImage
                  />
                </CardMedia>
              </Card>
            </Grid2>
          )}

          {/* Summary part */}
          <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="h6">
                    {capitalizeFirstLetter(when_to_eat ?? "") ||
                      "Eat whenever you want"}
                  </Typography>
                </ListItemText>
              </ListItem>
              {!!category && (
                <ListItem>
                  <ListItemIcon>
                    <ClassIcon />
                  </ListItemIcon>
                  <ListItemText>{category}</ListItemText>
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText>
                  <b>Preparation:</b> {prep_time} minutes
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AvTimerIcon />
                </ListItemIcon>
                <ListItemText>
                  <b>Cooking:</b> {cook_time} minutes
                </ListItemText>
              </ListItem>
              {!!servings && (
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText>{servings}</ListItemText>
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon>
                  <WhatshotIcon color="warning" />
                </ListItemIcon>
                <ListItemText>{calories || "?"} kcal</ListItemText>
              </ListItem>
              {!!cost && (
                <ListItem>
                  <ListItemIcon>
                    <EuroIcon />
                  </ListItemIcon>
                  <ListItemText>{cost} €</ListItemText>
                </ListItem>
              )}
            </List>
          </Grid2>
        </Grid2>

        {/* Disclaimer */}
        {!!disclaimer && (
          <Grid2 size={12}>
            <i>Disclaimer: {disclaimer}</i>
          </Grid2>
        )}

        {/* Instructions */}
        <Grid2 container direction="column" size={12}>
          <Typography variant="h4">Instructions</Typography>
          <Grid2>{parseInstructions(instructions)}</Grid2>
        </Grid2>
      </Grid2>

      {/* Related recipes */}
      {hasRelated && (
        <Grid2
          container
          size={{ xs: 12, md: 3 }}
          spacing={3}
          sx={{
            maxHeight: { xs: "none", md: "100vh" },
            overflow: { xs: "none", md: "auto" },
          }}
        >
          <Grid2
            size={12}
            position="sticky"
            top={0}
            zIndex={100}
            bgcolor="var(--background)"
            paddingBottom={2}
          >
            <Typography variant="h5">Others you might like:</Typography>
          </Grid2>
          {relatedRecipes.map((relatedRecipe) => (
            <Grid2
              key={relatedRecipe.id}
              size={{ xs: 6, sm: 4, md: 12 }}
              minHeight="15vh"
            >
              <RecipeCard
                recipe={relatedRecipe}
                imageSizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
              />
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* Metadata */}
      <Grid2 size={12}>
        <footer>
          <Typography variant="caption">
            {published ? "Published" : "Created"} by {created_by}
            {!!created_at && ` on ${new Date(created_at).toLocaleDateString()}`}
          </Typography>
        </footer>
      </Grid2>
    </Grid2>
  );
}
