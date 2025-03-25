"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormGroup,
  Input,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { FormEvent, ReactElement } from "react";

import { api } from "@/lib";

export default function LoginPage(): ReactElement {
  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    // Convert HTML form data to JSON
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Login directly with the API - the creds never reach the frontend server
    await api
      .post("/login", {
        username: username,
        password: password,
      })
      .catch((error: AxiosError) => {
        // Non-200 status codes are thrown as errors
        if (error.status == 401) {
          alert("Invalid username or password");
          return;
        } else {
          alert("An error occurred (" + error.status + ")");
        }
      });

    // Redirect to the home page
    window.location.href = "/";
  }

  return (
    <Card className="flex w-fit m-auto px-15 py-5">
      <form
        className="flex flex-col justify-center items-center p-3"
        onSubmit={onSubmit}
      >
        <CardContent>
          <FormGroup sx={{ gap: 2 }}>
            <TextField label="Username" name="username" type="text" />
            <TextField label="Password" name="password" type="password" />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
