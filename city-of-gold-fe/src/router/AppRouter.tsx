// src/routes/AppRoutes.tsx
import React, { type ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Profile } from "../pages/Profile/Profile";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";


const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  if (user === undefined) return <LoadingSpinner />; // still initial loading
  return <>{user ? children : <Navigate to="/login" replace />}</>;
};


const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  return <>{user ? <Navigate to="/" replace /> : children}</>;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
