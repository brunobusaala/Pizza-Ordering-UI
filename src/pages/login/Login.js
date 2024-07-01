import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate the form fields
    const validationErrors = {};
    if (!userName) {
      validationErrors.userName = "Username is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    // Set the errors state and return if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("/api/token/Login", {
        userName,
        password,
        rememberMe,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("/"); //Redirect to home page
      } else {
        setErrors({ invalidCredentials: "Invalid Credentials" });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-form">
      <div className="form">
        <h2 className="text-center">Login Page</h2>
        <Form>
          <Form.Group>
            <Form.Label className="mt-3">Enter Your UserName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!!errors.userName} // Set the isInvalid prop based on the validation error
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3" htmlFor="password">
              Enter Password:
            </Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password} // Set the isInvalid prop based on the validation error
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </Form.Group>

          <Button className="btn btn-primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
