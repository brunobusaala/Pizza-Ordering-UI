import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Empty dependency array to ensure the effect is only triggered once
    // after the initial component render
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!username) {
      validationErrors.username = "Username is required";
    }
    if (!email) {
      validationErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password should be at least 6 characters long";
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await AuthService.register(username, email, password);
      setSubmitStatus("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="my-form">
      <div className="form">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center">Register</h1>
          {submitStatus && (
            <Alert
              variant={
                submitStatus.includes("successful") ? "success" : "danger"
              }
            >
              {submitStatus}
            </Alert>
          )}
          <Form.Group className="mb-20">
            <Form.Label>Enter Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!!errors.username}
              placeholder="e.g Jayden"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter your Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              placeholder="e.g example@gmail.com"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              placeholder="Enter strong password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm your Password:</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
              placeholder="Enter your password again"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
