import React from 'react'
import './Home.css';

function Home() {
  return (
    <div className="home">
    <h1>Welcome to Grama Check</h1>
    <div className="buttons">
      <button className="register-button">Register</button>
      <button className="login-button">Login</button>
    </div>
  </div>
  );
}

export default Home