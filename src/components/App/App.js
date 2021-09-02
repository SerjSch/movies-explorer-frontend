/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import './App.css';
import mainApi from '../../utils/MainApi';
import apiBeatFilmMovies from '../../utils/MoviesApi';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import NotFoundPage from '../NotFoundPages/NotFoundPages.js';
import PopupMessage from '../Popup/PopupMessage.js';

function App() {
  const history = useHistory();
  let location = useLocation();
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false); // ПРЕЛОУДЕР
  const [loadingError, setLoadingError] = React.useState(''); // ОШИБКА С СЕРВЕРА BEATFILM
  //ПОПАП С СООБЩЕНИЕМ
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ text: '' });
  const handlePopupMessageContent = ({ text }) => {
    setMessage({ text: text });
  };
  function closePopupMessage() {
    setIsPopupOpen(false);
  }
  //ПРОВЕРКА ЗАЛОГИНЕН ЛИ ПОСЕТИТЕЛЬ
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const path = location.pathname;
    if (token) {
      mainApi
        .isTokenValid(token)
        .then((res) => {
          if (res) {
            setIsLogin(true);
            getCurrentUser();
            history.push(path);
          }
        })
        .catch((err) => {
          console.log('Ошибка валидации токена' + err);
          localStorage.removeItem('token');
          history.push('/');
        });
    }
  }, []);

  // РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
          setIsPopupOpen(true);
          handlePopupMessageContent({
            text: 'Вы успешно зарегистрировались!',
          });
          setTimeout(closePopupMessage, 2000);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setIsPopupOpen(true);
          handlePopupMessageContent({
            text: 'Email уже зарегистрирован',
          });
        } else {
          setIsPopupOpen(true);
          handlePopupMessageContent({
            text: 'Что-то пошло не так, попробуйте ещё раз.',
          });
          setTimeout(closePopupMessage, 2000);
        }
      });
  }
  // АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLogin(true);
          getCurrentUser();
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setIsPopupOpen(true);
          handlePopupMessageContent({
            text: 'Неверный email или пароль',
          });
          setTimeout(closePopupMessage, 2000);
        } else {
          setIsPopupOpen(true);
          handlePopupMessageContent({
            text: 'Что-то пошло не так, попробуйте еще раз!',
          });
          setTimeout(closePopupMessage, 2000);
        }
      });
  }
  // ПОЛУЧАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  function getCurrentUser() {
    const token = localStorage.getItem('token');
    mainApi
      .getCurrentUser(token)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          localStorage.setItem('currentUser', JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log('Ошибка при получении данных пользователя', err);
      });
  }

  // РАЗЛОГИНИТЬСЯ
  function handleLogout() {
    setIsLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('savedMovies');
    setInitialMovies([]);
    setSavedMovies([]);
    setFilterMovies([]);
    setFilterSavedMovies([]);
    history.push('/');
  }

  // ОБНОВЛЕНИЕ ДАННЫХ ЮЗЕРА
  function handleProfileChange(data) {
    mainApi
      .editProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
        setIsPopupOpen(true);
        handlePopupMessageContent({
          text: 'Данные обновлены',
        });
        setTimeout(closePopupMessage, 2000);
      })
      .catch((err) => {
        if (err.status === 409) {
          handlePopupMessageContent({
            text: 'Такой email уже зарегистрирован',
          });
        } else {
          handlePopupMessageContent({
            text: 'Что-то пошло не так, попробуйте ещё раз!',
          });
        }
        setIsPopupOpen(true);
        setTimeout(closePopupMessage, 2000);
      });
  }

  //////// ПОИСК ФИЛЬМОВ //////////////////////////////////////////////////
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const withQuery = query.length !== 0; // true/false

  // ЗАГРУЖАЕМ ФИЛЬМЫ ЮЗЕРУ
  React.useEffect(() => {
    if (isLogin) {
      getInitialMovies();
      getSavedMovies();
    }
  }, [isLogin]);
  // ПОЛУЧАЕМ ФИЛЬМЫ ИЗ LOCALSTORAGE И СОХРАНЯЕМ В USESTATE
  React.useEffect(() => {
    const initial = JSON.parse(localStorage.getItem('initialMovies'));
    if (initial) {
      setInitialMovies(initial);
    } else {
      getInitialMovies();
    }
    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    if (saved) {
      setSavedMovies(saved);
    } else {
      getSavedMovies();
    }
  }, []);

  // ФИЛЬТРУЕМ И СОХРАНЯЕМ ФИЛЬМЫ
  React.useEffect(() => {
    setFilterMovies(filter(initialMovies, query));
    localStorage.setItem('initialMovies', JSON.stringify(initialMovies));
  }, [initialMovies]);
  React.useEffect(() => {
    setFilterSavedMovies(filter(savedMovies, query));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  // ///////////////////////////////////////////////////////
  // ПОЛУЧАЕМ ВСЕ ФИЛЬМЫ С СЕРВЕРА
  function getInitialMovies() {
    apiBeatFilmMovies
      .getAllMovies()
      .then((data) => {
        const initialArray = data.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          };
        });
        localStorage.setItem('initialMovies', JSON.stringify(initialArray));
        setInitialMovies(initialArray);
      })
      .catch((err) => {
        localStorage.removeItem('initialMovies');
        setLoadingError('Не получены фильмы с BeatFilmMovies');
        console.log(loadingError, err);
      });
  }
  ////// ПОЛУЧАЕМ СОХРАНЕННЫЕ ФИЛЬМЫ БАЗЫ
  function getSavedMovies() {
    mainApi
      .getMovies()
      .then((data) => {
        const savedArray = data.map((item) => {
          return { ...item, id: item.movieId };
        });
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch((err) => {
        localStorage.removeItem('savedMovies');
        setLoadingError('Не получены сохраненные фильмы');
        console.log(loadingError, err);
      });
  }
  ///// ПРОВЕРКА
  function isSavedMovie(movie) {
    return savedMovies.some((item) => item.id == movie.id);
  }
  //ОТМЕЧАЕМ ФИЛЬМ ДЛЯ СОХРАНЕНИЯ / УДАЛЕНИЯ
  function onCheckboxClick(movie, isMarked) {
    if (isMarked) {
      addMovie(movie);
    } else {
      deleteMovie(movie);
    }
  }
  //ДОБАВЛЯЕМ ФИЛЬМ СЕБЕ
  function addMovie(movie) {
    mainApi
      .createMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.log('Ошибка при сохранении фильма', err);
      });
  }
  // УДАЛЯЕМ ФИЛЬМ
  function deleteMovie(movie) {
    const movieId = savedMovies.find((item) => item.id == movie.id)._id;
    mainApi
      .deleteMovies(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item._id !== movieId));
      })
      .catch((err) => {
        console.log('Ошибка при удалении фильма', err);
      });
  }
  // ФИЛЬТР ПОИСКА ////////////////////
  function filter(data, query) {
    if (query) {
      const regex = new RegExp(query, 'gi');
      const filterData = data.filter((item) => {
        return regex.test(item.nameRU) || regex.test(item.nameEN);
      });
      if (filterData.length === 0) {
        setLoadingError('Такого фильма нет');
      } else {
        setLoadingError('');
      }
      return filterData;
    }
    return [];
  }
  ///// ПОИСК ПО ФИЛЬМАМ
  function onSubmitSearch(query) {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(query);
      setFilterMovies(filter(initialMovies, query));
      setIsLoading(false);
    }, 800);
  }
  ///// ПОИСК ПО СОХРАНЕННЫМ ФИЛЬМАМ
  function onSubmitSearchSaved(query) {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(query);
      setFilterSavedMovies(filter(savedMovies, query));
      setIsLoading(false);
    }, 600);
  }

  //////////////////////////////////////////////////////////////////////
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__content'>
          <Switch>
            <Route path='/' exact>
              <Header isLogin={isLogin} />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute
              path='/movies'
              exact
              component={Movies}
              isLogin={isLogin}
              savedMovies={false}
              movies={withQuery ? filterMovies : initialMovies}
              isLoading={isLoading}
              loadingError={loadingError}
              isSavedMovie={isSavedMovie}
              onSubmitSearch={onSubmitSearch}
              onCheckboxClick={onCheckboxClick}></ProtectedRoute>

            <ProtectedRoute
              path='/saved-movies'
              exact
              component={Movies}
              isLogin={isLogin}
              savedMovies={true}
              movies={withQuery ? filterSavedMovies : savedMovies}
              isLoading={isLoading}
              loadingError={loadingError}
              isSavedMovie={isSavedMovie}
              onSubmitSearch={onSubmitSearchSaved}
              onCheckboxClick={onCheckboxClick}></ProtectedRoute>

            <ProtectedRoute
              path='/profile'
              exact
              component={Profile}
              isLogin={isLogin}
              handleLogout={handleLogout}
              handleProfileChange={handleProfileChange}></ProtectedRoute>

            <Route path='/signin' exact>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path='/signup' exact>
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>

          <PopupMessage isOpen={isPopupOpen} message={message} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
