import React from "react";
import axios from "axios";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Home = (props) => {
  const { pizza } = props;

  const handleCart = (productId) => {
    axios
      .post(`https://localhost:7098/Api/Cart/addToCart/${productId}`)
      .then((response) => {
        // Handle successful response
        console.log(response.data); // You can do something with the response data if needed
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="pizza-card">
      {pizza.map((pizza) => {
        let { name, id, imageName, price, description } = pizza;
        return (
          <div key={id}>
            <div className="pizza-item">
              <img width={150} height={150} src={`images/${imageName}`} alt={name} />
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
  );
};

export default Home;

