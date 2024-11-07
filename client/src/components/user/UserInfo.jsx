import React from "react";
import { FaCoins } from "react-icons/fa6";
const UserInfo = () => {
  return (
    <div className="z-50 fixed top-3 sm:top-0 right-8 sm:right-6  w-fit h-fit flex flex-row items-center justify-between gap-x-5">
      <div className="w-fit h-fit flex items-center justify-center gap-x-2">
        <div className="w-7 h-7 rounded-full bg-gray-600  flex items-center justify-center">
          Z
        </div>
        <span>121321</span>
      </div>
      <div className="bg-opacity-60 text-yellow-500 px-5 py-1 shadow-md rounded-md w-fit h-fit flex flex-row items-center justify-center gap-x-2">
        <FaCoins className="" size={18} />
        <span className="font-medium">100</span>
      </div>
    </div>
  );
};

export default UserInfo;
