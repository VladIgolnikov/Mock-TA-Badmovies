import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie, index)=>{return (
          <li className="movie_item" key={index}>
            <img 
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
            data-title={movie.title} 
            data-poster_path={movie.poster_path}
            data-release_date={movie.release_date}
            data-vote_average={movie.vote_average}
            onClick={(e)=>{this.props.showFaves ? this.props.deleteMovie(e.target.dataset) : this.props.saveMovie(e.target.dataset)}}
            />
            <div className="movie_description">
              <h2>{movie.title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Release Date</span>
                  <span>{movie.release_date}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.vote_average}</span>
                </div>
              </section>
            </div>
          </li>
          )}
        )}
      </ul>
    );
  }
}

export default Movies;