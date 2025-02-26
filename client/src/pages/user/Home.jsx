import React, { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import { LuImport } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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

  const [key, setKey] = useState(0);
  const [config, setConfig] = useState("");
  const [copied, setCopied] = useState(false);
  const [activityCode, setActivityCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [ispTypes, setIspTypes] = useState([]);
  // Handle radio button selection
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem("selectedISP", value);
    window.location.reload();
  };

  // Load saved value from localStorage when component mounts
  useEffect(() => {
    let isMounted = true;
    const storedValue = localStorage.getItem("selectedISP");
    if (storedValue) {
      setSelectedValue(storedValue);
    } else {
      setSelectedValue("Ooredoo");
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ispDetailList = {
    Ooredoo: "OOREDOO MYANMAR",
    Mytel: "Telecom International Myanmar Co., Ltd",
  };
  const getISPName = (isp_data) => {
    return (
      Object.keys(ispDetailList).find(
        (key) => ispDetailList[key] === isp_data
      ) || false
    );
  };
  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
    const getServers = async () => {
      // console.log("get server ip");
      try {
        const response = await axiosPrivate.get("/serverList");
        const newServers = response?.data?.serverList.map(
          (data) => data.server
        );
        const ispList = response?.data?.ispList?.map((data) =>
          getISPName(data)
        );

        isMounted && setServers(newServers);
        isMounted && setIspTypes(ispList);
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

  const importToSingBox = (app) => {
    // const url = `sing-box://import-remote-profile?url=${config}#Beyond_The_Limitation`;
    const baseUrl = BASE_URL + "/api/v1/" + userInfo?.user_id;
    // const token = "50b1e803-fed7-4724-80eb-f0151c2d11d1";
    const isp = ispDetailList[selectedValue];
    const profileName = "Beyond_The_Limitation";
    const token = userInfo?.token;
    // Construct the query parameters
    const queryParams = `token=${token}&isp=${encodeURIComponent(isp)}`;
    const fullUrl = `${baseUrl}?${queryParams}`;

    const encodedUrl = encodeURIComponent(fullUrl);
    // Encode the full URL before appending it to SingBox import
    const singBoxUrl = `sing-box://import-remote-profile?url=${encodedUrl}#${profileName}`;
    const hiddifyUrl =
      "hiddify://import/https://freedom-codes-api.onrender.com/api/v1/7777?token=50b1e803-fed7-4724-80eb-f0151c2d11d1&isp=ooredoo#Ooredoo";
    if (app === "singbox") {
      window.location.href = singBoxUrl;
    } else if (app === "hiddify") {
      window.location.href = hiddifyUrl;
    }
  };
  useEffect(() => {
    // const token = userInfo?.token;

    setConfig(
      () =>
        `${BASE_URL}/api/v1/${userInfo?.user_id}?token=${userInfo?.token}&isp=${ispDetailList[selectedValue]}`
    );
  }, [userInfo?.token, selectedValue]);

  //showing shffeled ifp
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

  const addCoinHandle = () => {
    Swal.fire({
      title: "လှေနံနှစ်ဖက်နင်းချင်လို့ မရဘူးကိုယ့်လူတခုခုရွေး😂😂 ",
      confirmButtonText: "Singbox",
      cancelButtonText: "Hiddify",
      showCancelButton: true, // Enables the cancel button
      customClass: {
        popup: "bg-gray-800/80  rounded-lg", // Tailwind styling for popup
        title: "text-xl font-semibold text-white", // Tailwind styling for title
        confirmButton:
          "bg-green-300 hover:bg-green-600 text-black font-bold py-2 px-4 rounded",
        cancelButton:
          "bg-blue-300 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded",
      },
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        importToSingBox("singbox");
      } else if (result.isDismissed) {
        importToSingBox("hiddify");
      }
    });
  };
  return (
    <section className=" w-full  h-full pb-20 sm:p-0">
      <div className="px-2 w-full h-full  flex items-center justify-center  font-mono">
        <div className="relative w-full max-w-2xl bg-gray-900 border  border-blue-500 rounded-md shadow-lg overflow-hidden">
          <div className="bg-gray-800 p-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex">
              <button
                disabled={randomServer?.length === 0}
                onClick={toggleDropdown}
                className="inline-flex items-center justify-center w-full rounded-md 
        border border-transparent px-4 py-2
        bg-gradient-to-r from-cyan-500 to-blue-500 
        hover:from-cyan-600 hover:to-blue-600
        text-sm font-medium text-white
        shadow-sm transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select Operators
                <svg
                  className={`ml-2 -mr-1 h-5 w-5 transition-all duration-200 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div
              className="origin-top-right absolute right-2 mt-2 w-56 
                    rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-85
                    focus:outline-none"
              role="menu"
            >
              <ul className="w-full text-sm font-medium text-white border border-blue-500 rounded-lg">
                {ispTypes?.map((item) => (
                  <li
                    key={item}
                    className="w-full border-b  rounded-t-lg border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        id={`radio-${item}`}
                        type="radio"
                        value={item}
                        name="list-radio"
                        checked={selectedValue === item}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-opacity-100 bg-gray-800 border-green-700 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-0 dark:bg-gray-600 dark:border-yellow-500"
                      />
                      <label
                        htmlFor={`radio-${item}`}
                        className="w-full py-3 ms-2 text-sm font-medium text-white"
                      >
                        {item}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
              // onClick={() => {
              //   importToSingBox();
              //   /* Handle Singbox import */
              // }}
              onClick={() => addCoinHandle()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium sm:py-1 py-2 px-2 rounded-md transition duration-150 ease-in-out flex items-center justify-center space-x-2"
            >
              <span>Import Config</span>
              <LuImport className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
