import React from "react";
import { TbWorldBolt } from "react-icons/tb";
const PublicServersList = ({ public_serversList }) => {
  console.log(public_serversList);
  return (
    <article className="bg-gray-800 rounded-lg w-full h-full px-5 sm:px-8 py-10">
      <h1 className="font-bold text-xl pb-4 flex items-center gap-x-4">
        <TbWorldBolt size={28} /> <p>Public Servers List</p>
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
              <th scope="col" className="w-[30%]">
                Latency
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="w-full h-40 overflow-auto custom-scrollbar">
        <table className="w-full h-full overflow-hidden text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody className="">
            {public_serversList?.map((data, index) => (
              <tr
                key={index}
                className=" border-b bg-gray-800 border-gray-700 rtl:text-right"
              >
                <th
                  scope="row"
                  className="w-[35%] h-14 font-medium  whitespace-nowrap text-white"
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
                  className="w-[30%] h-14  font-medium whitespace-nowrap text-white"
                >
                  <span className="bg-green-500 w-fit h-fit px-3 py-1 rounded-full">
                    1200ms
                  </span>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default PublicServersList;
