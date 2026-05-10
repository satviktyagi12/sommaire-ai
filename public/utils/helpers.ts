export const isDev =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const ORIGIN_URL = isDev
  ? "http://localhost:3000"
  : "https://sommaire.vercel.app/";