import React, { useState } from "react";

function base64Decode(str) {
  return atob(str.replace(/_/g, "/").replace(/-/g, "+")); // Handle URL-safe Base64 encoding
}
const VmessServers = ({ setServerData }) => {
  const [vmessContent, setVmessContent] = useState();
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
    setServerData(vmessConfig);
  };
  return (
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
  );
};

export default VmessServers;
