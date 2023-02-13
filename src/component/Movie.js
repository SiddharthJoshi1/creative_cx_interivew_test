import React from "react";
import { Link } from "react-router-dom";
import {
  useDecision,
  createInstance,
  withOptimizely,
} from "@optimizely/react-sdk";

import { getUserId } from "../utils";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const optimizelyClient = createInstance({ sdkKey: "DfCR4rPWJ6GJBafgddRJi" });
const userID = getUserId();
const registerClicks = () => {
  optimizelyClient.track("User Click Event", userID);
};

const Movie = ({ movie, movies }) => {
  const [decision] = useDecision("movie_experiment_flag");
  const isEnabled = decision.enabled;
  const variationKey = decision.variationKey;
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  var movieComp = (
    <Link
      to={{
        pathname: `details/${movie.imdbID}`,
        query: { id: movie.imdbID, movies: movies },
      }}
    >
      <div className="movie">
        <h2>{movie.Title}</h2>
        <div>
          <img
            width="200"
            alt={`The movie titled: ${movie.Title}`}
            src={poster}
          />
        </div>
        <p>({movie.Year})</p>
      </div>
    </Link>
  );

  if (isEnabled && variationKey == "title_style") {
    movieComp = (
      <Link
        className="movieTitleLinkStyle"
        to={{
          pathname: `details/${movie.imdbID}`,
          query: { id: movie.imdbID, movies: movies },
        }}
        onClick={registerClicks}
      >
        <div className="movieVariant">
          <div>
            <img
              width="200"
              alt={`The movie titled: ${movie.Title}`}
              src={poster}
            />
          </div>
          <div className="movieTitle">
            <h2>{movie.Title}</h2>
            <p>({movie.Year})</p>
          </div>
        </div>{" "}
      </Link>
    );
  } else if (isEnabled && variationKey == "imbd_link") {
    movieComp = (
      <Link
        to={{ pathname: `https://www.imdb.com/title/${movie.imdbID}` }}
        target="_blank"
        onClick={registerClicks}
      >
        <div className="movie">
          <h2>{movie.Title}</h2>
          <div>
            <img
              width="200"
              alt={`The movie titled: ${movie.Title}`}
              src={poster}
            />
          </div>
          <p>({movie.Year})</p>
        </div>
      </Link>
    );
  }

  return <div>{movieComp}</div>;
};

export default withOptimizely(Movie);
