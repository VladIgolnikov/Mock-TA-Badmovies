import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import axios from 'axios';
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ deway: 'movies' }],
      favorites: [{ deway: 'favorites' }],
      showFaves: false
    };

    this.getMovies = this.getMovies.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getMovies(genreID) {
    axios.post('/search', { genre_id: genreID }).then(response => {
      this.setState({ movies: response.data.results });
    });
  }

  getFavorites() {
    axios
      .get('/favorites')
      .then(response => {
        console.log('response for getFavorites is', response.data);
        this.setState({ favorites: response.data });
      })
      .catch(error => console.log('error getting Favorites -->', error));
  }

  saveMovie(movie) {
    axios
      .post('/favorites', { movie: movie })
      .then(response => {
        console.log('saved movie to favorites -->', response);
      })
      .catch(error => console.log('error saving movie to Favorites -->', error))
      .then(() => {
        this.getFavorites();
      });
  }

  deleteMovie(movie) {
    axios
      .delete('/favorites', { data: { movie: movie } })
      .then(response => {
        console.log('removed movie from Favorites -->', response);
      })
      .catch(error =>
        console.log('error removing movie from Favorites -->', error)
      )
      .then(() => {
        this.getFavorites();
      });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render() {
    return (
      <div className='app'>
        <header className='navbar'>
          <h1>Bad Movies</h1>
        </header>

        <div className='main'>
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
