import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const onConvert = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    // console.log(credentials.email,credentials.password)
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    const result = await response.json()
    console.log(result);
    if (result.user) {
      localStorage.setItem("token",result.auth);
      navigate("/");
    }

    setCredentials({ email: "", password: "" })
  }

  useEffect(()=>{
if(localStorage.getItem("token")){
  navigate("/")
}
  },[])

  return (
    <div className='login-form'>
      <h1>Login here</h1>
      <input onChange={onConvert} type="email" value={credentials.email} name='email' placeholder='Enter Your Email' />
      <input onChange={onConvert} type="password" value={credentials.password} name='password' placeholder='Enter Your Password' />
      <button onClick={handleLogin} type='button' className='btn'>Login</button>
    </div>
  )
}

export default Login
