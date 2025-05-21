import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartCalculations, setCartCalculations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    fetchCart();
    calculateTotalCost();
  }, [navigate]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/Api/Cart/GetCartById");
      if (
        response.data &&
        response.data.CartItems &&
        response.data.CartItems.$values
      ) {
        setCart(response.data.CartItems.$values);
      } else {
        setCart([]);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load your cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = async () => {
    try {
      const response = await api.get("/Api/Cart/CalculateCartCalculations");
      if (response.data && response.data.totalCost) {
        setCartCalculations(response.data.totalCost);
      } else {
        setCartCalculations(0);
      }
    } catch (err) {
      console.error("Failed to calculate cart total:", err);
    }
  };

  const handleDelete = async (Id) => {
    try {
      setActionInProgress(true);
      await api.delete(`/Api/Cart/delete/${Id}`);
      await fetchCart();
      await calculateTotalCost();
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete item. Please try again.");
    } finally {
      setActionInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

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

        return (
          <>
            <div key={ItemId} className="cart-item">
              <div className="cart-card">
                <img src={`images/${ImageName}`} alt={Name} />
                <div className="cart-details">
                  <h4>{Name}</h4>
                  <p>Quantity: {Quantity}</p>
                  <p>Price: {Price}</p>
                  <p>Total Cost: Ksh: {totalCost}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDelete(Id)}
                    disabled={actionInProgress} // Disable button when action is in progress
                  >
                    {actionInProgress ? "Removing..." : "Remove"}
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
