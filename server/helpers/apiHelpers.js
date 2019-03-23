const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

getGenres = callback => {
  var options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    qs: { api_key: `${API_KEY}` },
    headers: {
      'User-agent': 'request',
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error, null)
    }
    else {
      callback(null, JSON.parse(body))
    }
  }); 
}

getMoviesByGenre = (genre_id, callback) =>{

  var options = { 
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    qs: 
    { 
      with_genres: `${genre_id}`,
      sort_by: 'vote_average.asc',
      'vote_count.gte': 50,
      api_key: `${API_KEY}`
    },
    headers: {
      'User-agent': 'request',
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error, null)
    }
    else {
      callback(null, JSON.parse(body))
    }
  }); 
}


module.exports.getGenres = getGenres;
module.exports.getMoviesByGenre = getMoviesByGenre