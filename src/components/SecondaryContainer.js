import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // console.log("ye seconadry wala hai", movies);
  return (
    movies.nowPlayingMovies &&
    movies.topRatedMovies &&
    movies.popularMovies &&
    movies.upcomingMovies && (
      <div className=" bg-black">
        <div className="relative z-20 mt-0 pl-4 md:-mt-52 md:pl-12">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;

/*
      MovieList - popular
        - MovieCards * n
      MovieList - Now Playing
      MovieList - Trending
      MovieList - Horror
      and many more generes....
      movies.popularMovies
      */
