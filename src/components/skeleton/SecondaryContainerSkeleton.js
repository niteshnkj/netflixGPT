import React from "react";

const SecondaryContainerSkeleton = () => {
  return (
    <div className="bg-black">
      <div className="relative z-20 mt-0 pl-4 md:-mt-52 md:pl-12">
        {/* Render skeleton sections for each category */}
        {["Now Playing", "Top Rated", "Popular", "Upcoming"].map(
          (title, index) => (
            <div key={index} className="px-6 mb-8">
              {/* Title Skeleton */}
              <div className="h-8 w-40 bg-gray-700 rounded-md animate-pulse mb-4"></div>
              {/* Movie Cards Skeleton */}
              <div className="flex overflow-x-auto gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="w-36 h-52 bg-gray-800 rounded-md animate-pulse md:w-48"
                  ></div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SecondaryContainerSkeleton;
