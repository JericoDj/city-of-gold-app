// src/components/NavBar/AppNavBar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./NavBar.css";

const AppNavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
  


  setMenuOpen(false);   
  localStorage.removeItem("user"); 
  localStorage.removeItem("userDetails");
  setTimeout(() => {
            setUser(null);  
  navigate("/login");
    
  }, 100);


};
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-brand" onClick={() => navigate("/")}>
            City of Gold
          </div>
        </div>

        <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
          <button className="btn home-btn" onClick={() => navigate("/")}>
            Home
          </button>

          {!user ? (
            <button className="btn auth-btn" onClick={() => navigate("/login")}>
              Login / Join
            </button>
          ) : (
            <>
              <button className="btn account-btn" onClick={() => navigate("/profile")}>
                My Account
              </button>
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <div className="navbar-burger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavBar;
