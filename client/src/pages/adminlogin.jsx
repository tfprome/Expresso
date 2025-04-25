import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/adminlogin', { email, password })
      .then(result => {
        if (result.data.token) {
          document.cookie = `adminToken=${result.data.token}; path=/; max-age=3600;`;
          document.cookie = `adminName=${result.data.admin.name}; path=/; max-age=3600;`;
          navigate("/admin");
        } else {
          console.log("Admin login failed:", result.data);
        }
      })
      .catch(err => {
        console.log("Admin login error:", err);
      });
  };

  return (
    <div className="bg-dark vh-100 d-flex align-items-top justify-content-center text-white">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-secondary text-white shadow-lg">
              <div className="card-body">
                <h2 className="text-center mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Admin Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter admin email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-light">
                      Log In as Admin
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                    Back to User Login
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

export default AdminLogin;
