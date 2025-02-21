import React from "react";
import { AiFillAppstore } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { MdTableView } from "react-icons/md";
import { FcDataConfiguration } from "react-icons/fc";
const SideBar = ({ sidebar, setSidebar }) => {
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
          <div className="w-full rounded-xl bg-blue-700 h-fit flex flex-row items-center gap-x-2 px-4 py-3">
            <AiFillAppstore size={20} />
            <span>Dashboard</span>
          </div>
          <div className="w-full rounded-xl  h-fit flex flex-row items-center gap-x-2 px-4 py-3">
            <MdTableView size={20} />
            <span>Tables</span>
          </div>
          <div className="w-full rounded-xl  h-fit flex flex-row items-center gap-x-2 px-4 py-3">
            <FcDataConfiguration size={20} />
            <span>Configures</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SideBar;
