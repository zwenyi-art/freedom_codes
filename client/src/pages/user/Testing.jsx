import { div } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowRepeat } from "react-icons/bs";
const Testing = () => {
  const ispTypes = ["Ooredoo", "STC", "Mobily", "Zain"];
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [generating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isCoolDown, setIsCoolDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [numberOfServers, setNumberOfServers] = useState(25);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const intervalRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [expiresAt, setExpiresAt] = useState(0);
  const [timeLeft, setTimeLeft] = useState("00:00");

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowPrompt(false);
    console.log("Generating...");
    setHasGenerated(false);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 20) {
          prev + 2;
        }
        clearInterval(intervalRef.current);
        setShowPrompt(true);
        return 20;
      });
    }, 100);
  };

  const handleContinue = () => {
    setShowPrompt(false);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setIsGenerating(false);
          setHasGenerated(true);
          setIsCoolDown(true);
          setCountdown(8);
          return 100;
        }
        return prev + 20;
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

  const handelExpire = () => {
    // setExpiresAt(Date.now() + 1000 * 60 * 60 * 24); // Set expiration time to 24 hours from now
    localStorage.setItem("expiresAt", expiresAt);
    setExpiresAt(Date.now() + 1000 * 60 * 14); // Set expiration time to 24 hours from now
  };
  useEffect(() => {
    let interval = null;
    if (isCoolDown && countdown) {
      setButtonDisabled(true);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setButtonDisabled(false);
            setIsCoolDown(false);
            setHasGenerated(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCoolDown, countdown]);


  useEffect(() => {
    const storedExpiresAt = localStorage.getItem("expiresAt");
    window.alert(storedExpiresAt);
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, storedExpiresAt - now);
      if (diff <= 0) {
        setTimeLeft("00:00");
        clearInterval(interval);
      }
      const minutes = Math.floor(diff / 60000)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((diff % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      console.log("Time left:", `${minutes}:${seconds}`);
      setTimeLeft(`${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className=" w-full relative  h-svh py-3  flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-fit h-full flex flex-col items-center justify-center gap-4">
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
                  Please wait {countdown} second{countdown !== 1 && "s"} to
                  generate again.
                </span>
              )}
            </div>
          )}
        </button>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <span className="text-white">{timeLeft}</span>
        <button
          className="bg-yellow-400 w-fit h-fit p-2 rounded-md"
          onClick={() => handelExpire()}
        >
          Start Timer
        </button>
      </div>
      {showPrompt && (
        <div className="w-80 absolute bg-gray-900 text-white border rounded-md px-4  h-fit flex flex-col gap-y-3 items-center justify-center">
          <div className="w-full h-fit flex justify-between items-center gap-2 pt-5">
            <span className="w-fit h-fit text-white">Number of Servers</span>
            <span className="w-fit h-fit text-white ">{numberOfServers}</span>
          </div>
          <div className="w-full h-fit py-2 pb-8">
            <div className="w-full h-fit   relative">
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
              <span className="text-sm text-white   absolute start-0 -bottom-5">
                25
              </span>
              <span className="text-sm text-white  absolute end-0 -bottom-5">
                50
              </span>
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
            <ul className="w-full h-40  overflow-y-scroll text-sm font-medium text-white ">
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
        </div>
      )}
    </section>
  );
};

export default Testing;
