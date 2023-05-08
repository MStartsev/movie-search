import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { formatDate } from 'servises/formatDate';

import { getDetails } from 'servises/tmdb-api';
const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/w200/';

export default function MovieDetails() {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const { movieId } = useParams();

  const [movie, setMovie] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getDetails(movieId).then(results => {
      setMovie(results);
      setLoading(false);
    });
  }, [movieId]);

  return (
    <>
      <Link to={backLinkLocationRef.current}>&#x2190; Go back</Link>
      {isLoading ? (
        <div>Loading the movie...</div>
      ) : (
        <>
          {movie && (
            <>
              <div>
                {movie.poster_path && (
                  <img
                    src={IMAGES_BASE_URL + movie.poster_path}
                    alt={movie.title}
                  />
                )}
                <div>
                  <h2>{movie.title + formatDate(movie.release_date)}</h2>
                  {!!movie.vote_average && (
                    <p>Users score: {Math.round(movie.vote_average * 10)}%</p>
                  )}
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                  {!!movie.genres.length && (
                    <>
                      <h3>Genres</h3>
                      <p>{movie.genres.map(genre => genre.name).join(' ')}</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h3>Additional information</h3>
                <ul>
                  <li>
                    <Link to="cast">Cast</Link>
                  </li>
                  <li>
                    <Link to="reviews">Reviews</Link>
                  </li>
                </ul>

                <Suspense fallback={<div>Loading subpage...</div>}>
                  <Outlet />
                </Suspense>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
