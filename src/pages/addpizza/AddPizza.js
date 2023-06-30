import React, { useEffect, useState } from "react";
import "./AddPizza.css";
import { Alert, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddPizza = () => {
  const [name, setName] = useState("");
  const [sizeID, setSizeID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageName, setImageName] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    //Retrieve the Jwt token from storage mechanism
    const user = JSON.parse(localStorage.getItem("user"));

    //Create a new instance of axios with custom headers
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    try {
      await axiosInstance.post(`https://localhost:7098/Api/Pizza/AddPizza`, {
        name,
        sizeID,
        description,
        price,
        imageName,
      });
      setSubmissionStatus("success");
      setTimeout(() => {
        setSubmissionStatus("")
      }, 3000);
      
    } catch (error) {
      console.error("Failed to Submit due to submission error!");
      setSubmissionStatus("fail");
      setTimeout(() => {
        setSubmissionStatus("")
      }, 3000);
    }
  };

  return (
    <div className="add-pizza-form">
      

      <Form className="form">
      <div>
        {submissionStatus === "success" && (
          <Alert variant="success">You have Successfully added a Pizza!</Alert>
        )}
        {
            submissionStatus==="fail"&&
            <Alert variant="danger">You encountered an error while trying to submit!</Alert>
        }
      </div>
        <Form.Group className="mb-3">
          <Form.Label>Enter name of Pizza:</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Magherita Pizza"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter the Size of the Pizza:</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Medium"
            value={sizeID}
            name="sizeId"
            onChange={(e) => setSizeID(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Enter the description of the pizza :</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Handmade, soft-sweet pizza "
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter the Price of the Pizza:</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g 1400"
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter the image Name of the Pizza:</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Sicilian.jpg"
            value={imageName}
            name="imageName"
            onChange={(e) => setImageName(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handlesubmit} variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddPizza;
