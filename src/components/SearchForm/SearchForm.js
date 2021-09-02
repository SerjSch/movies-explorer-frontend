import React from 'react';
import './SearchForm.css';
import searchButton from '../../images/find.svg';

function SearchForm({ onSubmitSearch, isLoading, onShortFilmFilter }) {
  const [query, setQuery] = React.useState(''); // Запрос
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);

  React.useEffect(() => {
    setIsSubmitDisabled(query === '');
  }, [query]);

  function handleOnChange(evt) {
    setQuery(evt.target.value);
  }
  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitSearch(query);
  }

  function handleOnChangeFilter(evt) {
    onShortFilmFilter(evt.target.checked);
  }

  return (
    <div className='search'>
      <form className='search__form' onSubmit={handleOnSubmit}>
        <div className='search__top-box'>
          <input
            name='search'
            placeholder='Фильм'
            type='search'
            className='search__input'
            required
            onChange={handleOnChange}
            disabled={isLoading}
          />
          <button
            type='submit'
            className={`search__button ${
              isSubmitDisabled && 'search__button_disabled'
            }`}
            disabled={isSubmitDisabled || isLoading}>
            <img
              src={searchButton}
              alt='search button'
              className='search__image_button'
            />
          </button>
        </div>
        {/* //////// ФИЛЬТР КОРОТКОМЕТРАЖКИ /////////// */}
        <div className='search__toggle-box'>
          <input
            type='checkbox'
            name='toggle'
            id='toggle-button'
            className='switch__toggle-button'
            onChange={handleOnChangeFilter}
          />
          <label htmlFor='switch__toggle-button' className='switch__text'>
            Короткометражки
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
