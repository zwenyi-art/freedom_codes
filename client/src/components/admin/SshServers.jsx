import React, { useState } from "react";

const SshServers = ({ setServerData }) => {
  const [sshContent, setSshContent] = useState({
    tag: "",
    server: "",
    server_port: "",
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "server_port" ? parseInt(value) || "" : value;
    setSshContent({ ...sshContent, [name]: newValue });
    setServerData({ ...sshContent, [name]: newValue });
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2 sm:flex-row gap-x-4">
      <div className="w-full h-full flex flex-col gap-y-6 items-center">
        <div className="w-full h-fit flex items-center justify-center gap-x-3">
          <label htmlFor="tag" className="flex-none text-left w-20">
            Tag:
          </label>
          <input
            id="tag"
            type="text"
            value={sshContent.tag}
            placeholder="e.g., SG"
            className="w-full bg-gray-700 border rounded-md py-1 pl-2"
            name="tag"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-x-8">
          <label htmlFor="server" className="flex-none w-16">
            IP:
          </label>
          <input
            id="server"
            type="text"
            value={sshContent.server}
            placeholder="Enter Server IP"
            className="w-full bg-gray-700 border rounded-md py-1 pl-2"
            name="server"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-x-8">
          <label htmlFor="server_port" className="flex-none w-16">
            Port:
          </label>
          <input
            id="server_port"
            type="number"
            value={sshContent.server_port}
            placeholder="Enter Port"
            className="w-full bg-gray-700 border rounded-md py-1 pl-2"
            name="server_port"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-x-8">
          <label htmlFor="user" className="flex-none w-16">
            Username:
          </label>
          <input
            id="user"
            type="text"
            value={sshContent.user}
            placeholder="Enter Username"
            className="w-full bg-gray-700 border rounded-md py-1 pl-2"
            name="user"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-x-8">
          <label htmlFor="password" className="flex-none w-16">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={sshContent.password}
            placeholder="Enter Password"
            className="w-full bg-gray-700 border rounded-md py-1 pl-2"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* content  */}
      <div className="w-full  custom-scrollbar  h-full text-mono_blue overflow-auto">
        <pre>
          <code>{JSON.stringify(sshContent, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default SshServers;
