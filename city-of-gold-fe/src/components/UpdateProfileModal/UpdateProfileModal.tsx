// src/components/UpdateProfileModal.tsx
import React, { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import { updateUserProfile } from "../../controller/UpdateProfileController";
import "./UpdateProfileModal.css";

interface UpdateProfileModalProps {
  onClose: () => void;
}

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ onClose }) => {
  const { user, setUser } = useAppContext();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const updatedUser = await updateUserProfile({ username, email });
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Update Profile</h2>
        {error && <div className="modal-error">{error}</div>}
        <div className="modal-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="modal-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-save" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
