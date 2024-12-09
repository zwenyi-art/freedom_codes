import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const LandingPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("landing page", auth);

  useEffect(() => {
    console.log("landing page", auth);

    if (auth?.accessToken) {
      navigate("/home", { state: { from: location }, replace: true });
    }
  }, []);

  return (
    <main className="w-full h-svh flex items-center justify-center text-white">
      <div className="">I am landing page</div>
      <Link to="/login">
        <button className="bg-blue-500 w-fit h-fit px-2 py-1">Login</button>
      </Link>
    </main>
  );
};

export default LandingPage;
