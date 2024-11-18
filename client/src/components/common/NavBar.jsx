import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegCopy } from "react-icons/fa";
import { LuImport } from "react-icons/lu";
import { PiStackPlusFill } from "react-icons/pi";
import { ImHome3 } from "react-icons/im";
import { BsPersonVideo } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { IoSpeedometerSharp } from "react-icons/io5";
import { CgDarkMode } from "react-icons/cg";
import { TbServerBolt } from "react-icons/tb";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
// import { handleLogout } from "../../utils/logout";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <nav className=" fixed bottom-0 sm:relative  w-full h-fit sm:w-fit sm:h-full flex items-center justify-center">
      <div className="bg-gray-800  bg-opacity-60 sm:rounded-md px-5 py-9 sm:py-11 w-full h-fit flex gap-y-8 flex-row gap-x-10 sm:gap-x-6 sm:flex-col items-center justify-center">
        <NavLink
          to={"/home"}
          end
          className={({ isActive }) =>
            isActive
              ? "w-fit h-fit text-[#ee1a30] scale-110 ease-in-out delay-100"
              : "transition-all w-fit h-fit"
          }
        >
          <ImHome3 size={28} />
        </NavLink>
        <NavLink
          to={"/servers"}
          end
          className={({ isActive }) =>
            isActive
              ? "w-fit h-fit text-[#ee1a30] scale-110 ease-in-out delay-100"
              : "transition-all w-fit h-fit"
          }
        >
          <TbServerBolt size={28} />
        </NavLink>
        <NavLink
          to={"/add-Coins"}
          end
          className={({ isActive }) =>
            isActive
              ? "w-fit h-fit text-[#ee1a30] scale-110 ease-in-out delay-100"
              : "transition-all w-fit h-fit"
          }
        >
          <PiStackPlusFill size={28} />
        </NavLink>
        <NavLink
          to={"/speed-test"}
          end
          className={({ isActive }) =>
            isActive
              ? "w-fit h-fit text-[#ee1a30] scale-110 ease-in-out delay-100"
              : "transition-all w-fit h-fit"
          }
        >
          <IoSpeedometerSharp size={28} />
        </NavLink>
        <button
          className="hover:text-[#ee1a30] transition-all ease-in-out delay-75"
          onClick={() => signOut()}
        >
          <RiLogoutBoxLine size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
