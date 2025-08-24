import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://expresso-ilwa7t092-tfprome-651233fe.vercel.app/login",
        { email, password }
      );

      if (result.data.token) {
        // ✅ Save JWT token in sessionStorage
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("username", result.data.user.name);

        setIsError(false);
        setStatus("✅ Login successful!");
        navigate("/home");
      } else {
        // ❌ Wrong email or password
        setIsError(true);
        setStatus("❌ Wrong email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setIsError(true);
      setStatus("❌ Login failed: invalid credentials or server error.");
    }
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>

                  {/* ✅ Success/Error Message */}
                  {status && (
                    <div
                      className={`mt-3 alert ${
                        isError ? "alert-danger" : "alert-success"
                      }`}
                    >
                      {status}
                    </div>
                  )}
                </form>
                <hr className="my-4" />
                <div className="text-center">
                  <p className="mb-2">Are you an admin?</p>
                  <button
                    style={{ maxWidth: "800px", width: "100%" }}
                    onClick={() => {
                      navigate("/adminlogin");
                    }}
                    className="btn btn-outline-dark"
                  >
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
