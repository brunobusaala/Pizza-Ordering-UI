import api from "./api";

const UserService = {
  getPublicContent: () => {
    return api.get("/all");
  },

  getUserBoard: () => {
    return api.get("/user");
  },

  getModeratorBoard: () => {
    return api.get("/mod");
  },

  getAdminBoard: () => {
    return api.get("/admin");
  },
};

export default UserService;
