import { useSearchParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { getSearchByQuery } from '../servises/tmdb-api';
import MoviesList from '../components/MoviesList/MoviesList';

export default function Movies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get('query') ?? '');

  useEffect(() => {
    loadMovies(query);
  }, [query]);

  const onSubmit = ({ query }) => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
    loadMovies(query);
  };

  const loadMovies = query => {
    if (!query.length) return;
    setLoading(true);

    getSearchByQuery(query).then(({ results }) => {
      setMovies(results);
      setLoading(false);
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ query });
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" value={query} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <div>Loading the movie...</div>
      ) : (
        <MoviesList
          movies={movies}
          location={location}
          title={
            query ? `Search results by word "${query}"` : `Enter your query`
          }
        />
      )}
    </div>
  );
}
