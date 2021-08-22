import React from "react";
import "./NotFoundPages.css";
import {  useHistory, Link } from 'react-router-dom';

function NotFoundPage() {

  const history = useHistory();

  return (
      <div className="not-found-page">
        <p className="not-found-page__title"> 404 </p>
        <p className="not-found-page__text"> Страница не найдена</p>
        <Link onClick={() => history.goBack()} className="not-found-page__link">
          Назад
        </Link>
      </div>
  );
}

export default NotFoundPage;