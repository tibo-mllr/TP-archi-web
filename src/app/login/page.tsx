"use client";

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
    <>
      <h1 className="bold text-center text-3xl">Login</h1>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4 self-center"
          style={{ maxWidth: "50%" }}
          onSubmit={onSubmit}
        >
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="bg-gray-500 border-black-700"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-gray-500 border-black-700"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white border border-white-700"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
