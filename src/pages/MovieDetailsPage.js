import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../apiConfig/config";
const MovieDetailsPage = () => {
  const { movieId } = useParams(); // lấy id từ url vd: http://localhost:3000/movies/315162 lấy đc 315162
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  console.log(movieId);
  if (!data) return null;
  console.log("Movie-detail", data);
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imagaOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[250px] relative z-10 pb-10 ">
        <img
          src={tmdbAPI.imagaOriginal(poster_path)}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white  mb-5">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="text-primaryy py-2 px-4 border-primaryy border rounded"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-white leading-relaxed max-w-[600px] mx-auto mb-10 ">
        {overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredit() {
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
  const { movieId } = useParams(); // lấy đc id từ url vd: http://localhost:3000/movies/315162 lấy đc 315162
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  console.log("Movie-credit", data);
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="pb-10 pt-5">
      <h2 className="text-center text-3xl mb-10 text-white">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.length > 0 &&
          cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                className="w-full h-full object-cover rounded-lg mb-3"
                src={tmdbAPI.imagaOriginal(item.profile_path)}
                alt=""
              />
              <h3 className="text-xl font-medium text-white">{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
function MovieVideos() {
  // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
  const { movieId } = useParams(); // lấy đc id từ url vd: http://localhost:3000/movies/315162 lấy đc 315162
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;
  console.log("Movie-videos", data);
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 5).map((item) => (
          <div key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 text-white bg-secondary inline-block">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video ">
              <iframe
                width="885"
                height="498"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Đạt G - Đừng Ai Nhắc Về Cô Ấy | Live at @tasteofTHESOUL @DatGMusic"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
  const { movieId } = useParams(); // lấy đc id từ url vd: http://localhost:3000/movies/315162 lấy đc 315162
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;
  console.log("Movie-videos", data);
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl text-white font-medium mb-10">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
