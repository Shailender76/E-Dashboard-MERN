import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const onConvert = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSignup = async () => {
        // console.log(credentials.name,credentials.email,credentials.password)
        const response = await fetch("http://localhost:8080/api/user/signup", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const result = await response.json();
        console.log(result)
        if (result.user) {
            localStorage.setItem("token", result.auth)
            navigate("/")
        }

        setCredentials({ name: "", email: "", password: "" })
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])
    
    return (
        <>
            <div className='signup-form'>
                <h1>Sign Up here</h1>
                <input onChange={onConvert} type="text" value={credentials.name} name='name' placeholder='Enter Your Name' />
                <input onChange={onConvert} type="email" value={credentials.email} name="email" placeholder='Enter Your Email' />
                <input onChange={onConvert} type="password" value={credentials.password} name="password" placeholder='Enter Your Password' />
                <button onClick={handleSignup} type='button' className="btn">Sign Up</button>
            </div>


        </>
    )
}

export default Signup
