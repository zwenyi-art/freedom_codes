import React from "react";
import { IoStatsChartSharp } from "react-icons/io5";
import { GrServers } from "react-icons/gr";
import { FaClockRotateLeft } from "react-icons/fa6";
import { AiFillAppstore } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { MdTableView } from "react-icons/md";
import { FcDataConfiguration } from "react-icons/fc";
import { TbServerCog } from "react-icons/tb";
const DashBoardCards = () => {
  return (
    <section className="w-full h-full pt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-14 grid-flow-row">
      <div className="relative bg-slate-900/40 rounded-xl px-5  w-full h-fit gap-y-3 flex flex-col">
        <div className="absolute -top-3 w-fit h-fit p-5 rounded-lg flex items-center justify-center bg-green-600">
          <GrServers size={20} />
        </div>
        <div className="w-full h-fit py-2   flex justify-end ">
          <div className="w-fit h-fit flex flex-col ">
            <h1 className="text-base font-medium">Total Servers</h1>
            <p className="w-full h-fit flex justify-end text-2xl font-medium">
              1300
            </p>
          </div>
        </div>
        <div className="w-full px-2 border-t-[0.4px] py-5 h-fit flex flex-row justify-between">
          <span>Updated</span>
          <span>2024-31-12 03:08:21 PM</span>
        </div>
      </div>
      <div className="relative bg-slate-900/40 rounded-xl px-5  w-full h-fit gap-y-3 flex flex-col">
        <div className="absolute -top-3 w-fit h-fit p-5 rounded-lg flex items-center justify-center bg-blue-500">
          <IoStatsChartSharp size={20} />
        </div>
        <div className="w-full h-fit py-2   flex justify-end ">
          <div className="w-fit h-fit flex flex-col ">
            <h1 className="text-base font-medium">Total Users</h1>
            <p className="w-full h-fit flex justify-end text-2xl font-medium">
              1300
            </p>
          </div>
        </div>
        <div className="w-full px-2 border-t-[0.4px] py-5 h-fit flex flex-row justify-between">
          <span></span>
          <span>2024-31-12 03:08:21 PM</span>
        </div>
      </div>
      <div className="relative bg-slate-900/40 rounded-xl px-5  w-full h-fit gap-y-3 flex flex-col">
        <div className="absolute -top-3 w-fit h-fit p-5 rounded-lg flex items-center justify-center bg-red-600">
          <FaClockRotateLeft size={20} />
        </div>
        <div className="w-full h-fit py-2   flex justify-end ">
          <div className="w-fit h-fit flex flex-col ">
            <h1 className="text-base font-medium">Today Requests</h1>
            <p className="w-full h-fit flex justify-end text-2xl font-medium">
              1300
            </p>
          </div>
        </div>
        <div className="w-full px-2 border-t-[0.4px] py-5 h-fit flex flex-row justify-between">
          <span className="block font-bold">
            <span className="text-green-400">+33%</span> than yesterday
          </span>
        </div>
      </div>
      <div className="relative bg-slate-900/40 rounded-xl px-5  w-full h-fit gap-y-3 flex flex-col">
        <div className="absolute -top-3 w-fit h-fit p-5 rounded-lg flex items-center justify-center bg-pink-800">
          <TbServerCog size={23} />
        </div>
        <div className="w-full h-fit py-2   flex justify-end ">
          <div className="w-fit h-fit flex flex-col ">
            <h1 className="text-base font-medium">Private Servers</h1>
            <p className="w-full h-fit flex justify-end text-2xl font-medium">
              1300
            </p>
          </div>
        </div>
        <div className="w-full px-2 border-t-[0.4px] py-5 h-fit flex flex-row justify-between">
          <span>Updated</span>
          <span>2024-31-12 03:08:21 PM</span>
        </div>
      </div>
      <div className="relative bg-slate-900/40 rounded-xl px-5  w-full h-fit gap-y-3 flex flex-col">
        <div className="absolute -top-3 w-fit h-fit p-5 rounded-lg flex items-center justify-center bg-pink-800">
          <TbServerCog size={23} />
        </div>
        <div className="w-full h-fit py-2   flex justify-end ">
          <div className="w-fit h-fit flex flex-col ">
            <h1 className="text-base font-medium">Private Servers</h1>
            <p className="w-full h-fit flex justify-end text-2xl font-medium">
              1300
            </p>
          </div>
        </div>
        <div className="w-full px-2 border-t-[0.4px] py-5 h-fit flex flex-row justify-between">
          <span>Updated</span>
          <span>2024-31-12 03:08:21 PM</span>
        </div>
      </div>
      <div className="relative bg-slate-900/40 rounded-xl px-5  w-full h-fit gap-y-3 flex flex-col">
        <div className="absolute -top-3 w-fit h-fit p-5 rounded-lg flex items-center justify-center bg-pink-800">
          <TbServerCog size={23} />
        </div>
        <div className="w-full h-fit py-2   flex justify-end ">
          <div className="w-fit h-fit flex flex-col ">
            <h1 className="text-base font-medium">Private Servers</h1>
            <p className="w-full h-fit flex justify-end text-2xl font-medium">
              1300
            </p>
          </div>
        </div>
        <div className="w-full px-2 border-t-[0.4px] py-5 h-fit flex flex-row justify-between">
          <span>Updated</span>
          <span>2024-31-12 03:08:21 PM</span>
        </div>
      </div>
    </section>
  );
};

export default DashBoardCards;
