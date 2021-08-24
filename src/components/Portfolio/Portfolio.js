import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__menu">     
        <a href="https://serjSch.github.io/how-to-learn/" target="blank" className="portfolio__link page__link"><p className="portfolio__text">Статичный сайт</p></a>
        <a href="https://serjSch.github.io/how-to-learn/" target="blank" className="portfolio__link page__link">↗</a>
      </div>
      <div className="portfolio__line" />
      <div className="portfolio__menu">
        <a href="https://serjSch.github.io/russian-travel" target="blank" className="portfolio__link page__link"><p className="portfolio__text">Адаптивный сайт</p></a>
        <a href="https://serjSch.github.io/russian-travel" target="blank" className="portfolio__link page__link">↗</a>
      </div>
      <div className="portfolio__line" />
      <div className="portfolio__menu">
        <a href="https://serjo.nomoredomains.work/" target="blank" className="portfolio__link page__link"><p className="portfolio__text">Одностраничное приложение</p></a>
        <a href="https://serjo.nomoredomains.work/" target="blank" className="portfolio__link page__link">↗</a>
      </div>
    </div>
  );
}

export default Portfolio;