import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import './Movies.css';
import Preloader from '../Preloader/Preloader.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';

function Movies({
  isLogin,
  savedMovies,
  onSubmitSearch,
  movies,
  isLoading,
  loadingError,
  onCheckboxClick,
  isSavedMovie,
}) {
  const [shortFilm, setShortFilm] = React.useState(false);

  /// ВКЛ/ВЫКЛ ФИЛЬТР
  function onShortFilmFilter(filterChecked) {
    setShortFilm(filterChecked);
  }
  ///ФИЛЬТРУЕМ КОРОТКОМЕТРАЖКИ
  function filterShortFilm(movies) {
    return movies.filter((i) => {
      return i.duration < 40;
    });
  }
  //////////////////////////////////////////////////////////
  return (
    <>
      <Header isLogin={isLogin} />
      {/* ПОИСК */}
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        onShortFilmFilter={onShortFilmFilter}
        isLoading={isLoading}
      />
      {/* ПРЕЛОУДЕР */}
      {isLoading && <Preloader />}
      {/* ФИЛЬМЫ */}
      {!isLoading && loadingError === '' && (
        <MoviesCardList
          savedMovies={savedMovies}
          isSavedMovie={isSavedMovie}
          onCheckboxClick={onCheckboxClick}
          movies={shortFilm ? filterShortFilm(movies) : movies}
        />
      )}
      {!isLoading && loadingError !== '' && (
        <div className='movies__info'>{loadingError}</div>
      )}
      <Footer />
    </>
  );
}

export default Movies;
