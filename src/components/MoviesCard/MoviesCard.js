import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import movieprew from '../../images/movieprew.png';

function MoviesCard() {
  const { pathname } = useLocation();
  const cardButton =
    pathname === '/movies' ? (
      <input
        type='checkbox'
        name='save'
        id='save-button'
        className='switch__save-button'
      />
    ) : (
      <button name='del' id='del-button' className='del-button' />
    );

  return (
    <>
      <li className='grid__item'>
        <img src={movieprew} alt='изображение фильма' className='grid__image' />
        <div className='grid__text-container'>
          <div className='grid__name-block'>
            <p className='grid__text'>33 слова о дизайне</p>
            {cardButton}
          </div>
          <p className='grid__duration'>1ч42м</p>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
