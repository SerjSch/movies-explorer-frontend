export class ApiBeatFilmMovies {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._headers = settings.headers;
  }

 //ПОЛУЧЕНИЕ ОТВЕТА ОТ BEATFILMMOVIESAPI
  _getResponseData(res) {
    return res.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        new Error(`Ошибка сервера ApiBeatfilmMovies: ${res.status} ${res.statusText}`)
      );
    });
  }

  // ПОЛУЧАЕМ ФИЛЬМЫ С СЕРВЕРА BEATFILMMOVIESAPI
  getAllMovies() {
    return this._getResponseData(
      fetch(`${this._baseUrl}`, {
        method: 'GET',
        headers: this._headers,
      })
    );
  }
}

const apiBeatFilmMovies = new ApiBeatFilmMovies({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiBeatFilmMovies;
