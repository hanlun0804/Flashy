export interface User {
  id: string;
  name: string;
  role: string;
  sets: string[];
  favourites: string[];
}

export type Role = "admin" | "user"
