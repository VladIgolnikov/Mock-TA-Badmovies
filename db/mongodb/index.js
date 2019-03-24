const mongoose = require('mongoose');

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

var favoriteSchema = mongoose.Schema({
  title: { type: String, unique: true },
  poster_path: String,
  release_date: String,
  vote_average: Number
});

var Favorites = mongoose.model('Favorites', favoriteSchema);

var save = movie => {
  return Favorites.findOneAndUpdate(
    {
      title: movie.title
    },
    {
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    },
    {
      upsert: true
    }
  )
    .exec()
    .catch(error => {
      console.log(`Error saving to DB --> ${error}`);
    });
};

var remove = movie => {
  return Favorites.findOneAndDelete({
    title: movie.title
  })
    .exec()
    .catch(error => {
      console.log(`Error deleting from DB --> ${error}`);
    });
};

var retrieve = () => {
  return Favorites.find({})
    .exec()
    .catch(error => {
      console.log(`Error retrieving Favorites from DB --> ${error}`);
    });
};

module.exports.db = db;
module.exports.save = save;
module.exports.remove = remove;
module.exports.retrieve = retrieve;

