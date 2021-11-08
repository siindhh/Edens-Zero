import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

    return (
        <>
        <nav className='navbar'>
          <div className='navbar-container'> 
            <Link to="/" className='navbar-logo'>
                FLASHNCODE  <i class='fab fa-typo3' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Product
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cart'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My cart
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/review'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Review
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/sign-up'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          </div>
          </nav>
        </>
    );
}

export default Navbar


