import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
// import movieprew from '../../images/movieprew.png';

function MoviesCard({ movie, isSavedMovie, savedMovies, onCheckboxClick }) {
  const { nameRU, duration, trailer, image } = movie;
  const { pathname } = useLocation();
  let isSaved = isSavedMovie(movie);

  //// СОХРАНЕНИЕ УДАЛЕНИЕ
  function handleCheckboxClick(evt) {
    evt.preventDefault();
    onCheckboxClick(movie, !isSaved);
  }
  function handleDelete() {
    onCheckboxClick(movie, false);
  }
  //// ПЕРЕВОД ФОРМАТА
  function durationFormat(duration) {
    const hours = Math.trunc(duration / 60);
    const min = duration % 60;
    return `${hours > 0 ? hours + 'ч ' : ''}${min}м`;
  }

  const cardButton =
    pathname === '/movies' || !savedMovies ? (
      <button
        onClick={handleCheckboxClick}
        type='checkbox'
        name='save'
        id='save-button'
        className={
          isSaved
            ? 'switch__save-button switch__save-button_checked'
            : 'switch__save-button'
        }
      />
    ) : (
      <button
        onClick={handleDelete}
        name='del'
        id='del-button'
        className='del-button'
      />
    );
  return (
    <>
      <li className='grid__item'>
        <a href={trailer} rel='noreferrer' target='_blank'>
          <img src={image} alt='превью фильма' className='grid__image' />
        </a>
        <div className='grid__text-container'>
          <div className='grid__name-block'>
            <p className='grid__text'>{nameRU}</p>
            {cardButton}
          </div>
          <p className='grid__duration'>{durationFormat(duration)}</p>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
