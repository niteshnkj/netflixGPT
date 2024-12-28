import React, { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import { TMDB_MOVIE_API } from "../utils/constant";
import Loader from "./Loader";

const MovieDetails = () => {
  const [movieDetailsData, setmovieDetailsData] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const { movieId } = useParams();

  useEffect(() => {
    const fetchmovieDetails = async () => {
      try {
        const data = await fetch(TMDB_MOVIE_API + movieId, API_OPTIONS);
        const json = await data.json();
        setmovieDetailsData(json);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchmovieDetails();
  }, [movieId]);

  if (!movieDetailsData) {
    return <Loader />;
  }

  const formattedTime = (minutes) =>
    new Date(minutes * 60 * 1000).toISOString().substr(11, 8);

  const duration = formattedTime(movieDetailsData.runtime);

  return (
    <div
      className="relative h-screen w-full text-white"
      style={{
        backgroundImage: `url(${IMG_CDN_URL}${movieDetailsData.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      <div className="relative z-10 flex h-full w-full items-center justify-center backdrop-blur-sm">
        <div className="w-[90vw] max-w-7xl rounded-lg bg-black bg-opacity-50 shadow-lg lg:h-[70vh]">
          <div className="flex flex-col gap-6 p-6 lg:grid lg:grid-cols-12">
            {/* Movie Poster */}
            <div className="col-span-3 flex items-center justify-center">
              <img
                src={IMG_CDN_URL + movieDetailsData.poster_path}
                className="rounded-lg shadow-lg"
                alt="movie_cover"
              />
            </div>

            {/* Movie Details */}
            <div className="col-span-9 flex flex-col gap-4 text-left">
              <h1 className="text-4xl font-bold lg:text-5xl">
                {movieDetailsData.original_title}
              </h1>
              <h2 className="text-lg italic text-gray-400">
                {movieDetailsData.tagline}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {movieDetailsData.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-gray-800 px-3 py-1 text-sm transition hover:bg-gray-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="leading-relaxed text-gray-300">
                {movieDetailsData.overview}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Popularity:</strong>{" "}
                  {Math.ceil((movieDetailsData.popularity / 2000) * 100)}%
                </p>
                <p>
                  <strong>Rating:</strong> {movieDetailsData.vote_average} Stars
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {movieDetailsData.original_language.toUpperCase()}
                </p>
                <p>
                  <strong>Runtime:</strong> {duration}
                </p>
                <p>
                  <strong>Release Date:</strong> {movieDetailsData.release_date}
                </p>
                <p>
                  <strong>Status:</strong> {movieDetailsData.status}
                </p>
              </div>
              {/* Play Trailer Button */}
              <div className="mt-4">
                <button
                  className="transform rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-red-700 hover:shadow-xl"
                  onClick={() => setShowModal(true)} // Show modal on button click
                >
                  🎬 Play Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative w-[90%] rounded-lg bg-black shadow-xl lg:w-[60%]">
            <button
              className="absolute right-3 top-3 text-2xl font-bold text-white"
              onClick={() => setShowModal(false)} // Close modal on click
            >
              ✖
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/U8XH3W0cMss"
                title="RED ONE | Official Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-b-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
