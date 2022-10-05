import MovieList from "components/movie/MovieList";
import MovieListDiscovery from "components/movie/MovieListDiscovery";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const SectionStyle = styled.div`
  @media screen and (max-width: 1023.98px) {
    .best-fit {
      margin-top: 40px;
    }
    .title-sire {
      font-size: 24px;
    }
  }
`;
const Section = ({
  nowPlaying,
  bestFit,
  popular,
  topRated,
  upcoming,
  tmdbAPI,
  tvAPI,
  airingToday,
  onTheAir,
  similar,
  recommendations,
  knowFor,
  className = "",
  // latest,
}) => {
  const { genresName, genreMovieList } = useSelector((state) => state.news);
  return (
    <SectionStyle>
      {nowPlaying && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Now playing
          </h2>
          <MovieList type={nowPlaying} category={tmdbAPI || tvAPI}></MovieList>
        </section>
      )}
      {upcoming && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Upcoming
          </h2>
          <MovieList type={upcoming} category={tmdbAPI}></MovieList>
        </section>
      )}
      {onTheAir && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Upcoming
          </h2>
          <MovieList type={onTheAir} category={tvAPI}></MovieList>
        </section>
      )}
      {airingToday && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Airing Today
          </h2>
          <MovieList type={airingToday} category={tvAPI}></MovieList>
        </section>
      )}
      {popular && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Popular
          </h2>
          <MovieList type={popular} category={tmdbAPI || tvAPI}></MovieList>
        </section>
      )}
      {topRated && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Top rate
          </h2>
          <MovieList type={topRated} category={tmdbAPI || tvAPI}></MovieList>
        </section>
      )}
      {bestFit && (
        <section
          className={`pb-10 best-fit movies-layout page-container ${className}`}
        >
          <h2 className="mb-10 text-3xl font-bold text-white">
            {genresName ? (
              <span>{`${
                tmdbAPI ? "Genre movie" : "Genre tv"
              }: ${genresName}`}</span>
            ) : genreMovieList?.total_results === 0 ? (
              ""
            ) : (
              "Find films that best fit you"
            )}
          </h2>
          <MovieListDiscovery
            type={bestFit}
            category={tmdbAPI || tvAPI}
          ></MovieListDiscovery>
        </section>
      )}
      {similar && (
        <section
          className={`pb-10 best-fit movies-layout page-container ${className}`}
        >
          <h2 className="mb-10 text-3xl font-bold text-white capitalize title-sire">
            Similar
          </h2>
          <MovieList
            type="similar"
            category={tmdbAPI || tvAPI}
            className="movie-list-similar"
          ></MovieList>
        </section>
      )}
      {recommendations && (
        <section
          className={`pb-10 best-fit movies-layout page-container ${className}`}
        >
          <h2 className="mb-10 text-3xl font-bold text-white capitalize title-sire">
            Recommendations
          </h2>
          <MovieList
            type="recommendations"
            category={tmdbAPI || tvAPI}
            className="movie-list-similar"
          ></MovieList>
        </section>
      )}
      {knowFor && (
        <section className={`pb-10 movies-layout page-container ${className}`}>
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            {`Know for ${tmdbAPI ? "movie" : "tv"}`}
          </h2>
          <MovieList type={knowFor} category={tmdbAPI || tvAPI}></MovieList>
        </section>
      )}
    </SectionStyle>
  );
};

export default Section;
