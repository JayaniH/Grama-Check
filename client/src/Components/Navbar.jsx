import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthContext } from "@asgardeo/auth-react";

function NavigationBar() {

  const {  signOut } = useAuthContext();
  return (
    <>
     

      <Navbar data-bs-theme="light" style={{backgroundColor:"#8E24AA"}}>
        <Container>
          <Navbar.Brand href="#home">Grama Check</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>

          <Nav>
            <Nav.Link onClick={()=> signOut()}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;