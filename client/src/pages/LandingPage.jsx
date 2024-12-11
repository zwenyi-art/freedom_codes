import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const LandingPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [background, setBackground] = useState("");
  console.log("landing page", auth);

  useEffect(() => {
    console.log("landing page", auth);

    if (auth?.accessToken) {
      navigate("/home", { state: { from: location }, replace: true });
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "./public/images/close_face.webp";
    img.onload = () => setBackground(img.src);
  }, []);

  const containerStyle = {
    backgroundImage: `url(${background})`,
  };
  return (
    <main className="w-full h-svh bg-fixed  bg-cover bg-no-repeat bg-custom-mobile-bg sm:bg-custom-desktop-bg ">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-85"></div>
      <h1 className="relative text-white text-center pt-20 text-4xl">
        Welcome to My Website
      </h1>
    </main>
  );
};

export default LandingPage;
