import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  // const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  //either we can can use state whenever my trailer key will change our video will change accordingly we can also use redux store thats the second way
  // const [trailerId, setTrailerId] = useState(null);
  //fetch my trailer && updating the store with trailer video data

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    const filterdata = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterdata.length ? filterdata[0] : json.results[0];
    // console.log(trailer);
    // setTrailerId(trailer.key);
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};
export default useMovieTrailer;
