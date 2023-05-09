import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'servises/tmdb-api';
import css from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getReviews(movieId)
      .then(({ results }) => setReviews(results))
      .catch(error => console.log('Error fetching cast', error.message))
      .finally(setLoading(false));
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <div>Loading reviews...</div>
      ) : (
        <>
          {reviews.length ? (
            <ul className={css.list}>
              {reviews.map(review => (
                <li key={review.id}>
                  <h2 className={css.title}>{review.author}</h2>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.text}>We don't have any reviews for this movie</p>
          )}
        </>
      )}
    </>
  );
}
