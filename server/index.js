var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var apiHelpers = require('./helpers/apiHelpers.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


const movieRoutes = require('./routes/movieRoutes.js');

app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
