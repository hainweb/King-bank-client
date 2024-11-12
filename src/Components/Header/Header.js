import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Url/Url';
import './Header.css';

function Header({ user, setUser }) {
  const handleLogout = () => {
    axios.get(`${BASE_URL}/logout`, { withCredentials: true }).then((response) => {
      console.log(response.data.status);

      if (response.data.status) {
        setUser(null);
      }
    });
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="brand-container">
          <Link to="/" className="brand-link">
            <h1 className="brand-title">Bank King</h1>
          </Link>
        </div>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            {user ? (
              <>
                <li className="navbar-item">
                  <span className="navbar-user-name">{user.Name}</span>
                </li>
                <li className="navbar-item">
                  <Link to="/login" onClick={handleLogout} className="navbar-link">Logout</Link>
                </li>
                {user.Premium && (
                  <li className="navbar-item">
                    <Link to="/atm" className="navbar-link premium-link">Premium ATM</Link>
                  </li>
                )}
                <li className="navbar-item">
                  <Link to="/settings" className="navbar-link">Settings</Link>
                </li>
              </>
            ) : (
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link signup-link">Signup</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;