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

export const getTrending = async () => await getApiData('/trending/movie/day');

export const getDetails = async movie_id =>
  await getApiData(`/movie/${movie_id}`);

export const getCredits = async movie_id =>
  await getApiData(`/movie/${movie_id}/credits`);

export const getReviews = async movie_id =>
  await getApiData(`/movie/${movie_id}/reviews`);

export const getSearchByQuery = async query =>
  await getApiData(`/search/movie`, {
    params: {
      query,
    },
  });
