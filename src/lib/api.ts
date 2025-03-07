import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://gourmet.cours.quimerch.com",
});
