import React, { useState } from 'react';
import './ApplyForm.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'; // Import the date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

function ApplyForm() {
   // Define state variables for the date
   const [selectedDate, setSelectedDate] = useState(null);
  
    return (
  
 
    <div className='letter'>
       <div className='form-container'>
       <h3>Request Apply Form</h3>
       <Form>
       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Full Name </Form.Label>
        <Form.Control type="text" placeholder="Perere, Batticaloa" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Address</Form.Label>
  <div className="address-field">
    <Form.Control type="text" placeholder="House No" />
  </div>
  <div className="address-field">
    <Form.Control type="text" placeholder="Street Name" />
  </div>
  <div className="address-field">
    <Form.Control type="text" placeholder=" Area Post Office" />
  </div>
  <div className="address-field">
    <Form.Control type="text" placeholder="City" />
  </div>
</Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Grama Niladhari Division Number</Form.Label>
        <Form.Control type='text' placeholder='150A'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>District</Form.Label>
        <Form.Control type='text' placeholder='Batticaloa'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Date of Birth</Form.Label>
            <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
             dateFormat="yyyy-MM-dd" // You can customize the date format
              placeholderText="Select a date"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Sex</Form.Label>
        <div>
              <Form.Check
                type="radio"
                id="male"
                label="Male"
                name="sex"
               
              />
              <Form.Check
                type="radio"
                id="female"
                label="female"
                name='sex'
               
              />
            </div>
        
      </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>NIC Number</Form.Label>
        <Form.Control type="number" placeholder="1123456789013" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Present Occupation</Form.Label>
        <Form.Control type="text" placeholder="Job" />
      </Form.Group>
        <Form.Label>Reason for request</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
      Send Request
      </Button>
    </Form>  
    </div>
    </div>
  )
}

export default ApplyForm