import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log("ye wala movie list ka hai ", movies);
  return (
    <div className="px-6">
      <h1 className="sm:text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto  ">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
