import React from "react";
import "./Header-auth.css";
import { Link } from "react-router-dom";

function Headerauth() {
    return(
            <div className="header__container_auth">
                <Link to="/signup" className="header__signup page__link">Регистрация</Link>
                <Link to="/signin" ><button className="header__button">Войти</button></Link>
            </div>
    )
}

export default Headerauth;