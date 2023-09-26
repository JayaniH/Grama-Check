import React, { useEffect, useState } from 'react';
import './CreateGS.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuthContext } from '@asgardeo/auth-react';

function CreateGS() {
  // Define state variables for form inputs
  const [name, setName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('');
  const [divisionNumber, setDivisionNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();

  const { getAccessToken } = useAuthContext();

  useEffect(() => {
    getAccessToken().then((accessToken) => {
        console.log(accessToken);
        setToken(accessToken);
    }).catch((error) => {
        console.log(error);
    });
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Gather user registration data from the form
    const userData = {
      userName: username,
      password: password,
      name: name,
      nicNumber: nicNumber,
      email: email,
      division: division,
      divisionNumber: divisionNumber,
    };

    const options = {
      method: 'POST',
      url: 'https://api.asgardeo.io/t/organization123/scim2/Users',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: userData, 
    };

    try {
      const response = await axios.request(options);

      // Handle a successful registration
      console.log('User registered successfully:', response.data);

      // Redirect to the GS.jsx page or perform other actions as needed
    } catch (error) {
      // Handle registration error
      console.error('User registration failed:', error);
    }
  };

  return (
    <div className='letter'>
      <div className='form-container'>
        <h3>Register Grama Sevaka</h3>
        <Form onSubmit={handleSubmit}>
          {/* Form fields with controlled components */}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Perere"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nicNumber">
            <Form.Label>NIC Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1123456789013"
              value={nicNumber}
              onChange={(e) => setNicNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="abx@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="division">
            <Form.Label>Grama Niladhari Division</Form.Label>
            <Form.Control
              type="text"
              placeholder="Colombo"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="divisionNumber">
            <Form.Label>Grama Niladhari Division Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="150A"
              value={divisionNumber}
              onChange={(e) => setDivisionNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="perera"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateGS;
