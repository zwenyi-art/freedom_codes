import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import { LuImport } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const generateIP = (servers) => {
  const shuffledIPs = [...servers].sort(() => 0.5 - Math.random());
  return shuffledIPs.slice(0, 4);
};

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const Home = () => {
  const { userInfo } = useAuth();
  const refresh = useRefreshToken();
  const [servers, setServers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [randomServer, setRandomServer] = useState([]);
  // const [servers, setServers] = useState(Array(4).fill("").map(generateIP));
  const navigate = useNavigate();
  const location = useLocation();

  const [config, setConfig] = useState("");
  const [copied, setCopied] = useState(false);
  const [activityCode, setActivityCode] = useState("");

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
    const getServers = async () => {
      console.log("get server ip");
      try {
        const response = await axiosPrivate.get("/serverList");
        isMounted && setServers(response.data.serverList);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getServers();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const importToSingBox = () => {
    const url = `sing-box://import-remote-profile?url=${config}#Beyond_The_Limitation`;
    window.location.href = url;
  };
  useEffect(() => {
    const token = userInfo?.token;
    const user_id = userInfo?.user_id;
    setConfig(
      () =>
        `${
          import.meta.env.VITE_APP_REMOTE_URL
        }/api/v1/${user_id}?token=${token}`
    );
  }, [userInfo?.token]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomServer(() => generateIP(servers));
    }, 2000);

    const activityId = setInterval(() => {
      setActivityCode(generateRandomString());
    }, 100);

    return () => {
      clearInterval(intervalId);
      clearInterval(activityId);
    };
  }, [servers]);
  return (
    <section className=" w-full h-full ">
      <div className="px-2 w-full h-full  flex items-center justify-center  font-mono">
        <div className="w-full max-w-2xl bg-gray-900 border  border-blue-500 rounded-md shadow-lg overflow-hidden">
          <div className="bg-gray-800 p-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="p-2 h-70 overflow-y-auto">
            <div className="mb-1">
              <p className="text-blue-500">$./initialize_vpn_servers.sh</p>
              <p className="text-blue-500">
                Scanning for available VPN servers...
              </p>
            </div>
            {randomServer?.map((ip, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center space-x-2 mb-2"
              >
                <span className="text-yellow-500 text-xs sm:text-sm">
                  [{new Date().toLocaleTimeString()}]
                </span>
                <div className="flex  items-center space-x-2">
                  <span className="text-green-400 text-xs sm:text-sm">
                    SERVER_IP
                  </span>
                  <span className="text-white">{ip}</span>
                  <span className="text-gray-500 text-xs">
                    PORT: {Math.floor(Math.random() * 65535)}
                  </span>
                </div>
              </div>
            ))}
            <div className="text-green-600 mt-2 animate-pulse">
              Establishing secure connection: {activityCode}
            </div>
          </div>
          <div className="bg-gray-800 py-2 px-2 flex gap-y-1  flex-col">
            <div className="">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="config"
                  id="config"
                  className="block py-2 px-2 w-full pr-10 sm:text-sm rounded-md bg-gray-700 border-gray-600 text-blue-400 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  value={config}
                  readOnly
                />
                <button
                  onClick={handleCopy}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  aria-label="Copy configuration"
                >
                  <FaRegCopy className="h-5 w-5" />
                </button>
              </div>
              {copied && (
                <p className=" text-xs text-blue-400 animate-pulse">
                  Copied to clipboard!
                </p>
              )}
            </div>
            <button
              onClick={() => {
                importToSingBox();
                /* Handle Singbox import */
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium sm:py-1 py-2 px-2 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Import Singbox Config</span>
              <LuImport className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
