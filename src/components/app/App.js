import React, { useState, useEffect } from "react";
import Header from "../navbar/Header";
import Home from "../../pages/home/Home";
import Cart from "../../pages/cart/Cart";
import AddPizza from "../../pages/addpizza/AddPizza";
import NoPage from "../../pages/nopage/NoPage";
import Contact from "../../pages/contact/Contact";
// import Login from "../login/Login.jsx";
import Register from "../../pages/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeletePizza from "../../pages/deletepizza/DeletePizza";
import EditPizza from "../../pages/editpizza/EditPizza";
import axios from "axios";
import Login from "../../pages/login/Login";


// Set the base URL for all requests
axios.defaults.baseURL = "https://localhost:7098";

// Add an interceptor to attach the JWT token to the request headers
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const App = () => {
  let [pizza, setPizza] = useState([]);  
  const [loggedIn, setLoggedIn] = useState(false);
  //let [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Retrieve the Jwt token from storage mechanism
        const user = JSON.parse(localStorage.getItem("user"));

        //Create a new instance of axios with custom headers
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        //Make the Get request using the axios instance
        const response = await axiosInstance.get("/Api/Pizza/AllPizza");
        setPizza(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, [loggedIn]);

  // useEffect(() => {
  //   axios.get("/Api/Pizza/AllPizza").then((res) => {
  //     setPizza(res.data);
  //   });
  // }, []);
  

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route index element={<Home pizza={pizza} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="addpizza" element={<AddPizza />} />
          <Route path="deletepizza" element={<DeletePizza />} />
          <Route path="contact" element={<Contact />} />
          <Route path="editpizza" element={<EditPizza pizza={pizza} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
