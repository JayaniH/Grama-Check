import React from 'react'
import './Home.css';
import { useAuthContext } from "@asgardeo/auth-react";

function Home() {
  const { signIn } = useAuthContext();
  return (
    <div className="home">
    <h1>Welcome to Grama Check</h1>
    <div className="buttons">
      <button className="register-button">Register</button>
      <button className="login-button" onClick={()=> signIn()}>Login</button>
    </div>
  </div>
  );
}

export default Home