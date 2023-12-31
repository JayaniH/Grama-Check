import React from 'react'
import Button from 'react-bootstrap/Button';
import './ApplyRequest.css';
import { useAuthContext } from "@asgardeo/auth-react";
import { Link } from 'react-router-dom'; // Import Link for navigation

function CitizenHome() {

  const { basicUserInfo, signOut } = useAuthContext();
  return (
    <div className="d-grid gap-2">
    <Link to="/applyForm"> {/* Use Link for navigation */}
     <Button variant="primary" size="lg">
       Apply Request
     </Button>
   </Link>
   <Link to="/checkStatus1"> {/* Use Link for navigation */}
   <Button variant="secondary" size="lg">
     Check Status
   </Button>
   </Link>
   <button className="login-button" onClick={()=> signOut()}>Logout</button>
 </div>
  )
}

export default CitizenHome