import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './AdminHome.css';
import { useAuthContext } from "@asgardeo/auth-react";
import { Link } from 'react-router-dom'; // Import Link for navigation

function AdminHome() {
  const {  getBasicUserInfo, getAccessToken,signOut,getDecodedIDToken } = useAuthContext();
  const [basicUserDetails, setBasicUserDetails] = useState(null); 
  const [token, setToken] = useState(null); // Define 'token' state
  const [decodedIDToken, setDecodedIDToken] = useState(null);

  useEffect(() => {
    getBasicUserInfo()
      .then((basicUserDetails) => {
        console.log(basicUserDetails);
        setBasicUserDetails(basicUserDetails); // Set the 'basicUserDetails' state
      })
      .catch((error) => {
        console.log(error);
      });

    getAccessToken()
      .then((accessToken) => {
        console.log(accessToken);
        setToken(accessToken); // Set the 'token' state
      })
      .catch((error) => {
        console.log(error);
      });

      getDecodedIDToken().then((decodedIDToken) => {
        console.log(decodedIDToken);
    }).catch((error) => {
        // Handle the error
    })
  }, []);

 

  return (
    <div className="d-grid gap-2">
    <Link to="/CreateGS"> {/* Use Link for navigation */}
     <Button variant="primary" size="lg">
       Create Grama Sevaka
     </Button>
   </Link>
   
   <button className="login-button" onClick={()=> signOut()}>Logout</button>
   <div>
        {/* Display token if available */}
        {token && <p>Access Token: {token}</p>}
      </div>
      
     
 </div>
 
  )
}

export default AdminHome