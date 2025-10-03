// src/controller/ProfileController.ts
import type { User } from "../types";

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("user");
    if (!token) throw new Error("No authentication token found");

    const response = await fetch("http://localhost:4000/api/profile/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user profile");
    }

    const data = await response.json();

    return data as User; // assuming backend returns { user: {...} }
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch user profile");
  }
};
