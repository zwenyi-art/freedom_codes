import React from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <main className="w-full h-svh flex items-center justify-center text-white">
      I am landing page
      <Link to="/login">
        <button className="bg-blue-500 w-fit h-fit px-2 py-1">Login</button>
      </Link>
    </main>
  );
};

export default LandingPage;
