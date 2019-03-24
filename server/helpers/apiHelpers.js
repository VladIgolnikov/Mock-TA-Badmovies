const axios = require('axios');
const { API_KEY } = require('../../config.js');

var getGenres = callback => {
  axios
    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(`Error getting genres from API --> ${error}`);
    });
};

var getMoviesByGenre = (genre_id, callback) => {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.asc&page=1&vote_count.gte=75&with_genres=${genre_id}`
    )
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(`Error retrieving movies for this genre --> ${error}`);
    });
};

module.exports.getGenres = getGenres;
module.exports.getMoviesByGenre = getMoviesByGenre;
