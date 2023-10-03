import React, { useEffect, useState } from 'react';
import './Home.css';
import { useAuthContext } from "@asgardeo/auth-react";

function Home() {
  const { signIn, getBasicUserInfo, getAccessToken } = useAuthContext();
  // const [token, setToken] = useState(null); // Define 'token' state

  
  getBasicUserInfo().then((basicUserDetails) => {
    console.log(basicUserDetails);
}).catch((error) => {
    // Handle the error
})


  return (
    <div className="home">
      <h1>Welcome to Grama Check</h1>
      <div className="buttons">
        <button className="login-button" onClick={() => signIn()}>
          Login
        </button>
      </div>
      {/* <div>
        
        {token && <p>Access Token: {token}</p>}
      </div> */}
    </div>
  );
}

export default Home;
