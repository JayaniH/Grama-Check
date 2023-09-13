import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../Components/Navbar';

const ViewRequest = () => {
  return (
    <Container fluid>
      <Row style={{ width: "100%", height: "auto", marginRight: 0 }}>
        <NavigationBar />
      </Row>
      <Row style={{ width: "100%", height: "100px", marginRight: 0 }}>
        <p>All Requests</p>
      </Row>
      <Row style={{ width: "100%", padding: "0px", marginRight: 0 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Required Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>asd</td>
              <td>dds</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default ViewRequest;
