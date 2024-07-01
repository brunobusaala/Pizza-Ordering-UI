import axios from "axios";

const AuthService = () => {
  const login = async (userName, password) => {
    try {
      const response = await axios.post("/api/Login", {
        userName,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
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

  return {
    login,
    logout,
    register,
  };
};

export default AuthService;
