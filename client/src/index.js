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
  GramaCheckApiUrl:
    "https://1adbbcb2-28ed-4caa-ace8-6191b640cb48-prod.e1-us-east-azure.choreoapis.dev/xqfp/user-details-service/user-details-617/v1",
  
      signInRedirectURL: "https://9e9fd4c9-ccfc-43a0-969d-fe79e453fb3b.e1-us-east-azure.choreoapps.dev",
      signOutRedirectURL: "https://9e9fd4c9-ccfc-43a0-969d-fe79e453fb3b.e1-us-east-azure.choreoapps.dev",
      clientID: "bdQc9v1ho5B_lB1TbThXBfCywf8a",
      baseUrl: "https://api.asgardeo.io/t/orgnization1",
      scope: ["openid", "address", "email", "phone", "profile", "groups"]

};



root.render(
  <AuthProvider config={config}>
    <React.StrictMode>
      <AuthRedirect /> {/* Render the AuthRedirect component */}
      <App />
    </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
