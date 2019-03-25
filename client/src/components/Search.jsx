import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      currentId: 28
    };

    this.getGenres = this.getGenres.bind(this);
  }

  componentDidMount() {
    this.getGenres();
    this.props.getMovies(this.state.currentId);
  }

  getGenres() {
    axios.get('/genres')
      .then(response => {
        this.setState({
          genres: response.data.genres
        });
      })
      .catch(error => {
        console.log(`Error retrieving genres from server --> ${error}`);
      });
  }

  render() {
    return (
      <div className='search'>
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />
        <select
          onChange={e => {
            this.setState({ currentId: parseInt(e.target.value) });
          }}
        >
          {this.state.genres.map(genre => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button
          onClick={() => {
            this.props.getMovies(this.state.currentId);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
