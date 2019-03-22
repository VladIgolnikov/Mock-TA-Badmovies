import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    axios.get('./genres')
      .then(response => {
        this.setState({
          genres: response.data.genres
        });
      })
      .catch(error => console.log('error getting genres -->', error));
  }

  render() {
    return (
      <div className='search'>
        <button onClick={() => {this.props.swapFavorites()}}>
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />
        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
        <select>
          {this.state.genres.map((genre)=>{
            return <option key={genre.id}>{genre.name}</option>
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
