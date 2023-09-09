import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
         MainContainer
          - VideoBackground
          - VideoTitle
        SecondaryContainer
          -MovieList * n
            -cards * n
     */}
    </div>
  );
};

export default Browse;

//because of strict mode api call happens 2 times and it happens in only local not in build. the reason is react checks for inconsistency in our components while in local
