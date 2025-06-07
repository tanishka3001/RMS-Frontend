import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const Dashboard = () => {
  const [lightStatus, setLightStatus] = useState("loading..");
  const [flameStatus, setFlameStatus] = useState("loading..");
  const [humidity, setHumidity] = useState("loading..");
  const [temperature, setTemperature] = useState("loading..");
  const [gasLevel, setGasLevel] = useState("loading...");

  const signInWithEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "testuser@gmail.com",
        "pass1234"
      );
      console.log("Logged in as:", userCredential.user.email);
      return true;
    } catch (error) {
      console.error("Email login failed:", error.code, error.message);
      return false;
    }
  };

  useEffect(() => {
    signInWithEmailPassword().then((success) => {
      if (!success) return;

      const lightRef = ref(database, "/iot/device/ldr");
      const flameRef = ref(database, "/iot/device/flame");
      const humiRef = ref(database, "/iot/device/humidity");
      const tempRef = ref(database, "/iot/device/temperature");
      const gasRef = ref(database, "/iot/device/gas");

      onValue(tempRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setTemperature(data);
      });
      onValue(humiRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setHumidity(data);
      });
      onValue(flameRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setFlameStatus(data);
      });
      onValue(gasRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setGasLevel(data);
      });
      onValue(lightRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) setLightStatus(data);
      });
    });
  }, []);

  return (
    <div className="bg-[#1B1833] text-white flex flex-col justify-center overflow-x-hidden">
      <div className="flex justify-center md:max-h-full max-h-[84px]">
        <nav className="flex text-md sm:text-xl md:text-3xl p-6  font-mono">
          <img
            src="istevit.png"
            alt="icon"
            className="w-[35px] h-[35px] md:w-[52px] md:h-[52px] mr-4 "
          />
          <h1 className="mt-2">Room Monitoring System</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3605/3605855.png"
            alt="icon"
            className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] ml-4 "
          />
        </nav>
        <div className=" absolute w-full h-[1px] bg-[#6f5af5]  shadow-[0_0_20px_#6f5af5]"></div>
        <div className="absolute mt-20 md:mt-24 w-full h-[1px] bg-[#6f5af5]  shadow-[0_0_20px_#6f5af5]"></div>
      </div>

      <div className="bg-black flex min-h-screen justify-around">
        <div className="flex flex-col mt-6">
          <div className="flex flex-col space-y-14 md:space-y-0 md:flex-row m-10 md:space-x-14">
            <div className="md:w-[35rem] md:h-96 flex justify-center items-center">
              <div className="w-52 h-52 md:w-[20rem] md:h-[20rem] rounded-full border-[4px] border-pink-800 bg-[#121021] transition-all relative shadow-[0_0_15px_#ff4cf0] flex items-center justify-center hover:-translate-y-2 cursor-pointer">
                <div className="text-center">
                  <p className="text-white text-xl mb-2">Temperature</p>
                  <p className="text-5xl font-bold text-pink-400">
                    {temperature}°C
                  </p>
                </div>
                <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-pink-500 animate-spin-slow"></div>
              </div>
            </div>

            <div className="relative flex flex-col space-y-14  md:space-y-11 ml-3 md:ml-0">
              <div className="w-52 h-52 md:w-[35rem] md:h-40 border-2 rounded-full md:rounded-s-full md:rounded-r-none transition-all border-blue-800 bg-[#121021] shadow-[0_0_15px_#00f0ff] flex items-center px-8 cursor-pointer hover:-translate-y-2">
                <div className="text-white text-center">
                  <p className="text-lg text-blue-300 ">HUMIDITY</p>
                  <p className="text-5xl font-semibold text-blue-400">
                    {humidity}%
                    <input
                      type="range"
                      value={humidity}
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

              <div className=" w-52 h-52 md:w-[35rem] md:h-40 border-2 rounded-full md:rounded-s-full md:rounded-r-none transition-all border-purple-800 bg-[#121021] shadow-[0_0_15px_#d946ef] flex items-center px-10 md:px-8 cursor-pointer hover:-translate-y-2">
                <div className="text-white">
                  <p className=" text-md md:text-lg uppercase tracking-wide text-purple-300">
                    Gas Level
                  </p>
                  <p className="text-xl md:text-4xl font-semibold text-purple-400">
                    {gasLevel}
                  </p>
                  <p className=" hidden md:flex text-sm text-gray-400 mt-2">
                    Air quality reading
                  </p>
                </div>
                <div className="ml-auto text-5xl text-purple-400 opacity-70">
                  ♨️
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-14 md:space-y-4 md:flex-row m-8 ml-12 md:ml-32 md:space-x-20 justify-center mb-0">
            <div
              className={`w-52 h-52 md:w-[20rem] md:h-[20rem] border-2 rounded-full border-yellow-800 ${
                lightStatus === "Light"
                  ? "bg-gradient-to-r from-[#1B1833] to-yellow-900 shadow-[0_0_15px_#facc15]"
                  : "bg-[#121021] shadow-[0_0_15px_#facc15]"
              } flex flex-col justify-center items-center transition-all duration-500 cursor-pointer hover:-translate-y-2 md:ml-8`}
            >
              <p className="text-yellow-300 text-xl uppercase tracking-wide mb-2">
                Light Status
              </p>
              <p className="text-3xl md:text-5xl font-semibold text-yellow-400 mb-4">
                {lightStatus}
              </p>
              <div
                className={`text-4xl md:text-7xl ${
                  lightStatus === "Light"
                    ? "opacity-100 drop-shadow-[0_0_20px_#facc15] "
                    : "opacity-30"
                } transition-all duration-500`}
              >
                🌞
              </div>
            </div>

            <div className="flex md:pt-16 md:pl-24 ">
              <div
                className={`w-52 h-52 md:w-[35rem] md:h-40 border-2 rounded-full md:rounded-e-full md:rounded-l-none ${
                  flameStatus === "Flame"
                    ? "border-orange-400 bg-gradient-to-r from-[#1B1833] via-orange-600 to-red-900 shadow-[0_0_15px_orange]"
                    : "bg-[#121021] border-green-800 shadow-[0_0_15px_#4ade80]"
                }    flex flex-col md:flex-row justify-center md:justify-between px-5 items-center transition-all duration-500 cursor-pointer hover:-translate-y-2 md:ml-5`}
              >
                <div className="md:flex md:flex-col md:gap-1">
                  <p className="text-green-300 text-xl uppercase tracking-wide mb-2">
                    Flame Status
                  </p>
                  <p className="text-2xl md:text-4xl font-semibold text-green-400 mb-4">
                    {flameStatus}
                  </p>
                </div>
                <div
                  className={`text-4xl md:text-7xl ${
                    flameStatus === "Flame"
                      ? "text-red-500 drop-shadow-[0_0_20px_red] animate-pulse "
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
