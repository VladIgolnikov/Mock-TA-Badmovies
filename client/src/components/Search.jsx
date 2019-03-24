import React from 'react';
import Axios from 'axios';

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
    this.getGenres;
  }

  getGenres() {
    Axios.get('/genres')
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

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select
          onChange={e => this.setState({ currentId: parseInt(e.target.value) })}
        >
          {this.state.genres.map(genre => {
            return (
              <option key='genre.id' value='genre.id'>
                ${genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button>Search</button>
      </div>
    );
  }
}

export default Search;
