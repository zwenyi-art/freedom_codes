import React from "react";
import { FiServer } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
const PrivateServersList = ({ private_serversList }) => {
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
            {private_serversList?.map((data, index) => (
              <tr
                key={index}
                className=" border-b bg-gray-800 border-gray-700 rtl:text-right"
              >
                <th
                  scope="row"
                  className="w-[35%] h-14 font-medium uppercase  whitespace-nowrap text-white"
                >
                  {data.type}
                </th>
                <th
                  scope="row"
                  className="w-[45%] h-14 font-medium  whitespace-nowrap text-white"
                >
                  {data.server}
                </th>
                <th
                  scope="row"
                  className="w-[30%] h-14 font-medium whitespace-nowrap text-white"
                >
                  {/* <span className="bg-green-500 w-fit h-fit px-3 py-1 rounded-full">
                    1200ms
                  </span> */}
                  <div className="w-full h-full flex gap-x-3 items-center">
                    <button className="w-fit h-fit">
                      <FaRegEdit size={23}></FaRegEdit>
                    </button>
                    <button className="w-fit h-fit text-red-600">
                      <RiDeleteBin5Line size={23}></RiDeleteBin5Line>
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default PrivateServersList;
