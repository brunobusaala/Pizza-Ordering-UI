import React, { useEffect, useState } from "react";
import axios from "axios";
import App from "../../components/app/App";

import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartCalculations, setCartCalculations] = useState(0); // Initialize to 0
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    fetchCart();
    Totalcost();
    CartItemTotal();
  }, []); // Fetch cart data when component mounts

  // Retrieve the Jwt token from storage mechanism
  const user = JSON.parse(localStorage.getItem("user"));
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });

  // function calculateTotalCost(cartData) {
  //   let total = 0;
  //   for (let i = 0; i < cartData.length; i++) {
  //     total += cartData[i].Pizza.Price * cartData[i].Quantity;
  //   }
  //   return total;
  // }

  const fetchCart = async () => {
    axiosInstance.get("/Api/Cart/GetCartById").then((response) => {
      const cartItem = response.data.CartItems.$values;
      setCart(cartItem);
    });
  };
  const Totalcost = async () => {
    axiosInstance
      .get("/Api/Cart/CalculateCartCalculations")
      .then((response) => {
        const alltotal = response.data.totalCost;
        setCartCalculations(alltotal);
      });
  };

  const CartItemTotal = async (costId) => {
    axiosInstance.get(`/Api/Cart/ItemTotal/${costId}`).then((response) => {
      const alltotal = response.data.totalCost;
      setItemTotal(alltotal);
    });
  };

  const handleDelete = (Id) => {
    axiosInstance.delete(`/Api/Cart/delete/${Id}`).then((response) => {
      fetchCart(); // Re-fetch cart data after deletion
    });
  };
  return (
    <div className="cartItems">
      <h2 className="mb-6 text-center"> Shopping Cart Details</h2>
      <div className=" d-flex justify-content-center">
        <div>
          <h4>Cart Totals</h4>
          <p>Total: Ksh: {cartCalculations ? cartCalculations : 0}</p>
        </div>
      </div>
      {cart.map((item) => {
        const { ItemId, Quantity, Pizza } = item;
        const { Name, Price, ImageName, Id } = Pizza || {}; // Destructure pizza properties
        let totalCost = Quantity * Pizza.Price;
        CartItemTotal(Id);

        return (
          <>
            <div key={ItemId} className="cart-item">
              <div className="cart-card">
                <img src={`images/${ImageName}`} alt={Name} />
                <div className="cart-details">
                  <h4>{Name}</h4>
                  <p>Quantity: {Quantity}</p>
                  <p>Price: {Price}</p>
                  <p>Cost: Ksh: {itemTotal}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDelete(Id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Cart;
