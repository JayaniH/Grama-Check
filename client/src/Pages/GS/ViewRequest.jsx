import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container fluid>
      <Row style={{ width: "100%", height: "auto", marginRight: 0 }}>
        <NavigationBar />
      </Row>
      <Row style={{ width: "100%", height: "50px", marginTop:"20px"}}>
        <p className='pTopDiv'>All Requests</p>
      </Row>
      <Row style={{ width: "100%", padding: "0px", marginRight: 0 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th  className='tableData'>#</th>
              <th  className='tableData'>Name</th>
              <th  className='tableData'>NIC</th>
              <th  className='tableData'>Required Date</th>
              <th  className='tableData'>Status</th>
              <th  className='tableData'>View Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='tableData'>1</td>
              <td className='tableData'>Mark</td>
              <td className='tableData'>Otto</td>
              <td className='tableData'>asd</td>
              <td className='tableData'>dds</td>
              <td className='tableData'> <button style={{ fontSize: "15px",  marginRight: "0px", border:"0px" }}>
              <FontAwesomeIcon icon={faEye} />
              </button>
                </td>
            </tr>
          </tbody>
        </Table>
      </Row>

      <div>
      <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal>
    </div>
    </Container>
  );
};

export default ViewRequest;
