import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getFavorites();
  }


  getMovies(genreId) {
    axios
    .post('/search', { genre: genreId })
    .then((response)=>{
      console.log("results here!!!!!!", response)
      this.setState({
      movies: response.data.results
    })
  })
    // make an axios request to your server on the GET SEARCH endpoint
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
  getFavorites() 
  {
    axios
      .get('/favorites')
      .then(response => {
        console.log('response for getFavorites is', response.data);
        this.setState({ favorites: response.data });
      })
      .catch(error => console.log('error getting Favorites -->', error));
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