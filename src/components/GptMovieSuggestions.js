import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  // console.log(movieNames);
  if (!movieNames) return null;
  return (
    <div className="m-4 bg-black bg-opacity-90 p-2 text-white">
      {
        <div>
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default GptMovieSuggestions;
