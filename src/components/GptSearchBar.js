import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const langKEY = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMENIAI_KEY);
  //search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    //Make an api call to GEMENI API and get Movie results
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt =
      "Act as a Movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      "only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    // console.log(typeof text);
    if (!text) {
      // TODO Error handling here
    }
    const gptMovies = text.split(",");
    console.log("after split", gptMovies);
    //[array of movies]
    //for each movie i will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    console.log(promiseArray);
    //   [promies.promise,promise,promise,promise]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
    );
    // promise,all will take array of promises rounded-lg
  };
  return (
    <div className="flex justify-center pt-[45%] md:pt-[10%]">
      <form
        className="grid w-full  grid-cols-12 bg-black md:w-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKEY].getSearchPlaceholder}
          className="col-span-9 m-4 rounded-lg p-4 md:rounded-none"
        />
        <button
          className="col-span-4 m-4 rounded-lg bg-red-700 px-4 py-2 text-white md:col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKEY].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
