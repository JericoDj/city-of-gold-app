import type { User } from "../types";

// Update user profile
interface UpdateProfilePayload {
  username: string;
  email: string;
  password: string;
}

export const updateUserProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  const token = localStorage.getItem("user");
  if (!token) throw new Error("No token found");

  const res = await fetch("http://localhost:4000/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update profile");
  }

  // Backend only returns id and success message; merge with existing info
  return {
    id: data.id,
    username: payload.username,
    email: payload.email,
  } as User;
};