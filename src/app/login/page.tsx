"use client";

import { FormEvent } from "react";

import { api } from "@/lib";

export default function LoginPage() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Convert HTML form data to JSON
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Login directly with the API - the creds never reach the frontend server
    const response = await api.post("/login", {
      username: username,
      password: password,
    });

    // Handle response if necessary
    const data = response.data;

    // TODO: Add proper error handling
    console.log(data);

    // TODO: Do something with this token - store it in a cookie or local storage
    const token = data.token;
  }

  return (
    <>
      <h1>Login</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
    </>
  );
}
