import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';
import { getTrending } from '../../servises/tmdb-api';

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTrending().then(({ results }) => {
      setMovies(results);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading movies...</div>
      ) : (
        <MoviesList
          movies={movies}
          location={location}
          title={'Trending today'}
        />
      )}
    </>
  );
};

export default Home;
