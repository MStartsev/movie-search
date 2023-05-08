import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import routes from '../../servises/routes';

import { Layout } from '../../layout/Layout/Layout';
// import { Home } from '../../views/Home';

const Home = lazy(() => import('../../views/Home'));
const MovieDetails = lazy(() => import('../../views/MovieDetails'));
const Movies = lazy(() => import('../../views/Movies'));
// const Cast = lazy(() => import('components/Cast/Cast'));
// const Reviews = lazy(() => import('components/Reviews/Reviews'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          {/* <Route path="cast" element={<Cast />} /> */}
          {/* <Route path="reviews" element={<Reviews />} /> */}
          {/* </Route> */}
          {/* <Route path="*" element={<Navigate to={routes.HOME} replace />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};
