import React, { useEffect } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from 'react-router-dom';

function Page1() {
    const { basicUserInfo } = useAuthContext();

    useEffect(() => {
        // Check if basicUserInfo is available and user has a group
        if (basicUserInfo && basicUserInfo.groups && basicUserInfo.groups.length > 0) {
          const userGroup = basicUserInfo.groups[0]; // Assuming the user has one group
    
          // Redirect based on the user's group
          if (userGroup === 'Citizen') {
            // Redirect to the CitizenHome page if the user is a Citizen
            return <Navigate to="/CitizenHome" />;
          } else if (userGroup === 'GramaSevaka') {
            // Redirect to the GSHome page if the user is a GramaSevaka
            return <Navigate to="/GSHome" />;
          }
        }
      }, [basicUserInfo]);
    
      return (
        <div>
          {/* Your component content */}
        </div>
      );
    }
    

export default Page1