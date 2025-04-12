import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { CiServer } from "react-icons/ci";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoAlert } from "react-icons/go";

import { IoMdLogIn } from "react-icons/io";
import { title } from "framer-motion/client";
import { HiMiniLanguage } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { FiShield, FiUnlock } from "react-icons/fi";
import { FaArrowsRotate } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { BsArrowClockwise } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import Hero from "../components/landing/Hero";
import { TfiLock } from "react-icons/tfi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
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
    <main className="text-[#112B51] w-full h-full  flex flex-col items-center justify-center">
      <nav className="w-full h-fit container mx-auto z-50 bg-white border-b-2 sticky top-0">
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
                srcset=""
              />
            </div>

            <h1 className="font-bebas font-semibold text-[#E81224] text-2xl md:text-3xl">
              4MM
            </h1>
          </div>
          <div className="w-fit h-full gap-x-6 font-oswald hidden  md:flex flex-row items-center">
            <a href="">Features</a>
            <a href="">How It Works</a>
            <a href="">Community</a>
            <a href="">Safety</a>
            <button className="w-fit  h-fit flex items-center gap-x-2 px-4 py-1 rounded-sm text-white bg-black">
              <span className="flex items-center font-roboto justify-center">
                Sign In
              </span>
              <IoIosArrowForward size={17} className="mt-[1px]" />
            </button>
          </div>
          <div className="font-extrabold md:hidden ">
            <CiMenuBurger size={35} />
          </div>
        </section>
      </nav>
      {/* Hero */}
      <section className="z_pd container mx-auto  bg-green-400  w-full h-full min-h-svh  flex  md:items-center justify-center">
        <div className="w-full h-full flex flex-col  gap-y-5">
          <div className="w-full h-12 md:hidden "></div>
          <h1 className="font-bebas text-5xl max-w-2xl">
            Stay Connected. Break Through the Firewall. For Free.
          </h1>
          <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide ">
            Access the open internet safely with free, community-powered VPN
            protocols designed for local ISPs. No payment. No tracking. Just
            freedom.
          </p>
          <button className="font-roboto w-fit h-fit flex items-center justify-center bg-black text-white mt-6 px-3 py-2 rounded-sm gap-x-3">
            <span>Get Started Now</span> <MdOutlineArrowRightAlt size={30} />
          </button>
        </div>
      </section>
      {/* Problem Statement */}
      <section className="z_pd container mx-auto w-full h-full min-h-svh flex flex-col md:items-center justify-center gap-y-4">
        <h2 className="font-bebas text-5xl max-w-2xl">Why This Matters</h2>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
          We're addressing critical connectivity challenges in regions with
          restricted internet access.
        </p>
        <div className="w-full h-full flex flex-col xl:flex-row items-center justify-center gap-5">
          <div className=" h-full rounded-md overflow-hidden ">
            <img
              className="w-full"
              src="https://res.cloudinary.com/detwp36e7/image/upload/v1742885371/Untitled_design_h1cbda.png"
              alt=""
              srcset=""
            />
          </div>

          <article className="w-full h-full flex flex-col gap-y-7 md:gap-y-4">
            <div className="w-full h-fit flex flex-row items-center gap-x-5">
              <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-2">
                <MdBlock size={35} />
              </div>
              <div className="w-full h-fit flex flex-col ">
                <h1 className="text-2xl font-oswald font-bold">
                  Access Restrictions
                </h1>
                <p className="text-xl font-roboto font-light divide-opacity-85 ">
                  Firewalls block access to news, social media, and
                  communication tools.
                </p>
              </div>
            </div>

            <div className="w-full h-fit flex flex-row items-center gap-x-5">
              <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-2">
                <FiShield size={35} />
              </div>
              <div className="w-full h-fit flex flex-col ">
                <h1 className="text-2xl font-oswald font-bold">
                  Expensive Alternatives
                </h1>
                <p className="text-xl font-roboto font-light divide-opacity-85 ">
                  Paid VPNs are expensive and aren't usable everywhere.
                </p>
              </div>
            </div>

            <div className="w-full h-fit flex flex-row items-center gap-x-5">
              <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-2">
                <FiUnlock size={35} />
              </div>
              <div className="w-full h-fit flex flex-col ">
                <h1 className="font-oswald font-bold text-2xl">
                  Community Solution
                </h1>
                <p className="text-xl font-roboto font-light divide-opacity-85 ">
                  We built this platform for you—to keep people connected,
                  informed, and united.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
      {/* How It Works */}
      <section className=" z_pd bg-[#5BC8A8] container mx-auto w-full h-full flex flex-col md:items-center justify-center gap-y-4">
        <h2 className="font-bebas text-5xl max-w-2xl pt-6">
          Free Access in 3 Simple Steps
        </h2>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
          Getting connected is quick and easy with our streamlined process.
        </p>

        <div className="w-full h-full flex flex-col md:flex-row gap-y-4 md:gap-x-6 px-0 md:px-3 py-2">
          <div className="max-w-md border rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <div class="w-12 h-12 flex items-center justify-center bg-[#112B51] text-white text-xl font-bold font-bebas rounded-full">
              1
            </div>
            <h1 className="text-center font-bebas text-2xl">
              Create Your Free Account
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Use our Telegram bot to generate a personalized, secure profile in
              seconds.
            </p>
          </div>

          <div className="max-w-md border rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <div class="w-12 h-12 flex items-center justify-center bg-[#112B51] text-white text-xl font-bold font-bebas rounded-full">
              2
            </div>
            <h1 className="text-center font-bebas text-2xl">
              Choose Your ISP-Optimized Server
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Servers are grouped by ISP to maximize speed and reliability.
            </p>
          </div>

          <div className="max-w-md border rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <div class="w-12 h-12 flex items-center justify-center bg-[#112B51] text-white text-xl font-bold font-bebas rounded-full">
              3
            </div>
            <h1 className="text-center font-bebas text-2xl">
              Connect & Stay Safe
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Use Singbox or Hiddify protocols to bypass restrictions. Servers
              update daily!
            </p>
          </div>
        </div>
      </section>
      {/* What Makes This Different */}
      <section className="z_pd container mx-auto w-full h-full gap-y-4 flex flex-col md:items-center justify-center">
        <h2 className="font-bebas text-5xl max-w-2xl pt-6">
          What Makes This Different
        </h2>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
          Our solution stands out with these key features designed for
          reliability and accessibility.
        </p>

        <div className="w-full h-full flex items-center justify-center">
          <div className="grid grid-flow-row items-center justify-center  md:grid-cols-2 gap-7">
            <div className=" max-w-md  rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
              <FiShield size={45} />
              <h1 className="text-center font-bebas text-2xl">Free Forever</h1>
              <p className="text-center max-w-sm font-oswald text-xl">
                Funded by the community, for the community.
              </p>
            </div>

            <div className="max-w-md  rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
              <FaArrowsRotate size={45} />
              <h1 className="text-center font-bebas text-2xl">
                Dynamic Server Pool
              </h1>
              <p className="text-center max-w-sm font-oswald text-xl">
                Access a dynamic pool of servers, updated live from our API.
              </p>
            </div>

            <div className="max-w-md  rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
              <GiNetworkBars size={45} />
              <h1 className="text-center font-bebas text-2xl">
                ISP-Specific Optimization
              </h1>
              <p className="text-center max-w-sm font-oswald text-xl">
                Tailored for various local ISPs to ensure optimal performance.
              </p>
            </div>

            <div className="max-w-md rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
              <TfiLock size={45} />
              <h1 className="text-center font-bebas text-2xl">
                Our Privacy Practices
              </h1>
              <p className="text-center max-w-sm font-oswald text-xl">
                We securely handle your data within our platform's systems.
              </p>
            </div>
          </div>
        </div>
        <p className="font-roboto italic tracking-normal font-semibold opacity-80 py-3 z-0 text-red-600">
          Note:Servers are crowdsourced from public networks. Speeds may vary,
          but we work tirelessly to improve reliability.
        </p>
      </section>
      {/* community */}
      <section className="z_pd bg-[#F3AB56] container mx-auto w-full h-full flex flex-col xl:flex-row items-center justify-center gap-y-4">
        <article className="w-full h-fit flex flex-col gap-y-5">
          <h1 className="font-bebas text-5xl max-w-2xl pt-6">
            By the Community, For the Community
          </h1>
          <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide">
            This is not a business. It's a platform built by volunteers to
            resist censorship and keep people connected.
          </p>
          <div className="w-full h-fit flex flex-col gap-y-2">
            <div className="w-full h-fit flex flex-row gap-x-2 items-center">
              <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-1">
                <IoIosArrowForward size={14} className="mt-[1px]" />
              </div>
              <p className="font-roboto">
                <span className="font-oswald">Share feedback</span> via Telegram
                to help us improve.
              </p>
            </div>
            <div className="w-full h-fit flex flex-row gap-x-2 items-center">
              <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-1">
                <IoIosArrowForward size={14} className="mt-[1px]" />
              </div>
              <p className="font-roboto">
                <span className="font-oswald">Spread the word:</span> The more
                users, the stronger our network becomes.
              </p>
            </div>
          </div>
          <button className="w-fit  h-fit flex items-center gap-x-2 px-6 py-3 rounded-md text-white bg-black">
            Join Our Community
          </button>
        </article>
        <div className=" h-full rounded-md overflow-hidden ">
          <img
            className="w-full"
            src="https://res.cloudinary.com/detwp36e7/image/upload/v1742917211/community_epi1jj.png"
            alt=""
            srcset=""
          />
        </div>
      </section>
      {/* safety */}
      <section className=" z_pd  container mx-auto w-full h-full flex flex-col md:items-center justify-center gap-y-4">
        <h2 className="font-bebas text-5xl max-w-2xl pt-6">
          Your Safety Comes First
        </h2>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
          We prioritize your privacy and security above all else.
        </p>

        <div className="w-full h-full flex flex-col md:flex-row gap-y-4 gap-x-6 px-3 py-2">
          <div className="w-full border rounded-md shadow-md bg-[#D9DFDF] h-full flex flex-col gap-y-3 items-center justify-center p-4">
            <MdBlock size={45} />
            <h1 className="text-center font-bebas text-2xl">
              No Data Collection
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              We don't store logs or personal information.
            </p>
          </div>

          <div className="w-full border rounded-md shadow-md bg-[#D9DFDF] h-full flex flex-col gap-y-3 items-center justify-center p-4">
            <BsArrowClockwise size={45} />
            <h1 className="text-center font-bebas text-2xl">
              Open-Source Tools
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Built on transparent, audited protocols like Singbox and Hiddify.
            </p>
          </div>

          <div className="w-full border rounded-md shadow-md bg-[#D9DFDF] h-full flex flex-col gap-y-3 items-center justify-center p-4">
            <IoWarningOutline size={45} />
            <h1 className="text-center font-bebas text-2xl">Use Responsibly</h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Avoid accessing sensitive accounts through public servers.
            </p>
          </div>
        </div>
      </section>
      {/* testermonal */}
      <section className=" z_pd bg-[#EC764E] container mx-auto w-full h-full flex flex-col items-center justify-center gap-y-4">
        <h2 className="font-bebas text-5xl max-w-2xl pt-6 text-center">
          Join Thousands of Users Fighting for Freedom
        </h2>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide text-center">
          Be part of a growing community dedicated to open internet access.
        </p>
        <div className="w-full h-fit flex flex-col gap-y-2 md:flex-row items-center justify-center gap-x-7">
          <button className="w-fit  h-fit flex items-center gap-x-2 px-6 py-3 md:rounded-md text-white bg-black">
            Start Now With Telegram
          </button>
          <button className="w-fit  h-fit flex items-center gap-x-2 px-6 py-3 md:rounded-md text-white md:bg-black ">
            Need Help?
            <span className="underline">Join Our Support Channel</span>
          </button>
        </div>
      </section>
      <footer className="z_pd  container mx-auto w-full h-fit flex gap-y-2 flex-col md:flex-row items-center justify-center">
        <div className="font-roboto  opacity-80   font-semibold w-full flex  flex-col">
          <p className="flex flex-row gap-x-3 w-fit h-fit items-center">
            <CiServer size={20} />
            <span>This service relies on public servers.</span>
          </p>
          <p className="flex flex-row gap-x-3 w-fit h-fit items-center">
            <IoSpeedometerOutline size={20} />
            <span>Performance may vary.</span>
          </p>
          <p className="flex flex-row gap-x-3 w-fit h-fit items-center">
            <GoAlert size={20} />
            <span>Use at your own risk.</span>
          </p>
        </div>

        <div className="w-full flex flex-row items-center">
          <p className="font-roboto font-semibold w-full md:text-center">
            Made with ❤️ by volunteers.
          </p>
          <div className="w-full h-fit flex flex-col md:items-center">
            <a href="" className="underline">
              Telegram Support
            </a>
            <a href="" className="underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
