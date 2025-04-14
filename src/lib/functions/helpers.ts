import { getCookie } from "cookies-next";

export function getLoggedInUser(): string {
  const loginCookie = getCookie("sigmacooking_loggedinuser");
  // If the cookie is not found, that means it has expired or was never set
  if (!loginCookie) {
    return ""; // No user logged in, represented by ""
  }
  return loginCookie.valueOf() as string;
}
