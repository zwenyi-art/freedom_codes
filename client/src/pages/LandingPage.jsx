import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Hero from "../components/landing/Hero";
import NavBar from "../components/landing/NavBar";
import ProblemStatement from "../components/landing/ProblemStatement";
import HowItWorks from "../components/landing/HowItWorks";
import Different from "../components/landing/Different";
import Community from "../components/landing/Community";
import Safety from "../components/landing/Safety";
import Testermonal from "../components/landing/Testermonal";
import Footer from "../components/landing/Footer";
const LandingPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalBox, setModalBox] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const listRef = useRef(null);

  useEffect(() => {
    // console.log("landing page", auth);
    if (auth?.accessToken) {
      navigate("/home", { state: { from: location }, replace: true });
    }
  }, []);
  // const scrollToSection = (elementRef) => {
  //   setIsOpen(false);
  //   elementRef?.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // };

  const scrollToSection = (index) => {
    const nodelist = listRef.current.children[index];
    nodelist.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <main
      ref={listRef}
      className="text-[#112B51] relative w-full h-full  flex flex-col items-center justify-center "
    >
      <NavBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        scrollToSection={scrollToSection}
      ></NavBar>
      {/* Hero */}
      <Hero></Hero>
      {/* Problem Statement */}
      <ProblemStatement></ProblemStatement>
      {/* How It Works */}
      <HowItWorks></HowItWorks>
      {/* What Makes This Different */}
      <Different></Different>
      {/* community */}
      <Community></Community>
      {/* safety */}
      <Safety></Safety>
      {/* testermonal */}
      <Testermonal></Testermonal>
      <Footer></Footer>
    </main>
  );
};

export default LandingPage;
