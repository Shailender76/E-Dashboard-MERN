import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const authorized = localStorage.getItem("token")
  // if(!authorized){
  //   navigate("/signup")
  // }else{
  //   navigate("/")
  // }

  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/signup")
  }
  return (
    <>
      <nav className="navbar">
        <ul>
          {authorized ?
            <>
              <li><Link to="/">Product</Link></li>
              <li><Link to="/addproduct">Add Product</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link onClick={logOut} to="/signup">Logout</Link></li>
            </> :
            <div className="right">
              <li><Link to="/login">Login</Link></li>
              <li ><Link to="/signup">Signup</Link></li>
            </div>}





        </ul>
      </nav>
    </>
  )
}

export default Navbar;