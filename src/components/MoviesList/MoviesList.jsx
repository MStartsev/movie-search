import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../servises/formatDate';
import css from './MoviesList.module.css';
import defaultPoster from '../../images/defaultImageFilm.jpg';

const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export default function MoviesList({ movies, location, title, query }) {
  const [info, setInfo] = useState(false);

  const handleMovieHover = async movieId => {
    setInfo(movieId);
  };

  const handleMovieLeave = () => {
    setInfo(false);
  };

  return (
    <>
      {!!movies.length ? (
        <>
          <h1 className={css.title}>{title}</h1>

          <ul className={css.list}>
            {movies.map(movie => (
              <li
                className={css.item}
                key={movie.id}
                title="Click to read movie details"
              >
                <Link
                  className={css.item}
                  to={`/movies/${movie.id}`}
                  state={{ from: location }}
                  onMouseEnter={() => handleMovieHover(movie.id)}
                  onMouseLeave={handleMovieLeave}
                >
                  {info && info === movie.id ? (
                    <div className={css.item}>
                      <img
                        className={css.backdrop}
                        src={
                          !!movie.backdrop_path
                            ? `${IMAGES_BASE_URL}${movie.backdrop_path}`
                            : defaultPoster
                        }
                        alt={movie.title}
                      />

                      <h2 className={css['item-title']}>{movie.title}</h2>
                      <p className={css.info}>Click to read movie details</p>
                    </div>
                  ) : (
                    <>
                      {!!movie.poster_path ? (
                        <img
                          className={css.poster}
                          src={`${IMAGES_BASE_URL}${movie.poster_path}`}
                          alt={movie.title}
                        />
                      ) : (
                        <img
                          className={css['default-poster']}
                          src={defaultPoster}
                          alt={movie.title}
                        />
                      )}

                      {!movie.poster_path && (
                        <>
                          <h2 className={css['item-title']}>{movie.title}</h2>
                          <p className={css.info}>
                            {!!movie.release_date
                              ? formatDate(movie.release_date)
                              : '(no release date)'}
                          </p>
                        </>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        !!query && <h1 className={css.title}>{title}</h1>
      )}
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
