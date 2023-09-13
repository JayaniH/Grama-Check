import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ViewRequest = () => {
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
              <td className='tableData'> <button style={{ fontSize: "15px", marginLeft: "2px", marginRight: "0px", border:"0px" }}>
              <FontAwesomeIcon icon={faEye} />
              </button>
                </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default ViewRequest;
