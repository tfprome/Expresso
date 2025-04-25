import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {
     const [name,setName]=useState()
     const [email,setEmail]=useState()
     const [password,setPassword]=useState()
     const navigate=useNavigate()

     const handleSubmit=(e)=>{
         e.preventDefault()
         axios.post('http://localhost:5000/signup',{name,email,password})
         .then(result=>console.log(result))
         navigate('/login')
         .catch(err=>{console.log(err)})
     }



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" id="name" name="name" className="form-control" placeholder="Enter your name" required 
                  onChange={(e)=>setName(e.target.value)}/>
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>

                {/* Signup Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary mb-2">
                    Sign Up
                  </button>
                </div>
                </form>
                {/* Text and Login Button */}
                <p className="text-center mb-2">Already have an account?</p>
               
                <div className="d-grid">
                  <Link to='/login' type="button" className="btn btn-secondary">
                    Login
                  </Link>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
