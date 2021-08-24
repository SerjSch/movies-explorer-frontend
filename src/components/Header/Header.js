import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Headermovies from '../Header-movies/Header-movies';
import Headerauth from '../Header-auth/Header-auth';

function Header() {
  const location = useLocation().pathname;
  return (
    <header className={location === '/' ? 'header' : 'header header_white'}>
      <Link to='/'>
        <div className='header__logo'>
          <img alt='Logotip' src={logo} />
        </div>
      </Link>
      {location === '/' ? <Headerauth /> : <Headermovies />}
    </header>
  );
}
export default Header;
