export interface User {
  id: string;
  name: string;
  role: string;
  favourites: string[];
  sets: string[];
}

export type Role = "admin" | "user";
