import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container mb-20">
        <h2 className="capitalize text-white mb-10 text-3x1 font-bold">
          Now Playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="movies-layout page-container mb-20">
        <h2 className="capitalize text-white mb-10 text-3x1 font-bold">
          Top Rates
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container mb-20">
        <h2 className="capitalize text-white mb-10 text-3x1 font-bold">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
