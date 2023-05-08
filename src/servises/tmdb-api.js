import axios from 'axios';

const API_KEY = '1f2e1346f84e3b2d486a79ce9b661dcb';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: API_KEY,
};

const getApiData = async (url, data) => {
  try {
    const response = await axios.get(url, data);

    if (!response.data) throw new Error(response.statusText);
    return response.data;
  } catch (error) {
    console.log(`Error making GET request to ${url}: ${error.message}`);
  }
};

export const getTrending = async () => {
  const { results, total_results } = await getApiData('/trending/movie/day');
  return { results, total_results };
};

export const getDetails = async movie_id => {
  const { title, poster_path, vote_average, overview, genres, release_date } =
    await getApiData(`/movie/${movie_id}`);
  return { title, poster_path, vote_average, overview, genres, release_date };
};

export const getCredits = async movie_id => {
  const { cast } = await getApiData(`/movie/${movie_id}/credits`);
  return { cast };
};

export const getSearchByQuery = async query => {
  const { results } = await getApiData(`/search/movie`, {
    params: {
      query,
    },
  });
  return { results };
};
