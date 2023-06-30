import axios from "axios";
import React from "react";

const AuthService = () => {
  const login = async (userName, password) => {
    try {
      const response = await axios.post("/api/Login", {
        userName,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const register = async (userName, emailAddress, password) => {
    try {
      const response = await axios.post("/api/RegisterUser/SignUp", {
        userName,
        emailAddress,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };
  return {
    login,
    logout,
    register,
    getCurrentUser,
  };
};

export default AuthService;
