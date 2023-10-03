import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const CertificatePdf = ({ name, nic }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.section}>Certificate</Text>
      <Text style={styles.section}>Name: {name}</Text>
      <Text style={styles.section}>NIC: {nic}</Text>
    </Page>
  </Document>
);

function CheckStatus1() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleOpenModal = (data) => {
    setSelectedRowData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRowData(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Check Request Status</h2>
      <Table striped bordered hover>
        {/* Table header here */}

        <tbody>
        <tr>
        <th>#</th>
        <th>Request Id</th>
        < th>Request Date</th>
        <th>Reason</th>
        <th>Request Status</th>
        <th>View Letters</th>
        </tr>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>mmmm</td>
            <td>
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleOpenModal({ name: 'Mark', nic: 'Otto' })}
              />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>mmmm</td>
            <td>
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleOpenModal({ name: 'Mark', nic: 'Otto' })}
              />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>mmmm</td>
            <td>
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleOpenModal({ name: 'Mark', nic: 'Otto' })}
              />
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Letter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRowData && (
            <>
              <p>Name: {selectedRowData.name}</p>
              <p>NIC: {selectedRowData.nic}</p>
            </>
          )}
          <PDFDownloadLink
            document={<CertificatePdf name={selectedRowData?.name} nic={selectedRowData?.nic} />}
            fileName="certificate.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CheckStatus1;
