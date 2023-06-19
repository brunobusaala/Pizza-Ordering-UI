import React, { useState, useEffect } from "react";
import Header from "../navbar/Header";
import Home from "../../pages/home/Home";
import Cart from "../../pages/cart/Cart";
import AddPizza from "../../pages/addpizza/AddPizza";
import NoPage from "../../pages/nopage/NoPage";
import Contact from "../../pages/contact/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeletePizza from "../../pages/deletepizza/DeletePizza";
import EditPizza from "../../pages/editpizza/EditPizza";
import axios from "axios";

const App = () => {
  let [pizza, setPizza] = useState([]);
  let [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:7098/Api/Pizza").then((res) => {
      setPizza(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://localhost:7098/Api/Pizza/allcartitems").then((res) => {
      setCart(res.data);
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route index element={<Home pizza={pizza} />} />
          <Route path="cart" element={<Cart cart={cart} />} />
          <Route path="addpizza" element={<AddPizza />} />
          <Route path="deletepizza" element={<DeletePizza />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/editpizza" element={<EditPizza pizza={pizza} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
