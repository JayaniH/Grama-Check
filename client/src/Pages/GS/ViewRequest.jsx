import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog'; // Import Material-UI Dialog component
import DialogActions from '@mui/material/DialogActions'; // Import DialogActions for buttons
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent for message content
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ViewRequest = () => {
  const { getAccessToken } = useAuthContext();


 
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState([]);

  const gsDivisionCode = "234B";


  // useEffect(() => {
  //   const accessToken = await getAccessToken();
  //   axios.get(`https://1adbbcb2-28ed-4caa-ace8-6191b640cb48-dev.e1-us-east-azure.choreoapis.dev/xqfp/user-details-service/user-details-617/v1.0/requestData/${gsDivisionCode},{
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //     },
  //   }`).then((response) => {
  //     setRequestData(response.data.citizenRequests);
  //   });
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();

        const headers = {
          'Authorization': `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          `https://1adbbcb2-28ed-4caa-ace8-6191b640cb48-prod.e1-us-east-azure.choreoapis.dev/xqfp/user-details-service/user-details-617/v1/requestData/${gsDivisionCode}`,
          { headers }
        );

        setRequestData(response.data.citizenRequests);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getAccessToken]);

  console.log(requestData);

  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
   // State to control the message dialog for "Cancel"
   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

   // Function to handle opening the message dialog
   const handleMessageDialogOpen = () => {
    setMessageDialogOpen(true);
  };

  // Function to handle closing the message dialog
  const handleMessageDialogClose = () => {
    setMessageDialogOpen(false);
  };

  // Function to handle opening the message dialog for "Cancel"
  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };

  // Function to handle closing the message dialog for "Cancel"
  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
  };



 
  return (
    <Container fluid>
      <Row style={{ width: '100%', height: 'auto', marginRight: 0 }}>
        <NavigationBar />
      </Row>
      <Row style={{ width: '100%', height: '50px', marginTop: '20px' }}>
        <p className='pTopDiv'>All Requests</p>
      </Row>
      <Row style={{ width: '100%', padding: '0px', marginRight: 0 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='tableData'>#</th>
              <th className='tableData'>Name</th>
              <th className='tableData'>NIC</th>
              <th className='tableData'>Required Date</th>
              <th className='tableData'>Status</th>
              <th className='tableData'>View Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='tableData'>1</td>
              <td className='tableData'>Mark</td>
              <td className='tableData'>Otto</td>
              <td className='tableData'>asd</td>
              <td className='tableData'>dds</td>
              <td className='tableData'>
                <button
                  style={{ fontSize: '15px', marginRight: '0px', border: '0px' }}
                  onClick={handleOpen}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </Table>
      </Row>

      {/* Modal component */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Request Details
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
             
              
                <p>Name: </p>
                <p>NIC: </p>
                <p>Address: </p>
                <p>Grama Niladhari Division number:</p>
                <p>District: </p>
                <p>Date of Birth: </p>
                <p>Sex:</p>
                <p>NIC: </p>
                <p>Occupation: </p>
                <p>Reason for request:</p>

                {/* Display check icons for police check, identity check, and address check */}
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Police Check</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Identity Check</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  <span> Address Check</span>
                </div>
                {/* Add "Approved" and "Cancel" buttons */}
                 {/* Add "Approved" and "Cancel" buttons with gaps */}
                 <div style={{ marginTop: '20px' }}>
                 <Link to="/letter">
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }} >
                    Approved
                  </Button>
                  </Link>
                  <Button variant="contained" color="secondary" onClick={handleCancelDialogOpen}>
                    Cancel
                  </Button>
                </div>
              
            
          </div>
        </Box>
      </Modal>

        {/* Message dialog component */}
        <Dialog
        open={messageDialogOpen}
        onClose={handleMessageDialogClose}
        aria-labelledby="message-dialog-title"
        aria-describedby="message-dialog-description"
      >
        
      </Dialog>

       {/* Message dialog component for "Cancel" */}
       <Dialog
        open={cancelDialogOpen}
        onClose={handleCancelDialogClose}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogContent>
          <Typography id="cancel-dialog-title" variant="h6">
            Something error in the details
          </Typography>
          <DialogActions>
            <Button onClick={handleCancelDialogClose} color="primary">
              Send Cancel Request
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ViewRequest;
