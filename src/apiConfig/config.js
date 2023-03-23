export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const api_key = "2608931a2aacaecfaf86030bb19c4e9e";
const tmdbEndpoint = `https://api.themoviedb.org/3/movie`;
const tmdbEndpointSearch = `https://api.themoviedb.org/3/search/movie`;

export const tmdbAPI = {
  getMovieList(type, page) {
    return `${tmdbEndpoint}/${type}?api_key=${api_key}&page=${page}`;
  },
  getMovieDetail(movieId) {
    return `${tmdbEndpoint}/${movieId}?api_key=${api_key}`;
  },
  getMovieMeta(movieId, type) {
    return `${tmdbEndpoint}/${movieId}/${type}?api_key=${api_key}`;
  },
  getMovieSearch(query, page) {
    return `${tmdbEndpointSearch}?api_key=${api_key}&query=${query}&page=${page}`;
  },
  imagaOriginal(url) {
    return `http://image.tmdb.org/t/p/original/${url}`;
  },
  image500(url) {
    return `http://image.tmdb.org/t/p/w500/${url}`;
  },
};
