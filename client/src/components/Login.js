import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { ConfigContext } from '../context/ConfigContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { baseUrl } = useContext(ConfigContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!email || !password) {
      return setErrorMessage('Please fill in all fields');
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
      storeToken(response.data.authToken);
      await authenticateUser()
      navigate('/dashboard');
    } catch (error) {
      const errorDescription = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'An unexpected error occurred. Please try again.';
      setErrorMessage(errorDescription);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "400px", backgroundColor: '#82c4be' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label><strong>Email:</strong></Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label><strong>Password:</strong></Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button style={{ backgroundColor: '#e76e50', borderColor: '#123456' }} className="btn mt-3" type="submit">Log In</Button>
          </Form>

          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

          <div className="w-100 text-center mt-3">
            <p>Don't have an account yet?</p>
             <Link to={"/auth/signup"} style={{ backgroundColor: '#006c75', borderColor: '#123456', color: '#ffffff', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;

