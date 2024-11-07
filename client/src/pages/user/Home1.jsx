import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { LuImport } from "react-icons/lu";

const Home = () => {
  const [config, setConfig] = useState("http://localhost:8080/api/v1/random");
  const [copied, setCopied] = useState(false);
  // const { userInfo } = useSProvid();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(config);
      console.log("copy to clipboard", config);
      setCopied(true);
    } catch (error) {
      console.error("unable to copy ", error);
    }
  };
  return (
    <section className="w-full h-full">
      <div className=" w-full h-full  flex  items-center justify-center">
        <div className="font-bold sm:font-medium w-fit h-fit bg-gray-800 bg-opacity-55 mb-24 sm:m-0 border rounded-md gap-y-9 sm:gap-y-4 sm:px-6 sm:py-8 px-8 py-14  flex  flex-col items-center justify-center">
          <p>
            Your Current IP : <span>131.22.12.3</span>
          </p>
          <p>
            Location : <span>Mandalay</span>
          </p>
          <div className="w-fit h-fit flex items-center justify-center gap-x-2">
            <div>Public Servers : </div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <div className="">192.168.1.1 </div>
          </div>
          <div className="w-full h-fit   flex flex-col gap-y-3 items-center justify-center">
            <div className=" relative w-full h-fit hidden   sm:flex flex-row gap-x-2 items-center">
              <input
                className="w-72 h-fit pl-1 bg-transparent  rounded-sm py-1 text-center"
                value={config}
                disabled
              />
              <div className="absolute right-0 top-0 text-xs text-green-500 font-semibold">
                {copied && <span>Copied!</span>}
              </div>
              <button onClick={() => handleCopy()} className="w-fit h-fit ">
                <FaRegCopy size={24} />
              </button>
            </div>
            <button className="w-fit h-fit   border  px-2 py-2 text-sm   rounded-md gap-x-2 flex  items-center justify-center">
              <span>Singbox Config </span>
              <LuImport size={22} />
            </button>
          </div>
        </div>
      </div>
      {/* temp */}

      <div key={index} className="flex  items-center space-x-2 mb-2">
        <span className="text-yellow-500 text-xs sm:text-sm">
          [{new Date().toLocaleTimeString()}]
        </span>
        <span className="text-green-400 sm:text-sm">SERVER_IP</span>
        <span className="text-white">{ip}</span>
        <span className="text-gray-500 text-xs">
          PORT: {Math.floor(Math.random() * 65535)}
        </span>
      </div>
    </section>
  );
};

export default Home;
