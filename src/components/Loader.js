import React from "react";

const Loader = () => {
  return (
    <div className="h-[100vh] w-[100vw] text-white bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[90vw] sm:h-[100vh] lg:h-[50vh]">
        <div className="flex flex-col gap-4 p-4 lg:grid lg:grid-cols-12 animate-pulse">
          {/* Poster Skeleton */}
          <div className="col-span-2 col-start-1 flex w-[80vw] items-center justify-center self-center md:w-48 lg:w-44">
            <div className="bg-slate-500 rounded-lg h-64 w-44"></div>
          </div>

          {/* Details Skeleton */}
          <div className="font col-span-10 col-start-3 flex flex-col gap-4 font-medium">
            <div className="h-12 bg-slate-500 rounded w-3/4"></div>
            <div className="h-8 bg-slate-400 rounded w-1/3"></div>

            {/* Genres */}
            <div className="flex gap-2">
              <div className="h-6 bg-slate-500 rounded w-20"></div>
              <div className="h-6 bg-slate-500 rounded w-20"></div>
              <div className="h-6 bg-slate-500 rounded w-20"></div>
            </div>

            {/* Overview */}
            <div className="h-6 bg-slate-500 rounded w-full"></div>
            <div className="h-6 bg-slate-500 rounded w-5/6"></div>
            <div className="h-6 bg-slate-500 rounded w-4/6"></div>

            {/* Popularity and Rating */}
            <div className="flex gap-4">
              <div className="h-6 bg-slate-500 rounded w-1/3"></div>
              <div className="h-6 bg-slate-500 rounded w-1/3"></div>
            </div>

            {/* Language and Runtime */}
            <div className="flex gap-4">
              <div className="h-6 bg-slate-500 rounded w-1/4"></div>
              <div className="h-6 bg-slate-500 rounded w-1/4"></div>
            </div>

            {/* Release Date and Status */}
            <div className="flex gap-4">
              <div className="h-6 bg-slate-500 rounded w-1/4"></div>
              <div className="h-6 bg-slate-500 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
