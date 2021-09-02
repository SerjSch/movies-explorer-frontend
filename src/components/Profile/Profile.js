/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import Validation from '../../utils/Validation.js';

function Profile({ isLogin, handleProfileChange, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const formValidation = Validation();
  const { email, name } = formValidation.values;

  // Отображение текущего пользователя
  React.useEffect(() => {
    formValidation.setValues({
      email: currentUser.email,
      name: currentUser.name,
    });
  }, [currentUser]);

  const submitProfileChange = (event) => {
    event.preventDefault();
    handleProfileChange({ email, name });
  };

  return (
    <>
      <Header isLogin={isLogin} />
      <div className='profile'>
        <form
          onSubmit={submitProfileChange}
          name='edit-form'
          className='profile__form'
          type='submit'>
          <p className='profile__header'>Привет, {name}!</p>
          <div className='profile__row'>
            {/* ///////// Поля формы///////////////// */}
            <label className='profile__text' htmlFor='name'>
              Имя
            </label>
            <input
              className='profile__text profile__input'
              type='text'
              onChange={formValidation.handleChange}
              value={name || ''}
              required
              minLength='2'
              maxLength='30'
              name='name'></input>
          </div>
          <div className='profile__row profile__row_invisible'>
            <label htmlFor='email' className='profile__text'>
              E-mail
            </label>
            <input
              className='profile__text profile__input'
              type='email'
              onChange={formValidation.handleChange}
              value={email || ''}
              required
              name='email'></input>
          </div>
          {/* ///////// Ошибки ///////////////// */}
          <p className='profile__form-error'>
            {formValidation.errors.name || formValidation.errors.email}
          </p>
          {/* ///////// Кнопки ///////////////// */}
          <button
            className='profile__button'
            type='submit'
            disabled={
              (currentUser &&
                name === currentUser.name &&
                email === currentUser.email) ||
              !formValidation.isValid
            }>
            Редактировать
          </button>
          <button onClick={handleLogout} className='profile__link'>
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
