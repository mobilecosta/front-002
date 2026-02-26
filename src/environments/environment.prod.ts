const apiUrl = (import.meta.env.VITE_API_URL ?? "https://api.example.com").replace(/\/$/, "");

export const environment = {
  production: true,
  apiUrl
};