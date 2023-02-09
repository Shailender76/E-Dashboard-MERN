import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    const authorized=localStorage.getItem("token")
  return (
    <div>
        {
            authorized?<Outlet/>:<Navigate to="/signup"/>
        }
      
    </div>
  )
}

export default PrivateComponent
