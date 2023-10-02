
import React, { useState } from 'react';
import './Letter.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'; // Import the date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

function Letter() {
   // Define state variables for the date
   const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className='letter'>
       <div className='form-container'>
       <h3>Certificate on Residence and Character issued by the Grama Niladhari </h3>
       <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>District and Divisional Secretary Division</Form.Label>
        <Form.Control type="text" placeholder="Batticaloa" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Grama Niladhari Division Number</Form.Label>
        <Form.Control type='text' placeholder='150A'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Whether applicant's is personally known to Grama Niladhari?</Form.Label>
        <div>
              <Form.Check
                type="radio"
                id="yes-radio"
                label="Yes"
                name="knownToGramaNiladhari"
                value="Yes"
              />
              <Form.Check
                type="radio"
                id="no-radio"
                label="No"
                name="knownToGramaNiladhari"
                value="No"
              />
            </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>If so, since when?</Form.Label>
            <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
             dateFormat="yyyy-MM-dd" // You can customize the date format
              placeholderText="Select a date"
            />
        </Form.Group>
        <h4>Information About Applicants</h4>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name and Address</Form.Label>
        <Form.Control type="text" placeholder="Perere, Batticaloa" />
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
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="40" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Civil Status</Form.Label>
        <div>
              <Form.Check
                type="radio"
                id="married"
                label="Married"
                name="civil status"
               
              />
              <Form.Check
                type="radio"
                id="not_married"
                label="Not Married"
                name='civil status'
               
              />
            </div>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Whether SriLankan?</Form.Label>
        <div>
              <Form.Check
                type="radio"
                id="yes-radio"
                label="Yes"
                name="Srilankan"
                value="Yes"
              />
              <Form.Check
                type="radio"
                id="no-radio"
                label="No"
                name="Srilankan"
                value="No"
              />
            </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Religion</Form.Label>
        <Form.Select aria-label="Default select example">
      <option>Religion</option>
      <option value="buddhism">Buddhism</option>
      <option value="Hindhusm">Hindhusm</option>
      <option value="islam">Islam</option>
      <option value="christianity">Christianity</option>
    </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Present Occupation</Form.Label>
        <Form.Control type="text" placeholder="Job" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>NIC Number</Form.Label>
        <Form.Control type="number" placeholder="1123456789013" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Purpose of the letter</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>  
    </div>
    </div>
  )
}

export default Letter