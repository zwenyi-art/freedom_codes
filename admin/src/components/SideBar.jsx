import React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { MdTableView } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FcDataConfiguration } from "react-icons/fc";
import { NavLink } from "react-router";
import useLogout from "../hooks/useLogout";
const SideBar = ({ sidebar, setSidebar }) => {
  const logout = useLogout();
  const signOut = async () => {
    await logout();
  };
  return (
    <article
      className={`transition-all   w-60 p-1 h-svh z-50 duration-300 ease-out items-center justify-center overflow-y-auto fixed ${
        sidebar ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <div className=" w-full h-full flex flex-col gap-y-2 px-3 items-center rounded-l-xl bg-slate-900">
        <div className="w-full h-fit py-6 flex items-center justify-between">
          <h1 className="font-semibold select-none">FreedomCodes</h1>
          <MdOutlineClose
            size={23}
            onClick={() => setSidebar(false)}
            className="text-red-500"
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-3 ">
          <NavLink
            to={"dashboard"}
            className={({ isActive }) =>
              `w-full rounded-xl transition-all ease-in-out h-fit flex flex-row items-center gap-x-2 px-4 py-3 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            <AiFillAppstore size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to={"/table"}
            className={({ isActive }) =>
              `w-full rounded-xl transition-all ease-in-out h-fit flex flex-row items-center gap-x-2 px-4 py-3 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            <MdTableView size={20} />
            <span>Tables</span>
          </NavLink>
          <NavLink
            to={"/servers"}
            className={({ isActive }) =>
              `w-full rounded-xl transition-all ease-in-out h-fit flex flex-row items-center gap-x-2 px-4 py-3 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            <FcDataConfiguration size={20} />
            <span>Servers</span>
          </NavLink>
        </div>

        <button
          className="hover:text-[#ee1a30] flex items-center justify-center w-full bg-blue-400 h-fit  transition-all ease-in-out delay-75"
          onClick={() => signOut()}
        >
          <RiLogoutBoxLine size={28} />
        </button>
      </div>
    </article>
  );
};

export default SideBar;
