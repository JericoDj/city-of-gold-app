// src/context/AppContext.tsx
import React, { createContext, useContext } from "react";
import type { User } from "../types";

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  initialLoading: boolean;
  apiOk: boolean;
}

// Create context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to consume context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
