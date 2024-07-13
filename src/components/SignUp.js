import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ConfigContext } from '../context/ConfigContext';


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { baseUrl } = useContext(ConfigContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      await axios.post(`${baseUrl}/auth/signup`, { name, email, password });
      navigate('/login');
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
          <h2 className="text-center mb-4">Sign Up</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label><strong>Name:</strong></Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label><strong>Email:</strong></Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label><strong>Password:</strong></Form.Label>
              <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button style={{ backgroundColor: '#e76e50', borderColor: '#123456' }} className="btn mt-3" type="submit">Sign Up</Button>
          </Form>

          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

          <div className="w-100 text-center mt-3">
            <p>Already have an account?</p>
             <Link to={"/auth/login"} style={{ backgroundColor: '#006c75', borderColor: '#123456', color: '#ffffff', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignUp;
