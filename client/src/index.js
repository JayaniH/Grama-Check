import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {

  signInRedirectURL: "http://localhost:3000/Page1",
  signOutRedirectURL: "http://localhost:3000/homePage",
  clientID: "YKzbzLsh2co9_mPOJqf1B4HB0Dga",
  baseUrl: "https://api.asgardeo.io/t/organization123",

  scope: [ "openid", "address", "email","phone" ,"profile","groups"] 

}

root.render(
  <AuthProvider config={config}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
