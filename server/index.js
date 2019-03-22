var express = require('express');
var bodyParser = require('body-parser');
const { getGenres, getMoviesByGenre } = require('./helpers/apiHelpers.js');
const { save, remove, retrieve } = require('../db/mongodb');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', (req, res) => {
  getMoviesByGenre(req.body.genre_id, (err, movies) => {
    if (err) {
      console.log(`Error getting movies by genre --> ${err}`);
    } else {
      res.status(200).send(movies);
    }
  });
});

app.get('/genres', (req, res) => {
  getGenres((err, genres) => {
    if (err) {
      console.log(`Error getting list of genres --> ${err}`);
    } else {
      res.status(200).send(genres);
    }
  });
});

app.get('/favorites', (req, res) => {
  retrieve()
    .then(favorites => res.send(favorites))
    .catch(error => {
      console.log(`Could not retrieve Favorites from db --> ${error}`)
    });
});

app.post('/favorites', (req, res) => {
  save(req.body.movie)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error saving movie to favorites --> ${error}`);
    });
});

app.delete('/favorites', (req, res) => {
  remove(req.body.movie)
  .then(()=>{
    res.sendStatus(201);
  })
  .catch(error => {
    console.log(`Error deleting movie from favorites --> ${error}`);
  })
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
