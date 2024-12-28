import React from "react";

const MainContainerSkeleton = () => {
  return (
    <div className="relative bg-black pt-[30%] md:pt-0">
      {/* Skeleton for VideoTitle */}
      <div className="absolute aspect-video w-screen bg-gradient-to-r from-black p-6 pt-[20%] text-white md:px-24">
        {/* Title Skeleton */}
        <div className="mb-4 h-8 w-3/4 animate-pulse rounded-md bg-gray-700 md:w-1/2"></div>
        {/* Overview Skeleton */}
        <div className="mb-6 hidden h-6 w-1/4 animate-pulse rounded-md bg-gray-700 py-6 md:block"></div>
        {/* Button Skeletons */}
        <div className="flex gap-4">
          <div className="h-10 w-32 animate-pulse rounded-md bg-gray-500"></div>
          <div className="hidden h-10 w-40 animate-pulse rounded-md bg-gray-600 md:block"></div>
        </div>
      </div>

      {/* Skeleton for VideoBackground */}
      <div className="w-screen">
        <div className="aspect-video w-screen animate-pulse bg-gray-800"></div>
      </div>
    </div>
  );
};

export default MainContainerSkeleton;
