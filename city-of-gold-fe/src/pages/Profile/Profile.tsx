// src/pages/Profile.tsx
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { ProfileDetail } from "../../components/ProfileDetail/ProfileDetail";
import { UpdateProfileModal } from "../../components/UpdateProfileModal/UpdateProfileModal";
import "./Profile.css";

export const Profile: React.FC = () => {
  const { user } = useAppContext();
  const [showUpdate, setShowUpdate] = useState(false);

  if (!user) return <div>No user info available.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        <ProfileDetail label="Username" value={user.username} />
        <ProfileDetail label="Email" value={user.email} />
        <button className="btn btn-update" onClick={() => setShowUpdate(true)}>
          Update Profile
        </button>
      </div>

      {showUpdate && <UpdateProfileModal onClose={() => setShowUpdate(false)} />}
    </div>
  );
};
