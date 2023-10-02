import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from 'react-router-dom';

function Page1() {
  const { getDecodedIDToken} = useAuthContext();
  const [redirectTo, setRedirectTo] = useState(null);

  // useEffect(() => {
    async function checkUserGroup() {
      try {
        const decodedIDToken = await getDecodedIDToken();
        console.log(decodedIDToken);

        if (decodedIDToken.groups && decodedIDToken.groups.length > 0) {
          const userGroup = decodedIDToken.groups[0]; // Assuming the user has one group

          if (userGroup === 'Citizen') {
            // Redirect to the CitizenHome page if the user is a Citizen
            setRedirectTo("/CitizenHome");
          } else if (userGroup === 'GramaSevaka') {
            // Redirect to the GSHome page if the user is a GramaSevaka
            setRedirectTo("/GSHome");
          }
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }

    checkUserGroup();
  // }, []);

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div>
     
    </div>
  );
}

export default Page1;
