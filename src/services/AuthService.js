import axios from "axios";

const API_URL = "https://localhost:7098";

const AuthService = {
  login: async (userName, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/token/login`, {
        userName,
        password,
      });
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Login successful:", response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  register: async (userName, emailAddress, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/RegisterUser/SignUp`, {
        userName,
        emailAddress,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  isAuthenticated: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return !!user && !!user.token;
  },
};

export default AuthService;
