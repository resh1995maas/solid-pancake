import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Details({ setOpenModal, movie }) {
  const [movieData, setMovieData] = useState({});

  const fetchDataFromApi = () => {
    axios.get("https://api.themoviedb.org/3/movie/11?api_key=6738a5a23d62bfbdb6de549da4f76fca").then(
      (response) => {
        console.log(response.data);
        setMovieData(response.data);
      }
    );
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          {/* Movie Card */}
          <div className="card flex-fill mb-4" style={{ maxWidth: '2000px' }}>
            <img src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt={movieData.original_title} className="card-img-top" />
            <div className="card-body" style={{ backgroundColor: 'black', color: 'white' }}>
              <h5 className="card-title">{movieData.original_title}</h5>
              <p className="card-text">{movieData.overview}</p>
              <p className="card-text">Original Language : {movieData.original_language}</p>
              <p className="card-text">{movieData.production_countries?.[0]?.origin_country}</p>
              <button className="btn btn-danger p-2 rounded-lg text-white text-center w-100" onClick={() => setOpenModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>

        {}

      </div>
    </div>
  );
}

export default Details;
