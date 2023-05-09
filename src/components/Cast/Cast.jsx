import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits } from 'servises/tmdb-api';
import { nanoid } from 'nanoid';
import css from './Cast.module.css';

import defaultPhotoProfile from '../../images/defaultPhoto.jpg';

const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/w154';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCredits(movieId)
      .then(({ cast }) => setCast(cast))
      .catch(error => console.log('Error fetching cast', error.message))
      .finally(setLoading(false));
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <div>Loading cast...</div>
      ) : (
        <>
          {cast.length ? (
            <ul className={css.list}>
              {cast.map(actor => (
                <li className={css.item} key={nanoid()}>
                  {actor.profile_path ? (
                    <img
                      className={css.profile}
                      src={IMAGES_BASE_URL + actor.profile_path}
                      alt={actor.name}
                    />
                  ) : (
                    <img
                      className={css.profile}
                      src={defaultPhotoProfile}
                      alt={actor.name}
                    />
                  )}
                  <div>
                    <p className={css.name}>{actor.name}</p>
                    <p>as {actor.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.text}>We don't have cast for this movie</p>
          )}
        </>
      )}
    </>
  );
}
