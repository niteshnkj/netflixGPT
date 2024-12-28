const LoginSkeleton = () => {
  return (
    <div className="relative">
      {/* Background Image Skeleton */}
      <div className="absolute h-screen w-screen animate-pulse bg-gray-700"></div>

      {/* Form Skeleton */}
      <div className="absolute left-0 right-0 mx-auto my-36 w-full rounded-lg bg-black bg-opacity-80 p-12 text-white md:w-3/12">
        {/* Title Skeleton */}
        <div className="mb-6 h-10 w-32 animate-pulse rounded-md bg-gray-700"></div>
        {/* Input Fields Skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
        </div>
        {/* Error Message Skeleton */}
        <div className="my-4 h-6 w-40 animate-pulse rounded-md bg-gray-700"></div>
        {/* Button Skeleton */}
        <div className="my-6 h-12 w-full animate-pulse rounded-lg bg-gray-700"></div>
        {/* Toggle Text Skeleton */}
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-700"></div>
      </div>
    </div>
  );
};

export default LoginSkeleton;
