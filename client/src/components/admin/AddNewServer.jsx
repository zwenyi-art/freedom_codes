import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import VmessServers from "./VmessServers";
import SshServers from "./SshServers";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const AddNewServer = () => {
  const [serverType, setServerType] = useState();
  const [serverData, setServerData] = useState();
  const axiosPrivate = useAxiosPrivate();
  function base64Decode(str) {
    return atob(str.replace(/_/g, "/").replace(/-/g, "+")); // Handle URL-safe Base64 encoding
  }

  const handleServerType = (e) => {
    const type = e.target.value;
    setServerType(type);
  };

  const formHandle = async (e) => {
    e.preventDefault();
    const newData = { type: serverType, ...serverData };
    console.log(JSON.stringify(newData, null, 2));
    const response = await axiosPrivate.post("/", newData);
    console.log(response);
  };
  return (
    <article>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden px-8 py-10">
        <div className="w-full h-fit flex items-center ">
          <h3 className="text-xl font-bold text-gray-100 flex items-center gap-5">
            <BiPlusCircle size={30} />
            Add New Private Server
          </h3>
        </div>
        <div className="pt-3">
          <form action="post" onSubmit={formHandle} className="space-y-7">
            <div className="space-y-2">
              <label
                htmlFor="serverType"
                className="block  font-medium text-gray-300"
              >
                Server Type
              </label>
              <select
                id="serverType"
                className="w-full py-3 px-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                onChange={(e) => handleServerType(e)}
              >
                <option value="">Select server type</option>
                <option value="vmess">VMess</option>
                <option value="vless">VLESS</option>
                <option value="shadowsocks">Shadowsocks</option>
                <option value="ssh">SSH</option>
              </select>
            </div>
            <div className="space-y-2">
              {serverType === "vmess" && (
                <VmessServers setServerData={setServerData}></VmessServers>
              )}
              {serverType === "ssh" && (
                <SshServers setServerData={setServerData}></SshServers>
              )}
            </div>
            {/* addserverbutton */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center transition duration-150 ease-in-out"
            >
              <BiPlusCircle className="mr-2 h-4 w-4" /> Add Server
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default AddNewServer;
