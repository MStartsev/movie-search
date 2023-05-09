import { useSearchParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { DebounceInput } from 'react-debounce-input';

import { getSearchByQuery } from '../../servises/tmdb-api';
import MoviesList from '../../components/MoviesList/MoviesList';

import css from './Movies.module.css';

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
    setSearchParams({ query: event.target.value });
    setQuery(event.target.value);
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <DebounceInput
          className={css.input}
          type="text"
          name="query"
          value={query}
          debounceTimeout={1000}
          onChange={handleChange}
        />
        <button className={css.button} type="submit">
          Submit
        </button>
      </form>
      {isLoading ? (
        <div>Loading the movie...</div>
      ) : (
        <MoviesList
          movies={movies}
          location={location}
          query={query}
          title={
            query
              ? movies.length
                ? `Search results for "${query}"`
                : `No search results for "${query}"`
              : `Enter your query`
          }
        />
      )}
    </div>
  );
}
