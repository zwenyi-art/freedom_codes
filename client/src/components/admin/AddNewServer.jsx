import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
const AddNewServer = () => {
  const [vmessContent, setVmessContent] = useState();
  const [sshContent, setSshContent] = useState({
    tag: "",
    ip: "",
    port: "",
    username: "",
    password: "",
  });
  const [serverType, setServerType] = useState();
  function base64Decode(str) {
    return atob(str.replace(/_/g, "/").replace(/-/g, "+")); // Handle URL-safe Base64 encoding
  }
  const handleChangevmess = (e) => {
    const vmess = e.target.value;
    const urlWithoutPrefix = vmess.replace("vmess://", "");
    const decodedStr = base64Decode(urlWithoutPrefix);
    const {
      ps: tag,
      add: server,
      port: server_port,
      id: uuid,
      aid: alter_id,
      tls: tls,
      net: transport_type,
      path: path,
      host: host,
      sni: sni,
    } = JSON.parse(decodedStr);
    const vmessConfig = {
      type: "vmess",
      tag: tag,
      server: server,
      server_port: Number(server_port),
      uuid: uuid,
      security: "auto",
      alter_id: 0,
      tls: tls
        ? {
            enabled: true,
            insecure: true,
            server_name: sni,
          }
        : "",
      transport:
        transport_type === "tcp"
          ? ""
          : {
              type: transport_type,
              path: path,
              headers: {
                host: host,
              },
            },
    };
    setVmessContent(vmessConfig);
  };

  const handleServerType = (e) => {
    const type = e.target.value;
    setServerType(type);
    setVmessContent("");
  };

  const initialState = {
    tag: "",
    ip: "",
    port: "",
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          <form className="space-y-7">
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
                <div className="w-full h-full flex flex-col">
                  <textarea
                    name=""
                    className="w-full  h-14 py-2 custom-scrollbar bg-gray-800 bg-opacity-50 border rounded-md  inset-0 pl-3 "
                    id=""
                    onChange={handleChangevmess}
                    placeholder="Enter URL Here ..."
                  ></textarea>

                  {/* content  */}
                  <div
                    className={
                      vmessContent
                        ? "w-full py-2 pt-3 custom-scrollbar  h-48 text-mono_blue overflow-auto"
                        : "hidden"
                    }
                  >
                    <pre>
                      <code>{JSON.stringify(vmessContent, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}
              {serverType === "ssh" && (
                <div className="w-full h-full flex flex-col gap-y-2 sm:flex-row gap-x-4">
                  <form className=" w-full h-full flex flex-col gap-y-6 items-center ">
                    <div className="w-full h-fit   flex items-center justify-center gap-x-3">
                      <label htmlFor="tag" className="flex-none text-left w-20">
                        Tag:
                      </label>
                      <input
                        type="text"
                        value={formData.tag}
                        placeholder="eg..SG"
                        className="w-full bg-gray-700 border rounded-md py-1 pl-2"
                        name="tag"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full h-fit   flex items-center justify-center gap-x-8">
                      <label htmlFor="ip" className="flex-none w-16">
                        IP:
                      </label>
                      <input
                        type="text"
                        value={formData.ip}
                        placeholder="Enter Server IP"
                        className="w-full bg-gray-700 border rounded-md py-1 pl-2"
                        name="ip"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full h-fit   flex items-center justify-center gap-x-8">
                      <label htmlFor="port" className="flex-none w-16">
                        Port:
                      </label>
                      <input
                        type="text"
                        value={formData.port}
                        placeholder="Enter Port"
                        className="w-full bg-gray-700 border rounded-md py-1 pl-2"
                        name="port"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full h-fit   flex items-center justify-center gap-x-8">
                      <label htmlFor="username" className="flex-none w-16">
                        UserName:
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        placeholder="Enter User Name"
                        className="w-full bg-gray-700 border rounded-md py-1 pl-2"
                        name="username"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full h-fit   flex items-center justify-center gap-x-8">
                      <label htmlFor="password" className="flex-none w-16">
                        Password:
                      </label>
                      <input
                        type="text"
                        value={formData.password}
                        placeholder="Enter Password"
                        className="w-full bg-gray-700 border rounded-md py-1 pl-2"
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                  {/* content  */}
                  <div className="w-full  custom-scrollbar  h-full text-mono_blue overflow-auto">
                    <pre>
                      <code>{JSON.stringify(sshContent, null, 2)}</code>
                    </pre>
                  </div>
                </div>
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
