import React, { useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Spinner } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Home = (props) => {
  const { pizza, loading, error } = props;
  const [submitStatus, setSubmitStatus] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const handleCart = async (productId) => {
    if (!AuthService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    setActionLoading(true);
    try {
      await api.post(`/Api/Cart/AddItemToCart/${productId}`);
      setSubmitStatus(true);
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setSubmitStatus(false);
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
    } finally {
      setActionLoading(false);
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
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }

  return (
    <div className="pizza-info">
      <div className="submit-status">
        <div className="submitdiv">
          {submitStatus === true && (
            <Alert variant="success">Added to Cart Successfully!</Alert>
          )}
          {submitStatus === false && (
            <Alert variant="danger">Something went wrong!</Alert>
          )}
        </div>
      </div>
      <div className="pizza-card d-flex flex-wrap justify-content-center">
        {pizza.length > 0 ? (
          pizza.map((pizza) => {
            let { name, id, imageName, price, description } = pizza;
            return (
              <div key={id}>
                <div className="pizza-item">
                  <img
                    width={150}
                    height={150}
                    src={`images/${imageName}`}
                    alt={name}
                  />
                  <div className="pizza-details">
                    <h4>{name}</h4>
                    <p>
                      <b>Price:</b> {price}
                    </p>
                    <p>{description}</p>
                    <div className="btn">
                      <Button
                        onClick={() => handleCart(id)} // Pass the product ID as a parameter
                        className="btn btn-success"
                        disabled={actionLoading}
                      >
                        {actionLoading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Add To Cart"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="pizza-item not-found">
            <h4>No Pizza Found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
