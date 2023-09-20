import React, { useEffect, useState } from "react";
import axios from "axios";
import App from "../../components/app/App";

import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  let [cart, setCart] = useState([]);

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
        const response = await axiosInstance
          .get("/Api/Cart/GetCartById")
          .then((response) => {
            const infor = response.data.CartItems.$values;
            setCart(infor);
            //console.log(infor);
          });
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, [cart]);
  //const { cart } = props;

  return (
    <div className="cartItems">
      <h2 className="mb-6 text-center"> Shopping Cart Details</h2>
      {cart.map((item) => {
        const { ItemId, Quantity, Pizza } = item;
        const { Name, Price, description, ImageName } = Pizza || {}; // Destructure pizza properties

        return (
          <div key={ItemId} className="cart-item">
            <div className="cart-card">
              <img src={`images/${ImageName}`} alt={Name} />
              <div className="cart-details">
                <h4>{Name}</h4>
                <p>Quantity: {Quantity}</p>
                <p>Price: {Price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
