import React, { useState, useEffect } from "react";
import Details from "./Details";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Search from "./Search";

MovieGrid.propTypes = {
  results: PropTypes.array.isRequired,
};

MovieGrid.defaultProps = {
  results: [],
};

function MovieGrid({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDataFromApi = (movieId) => {
    if (movieId) {
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6738a5a23d62bfbdb6de549da4f76fca`)
        .then((response) => {
          console.log('API Response:', response.data);
          setMovie(response.data);
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
          setMovie({});
        });
    }
  };

  useEffect(() => {
    console.log('Results:', results);
    if (results && results.length > 0) {
      fetchDataFromApi(results[0]?.id);
    }
  }, [results]);

  const showDetails = (index) => {
    if (results[index]?.id) {
      fetchDataFromApi(results[index].id);
      setIsOpen(true);
    }
  };

  // Callback function for handling search
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      // If the search query is empty, reset the search results
      setSearchResults([]);
      return;
    }

    try {
      // Perform a search using your API or any other logic
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=6738a5a23d62bfbdb6de549da4f76fca&query=${query}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      {/* Search component outside the grid container */}
      <Search onSearch={handleSearch} />

      {/* Movie grid */}
      <div className="container bg-dark mt-2">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {searchQuery !== "" && searchResults.length === 0 && (
            <div className="col">No results found for "{searchQuery}"</div>
          )}

          {searchResults.length > 0
            ? searchResults.map(({ id, poster_path, original_title, release_date, overview }, index) => (
                // Render search results
                <div key={id} className="col">
                  <div className="card bg-secondary-tertiary text-white h-100" style={{ backgroundColor: 'grey' }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      className="card-img-top"
                      alt={original_title}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{original_title}</h5>
                      <p className="card-text text-left flex-grow-1">
                        <small className="text-white">{release_date}</small>
                        <br />
                        {overview}
                      </p>
                      <Link to={`/details`} className="btn btn-success w-100">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : results.map(({ id, poster_path, original_title, release_date, overview }, index) => (
                // Render default movie grid
                <div key={id} className="col">
                  <div className="card bg-secondary-tertiary text-white h-100" style={{ backgroundColor: 'grey',border:'10px solid grey' }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      className="card-img-top"
                      alt={original_title}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{original_title}</h5>
                      <p className="card-text text-left flex-grow-1">
                        <small className="text-white">{release_date}</small>
                        <br />
                        {overview}
                      </p>
                      <Link to={`/details`} className="btn btn-success w-100">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {isOpen && <Details setOpenModal={setIsOpen} movie={movie} />}
    </div>
  );
}

export default MovieGrid;
