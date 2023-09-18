import React from 'react'
import './CreateGS.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateGS() {
  return (
    <div className='letter'>
    <div className='form-container'>
    <h3>Register Grama Sevaka</h3>
    <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>Name </Form.Label>
     <Form.Control type="text" placeholder="Perere" />
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>NIC Number</Form.Label>
     <Form.Control type="number" placeholder="1123456789013" />
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>Email</Form.Label>
     <Form.Control type="text" placeholder="abx@gmail.com" />
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
     <Form.Label>Grama Niladhari Division </Form.Label>
     <Form.Control type='text' placeholder='Colombo'/>
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
     <Form.Label>Grama Niladhari Division Number</Form.Label>
     <Form.Control type='text' placeholder='150A'/>
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
     <Form.Label>Username</Form.Label>
     <Form.Control type='text' placeholder='perera'/>
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>Password</Form.Label>
     <Form.Control type="password" placeholder="*******" />
   </Form.Group>
  
    
     


   
   
   <Button variant="primary" type="submit">
  Create Account
   </Button>
 </Form>  
 </div>
 </div>
  )
}

export default CreateGS