// src/provider/AppProvider.tsx
import React, { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import type { User } from "../types";
import { fetchUserProfile } from "../controller/ProfileController";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider wraps the application and provides global state via AppContext.
 * Handles:
 *  - Current user state
 *  - Async loading flags for initial profile fetch and ongoing operations
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); // for async operations like login/register
  const [initialLoading, setInitialLoading] = useState(true); // true until initial profile fetch completes

  // Fetch the user profile on first app load if a token exists
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("user");
      if (token) {
        try {
          const profile = await fetchUserProfile();
          setUser(profile);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setUser(null);
        }
      }
      setInitialLoading(false); // done with initial loading
    };

    loadProfile();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        initialLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
