// src/provider/AppProvider.tsx
import React, { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import type { User } from "../types";
import { fetchUserProfile } from "../controller/ProfileController";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); // for async operations like login
  const [initialLoading, setInitialLoading] = useState(true); // for first app load
  const [apiOk, setApiOk] = useState(false); // API test result

  // Test API and fetch user profile if token exists
  useEffect(() => {
    const initializeApp = async () => {
      
      try {
        // 1️⃣ Test the API
        const response = await fetch("https://city-of-gold-app-2.onrender.com/");
        if (!response.ok) throw new Error("API not reachable");
        
        setApiOk(true);
       

        
        // 2️⃣ Fetch user profile if token exists
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
      } catch (err) {
        console.error("API test failed:", err);
        setApiOk(false);
      } finally {
        setInitialLoading(false);
      }
    };

    initializeApp();
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, initialLoading, apiOk }}
    >
      {children}
    </AppContext.Provider>
  );
};
