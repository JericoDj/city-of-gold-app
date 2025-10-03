import React from "react";
import "./Home.css";

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">City of Gold</h1>
        <p className="home-tagline">
          Explore your dashboard, manage your profile, and track analytics with ease.
        </p>
      </div>
    </div>
  );
};
