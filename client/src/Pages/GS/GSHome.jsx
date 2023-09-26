import React from 'react'
import { useAuthContext } from "@asgardeo/auth-react";


function GSHome() {

  const { basicUserInfo, signOut } = useAuthContext();
  return (
    <div>GSHome
       <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
    </div>
  )
}

export default GSHome