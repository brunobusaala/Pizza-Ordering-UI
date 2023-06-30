import axios from "axios";
import React from "react";
import AuthHeader from "./AuthHeader";

const UserService = {
  getPublicContent: () => {
    return axios.get("all");
  },

  getUserBoard: () => {
    return axios.get("user", { headers: AuthHeader() });
  },

  getModeratorBoard: () => {
    return axios.get("mod", { headers: AuthHeader() });
  },

  getAdminBoard: () => {
    return axios.get("admin", { headers: AuthHeader() });
  },
};

export default UserService;
