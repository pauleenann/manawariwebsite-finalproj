import React, { useEffect, useState } from 'react';
import './AdminNavBar.css';
import shoppingbag from '../Images/shoppingbag.png';
import contactmail from '../Images/contactmail.png';
import userImage from '../Images/user.png';
import { Link } from 'react-router-dom';
import logout from '../Images/logoutwhite.png';
import { useNavigate } from 'react-router-dom';
import add from '../Images/addwhite.png';


const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('category');
    // Other logout actions as needed
    window.location.replace('/');
  };

  const handleClick = async () => {
    if (!localStorage.getItem('email')) {
      alert('Please log in first');
      navigate('/signin');
    } else {
      navigate('/bag');
    }
  };

  return (
    <header>
      <nav className='admin-nav'>
        <div className="contact-nav">
          {/* <img src={contactmail} alt="contact-mail" />
          <span>Contact us</span> */}
          <Link to="/add"><img src={add}/></Link>
        </div>
        <div className="center-nav">
          <Link to='/admin'>
            <h2 className='h2-admin'>
            MANAWARI
          </h2></Link>
        </div>
        <div className="profile-bag-nav">
          {localStorage.getItem('email') ? (
            // Display logout button
            <div onClick={handleLogout}><img className='logout' src={logout} alt="logout" /></div>
          ) : (
            // Display user image with link to login page
            <Link to='/signin'><img src={userImage} className='signin' alt="user" /></Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AdminNavBar;
