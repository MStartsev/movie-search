import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import routes from '../../servises/routes';
import { Layout } from '../../layout/Layout/Layout';

const Home = lazy(() => import('../../views/Home/Home'));
const MovieDetails = lazy(() =>
  import('../../views/MovieDetails/MovieDetails')
);
const Movies = lazy(() => import('../../views/Movies/Movies'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={routes.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.MOVIES} element={<Movies />} />
          <Route path={routes.DETAILS} element={<MovieDetails />}>
            <Route path={routes.CAST} element={<Cast />} />
            <Route path={routes.REVIEWS} element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to={routes.HOME} replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
