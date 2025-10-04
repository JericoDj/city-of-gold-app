import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { updateUserProfile } from "../../controller/UpdateProfileController";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./UpdateProfileModal.css";

interface UpdateProfileModalProps {
  onClose: () => void;
}

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ onClose }) => {
  const { user, setUser } = useAppContext();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const updatedUser = await updateUserProfile({ username, email, password });
      setUser(updatedUser);
      localStorage.setItem("userDetails", JSON.stringify(updatedUser));
      handleClose();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className={`modal-overlay ${closing ? "fade-out" : ""}`}>
      <div className={`modal-container ${closing ? "fade-out" : ""}`}>
        <h2 className="modal-title">Update Profile</h2>
        {error && <div className="modal-error">{error}</div>}

        {/* Username */}
        <div className="modal-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="modal-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="modal-field password-field">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={handleClose} disabled={loading}>
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
