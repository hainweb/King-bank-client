import axios from 'axios';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Url/Url';
import './Header.css'; // Make sure to include the CSS file

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
        <div className='app'>
            <Navbar expand="lg" className="navbar-main">
                <Navbar.Brand as={Link} to="/" className="navbar-brand">Bank King</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navbar-links">
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>

                        {user ? (
                            <>
                                <span className="nav-user-name">{user.Name}</span>
                                <Nav.Link as={Link} onClick={handleLogout} to="/login" className="nav-link">Logout</Nav.Link>
                                {user.Premium && <Nav.Link as={Link} to='/atm' className="nav-link premium-link">Premium ATM</Nav.Link>}
                                <Nav.Link as={Link} to='/settings' className="nav-link">Settings</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/signup" className="nav-link signup-link">Signup</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
