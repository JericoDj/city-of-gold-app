// src/controller/RegisterController.ts
import type { User } from "../types";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<User> => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();

    // Store token if your backend returns one
    if (data.token) {
      localStorage.setItem("user", data.token);
    }

    // Return the user object
    return data.user as User;
  } catch (err: any) {
    throw new Error(err.message || "Registration failed");
  }
};
