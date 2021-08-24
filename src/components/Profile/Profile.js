
import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__form" type="submit">
        <p className="profile__header">Привет, Сергей!</p>

        <div className="profile__row">
          <p className="profile__text">Имя</p>
          <p className="profile__text">Сергей</p>
        </div>

        <div className="profile__row profile__row_invisible">
          <p className="profile__text">E-mail</p>
          <p className="profile__text">schalnew@mail.ru</p>
        </div>
        <button type="submit" className="profile__button">
          Редактировать
        </button>
        <Link to="/signin" className="profile__link">Выйти из аккаунта</Link>
      </div>
    </div>
  );
}

export default Profile;