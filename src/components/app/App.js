import React, { useState, useEffect } from "react";
import Header from "../navbar/Header";
import Home from "../../pages/home/Home";
import Cart from "../../pages/cart/Cart";
import AddPizza from "../../pages/addpizza/AddPizza";
import NoPage from "../../pages/nopage/NoPage";
import Contact from "../../pages/contact/Contact";
import Register from "../../pages/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeletePizza from "../../pages/deletepizza/DeletePizza";
import EditPizza from "../../pages/editpizza/EditPizza";
import api from "../../services/api";
import Login from "../../pages/login/Login";
import Profile from "../../pages/profile/Profile";
import AuthService from "../../services/AuthService";

const App = () => {
  const [pizza, setPizza] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Api/Pizza/AllPizza");
        setPizza(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
        setError("Failed to load pizzas. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route
            index
            element={<Home pizza={pizza} loading={loading} error={error} />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="addpizza" element={<AddPizza />} />
          <Route path="deletepizza" element={<DeletePizza />} />
          <Route path="contact" element={<Contact />} />
          <Route path="editpizza" element={<EditPizza pizza={pizza} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
