import React from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import Button from 'react-bootstrap/Button';
import './GSHome.css';
import { Link } from 'react-router-dom'; // Import Link for navigation



function GSHome() {

  const { basicUserInfo, signOut } = useAuthContext();
  return (
    <div className="d-grid gap-2">
    <Link to="/viewRequests"> {/* Use Link for navigation */}
     <Button variant="primary" size="lg">
       View Request
     </Button>
   </Link>
   
   <button className="login-button" onClick={()=> signOut()}>Logout</button>
 </div>
  )
}

export default GSHome