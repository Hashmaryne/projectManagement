import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>Property Management</h2>
                </Link>
                {isLoggedIn && (
                    <Link className='navbar-leads' to="/leads">
                    <h3>Leads</h3>
                </Link>
                )}
                
                {!isLoggedIn && (
                    <Link to="/login">
                        <h3>Login</h3>
                    </Link>
                )}
                {isLoggedIn && (
                    <Link onClick={handleLogout}>
                        <h3>Logout</h3>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
