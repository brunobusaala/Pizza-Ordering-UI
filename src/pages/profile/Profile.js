import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Alert } from "react-bootstrap";
import AuthService from "../../services/AuthService";

const Profile = () => {
  const [userMetaData, setUserMetaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/token/GetUserMetaData");
        setUserMetaData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (AuthService.isAuthenticated()) {
      fetchUserData();
    } else {
      setError("You need to login to view your profile");
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading profile...</div>;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1>User Profile</h1>
        {userMetaData ? (
          <div>
            <p>
              <strong>Username:</strong> {userMetaData.userName}
            </p>
            <p>
              <strong>Email:</strong> {userMetaData.email}
            </p>
          </div>
        ) : (
          <p>No profile data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
