import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Define a component that handles the redirection logic
function AuthRedirect() {
  const { getDecodedIDToken } = useAuthContext();

  useEffect(() => {
    async function checkUserGroupAndRedirect() {
      try {
        const decodedIDToken = await getDecodedIDToken();

        if (decodedIDToken.groups && decodedIDToken.groups.length > 0) {
          const userGroup = decodedIDToken.groups[0]; // Assuming the user has one group

          if (userGroup === 'Citizen') {
            // Redirect to the CitizenHome page if the user is a Citizen
            window.location.href = "/CitizenHome";
          } else if (userGroup === 'GramaSevaka') {
            // Redirect to the GSHome page if the user is a GramaSevaka
            window.location.href = "/GSHome";
          }
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }

    checkUserGroupAndRedirect();
  }, []);

  return null;
}

const config = {
  signInRedirectURL: "http://localhost:3000/Page1",
  signOutRedirectURL: "http://localhost:3000/homePage",
  clientID: "YKzbzLsh2co9_mPOJqf1B4HB0Dga",
  baseUrl: "https://api.asgardeo.io/t/organization123",
  scope: ["openid", "address", "email", "phone", "profile", "groups"]
}

root.render(
  <AuthProvider config={config}>
    <React.StrictMode>
      <AuthRedirect /> {/* Render the AuthRedirect component */}
      <App />
    </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
