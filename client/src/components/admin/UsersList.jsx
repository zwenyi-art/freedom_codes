import React, { useEffect, useState } from "react";
import { FaRegClock, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line, RiGroupLine } from "react-icons/ri";
import { TbWorldBolt } from "react-icons/tb";
import { RiCoinsLine } from "react-icons/ri";
const UsersList = ({ userList }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="bg-gray-800 rounded-lg w-full h-full px-5 sm:px-8 py-10">
      <h1 className="font-bold text-xl pb-4 flex items-center gap-x-4">
        <RiGroupLine size={26} /> <p>Users List</p>
      </h1>

      <div className="w-full h-40 overflow-auto custom-scrollbar pt-2">
        <table className="w-full h-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase">
            <tr>
              <th scope="col" className="w-[10%]">
                UserName
              </th>
              <th scope="col" className="w-[10%]">
                Coins
              </th>
              <th scope="col" className="w-[10%]">
                Total Request
              </th>
              <th scope="col" className="w-[10%]">
                Role
              </th>
              <th scope="col" className="w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="w-full h-full">
            {userList?.map((data, index) => (
              <tr
                key={index}
                className=" w-fit h-28 relative  border-b  border-gray-700 rtl:text-right"
              >
                <td
                  scope="row"
                  className=" font-medium  whitespace-nowrap text-white"
                >
                  {data.user_name}
                </td>
                <td
                  scope="row"
                  className="font-medium w-fit h-full flex gap-x-1 sm:gap-x-2 items-center  justify-center whitespace-nowrap text-white"
                >
                  <span>{data.coins}</span>
                  <RiCoinsLine className="text-yellow-500" size={20} />
                </td>
                <td
                  scope="row"
                  className="px-2 w-fit h-fit  font-medium whitespace-nowrap text-white"
                >
                  <span>{data.requestTime}</span>
                </td>
                <td
                  scope="row"
                  className="px-2 w-fit h-fit  font-medium whitespace-nowrap text-white"
                >
                  <span>Special</span>
                </td>
                <td scope="row" className="relative">
                  <div className="flex items-center justify-center w-fit h-full gap-x-2   font-medium whitespace-nowrap text-white">
                    <button
                      onClick={() => setOpen(!open)}
                      disabled={open}
                      className="bg-slate-500 w-fit h-fit px-2 py-1 rounded-md flex items-center justify-center"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button className="bg-red-700 w-fit h-fit px-2 text-center py-1 rounded-md">
                      <RiDeleteBin5Line size={20} />
                    </button>
                  </div>
                  {open && (
                    <div className="absolute top-0 right-0 w-full h-full bg-gray-700 rounded-t-md  flex flex-col gap-y-3 items-center justify-center">
                      <div className="w-fit h-fit bg-lime-600 text-white py-1 px-2 rounded-md">
                        Special
                      </div>
                      <div className="w-fit h-fit bg-gray-500 text-black py-1 px-2 rounded-md">
                        Normal
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default UsersList;
