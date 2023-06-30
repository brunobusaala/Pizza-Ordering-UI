import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/token', {
        userName,
        password,
      });
      const token = response.data.token;
      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Redirect or perform any necessary action after successful login
    } catch (error) {
      // Handle login error
    }
  };
  
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Perform any necessary action after logout
  };

  return (
    <div>
      <h2>Login Page</h2>
      <Form>
      <Form.Group>
      <Form.Control
        type="text"
        placeholder="Enter your userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      </Form.Group>
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      </Form>
      
    </div>
  );
};

export default Login;
