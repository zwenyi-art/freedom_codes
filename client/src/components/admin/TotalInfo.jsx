import React from "react";
import { RiGroupLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { FiServer } from "react-icons/fi";
const TotalInfo = () => {
  return (
    <article className="w-full h-fit grid grid-flow-row sm:grid-cols-3 items-center justify-center gap-y-4 sm:gap-x-24">
      <div className="sm:w-full w-64  h-28 rounded-md shadow-sm border  border-gray-700 px-6 bg-opacity-55 bg-gray-800 flex flex-col justify-center gap-y-4">
        <div className="w-full h-fit flex flex-row items-center gap-x-4">
          <RiGroupLine size={18} />
          <p className=" font-bold">Total Users</p>
        </div>
        <span className="w-full h-fit text-2xl font-semibold">3</span>
      </div>
      <div className="sm:w-full w-64  h-28 rounded-md shadow-sm border border-gray-700  px-6 bg-opacity-55 bg-gray-800 flex flex-col justify-center gap-y-4">
        <div className="w-full h-fit flex flex-row items-center gap-x-4">
          <FaRegClock size={18} />
          <p className=" font-bold w-40">Total Requests</p>
        </div>
        <span className="w-full h-fit text-2xl font-semibold">6</span>
      </div>
      <div className="sm:w-full w-64  h-28 rounded-md shadow-sm border border-gray-700  px-6 bg-opacity-55 bg-gray-800 flex flex-col justify-center gap-y-4">
        <div className="w-full h-fit flex flex-row items-center gap-x-4">
          <FiServer size={18} />
          <p className=" font-bold">Total Servers</p>
        </div>
        <span className="w-full h-fit text-2xl font-semibold">2</span>
      </div>
    </article>
  );
};

export default TotalInfo;
