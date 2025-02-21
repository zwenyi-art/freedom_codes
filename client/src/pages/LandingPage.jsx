import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoMdLogIn } from "react-icons/io";
import { title } from "framer-motion/client";
import { HiMiniLanguage } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import About from "../components/landing/About";
import Features from "../components/landing/Features";

const LandingPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState("my");
  const [languageBox, setLanguageBox] = useState(false);
  const [modalBox, setModalBox] = useState(false);
  const aboutRef = useRef();
  const featuresRef = useRef();
  const modalBoxSwitch = () => {
    console.log("modal box switch button");
    setModalBox(!modalBox);
  };
  useEffect(() => {
    console.log("landing page", auth);
    if (auth?.accessToken) {
      navigate("/home", { state: { from: location }, replace: true });
    }
  }, []);
  const scrollToSection = (elementRef) => {
    elementRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const changeLanguage = () => {
    if (language === "en") {
      setLanguage("my");
    } else {
      setLanguage("en");
    }
  };
  useEffect(() => {
    if (modalBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalBox]);
  return (
    <main
      onClick={() => modalBox && setModalBox(false)}
      className=" w-full h-full flex flex-col bg-gray-800  text-white mx-auto container"
    >
      <nav className="sticky z-50  top-0 right-0 left-0 w-full h-fit bg-black/30 sm:bg-transparent flex flex-row items-center justify-between backdrop-blur-md px-3  py-4 sm:px-3 sm:py-1">
        <h1>FREEDM</h1>
        <div className=" flex-auto hidden sm:flex items-center justify-center">
          <div className="w-fit h-fit  flex flex-row bg-black/20 shadow-lg px-3 py-1 rounded-full items-center justify-center">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="w-fit h-fit px-2 py-1"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="w-fit h-fit px-2 py-1"
            >
              Features
            </button>
            <button className="w-fit h-fit px-2 py-1">Tutorials</button>
            <button className="w-fit h-fit px-2 py-1">Support</button>
            <button
              onClick={() => navigate("/login")}
              className="w-fit h-fit px-2 py-1 flex items-center justify-center gap-x-1 text-white font-extrabold"
            >
              SingIn <IoMdLogIn size={20} />
            </button>
          </div>
        </div>

        {/* language box */}
        <div className="hidden sm:block relative w-fit h-fit  cursor-pointer">
          {/* <button onClick={changeLanguage}>
            {language == "en" ? "မြန်မာ" : "English"}
          </button> */}
          <button
            className="w-fit h-fit text-sm flex items-center justify-center "
            onClick={() => setLanguageBox(!languageBox)}
          >
            <HiMiniLanguage size={17} /> <span>Languages</span>
          </button>
          <div
            className={
              languageBox
                ? "absolute  w-fit h-fit flex flex-col gap-y-2 rounded-lg bg-black/20 py-2 px-3 mt-2"
                : "hidden"
            }
          >
            <span
              className=""
              onClick={() => {
                setLanguageBox(false);
                setLanguage("en");
              }}
            >
              English
            </span>
            <span
              className=""
              onClick={() => {
                setLanguageBox(false);
                setLanguage("my");
              }}
            >
              မြန်မာ
            </span>
          </div>
        </div>
        <div className="w-fit sm:hidden h-fit flex flex-row gap-x-7 items-center justify-center">
          <div className="w-full h-fit">
            <div onClick={() => setLanguageBox(!languageBox)} className="">
              <FaLanguage size={37} />
            </div>
            <div
              className={
                languageBox
                  ? "absolute right-0 w-fit h-fit flex flex-col gap-y-2 bg-black/20 py-2 px-5 mt-4"
                  : "hidden"
              }
            >
              <span
                className=""
                onClick={() => {
                  setLanguageBox(false);
                  setLanguage("en");
                }}
              >
                English
              </span>
              <span
                className=""
                onClick={() => {
                  setLanguageBox(false);
                  setLanguage("my");
                }}
              >
                မြန်မာ
              </span>
            </div>
          </div>

          <div onClick={modalBoxSwitch} className="block sm:hidden z-50">
            <CiMenuBurger size={25} />
          </div>
        </div>
      </nav>
      {modalBox ? (
        <div className="fixed sm:hidden md:hidden xl:hidden flex flex-col left-0 z-50 bg-slate-600 w-2/3 h-full">
          <div className="w-full h-full flex flex-col items-center pt-20 gap-y-9 ">
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between"
            >
              <span className="text-xl font-bold">About</span>
              <IoIosArrowForward size={17} />
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between"
            >
              <span className="text-xl font-bold">Features</span>
              <IoIosArrowForward size={17} />
            </button>
            <button className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
              <span className="text-xl font-bold">Tutorials</span>
              <IoIosArrowForward size={17} />
            </button>
            <button className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
              <span className="text-xl font-bold">Support</span>
              <IoIosArrowForward size={17} />
            </button>
          </div>
          <div className="w-full h-[200px]  flex flex-col px-2 gap-y-4">
            <button
              onClick={() => window.open("https://t.me/codesmm_bot", "_blank")}
              className="w-full h-fit rounded-md px-2 py-2 flex items-center justify-center gap-x-1 bg-blue-500 text-xl text-white font-extrabold"
            >
              SingUp <IoMdLogIn size={20} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full h-fit rounded-md px-2 py-2 flex items-center justify-center gap-x-1 bg-white text-xl text-black font-extrabold"
            >
              Login <IoMdLogIn size={20} />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <About language={language} aboutRef={aboutRef}></About>
      <Features language={language} featuresRef={featuresRef}></Features>
      <footer className="w-full h-14 flex flex-col sm:flex-row  items-center justify-center gap-x-4">
        <div className="w-fit h-fit flex gap-x-2 items-center justify-center">
          <span>&copy;2024</span>
          <span>FreedomCodeForMyanmar</span>
        </div>
        <div className="w-fit h-fit flex flex-row items-center justify-center gap-x-2">
          <div className="w-fit h-fit flex flex-row gap-x-1">
            <FaTelegramPlane size={20} />
          </div>
          <a href="https://t.me/beyond_the_limitations_for_mm">
            Telegram Channel
          </a>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
