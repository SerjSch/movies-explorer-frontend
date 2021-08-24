import React from "react";
import "./AboutMe.css";
import myAvatar from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <div className='about-me' id='about-me'>
      <h2 className='about__title'>Студент</h2>
      <div className='about__line' />
      <div className='about-me__info'>
        <div className='about-me__text'>
          <p className='about-me__name'>Сергей</p>
          <p className='about-me__profession'>Фронтенд-разработчик, 34 года</p>
          <p className='about-me__description'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <div className='about-me__social'>
            <a
              href='https://www.facebook.com/schalnew/'
              className='about-me__link page__link'
              target='blank'
            >
              Facebook
            </a>
            <a
              href='https://github.com/SerjSch/'
              className='about-me__link page__link'
              target='blank'
            >
              Github
            </a>
          </div>
        </div>
        <img className='about-me__avatar' src={myAvatar} alt='аватар'></img>
      </div>
    </div>
  );
}
export default AboutMe;
