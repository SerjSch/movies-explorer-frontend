  
import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import LoadMore from "../LoadMore/LoadMore.js";
import Preloader from "../Preloader/Preloader.js";


function Movies() {
    return(
        <>
            <SearchForm />
            <MoviesCardList />
            <Preloader />
            <LoadMore />
        </>
    );
}

export default Movies;