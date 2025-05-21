import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({});
    }, 3000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors and message
    setErrors({});
    setMessage("");

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

    setLoading(true);

    try {
      await AuthService.login(userName, password);
      navigate("/");
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="my-form">
      <div className="form">
        <h2 className="text-center">Login Page</h2>
        {message && <Alert variant="danger">{message}</Alert>}
        <Form>
          <div className="text-center text-danger">
            {errors.invalidCredentials}
          </div>
          <Form.Group>
            <Form.Label className="mt-3">Enter Your UserName:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!!errors.userName}
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
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
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

          <Button
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
