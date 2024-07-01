import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userMetaData, setUserMetaData] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  //Create a new instance of axios with custom headers
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });

  const getCurrentUser = () => {
    const user = axiosInstance
      .get("https://localhost:7098/api/token/GetUserMetaData")
      .then((response) => {
        setUserMetaData(response.data);
      });
    return user;
  };

  useEffect(() => {
    getCurrentUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {userMetaData?.userName}</p>
      <p>Email: {userMetaData?.email}</p>
    </div>
  );
};

export default Profile;
