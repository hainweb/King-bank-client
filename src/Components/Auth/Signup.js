import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Url/Url';
import { User, Lock, Phone, ShoppingCart } from 'lucide-react';
import './Signup.css';  // Import the CSS file

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    Uid: '',
    Name: '',
    Mobile: '',
    Password: '',
  });
  const [info, setInfo] = useState('');

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Validate Name (non-empty)
    if (!formData.Name.trim()) {
      setInfo('Name is required');
      return false;
    }

    // Validate Mobile (must be exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.Mobile)) {
      setInfo('Mobile must be 10 digits');
      return false;
    }

    // Validate Password (must be at least 4 characters)
    if (formData.Password.length < 4) {
      setInfo('Password must be at least 4 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios.post(`${BASE_URL}/signup`, formData, { withCredentials: true }).then((response) => {
      console.log(response);

      if (response.data.status) {
        const userData = { Name: formData.Name };
        setUser(userData);
        navigate('/');
      } else {
        setInfo(response.data.message);
        navigate('/signup');
      }
    });
  };

  return (
    <div className="signup-container">
      {/* Background Spans */}
      <section className="background-spans">
        {[...Array(112)].map((_, idx) => (
          <span key={idx}></span>
        ))}
      </section>

      {/* Main Container */}
      <div className="signup-box">
        <div className="box-content">
          <div className="text-center">
            <div className="icon-container">
              <ShoppingCart className="icon animate-icon" />
            </div>
            <h2 className="title">Sign Up</h2>
            <p className="subtitle">Create an account with us</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <User className="input-icon" />
              <input
                className="input-field"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className="input-group">
              <User className="input-icon" />
              <input
                className="input-field"
                type="text"
                name="Uid"
                value={formData.Uid}
                onChange={handleChange}
                placeholder="Uid"
              />
            </div>

            <div className="input-group">
              <Phone className="input-icon" />
              <input
                className="input-field"
                type="number"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" />
              <input
                className="input-field"
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            <p style={{color:'red'}}>{info}</p>

            <div className="sign-lst">
                                <p >Already an account</p>
                                <Link  to="/login">
                                <h6 className='sign-log'>Login</h6>
                                </Link>
                            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );

};

export default Signup;
