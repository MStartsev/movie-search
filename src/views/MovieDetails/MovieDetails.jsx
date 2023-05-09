import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { formatDate } from 'servises/formatDate';
import css from './MovieDetails.module.css';

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
      <Link className={css.back} to={backLinkLocationRef.current}>
        &#x2190; Go back
      </Link>
      {isLoading ? (
        <div>Loading the movie...</div>
      ) : (
        <>
          {movie && (
            <>
              <section className={css.details}>
                {movie.poster_path && (
                  <img
                    className={css.poster}
                    src={IMAGES_BASE_URL + movie.poster_path}
                    alt={movie.title}
                  />
                )}
                <div className={css.container}>
                  <h2>
                    {movie.title +
                      (!!movie.release_date
                        ? formatDate(movie.release_date)
                        : '')}
                  </h2>
                  {!!movie.vote_average && (
                    <p>Users score: {Math.round(movie.vote_average * 10)}%</p>
                  )}
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                  {!!movie.genres.length && (
                    <>
                      <h3>Genres</h3>
                      <div>
                        {movie.genres.map(genre => (
                          <p>{genre.name}</p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>
              <section className={css.additional}>
                <h3>Additional information</h3>
                <ul className={css.nav}>
                  <li className={css['nav-item']}>
                    <NavLink
                      className={({ isActive }) =>
                        `${isActive && css.activeLink} ${css.navLink}`
                      }
                      to="cast"
                    >
                      Cast
                    </NavLink>
                  </li>
                  <li className={css['nav-item']}>
                    <NavLink
                      className={({ isActive }) =>
                        `${isActive && css.activeLink} ${css.navLink}`
                      }
                      to="reviews"
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>

                <Suspense fallback={<div>Loading subpage...</div>}>
                  <Outlet />
                </Suspense>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}
