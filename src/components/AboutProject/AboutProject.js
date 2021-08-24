import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about" id="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__line" />

      <div className="columns">
        <div className="column">
          <p className="column__title">Дипломный проект включал 5 этапов</p>
          <p className="column__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="column">
          <p className="column__title">На выполнение диплома ушло 5 недель</p>
          <p className="column__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__plan">
        <div className="plan__scale plan__scale_green">1 неделя</div>
        <div className="plan__scale plan__scale_grey">4 недели</div>
      </div>
      <div className="about__plan about__plan_text">
        <div className="plan__scale">Back-end</div>
        <div className="plan__scale">Front-end</div>
      </div>
    </div>
  );
}

export default AboutProject;