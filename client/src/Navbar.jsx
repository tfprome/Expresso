import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from './assets/react.svg'

const Navbar = (props) => {
    const navigate=useNavigate();
    const handleLogout=()=>{
    document.cookie='token=;';
    document.cookie='username=;'
    navigate('/')
  };
    return (
        
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="navbar-brand fw-bold fs-4 custom-navbar-brand">Expresso</span>
        </div>

        <div className="d-flex gap-4 align-items-center">
        <Link className="nav-link custom-nav-link" to="/home">Home</Link>
          <Link className="nav-link custom-nav-link" to="/service">Services</Link>
          <Link className="nav-link custom-nav-link" to="/blogshow">Blog</Link>
          <Link className="nav-link custom-nav-link" to="/contact">Contact</Link>
          <button onClick={handleLogout} className="btn custom-logout-btn">
            Logout
          </button>
        </div>

      </div>
    </nav>
    ); 

};

export default Navbar;