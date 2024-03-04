import React, { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import { TMDB_MOVIE_API } from "../utils/constant";
import Header from "./Header";

const MovieDetails = () => {
  const [movieDetailsData, setmovieDetailsData] = useState(null);
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

  if (!movieDetailsData) return <p>Loading...</p>;

  const formattedTime = (minutes) =>
    new Date(minutes * 60 * 1000).toISOString().substr(11, 8);

  const duration = formattedTime(movieDetailsData.runtime);

  return (
    <div
      className=" h-[100vh] w-[100vw] text-white "
      style={{
        backgroundImage: `url(${IMG_CDN_URL}${movieDetailsData.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex h-full w-full items-center justify-center  bg-black bg-opacity-40  backdrop-blur-sm">
        <div className="w-[90vw] sm:h-[100bh] lg:h-[50vh]">
          <div className="flex flex-col gap-1 p-4 lg:grid lg:grid-cols-12">
            <div className="col-span-2 col-start-1 flex w-[80vw] items-center justify-center self-center align-middle md:w-48 lg:w-44">
              <img
                src={IMG_CDN_URL + movieDetailsData.poster_path}
                className="rounded-lg"
                alt="movie_cover"
              />
            </div>
            <div className="font col-span-10 col-start-3 flex flex-col  gap-2 font-medium">
              <div className="text-6xl font-bold ">
                <h1 className="font-[3.5rem]">
                  {movieDetailsData.original_title}
                </h1>
              </div>
              <div>
                <h1 className="text-slate-300">{movieDetailsData.tagline}</h1>
              </div>
              <div className="flex gap-2">
                {movieDetailsData.genres.map((genre) => (
                  <p key={genre.id}>{genre.name} </p>
                ))}
              </div>
              <div>
                <h1 className="">{movieDetailsData.overview}</h1>
              </div>
              <div className="flex gap-2">
                <h1>
                  <h1>
                    Popularity:{" "}
                    {Math.ceil((movieDetailsData.popularity / 2000) * 100)}%
                  </h1>
                </h1>

                <h1>Rating: {movieDetailsData.vote_average} Stars</h1>
              </div>
              <div className="flex gap-1">
                <h1>Language: {movieDetailsData.original_language}</h1>
                <h1>Runtime: {duration}</h1>
              </div>
              <div className="flex gap-1">
                <h1>Release Date: {movieDetailsData.release_date}</h1>
                <h1>{movieDetailsData.status}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
