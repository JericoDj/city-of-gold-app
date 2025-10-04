// src/controller/LoginController.ts
import type { User } from "../types";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginCredentials): Promise<User> => {
  try {
    const response = await fetch("https://city-of-gold-app-2.onrender.com/api/auth/login", {
    //if need to run locally
      // const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Store token if your backend returns one
    if (data.token) {
      localStorage.setItem("user", data.token);
    }

    // Return the user object
    return data.user as User;
  } catch (err: any) {
    throw new Error(err.message || "Login failed");
  }
};
