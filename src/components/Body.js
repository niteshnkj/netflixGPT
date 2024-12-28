import React, { lazy, Suspense } from "react";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginSkeleton from "./skeleton/LoginSkeleton";
// import { GOOGLE_CLIEN_ID } from "../utils/constant";

const Body = () => {
  const Login = lazy(() => import("./Login"));
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoginSkeleton />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/moviedetails/:movieId",
      element: <MovieDetails />,
    },
  ]);

  return (
    <div>
      <GoogleOAuthProvider clientId="189703948279-tr90b02ibei157os20cj1067ucs33pl4.apps.googleusercontent.com">
        <RouterProvider router={appRouter} />
        <Toaster />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Body;
