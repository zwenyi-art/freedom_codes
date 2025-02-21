import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { useLocation } from "react-router";

const NavBar = ({ sidebar, setSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        console.log("scrolled");

        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`transition-all duration-500 ease-out ${
        isScrolled
          ? "fixed  top-1 z-30 px-1 pt-0 left-0 right-0 w-fit h-fit "
          : ""
      } pt-4   px-1  w-full h-fit`}
    >
      <article className="w-full h-fit bg-slate-900 py-3 px-3 rounded-xl  flex items-center justify-between">
        <div className="w-fit h-full gap-y-1 flex flex-col">
          <div className="w-full h-fit flex flex-row gap-x-2 items-center justify-center">
            <IoHome /> /
            <span className="text-sm uppercase">
              {location.pathname === "/"
                ? "Dashboard"
                : location.pathname.split("/")[1]}
            </span>
          </div>
          <h1 className="font-bold">
            {location.pathname === "/"
              ? "Dashboard"
              : location.pathname.split("/")[1]}
          </h1>
        </div>
        <div className="w-fit h-fit flex flex-row gap-x-5 pr-4">
          <CiMenuBurger
            onClick={() => setSidebar(!sidebar)}
            size={25}
            className="cursor-pointer"
          />
          <IoSettingsOutline size={25} />
          <IoNotificationsOutline size={25} />
        </div>
      </article>
    </nav>
  );
};

export default NavBar;
