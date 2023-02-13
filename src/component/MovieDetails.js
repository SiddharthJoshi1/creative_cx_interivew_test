import React, { useState, useEffect } from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const MovieDetails = ({match}) => {
  
const imdbID = match.params.id;
const MOVIE_API_URL = `https://www.omdbapi.com/?i=${imdbID}&apikey=ab78a575`;

const searchResult = JSON.parse(window.localStorage.getItem('search-result'));
let currentMoview = null;
if(searchResult){
   currentMoview = searchResult.find(m => m.imdbID === imdbID);
}


const [movie, setMovie] = useState({});
const [loading, setLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState(null);

useEffect(() => {

    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        setErrorMessage(null);
        setLoading(false)
        setMovie(jsonResponse);

      } else {
        setErrorMessage(jsonResponse.Error);
      }
   
});   

}, []);

 return(<div className="movie-details">
<div className="details-left">
<div className="movieVariant">
{loading && !errorMessage ? (
      <span>loading... </span>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <div className="movieVariant">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={movie.Poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
    )}
    </div>

</div>
<div className="details-right">

  <button>Checkout</button>
</div>
 </div>)
};


export default MovieDetails;