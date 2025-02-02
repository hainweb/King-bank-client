import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Url/Url';
import './NewLogin.css'; // Ensure the CSS file is imported correctly

function Login({ setUser }) {
    const [formData, setFormData] = useState({
        Mobile: '',
        Password: ''
    });
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);  // New state for loading
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading
        axios.post(`${BASE_URL}/login`, formData, { withCredentials: true })
            .then((response) => {
                setLoading(false);  // Stop loading
                if (response.data.status) {
                    setUser(response.data.user);
                    navigate('/');
                } else {
                    setInfo(response.data.message);
                }
            })
            .catch(() => {
                setLoading(false);  // Stop loading on error
                setInfo('Something went wrong. Please try again later.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <section>
                {/* Create background spans */}
                {[...Array(112)].map((_, idx) => (
                    <span key={idx}></span>
                ))}

                <div className="signin">
                    <div className="content">
                        <h2>Log In</h2>

                        <div className="form" onSubmit={handleSubmit}>
                            <div className="inputBx">
                                <input
                                    type="number"
                                    name="Mobile"
                                    value={formData.Mobile}
                                    onChange={handleChange}
                                    required
                                />
                                <i>Mobile</i>
                            </div>
                            <div className="inputBx">
                                <input
                                    type="password"
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleChange}
                                    required
                                />
                                <i>Password</i>
                            </div>
                            <p style={{ color: 'red' }}> {info}</p>
                            <div className="links">
                                <a href="#">Forgot Password</a>
                                <Link to="/signup">Signup</Link>
                            </div>
                            <div className="inputBx">
                                {/* Show loading animation if loading is true */}
                                {loading ? (
                                    <div className="loading-animation">
                                        <div className="loading-dot"></div>
                                        <div className="loading-dot"></div>
                                        <div className="loading-dot"></div>
                                    </div>
                                ) : (
                                    <input onClick={handleSubmit} type="submit" value="Login" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
