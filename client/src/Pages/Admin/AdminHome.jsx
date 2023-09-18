import React from 'react'
import Button from 'react-bootstrap/Button';
import './AdminHome.css';
import { useAuthContext } from "@asgardeo/auth-react";
import { Link } from 'react-router-dom'; // Import Link for navigation

function AdminHome() {
    const { signOut } = useAuthContext();
  return (
    <div className="d-grid gap-2">
    <Link to="/CreateGS"> {/* Use Link for navigation */}
     <Button variant="primary" size="lg">
       Create Grama Sevaka
     </Button>
   </Link>
   
   <button className="login-button" onClick={()=> signOut()}>Logout</button>
 </div>
  )
}

export default AdminHome