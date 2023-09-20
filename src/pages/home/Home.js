import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button } from "react-bootstrap";

const Home = (props) => {
  const { pizza } = props;
  let [submitStatus, setSubmitStatus] = useState("");

  const handleCart = (productId) => {
    //Retrieve the Jwt token from storage mechanism
    const user = JSON.parse(localStorage.getItem("user"));

    //Create a new instance of axios with custom headers
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    try {
      // axios.post(`/Api/Cart/AddItemToCart${productId}`).then((response) => {
        axiosInstance.post(`/Api/Cart/AddItemToCart/${productId}`).then((response) => {
        setSubmitStatus(true);
        setTimeout(() => {
          setSubmitStatus("");
        }, 3000);
      });
    } catch (error) {
      setSubmitStatus(false);
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
      console.error(error);
    }
  };

  return (
    <div className="pizza-info">
      <div className="submit-status">
        <div className="submitdiv">
          {submitStatus === true && (
            <Alert variant="success">Added to Cart Succesffully!</Alert>
          )}
          {submitStatus === false && (
            <Alert variant="danger">Something went wrong!</Alert>
          )}
        </div>
      </div>
      <div className="pizza-card">
        {pizza.map((pizza) => {
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
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
