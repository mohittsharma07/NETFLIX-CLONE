import React from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Close Button */}
        <button
          className="profile-close-btn"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Profile"
          className="profile-avatar"
        />

        <h1>User Profile</h1>

        <div className="profile-info">

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>UID:</strong> {user?.uid}
          </p>

          <p>
            <strong>Email Verified:</strong>{" "}
            {user?.emailVerified ? "Yes ✅" : "No ❌"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;