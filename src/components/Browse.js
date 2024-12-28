import Header from "./Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GptSearchPage from "./GptSearchPage";
import { lazy, Suspense } from "react";
import MainContainerSkeleton from "./skeleton/MainContainerSkeleton";
import SecondaryContainerSkeleton from "./skeleton/SecondaryContainerSkeleton";

const Browse = () => {
  const MainContainer = lazy(() => import("./MainContainer"));
  const SecondaryContainer = lazy(() => import("./SecondaryContainer"));
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <Suspense fallback={<MainContainerSkeleton />}>
            <MainContainer />
          </Suspense>
          <Suspense fallback={<SecondaryContainerSkeleton />}>
            <SecondaryContainer />
          </Suspense>
        </>
      )}

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
