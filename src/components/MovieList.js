import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log("ye wala movie list ka hai ", movies);
  return (
    <div className="px-6">
      <h1 className="py-4 text-white sm:text-lg md:text-3xl">{title}</h1>
      <div className="flex overflow-x-auto  ">
        <div className="flex">
          {movies.map((movie) => (
            <Link to={"/moviedetails/" + movie.id} key={movie.id}>
              <MovieCard posterPath={movie.poster_path} movieId={movie.id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
