import React, { useState, useEffect, useRef } from "react";
import { FaRegCopy } from "react-icons/fa";
import { LuImport } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { aura, auraInit } from "@uiw/codemirror-theme-aura";
import { MdContentCopy } from "react-icons/md";
import { TiExportOutline } from "react-icons/ti";

const Home = () => {
  const { userInfo } = useAuth();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  // const [servers, setServers] = useState(Array(4).fill("").map(generateIP));
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState(0);
  const [config, setConfig] = useState("");
  const [copied, setCopied] = useState(false);
  const [activityCode, setActivityCode] = useState("");

  const [ispTypes, setIspTypes] = useState([]);
  const [editorContent, setEditorContent] = useState("fsfsfsfsf");

  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [generating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isCoolDown, setIsCoolDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [numberOfServers, setNumberOfServers] = useState(25);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const intervalRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [flag, setFlag] = useState(false);

  //configure details
  const [expiresAt, setExpiresAt] = useState(0);
  const [ispName, setIspName] = useState("");
  const [serverAmount, setServerAmount] = useState(0);
  const [singBoxConfig, setSingBoxConfig] = useState({});
  const [timeLeft, setTimeLeft] = useState("00:00");

  //configure have generated or not
  const [generated, setGenerated] = useState(false);
  const extensions = [javascript()];
  const scrollableEditor = EditorView.theme({
    "&": {
      maxHeight: "60vh", // dynamic based on screen
      overflow: "auto",
    },
  });
  const editorExtensions = [EditorView.lineWrapping, scrollableEditor];

  //for converting ISP code to name
  const ispDetailList = {
    Ooredoo: "OOREDOO MYANMAR",
    Mytel: "Telecom International Myanmar Co., Ltd",
    Atom: "Atom Myanmar Limited",
  };
  const getISPName = (isp_data) => {
    return (
      Object.keys(ispDetailList).find(
        (key) => ispDetailList[key] === isp_data
      ) || isp_data
    );
  };

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();
    const getServers = async () => {
      // console.log("get server ip");
      try {
        const response = await axiosPrivate.get("/serverList");
        const result = response?.data?.msg;

        if (result) {
          console.log("After Token Refresh", response?.data);

          setButtonDisabled(true);
          setExpiresAt(response?.data?.data?.expiresAt);
          setSingBoxConfig(
            JSON.stringify(response?.data?.data?.singbox_config, null, 2)
          );

          setGenerated(true);
        } else {
          console.log("Configure hasn't created yet", response?.data?.ispList);
          setButtonDisabled(false);
          setGenerated(false);
          setIspTypes(response?.data?.ispList);
        }

        // isMounted && setServers(newServers);
        // isMounted && setIspTypes(ispList);
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
    navigator.clipboard
      .writeText(singBoxConfig)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const importToHiddify = () => {
    // const url = `sing-box://import-remote-profile?url=${config}#Beyond_The_Limitation`;
    const baseUrl = BASE_URL + "/api/v1/" + userInfo?.user_id;
    // const token = "50b1e803-fed7-4724-80eb-f0151c2d11d1";
    const isp = ispDetailList[selectedValue];
    const profileName = "Beyond_The_Limitation";
    const token = userInfo?.token;
    // Construct the query parameters
    const queryParams = `token=${token}&isp=${encodeURIComponent(isp)}`;
    const fullUrl = `${baseUrl}?${queryParams}`;
    const hiddifyUrl = `hiddify://import/${fullUrl}#${profileName}`;
    window.location.href = hiddifyUrl;
  };

  const importToSingBox = () => {
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
    window.location.href = singBoxUrl;
  };

  //showing shffeled ifp
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRandomServer(() => generateIP(servers));
  //   }, 2000);

  //   const activityId = setInterval(() => {
  //     setActivityCode(generateRandomString());
  //   }, 100);

  //   return () => {
  //     clearInterval(intervalId);
  //     clearInterval(activityId);
  //   };
  // }, [servers]);

  // useEffect(() => {
  //   console.log("Expires At:", expiresAt);
  //   const interval = setInterval(() => {
  //     console.log("Update Time Called");
  //     const now = Date.now();
  //     const diff = Math.max(0, expiresAt - now);
  //     if (diff <= 0) {
  //       setTimeLeft("00:00");
  //       setGenerated(false);
  //       clearInterval(interval);
  //     }

  //     const minutes = Math.floor(diff / 60000)
  //       .toString()
  //       .padStart(2, "0");
  //     const seconds = Math.floor((diff % 60000) / 1000)
  //       .toString()
  //       .padStart(2, "0");
  //     console.log("Update Time Called");
  //     setTimeLeft(`${minutes}:${seconds}`);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [expiresAt]);
  // const addCoinHandle = () => {
  //   Swal.fire({
  //     title: "လှေနံနှစ်ဖက်နင်းချင်လို့ မရဘူးကိုယ့်လူတခုခုရွေး😂😂 ",
  //     confirmButtonText: "Singbox",
  //     cancelButtonText: "Hiddify",
  //     showCancelButton: true, // Enables the cancel button
  //     customClass: {
  //       popup: "bg-gray-800/80  rounded-lg", // Tailwind styling for popup
  //       title: "text-xl font-semibold text-white", // Tailwind styling for title
  //       confirmButton:
  //         "bg-green-300 hover:bg-green-600 text-black font-bold py-2 px-4 rounded",
  //       cancelButton:
  //         "bg-blue-300 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded",
  //     },
  //   }).then(async (result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       importToSingBox("singbox");
  //     } else if (result.isDismissed) {
  //       console.log("cancel");
  //       importToSingBox("hiddify");
  //     } else if (result.isDismissed) {
  //       console.log("dismissed");
  //     }
  //   });
  // };

  useEffect(() => {
    console.log("Expires At:", expiresAt);
    if (expiresAt <= 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, expiresAt - now);
      if (diff <= 0) {
        setTimeLeft("00:00");
        clearInterval(interval);
        setGenerated(false);
      }
      const minutes = Math.floor(diff / 60000)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((diff % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      setTimeLeft(`${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowPrompt(false);

    console.log("Generating...");
    setButtonDisabled(true);
    setHasGenerated(false);
    intervalRef.current = setInterval(() => {
      console.log("Interval running...");
      setProgress((prev) => {
        if (prev < 40) {
          return prev + 20;
        }
        clearInterval(intervalRef.current);
        setShowPrompt(true);
        return 40;
      });
    }, 500);
  };

  const handleContinue = () => {
    if (selectedValue === "") return;
    setShowPrompt(false);
    let fetchStarted = false;
    let fetchCompleted = false;
    let counter = 0;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (fetchStarted && !fetchCompleted) {
          console.log(
            `FetchStarted ${fetchStarted}- FetchCompleted ${fetchCompleted}`
          );
          return prev;
        }
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setIsGenerating(false);
          setHasGenerated(true);
          setGenerated(true);
          return 100;
        }

        if (progress <= 50 && !fetchStarted) {
          fetchStarted = true;
          const innerInterval = setInterval(async () => {
            console.log("Fetching data interval started...");
            try {
              console.log("Generating servers...");
              await axiosPrivate
                .post(
                  "/generateServers",
                  {
                    ispType: selectedValue,
                    serverAmount: Number(numberOfServers),
                  },
                  {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                  }
                )
                .then((data) => {
                  fetchCompleted = true;
                  setExpiresAt(data?.data?.data?.expiresAt);
                  // setSingBoxConfig(data?.data?.singbox_config);
                  setSingBoxConfig(
                    JSON.stringify(data?.data?.data?.singbox_config, null, 2)
                  );

                  clearInterval(innerInterval);
                  console.log("Data Generated successfully");
                }); // Replace with your endpoint
            } catch (err) {
              clearInterval(innerInterval);
              clearInterval(intervalRef.current);
              setIsGenerating(false);
              setGenerated(false);
              console.error(err);
              alert("Error: Failed to fetch data.");
              return;
            }
          }, 1000);
        }
        return prev + 10;
      });
    }, 600);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // localStorage.setItem("selectedISP", value);
    // window.location.reload();
    console.log("Selected ISP:", value);
  };

  return (
    <section className="sm:px-2  px-0 w-full h-auto  flex flex-col items-center justify-center  font-mono">
      {/* <div className="w-full h-12 bg-red-500"></div> */}

      <div className="w-full relative h-full flex items-center justify-center">
        {/* {generated ? (
          <div className="w-full h-full  bg-[#1A2331] rounded-sm flex items-center justify-center ">
            <div className="w-full h-full rounded-md px-3  flex flex-col items-center justify-center  font-mono">
              <div className="w-full h-fit flex py-2  justify-between items-center gap-2">
                <div className="w-full h-full ">
                  <span>ExpireIn: </span>
                  <span>{timeLeft}</span>
                </div>
                <div className="w-full  h-full  flex items-center  justify-end  gap-x-2 md:gap-x-5 flex-row">
                  <button
                    onClick={() => handleCopy()}
                    className="md:px-2 md:py-1 p-0 flex items-center justify-center gap-x-1"
                  >
                    Copy
                    <MdContentCopy size={20} />
                  </button>
                  <button
                    onClick={() => importToSingBox()}
                    className="md:px-2 md:py-1 p-0  flex items-center justify-center gap-x-1"
                  >
                    Import
                    <TiExportOutline size={25} />
                  </button>
                </div>
              </div>
              <div className="w-full max-w-full overflow-x-auto">
                <CodeMirror
                  value={singBoxConfig}
                  extensions={editorExtensions}
                  theme={aura}
                  className="w-full font-mono min-h-max rounded-sm pb-3"
                  onChange={(value, viewUpdate) => {
                    setEditorContent(value);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full flex items-center justify-center h-full">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <button
                disabled={buttonDisabled}
                type="button"
                onClick={() => handleGenerate()}
                className="relative transition-all   delay-100 ease-out w-fit h-fit flex items-center justify-center "
              >
                <div
                  className={`w-40 h-40 rounded-full  ${
                    generating && "shadow-md animate-spin shadow-red-500"
                  } flex shadow-lg   items-center justify-center ${
                    hasGenerated
                      ? "bg-gradient-to-r from-green-300 to-green-500 "
                      : "bg-gradient-to-r from-cyan-500 to-blue-500"
                  }`}
                ></div>
                {generating ? (
                  <p className="absolute flex flex-col text-center text-xl font-bold animate-pulse">
                    <span>Generating</span>
                    <span className="text-base">{progress}%</span>
                  </p>
                ) : (
                  !hasGenerated && (
                    <p className="absolute text-center text-xl font-bold ">
                      Generate
                    </p>
                  )
                )}
                {hasGenerated && (
                  <div className="flex flex-col absolute text-center items-center justify-center gap-2">
                    <p className=" text-xl font-bold ">Success!</p>
                    {isCoolDown && (
                      <span className="text-center text-sm text-gray-600">
                        Please wait {countdown} second
                        {countdown !== 1 && "s"} to generate again.
                      </span>
                    )}
                  </div>
                )}
              </button>
            </div>
          </div>
        )} */}

        {generated ? (
          <div className="w-full h-full  bg-[#1A2331] rounded-sm flex items-center justify-center ">
            <div className="w-full h-full rounded-md px-3  flex flex-col items-center justify-center  font-mono">
              <div className="w-full h-fit flex py-2  justify-between items-center gap-2">
                <div className="w-full h-full ">
                  <span>ExpireIn: </span>
                  <span>{timeLeft}</span>
                </div>
                <div className="w-full  h-full  flex items-center  justify-end  gap-x-2 md:gap-x-5 flex-row">
                  <button
                    onClick={() => handleCopy()}
                    className="md:px-2 md:py-1 p-0 flex items-center justify-center gap-x-1"
                  >
                    Copy
                    <MdContentCopy size={20} />
                  </button>
                  <button
                    onClick={() => importToSingBox()}
                    className="md:px-2 md:py-1 p-0  flex items-center justify-center gap-x-1"
                  >
                    Import
                    <TiExportOutline size={25} />
                  </button>
                </div>
              </div>
              <div className="w-full max-w-full overflow-x-auto">
                <CodeMirror
                  value={singBoxConfig}
                  extensions={editorExtensions}
                  theme={aura}
                  className="w-full font-mono min-h-max rounded-sm pb-3"
                  onChange={(value, viewUpdate) => {
                    setEditorContent(value);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full flex items-center justify-center h-full">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <button
                disabled={buttonDisabled}
                type="button"
                onClick={() => handleGenerate()}
                className="relative transition-all   delay-100 ease-out w-fit h-fit flex items-center justify-center "
              >
                <div
                  className={`w-40 h-40 rounded-full  ${
                    generating && "shadow-md animate-spin shadow-red-500"
                  } flex shadow-lg   items-center justify-center ${
                    hasGenerated
                      ? "bg-gradient-to-r from-green-300 to-green-500 "
                      : "bg-gradient-to-r from-cyan-500 to-blue-500"
                  }`}
                ></div>
                {generating ? (
                  <p className="absolute flex flex-col text-center text-xl font-bold animate-pulse">
                    <span>Generating</span>
                    <span className="text-base">{progress}%</span>
                  </p>
                ) : (
                  !hasGenerated && (
                    <p className="absolute text-center text-xl font-bold ">
                      Generate
                    </p>
                  )
                )}
                {hasGenerated && (
                  <div className="flex flex-col absolute text-center items-center justify-center gap-2">
                    <p className=" text-xl font-bold ">Success!</p>
                    {isCoolDown && (
                      <span className="text-center text-sm text-gray-600">
                        Please wait {countdown} second
                        {countdown !== 1 && "s"} to generate again.
                      </span>
                    )}
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {showPrompt && (
          <article className="max-w-80 absolute bg-black z-30  max-h-[80vh]  text-white border rounded-md px-4  overflow-hidden flex flex-col gap-y-3 items-center justify-center">
            <div className="w-full h-fit flex justify-between items-center gap-2 pt-5">
              <span className="w-fit h-fit text-white">Number of Servers</span>
              <span className="w-fit h-fit text-white ">{numberOfServers}</span>
            </div>
            <div className="w-full h-full  flex flex-col gap-y-1  relative">
              <input
                onChange={(e) => setNumberOfServers(e.target.value)}
                id="steps-range"
                type="range"
                min={25}
                max={50}
                defaultValue="25"
                step="5"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="w-full h-fit flex flex-row justify-between">
                <span className="text-sm text-white">25</span>
                <span className="text-sm text-white">50</span>
              </div>
            </div>
            <div className=" w-full h-fit  flex flex-col items-center justify-center">
              <button
                // disabled={randomServer?.length === 0}
                // onClick={toggleDropdown}
                className="inline-flex items-center justify-between w-full"
              >
                <span>Please Select Your Operator</span>
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
              <ul className="w-full max-h-[30vh] overflow-y-scroll text-sm font-medium text-white ">
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
            <div className="w-full h-fit flex justify-between items-center gap-2 pt-5 py-3">
              <button className="w-fit h-fit px-3 py-2 rounded-md bg-red-400">
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="w-fit h-fit px-3 py-2 rounded-md bg-green-400"
              >
                Continue
              </button>
            </div>
          </article>
        )}

        {/* generated configure */}

        {/* <div className="w-full h-full  bg-[#1A2331] rounded-sm flex items-center justify-center ">
          <div className="w-full h-full rounded-md px-3  flex flex-col items-center justify-center  font-mono">
            <div className="w-full h-fit flex py-2  justify-between items-center gap-2">
              <div className="w-full h-full ">
                <span>ExpireIn: </span>
                <span>{timeLeft}</span>
              </div>
              <div className="w-full  h-full  flex items-center  justify-end  gap-x-2 md:gap-x-5 flex-row">
                <button
                  onClick={() => handleCopy()}
                  className="md:px-2 md:py-1 p-0 flex items-center justify-center gap-x-1"
                >
                  Copy
                  <MdContentCopy size={20} />
                </button>
                <button
                  onClick={() => importToSingBox()}
                  className="md:px-2 md:py-1 p-0  flex items-center justify-center gap-x-1"
                >
                  Import
                  <TiExportOutline size={25} />
                </button>
              </div>
            </div>
            <div className="w-full max-w-full overflow-x-auto">
              <CodeMirror
                value={singBoxConfig}
                extensions={editorExtensions}
                theme={aura}
                className="w-full font-mono min-h-max rounded-sm pb-3"
                onChange={(value, viewUpdate) => {
                  setEditorContent(value);
                }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Home;
