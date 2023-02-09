import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [profile,setProfile]=useState({});
    const navigate=useNavigate();
    const getProfile=async()=>{
        const response=await fetch("http://localhost:8080/api/user/userdetails",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            }
        });
        const result=await response.json();
        if(result){
            setProfile(result)
        }
    }

    useEffect(()=>{
       
            if (!localStorage.getItem("token")) {
              navigate("/signup")
            } else{
                getProfile()

            }
        
    },[])
  return (
  <div className="profile-parent" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
 <div className='profile'>
      <h1>User's Profile</h1>
      <h2>Name: {profile.name} </h2>
      <h2>Email: {profile.email} </h2>
    </div>
  </div>
   
  )
}

export default Profile
