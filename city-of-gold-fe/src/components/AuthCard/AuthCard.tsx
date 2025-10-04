import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { loginUser } from "../../controller/LoginController";
import { registerUser } from "../../controller/RegisterController";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"; 
import "./AuthCard.css";

interface AuthCardProps {
  mode: "login" | "register";
}

export const AuthCard: React.FC<AuthCardProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let user;
      if (isLogin) {
        user = await loginUser({ email, password });
      } else {
        user = await registerUser({ email, username, password });
      }
      navigate("/profile");
      setUser(user);
   
    } catch (err: any) {
      setError(err.message || (isLogin ? "Login failed" : "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="auth-container">
        {/* ✅ Show spinner overlay when loading */}
        {isLoading && <LoadingSpinner />}

        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="auth-title">{isLogin ? "Login" : "Create Account"}</h2>

          {error && <div className="auth-error">{error}</div>}

          {!isLogin && (
            <>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn auth-submit" disabled={isLoading}>
            {isLoading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>

          <p className="auth-toggle-text">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span className="auth-toggle-link" onClick={() => navigate("/register")}>
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="auth-toggle-link" onClick={() => navigate("/login")}>
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};