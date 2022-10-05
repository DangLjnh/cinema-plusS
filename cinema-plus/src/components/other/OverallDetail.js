import React from "react";
import { v4 } from "uuid";
import { ReadMore } from "./ReadMore";

const OverallDetail = ({ hide, movie }) => {
  const { spoken_languages } = movie;
  if (!movie) return;
  return (
    <div className={`mb-10 overall ${hide ? "hidden" : ""}`}>
      {movie.tagline ? (
        <h2 className="my-5 text-lg italic text-center text-white">
          {movie.tagline}
        </h2>
      ) : (
        <div className="mt-10"></div>
      )}
      <div className="">
        <h2 className="mb-3 text-2xl font-semibold text-white">Story</h2>
        <ReadMore>{movie.overview}</ReadMore>
      </div>
      <div className="mt-10 leading-7">
        <h2 className="mb-3 text-2xl font-semibold text-white">Details</h2>
        <p>Status: {movie.status}</p>
        <p>
          Release date:{" "}
          {movie.release_date || movie.first_air_date || "Not released yet"}
        </p>
        <p>
          Spoken language:{" "}
          {spoken_languages?.map((language, index) => {
            return (
              <span key={v4()}>
                {language.english_name}
                {spoken_languages.length - 1 === index ? "" : ", "}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default OverallDetail;
