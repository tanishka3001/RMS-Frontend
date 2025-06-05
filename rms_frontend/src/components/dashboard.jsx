const Dashboard = () => {
  const lightStatus = "Bright";
  const flameStatus = "Flame Detected";
  const humidity_percent = 44;
  return (
    <div className="bg-[#1B1833] text-white flex flex-col justify-center overflow-x-hidden">
      <div className="flex justify-center ">
        <nav className="flex text-xl md:text-3xl p-6  font-mono">
          <h1 className="mt-2">Room Monitoring System</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3605/3605855.png"
            alt="icon"
            className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] ml-4 "
          ></img>
        </nav>
        <div className=" absolute w-full h-[3px] bg-[#6f5af5]  shadow-[0_0_20px_#6f5af5]"></div>
        <div className="absolute mt-20 md:mt-24 w-full h-[3px] bg-[#6f5af5]  shadow-[0_0_20px_#6f5af5]"></div>
      </div>

      <div className="bg-black flex min-h-screen justify-around">
        <div className="flex flex-col mt-6">
          <div className="flex flex-col space-y-14 md:space-y-0 md:flex-row m-10 md:space-x-14">
            <div className="md:w-[35rem] md:h-96 flex justify-center items-center">
              <div className="w-52 h-52 md:w-72 md:h-72 rounded-full border-[10px] border-pink-800 bg-[#1B1833] relative shadow-[0_0_40px_#ff4cf0] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-xl mb-2">Temperature</p>
                  <p className="text-5xl font-bold text-pink-400">31°C</p>
                </div>
                <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-pink-500 animate-spin-slow"></div>
              </div>
            </div>

            <div className="relative flex flex-col space-y-14  md:space-y-11 ml-3 md:ml-0">
              <div className="w-52 h-52 md:w-[35rem] md:h-40 border-2 rounded-full md:rounded-s-full md:rounded-r-none border-blue-800 bg-gradient-to-r from-[#1B1833] to-blue-900 shadow-[0_0_25px_#00f0ff] flex items-center px-8">
                <div className="text-white text-center">
                  <p className="text-lg text-blue-300 ">HUMIDITY</p>
                  <p className="text-5xl font-semibold text-blue-400">
                    {humidity_percent}%
                    <input
                      type="range"
                      value={humidity_percent}
                      className=" ml-2 md:ml-4 "
                    ></input>
                  </p>
                  <p className="hidden md:flex text-sm text-gray-400 mt-2">
                    Current moisture level
                  </p>
                </div>
                <div className="hidden md:flex ml-auto text-6xl text-blue-400 opacity-60">
                  💧
                </div>
              </div>

              <div className=" w-52 h-52 md:w-[35rem] md:h-40 border-2 rounded-full md:rounded-s-full md:rounded-r-none border-purple-800 bg-gradient-to-r from-[#1B1833] to-purple-900 shadow-[0_0_25px_#d946ef] flex items-center px-10 md:px-8">
                <div className="text-white">
                  <p className=" text-md md:text-lg uppercase tracking-wide text-purple-300">
                    Gas Level
                  </p>
                  <p className="text-xl md:text-4xl font-semibold text-purple-400">
                    554 ppm
                  </p>
                  <p className=" hidden md:flex text-sm text-gray-400 mt-2">
                    Air quality reading
                  </p>
                </div>
                <div className="ml-auto text-5xl text-purple-400 opacity-70">
                  🧪
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-14 md:space-y-0 md:flex-row m-8 ml-12 md:ml-32 md:space-x-20 justify-center mb-28">
            <div className="w-52 h-52 md:w-[22rem] md:h-[22rem] border-2 rounded-full border-yellow-800 bg-gradient-to-r from-[#1B1833] to-yellow-900 shadow-[0_0_25px_#facc15] flex flex-col justify-center items-center transition-all duration-500">
              <p className="text-yellow-300 text-xl uppercase tracking-wide mb-2">
                Light Status
              </p>
              <p className="text-3xl md:text-5xl font-semibold text-yellow-400 mb-4">
                {lightStatus}
              </p>
              <div
                className={`text-4xl md:text-7xl ${
                  lightStatus === "Bright"
                    ? "opacity-100 drop-shadow-[0_0_20px_#facc15]"
                    : "opacity-30"
                } transition-all duration-500`}
              >
                🌞
              </div>
            </div>

            <div className="flex md:pt-16 md:pl-24 ">
              <div className="w-52 h-52 md:w-[35rem] md:h-52  border-2 rounded-full md:rounded-e-full md:rounded-l-none border-green-800 bg-gradient-to-r from-[#1B1833] to-green-900 shadow-[0_0_25px_#4ade80] flex flex-col justify-center items-center transition-all duration-500 ">
                <p className="text-green-300 text-xl uppercase tracking-wide mb-2">
                  Flame Status
                </p>
                <p className="text-2xl md:text-4xl font-semibold text-green-400 mb-4">
                  {flameStatus}
                </p>
                <div
                  className={`text-4xl md:text-7xl ${
                    flameStatus === "Flame Detected"
                      ? "text-red-500 drop-shadow-[0_0_20px_red] animate-pulse"
                      : "opacity-30 text-gray-500"
                  } transition-all duration-500`}
                >
                  🔥
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
