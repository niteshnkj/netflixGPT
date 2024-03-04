import { IMG_CDN_URL } from "../utils/constant";
const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    
      <div className="w-36 pr-4 md:w-48">
        <img alt="Movie_card" src={IMG_CDN_URL + posterPath} />
      </div>
   
  );
};

export default MovieCard;
