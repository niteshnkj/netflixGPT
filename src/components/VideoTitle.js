const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute aspect-video w-screen bg-gradient-to-r from-black p-6 pt-[20%] text-white md:px-24">
      <h1 className="text-2xl font-bold md:text-6xl">{title}</h1>
      <p className="tetx-lg hidden w-1/4 py-6 md:inline-block">{overview}</p>
      <div className="md:0 my-4">
        <button className=" rounded-lg bg-white px-3  py-1 text-xl text-black hover:bg-opacity-80  md:px-12 md:py-4">
          Play
        </button>
        <button className="mx-2 hidden rounded-lg  bg-gray-500 bg-opacity-50 p-4 px-12 text-xl text-white md:inline-block ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
