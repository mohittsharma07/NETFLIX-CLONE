import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchData = (type) => {
  const urls = {
    originals: `/discover/tv?api_key=${API_KEY}`,
    trending: `/trending/all/week?api_key=${API_KEY}`,
    now_playing: `/movie/now_playing?api_key=${API_KEY}`,
    popular: `/movie/popular?api_key=${API_KEY}`,
    top_rated: `/movie/top_rated?api_key=${API_KEY}`,
    upcoming: `/movie/upcoming?api_key=${API_KEY}`,
  };

  return api.get(urls[type]);
};
