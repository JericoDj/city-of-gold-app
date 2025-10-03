// src/components/ProfileDetail.tsx
import React from "react";
import "./ProfileDetail.css";

interface ProfileDetailProps {
  label: string;
  value: string;
}

export const ProfileDetail: React.FC<ProfileDetailProps> = ({ label, value }) => {
  return (
    <div className="profile-detail">
      <span className="profile-label">{label}</span>
      <span className="profile-value">{value}</span>
    </div>
  );
};
