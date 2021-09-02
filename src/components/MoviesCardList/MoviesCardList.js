/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import '../LoadMore/LoadMore.css';

function MoviesCardList({
  savedMovies,
  movies,
  onCheckboxClick,
  isSavedMovie,
}) {
  const [renderMovies, setRenderMovies] = React.useState([]);
  const [currentAmount, setCurrentAmount] = React.useState(0);
  const [loadMoreAmount, setLoadMoreAmount] = React.useState(4);

  //// СЛУШАТЕЛИ ///////////////////////
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /// КОЛ-ВО ПРИ ПЕРВОЙ ЗАГРУЗКИ
  React.useEffect(() => {
    const windowSize = window.innerWidth;
    const numberForRender = getAmount(windowSize);
    setLoadMoreAmount(numberForRender.extra);
    /// минимальное кол-во
    const amount = Math.min(movies.length, numberForRender.first);
    /// вырезаем кол-во фильмов
    setRenderMovies(movies.slice(0, amount));
    setCurrentAmount(amount);
  }, [movies]);

  ///// КОЛ-ВО ФИЛЬМОВ ОТ РАЗМЕРА ЭКРАНА
  function getAmount(windowSize) {
    if (windowSize > 768) {
      return { first: 12, extra: 4 };
    } else if (windowSize > 480 && windowSize <= 768) {
      return { first: 8, extra: 2 };
    } else {
      return { first: 4, extra: 2 };
    }
  }
  function handleResize() {
    const windowSize = window.innerWidth;
    const numberForRender = getAmount(windowSize);
    setLoadMoreAmount(numberForRender.extra);
  }
  //// ДОГРУЖАЕМ БОЛЬШЕ ФИЛЬМОВ
  function renderExtraItems() {
    const amount = Math.min(movies.length, currentAmount + loadMoreAmount);
    const extraMovies = movies.slice(currentAmount, amount);
    setRenderMovies([...renderMovies, ...extraMovies]);
    setCurrentAmount(amount);
  }
  function handleLoadMoreItems() {
    renderExtraItems();
  }

  return (
    <>
      <div className='grid'>
        <ul className='grid__template'>
          {renderMovies.map((movie) => (
            <MoviesCard
              savedMovies={savedMovies}
              key={movie.id}
              movie={movie}
              onCheckboxClick={onCheckboxClick}
              isSavedMovie={isSavedMovie}
            />
          ))}
        </ul>
      </div>
      {currentAmount < movies.length && (
        <div className='LoadMore'>
          <button
            className='LoadMore__button'
            type='button'
            onClick={handleLoadMoreItems}>
            Ещё
          </button>
        </div>
      )}
    </>
  );
}

export default MoviesCardList;
