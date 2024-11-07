import React from "react";
import { FiServer } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
const PrivateServersList = () => {
  return (
    <article className="bg-gray-800 rounded-lg w-full h-full px-8 py-10">
      <h1 className="font-bold text-xl pb-4 flex items-center gap-x-4">
        <FiServer size={28} /> <p>Private Servers List</p>
      </h1>
      <div className="w-full">
        <table className="w-full h-12  text-sm text-left rtl:text-right text-white">
          <thead className="text-xs  uppercase">
            <tr>
              <th scope="col" className="w-[35%]">
                Type
              </th>
              <th scope="col" className="w-[45%]">
                Address
              </th>
              <th scope="col" className="w-[50%]">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="w-full h-40 overflow-auto custom-scrollbar">
        <table className="w-full h-full overflow-hidden text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody className="">
            <tr className=" border-b bg-gray-800 border-gray-700 rtl:text-right">
              <th
                scope="row"
                className="w-[35%] h-14 font-medium  whitespace-nowrap text-white"
              >
                Vmess
              </th>
              <th
                scope="row"
                className="w-[45%] h-14 font-medium  whitespace-nowrap text-white"
              >
                192.168.1.21
              </th>
              <th
                scope="row"
                className="w-[30%] h-14  font-medium whitespace-nowrap flex items-center gap-x-3 text-white"
              >
                <span className="bg-slate-500 w-fit h-fit px-2 py-1 rounded-md flex items-center justify-center">
                  <FaRegEdit size={20} />
                </span>
                <button className="bg-red-700 w-fit h-fit px-2 text-center py-1 rounded-md">
                  <RiDeleteBin5Line size={20} />
                </button>
              </th>
            </tr>
            <tr className=" border-b bg-gray-800 border-gray-700 rtl:text-right">
              <th
                scope="row"
                className="w-[35%] h-14 font-medium  whitespace-nowrap text-white"
              >
                Vmess
              </th>
              <th
                scope="row"
                className="w-[45%] h-14 font-medium  whitespace-nowrap text-white"
              >
                192.168.1.21
              </th>
              <th
                scope="row"
                className="w-[30%] h-14  font-medium whitespace-nowrap flex items-center gap-x-3 text-white"
              >
                <span className="bg-slate-500 w-fit h-fit px-2 py-1 rounded-md flex items-center justify-center">
                  <FaRegEdit size={20} />
                </span>
                <span className="bg-red-700 w-fit h-fit px-2 text-center py-1 rounded-md">
                  <RiDeleteBin5Line size={20} />
                </span>
              </th>
            </tr>
            <tr className=" border-b bg-gray-800 border-gray-700 rtl:text-right">
              <th
                scope="row"
                className="w-[35%] h-14 font-medium  whitespace-nowrap text-white"
              >
                Vmess
              </th>
              <th
                scope="row"
                className="w-[45%] h-14 font-medium  whitespace-nowrap text-white"
              >
                192.168.1.21
              </th>
              <th
                scope="row"
                className="w-[30%] h-14  font-medium whitespace-nowrap flex items-center gap-x-3 text-white"
              >
                <span className="bg-slate-500 w-fit h-fit px-2 py-1 rounded-md flex items-center justify-center">
                  <FaRegEdit size={20} />
                </span>
                <span className="bg-red-700 w-fit h-fit px-2 text-center py-1 rounded-md">
                  <RiDeleteBin5Line size={20} />
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default PrivateServersList;
