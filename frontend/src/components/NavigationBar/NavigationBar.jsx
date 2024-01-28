import React, { useEffect, useState } from 'react';
import './NavigationBar.css';
import shoppingbag from '../Images/shoppingbag.png';
import contactmail from '../Images/contactmail.png';
import userImage from '../Images/user.png';
import { Link } from 'react-router-dom';
import logout from '../Images/logout.png';
import { useNavigate } from 'react-router-dom';
import { fetchBagItems, calculateTotalQuantity } from './BagUtils'; // Update this line


const NavigationBar = () => {
  const navigate = useNavigate();
  const [bagItems, setBagItems] = useState([]);

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

  useEffect(() => {
    const fetchBagData = async () => {
      const items = await fetchBagItems();
      setBagItems(items);
    };

    fetchBagData();
  }, [bagItems]);

  return (
    <header>
      <nav>
        <div className="contact-nav">
          {/* <img src={contactmail} alt="contact-mail" />
          <span>Contact us</span> */}
        </div>
        <div className="center-nav">
          <h2>
            <Link to='/'>MANAWARI</Link>
          </h2>
          <div className="menu">
            <ul className='menu-choices'>
              <li><Link to='/earrings'>Earrings</Link></li>
              <li><Link to='/bracelets'>Bracelets</Link></li>
              <li><Link to='/necklaces'>Necklaces</Link></li>
              <li><Link to='/rings'>Rings</Link></li>
            </ul>
          </div>
        </div>
        <div className="profile-bag-nav">
          {localStorage.getItem('email') ? (
            // Display logout button
            <div onClick={handleLogout}><img className='logout' src={logout} alt="logout" /></div>
          ) : (
            // Display user image with link to login page
            <Link to='/signin'><img src={userImage} className='signin' alt="user" /></Link>
          )}
          <img onClick={handleClick} src={shoppingbag} className='shopping-bag' alt="shopping-bag" />
          {localStorage.getItem('email') && <div className="bag-count">{calculateTotalQuantity(bagItems)}</div>}

        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
