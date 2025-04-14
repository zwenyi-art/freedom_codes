import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
const NavBar = ({ isOpen, setIsOpen, scrollToSection }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="w-full h-fit container mx-auto z-50 bg-slate-100  sticky top-0">
        <section className="z_pd    w-full h-full flex flex-row items-center justify-between">
          <div className=" w-fit h-fit gap-x-2  flex flex-row items-center justify-center">
            <h1 className="font-bebas text-[#4ADE80] font-semibold text-2xl md:text-3xl">
              NETFLOW
            </h1>
            <div className="w-fit h-fit">
              <img
                className="w-fit max-h-8 "
                src="/netflow_twitch.svg"
                alt=""
                srcSet=""
              />
            </div>

            <h1 className="font-bebas font-semibold text-[#E81224] text-2xl md:text-3xl">
              4MM
            </h1>
          </div>
          <div className="w-fit h-full gap-x-6 font-oswald hidden  md:flex flex-row items-center">
            <button onClick={() => scrollToSection("problem_statement")}>
              Features
            </button>
            <button onClick={() => scrollToSection("how_it_work")}>
              How It Works
            </button>
            <button onClick={() => scrollToSection("community")}>
              Community
            </button>
            <button onClick={() => scrollToSection("safety")}>Safety</button>
            <button
              onClick={() => navigate("/login")}
              className="w-fit  h-fit flex items-center gap-x-2 px-4 py-1 rounded-sm text-white bg-black"
            >
              <span className="flex items-center font-roboto justify-center">
                LogIn
              </span>
              <IoIosArrowForward size={17} className="mt-[1px]" />
            </button>
          </div>
          <div
            className="font-extrabold md:hidden transform transition-all delay-100 ease-in-out"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {isOpen ? <CiMenuFries size={35} /> : <CiMenuBurger size={35} />}
            {/* <CiMenuBurger size={35} /> */}
          </div>
        </section>
      </nav>
      {/* moblie navbar */}

      <div
        className={`transition-all inset-0  delay-150 ease-in w-56  min-h-screen bg-slate-100 fixed top-0 ${
          isOpen ? "left-0" : "left-[-100%]"
        } flex flex-col bottom-0  z-50 `}
      >
        <div className=" w-full h-fit gap-x-2  py-5 flex flex-row px-3">
          <h1 className="font-bebas text-[#4ADE80] font-semibold text-2xl md:text-3xl">
            NETFLOW
          </h1>
          <div className="w-fit h-fit">
            <img
              className="w-fit max-h-8 "
              src="/netflow_twitch.svg"
              alt=""
              srcSet=""
            />
          </div>

          <h1 className="font-bebas font-semibold text-[#E81224] text-2xl md:text-3xl">
            4MM
          </h1>
        </div>
        <div className=" px-3 w-full h-fit pt-6 gap-x-6 font-oswald flex flex-col  justify-center gap-y-5">
          <button
            onClick={() => scrollToSection("problem_statement")}
            className="text-xl"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how_it_work")}
            className="text-xl"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("community")}
            className="text-xl"
          >
            Community
          </button>
          <button onClick={() => scrollToSection("safety")} className="text-xl">
            Safety
          </button>
        </div>
        <div className="px-3    w-full h-fit  flex justify-end items-center flex-col gap-y-5 py-14">
          <button
            onClick={() => navigate("/login")}
            className="w-full  h-fit flex items-center justify-center gap-x-2  py-2 rounded-md font-bold  border border-black/40"
          >
            Login
          </button>
          <button
            onClick={() => window.open("https://t.me/NetFlow4MM_bot", "_blank")}
            className="w-full  h-fit flex items-center justify-center gap-x-2  py-2 rounded-md  font-bold bg-[#2134E0] text-white"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
