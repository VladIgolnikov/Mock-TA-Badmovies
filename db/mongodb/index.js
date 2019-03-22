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
  console.log('Connected to db');
});

let favoriteSchema = mongoose.Schema({
  movie: { type: String, unique: true }
});

let Favorites = mongoose.model('Favorites', favoriteSchema);

let save = movie => {
  return Favorites.findOneAndUpdate(
    { movie: movie.name },
    { movie: movie.name },
    { upsert: true }
  )
    .exec()
    .catch(error => {
      console.log(`Error saving movie to favorites --> ${error}`);
    });
};

let remove = movie => {
  return Favorites.findOneAndDelete({ movie: movie.name })
    .exec()
    .catch(error => {
      console.log(`Error removing movie from favorites --> ${error}`);
    });
};

let retrieve = () => {
  return Favorites.find({})
  .exec()
};

module.exports.db = db;
module.exports.save = save;
module.exports.remove = remove;
module.exports.retrieve = retrieve;
