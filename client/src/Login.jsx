import React from "react";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
     const [email,setEmail]=useState()
     const [password,setPassword]=useState()
     const [status,setStatus]=useState()
     const [isError, setIsError] = useState(false);
     const navigate=useNavigate();
 
     const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/login', { email, password })
        .then(result => {
          console.log(result);
    
          if (result.data.token) {
            document.cookie = `token=${result.data.token}; path=/; max-age=3600;`;
            document.cookie = `username=${result.data.user.name}; path=/; max-age=3600;`;
            //console.log("Logged-in user:", result.data.user);
            //console.log(document.cookie)
            setStatus('✅ Login successfull!');
            navigate("/home");
          } else {
            //console.log("Login failed:", result.data);
            setStatus('Login failed: No Register record');
          }
        })
        .catch(err => {
          console.log("Login error:", err);
        });
    };

   
  return (
    <div className="bg-secondary vh-100 d-flex align-items-top justify-content-center">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Log In</h2>
              <form onSubmit={handleSubmit}>
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
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  {status && (
            <div className={`mt-3 alert ${isError ? 'alert-danger' : 'alert-success'}`}>
              {status}
            </div>
          )}
                </div>

               </form>
               <hr className="my-4" />
                <div className="text-center">
                  <p className="mb-2">Are you an admin?</p>
                  <button style={{ maxWidth: '800px', width: '100%' }} onClick={()=>{navigate('/adminlogin')}} className="btn btn-outline-dark">
                    Go to Admin Login
                  </button>
                </div>
               
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
