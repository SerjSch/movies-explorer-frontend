/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Headermovies from '../Header-movies/Header-movies';
import Headerauth from '../Header-auth/Header-auth';

function Header({isLogin}) {
  return (
    <header className={!isLogin ? 'header' : 'header header_white'}>
      <Link to='/'>
        <div className='header__logo'>
          <img alt='Logotip' src={logo} />
        </div>
      </Link>
      {!isLogin ? <Headerauth /> : <Headermovies />}
    </header>
  );
}
export default Header;