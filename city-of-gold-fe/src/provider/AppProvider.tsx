// src/provider/AppProvider.tsx
import React, { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import type { User } from "../types";
import { fetchUserProfile } from "../controller/ProfileController";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // start as null
  const [isLoading, setIsLoading] = useState(false);

  // Fetch full user profile if token exists
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("user");
      if (token) {
        setIsLoading(true);
        try {
          const profile = await fetchUserProfile();
          setUser(profile);
        
          localStorage.setItem("userDetails", JSON.stringify(profile));
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProfile();
  }, [user]);

  // Listen to storage events to sync between tabs
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};
