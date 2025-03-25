import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://gourmet.cours.quimerch.com",
  // Make an authenticated call if possible
  withCredentials: true,
  headers: { Accept: "application/json, application/xml" },
});
