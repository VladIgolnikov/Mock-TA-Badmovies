var express = require('express');
var bodyParser = require('body-parser');
var { getGenres, getMoviesByGenre } = require('./helpers/apiHelpers.js');
var { save, remove, retrieve } = require('../db/mongodb');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/genres', (req, res) => {
  getGenres((genres) => {
      res.status(200).send(genres);
    })
  });


app.post('/search', (req, res) => {
  getMoviesByGenre(req.body.genre, (err, movies)=>{
    if (err) {
      res.status(500).send(`Could not access movies --> ${err}`);
    } else res.status(200).send(movies);
  })
});

app.get('/favorites', (req, res) => {
  retrieve()
    .then(results => {
      res.send(results);
    })
    .catch(error => {
      console.log(`Error retrieving Favorites (from server) --> ${error}`);
    });
});

app.post('/favorites', (req, res) => {
  save(req.body.movie)
    .then(res => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error saving movie to DB (from server) --> ${error}`);
    });
});

app.delete('/favorites', (req, res) => {
  remove(req.body.movie)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(
        `Error removing movie from Favorites (from server) --> ${error}`
      );
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
