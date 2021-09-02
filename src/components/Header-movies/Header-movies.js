import React from 'react';
import './Header-movies.css';
import { Link, useLocation } from 'react-router-dom';
import manIcon from '../../images/man.svg';

function Headermovies() {
  const location = useLocation().pathname;

  return (
    <div className='header__menu'>
      <div className='header__container_movies header__container_movies-center'>

    {/* ///////////////МЕНЮ СВЕРХУ/////////////////// */}
        <Link to='/movies'
          className={
            location === '/movies'
              ? 'header__account-menu header__account-menu_bold page__link'
              : 'header__account-menu page__link'
          }>
          Фильмы
        </Link>
        <Link to='/saved-movies'
          className={
            location === '/saved-movies'
              ? 'header__account-menu header__account-menu_bold page__link'
              : 'header__account-menu page__link'
          }>
          Сохраненные фильмы
        </Link>
        </div>
        <div className='header__container_movies'>
          <Link to='/profile' className='header__account-menu page__link'>
            Аккаунт
          </Link>
          <Link to='/profile' className='header__link page__link'>
            <img
              src={manIcon}
              alt='manIcon'
              className='header__manicon page__link'
            />
          </Link>
        </div>

      {/* ///////////////МЕНЮ СПРАВА/////////////////// */}
      <div className='header__rightside-menu'>
        <input id='menu__toggle-btn' type='checkbox' />
        <label className='menu__btn' htmlFor='menu__toggle-btn'>
          <span></span>
        </label>
        <ul className='rightmenu__box'>
          <li><Link to='/' className='rightmenu__item page__link'>Главная</Link></li>
          <li><Link to='/movies' className={
            location === '/movies'
              ? 'rightmenu__item rightmenu__item_underline page__link'
              : 'rightmenu__item page__link'
          }>Фильмы</Link></li>
          <li><Link to='/saved-movies' className={
            location === '/saved-movies'
              ? 'rightmenu__item rightmenu__item_underline page__link'
              : 'rightmenu__item page__link'
          }>Сохраненные фильмы</Link></li>
          <li>
              <div className='right-menu__container'>
              <Link to='/profile' className={
            location === '/profile'
              ? 'rightmenu__link rightmenu__link_underline page__link'
              : 'rightmenu__link page__link'
          }>Аккаунт</Link>
              <Link to='/profile' className='header__link page__link'><img src={manIcon} alt='иконка' className='header__manicon' /></Link>
            </div>
          </li>
        </ul>
      </div>
      {/* КОНЕЦ */}
    </div>
  );
}

export default Headermovies;