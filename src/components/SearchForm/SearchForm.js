import React from "react";
import "./SearchForm.css";
import searchButton from "../../images/find.svg";

function SearchForm() {
  return (
    <div className="search">  

      <div className="search__form">

        <div className="search__top-box">
          <input
            name="search"
            placeholder="Фильм"
            type="search"
            className="search__input"
            required
          />
          <button type="submit" className="search__button">
            <img src={searchButton} alt="search button" className="search__image_button" />
          </button>
        </div>

        <div className="search__toggle-box">
          <input
            type="checkbox"
            name="toggle"
            id="toggle-button"
            className="switch__toggle-button"
          />
          <label for="switch__toggle-button" className="switch__text">
            Короткометражки
          </label>
        </div>
      </div>

    </div>
  );
}

export default SearchForm;