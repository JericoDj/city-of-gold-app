// src/provider/AppProvider.tsx
import React, { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import type { User } from "../types";
import { fetchUserProfile } from "../controller/ProfileController";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // start as null
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch full user profile if token exists
useEffect(() => {
  const loadProfile = async () => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch {
        setUser(null);
      }
    }
    setInitialLoading(false);
  };
  loadProfile();
}, []);

  return (
    <AppContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};
