import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { aura, auraInit } from "@uiw/codemirror-theme-aura";
import { tags as t } from "@lezer/highlight";
import { javascript } from "@codemirror/lang-javascript";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Configure = () => {
  const [editorContent, setEditorContent] = useState("");
  const [mode, setMode] = useState("json");
  const axiosPrivate = useAxiosPrivate();

  const handleSave = async () => {
    try {
      const servers = { servers: JSON.parse(editorContent) };
      const result = await axiosPrivate.post("/", servers);
      // JSON.parse(editorContent);
      // console.log(editorContent);
      console.log(editorContent);
      alert("Content saved successfully!");
    } catch (e) {
      alert("Invalid JSON: " + e.message);
    }
  };

  const handleClose = () => {
    if (window.confirm("Are you sure you want to close?")) {
      alert("Editor closed");
      // Additional close logic here
    }
  };
  function base64Decode(str) {
    return atob(str.replace(/_/g, "/").replace(/-/g, "+")); // Handle URL-safe Base64 encoding
  }

  const shadowSockLink = (url) => {
    const urlWithoutPrefix = url.replace("ss://", "");
    const [encodedUserInfo, hostPortWithHash] = urlWithoutPrefix.split("@");
    const [hostPort, hashPart] = hostPortWithHash.split("#");
    const [host, port] = hostPort.split(":");
    const hash = decodeURIComponent(hashPart);
    const userInfo = base64Decode(encodedUserInfo);
    const [method, password] = userInfo.split(":");
    const methodList = [
      "2022-blake3-aes-128-gcm",
      "2022-blake3-aes-256-gcm",
      "2022-blake3-chacha20-poly1305",
      "none",
      "aes-128-gcm",
      "aes-192-gcm",
      "aes-256-gcm",
      "chacha20-ietf-poly1305",
      "xchacha20-ietf-poly1305",
      "aes-128-ctr",
      "aes-192-ctr",
      "aes-256-ctr",
      "aes-128-cfb",
      "aes-192-cfb",
      "aes-256-cfb",
      "rc4-md5",
      "chacha20-ietf",
      "xchacha20",
    ];
    console.log(hostPortWithHash);
    const result = {
      tag: hash,
      type: "shadowsocks",
      method: method,
      password: password,
      server: host,
      server_port: Number(port),
    };
    if (host === "127.0.0.1") {
      return false;
    }
    if (!methodList.includes(method)) {
      return false;
    }
    return result;
  };
  const decodeTrojanLink = (url) => {
    const urlWithoutPrefix = url.replace("trojan://", "");
    const [userAndhost, queryStringWithHash] = urlWithoutPrefix.split("/?");
    const [uuid, hostAndport] = userAndhost.split("@");
    const [host, port] = hostAndport.split(":");

    // Parse query string parameters
    const queryParams = new URLSearchParams(queryStringWithHash.split("#")[0]);

    // Hash part after the '#'
    const hashPart = decodeURIComponent(queryStringWithHash.split("#")[1]);
    console.log("myhash", hashPart);
    // Display the parsed information
    const result = {
      type: "trojan",
      uuid: uuid,
      server: host,
      server_port: port,
      queryParams: Object.fromEntries(queryParams.entries()),
      hash: hashPart,
    };
    return result;
  };

  const decodeVmessLink = (url) => {
    const urlWithoutPrefix = url.replace("vmess://", "");
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
      alter_id: alter_id,
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
    return vmessConfig;
  };

  const detectProtocol = (data) => {
    const protocol = data.split(":")[0];

    switch (protocol) {
      case "ss": // Shadowsocks
        console.log("Shadowsocks link detected");
        return shadowSockLink(data);

      case "trojan": // Trojan
        console.log("Trojan link detected");
        return decodeTrojanLink(data);

      case "vmess": // V2Ray
        console.log("V2Ray link detected");
        return decodeVmessLink(data);
        break;
      default:
        console.log("Unknown protocol");
        break;
    }
  };
  const handleConvert = () => {
    if (mode === "base64") {
      try {
        const decodedContent = atob(editorContent);
        // const data = decodedContent
        //   .split("\n")
        //   .map((data) => data)
        //   .filter((data) => data.startsWith("ss://"))
        //   .map((data) => shadowSockLink(data))
        //   .filter((data) => data);
        const data = decodedContent
          .split("\n")
          .map((data) => detectProtocol(data))
          .filter((data) => data);

        const jsonContent = JSON.stringify(data, null, 2);
        setEditorContent(jsonContent);
        // setMode("json");
        // console.log(jsonContent);
        // const jsonContent = JSON.stringify(JSON.parse(data), null, 2);
        // setEditorContent(data);
        // setMode("json");
        // console.log(jsonContent);
      } catch (e) {
        alert("Invalid base64 or JSON content: " + e.message);
      }
    }
    if (mode === "json") {
      try {
        const data = editorContent
          .trim()
          .split("\n")
          .map((data) => detectProtocol(data))
          .filter((data) => data);
        console.log(data);

        const jsonContent = JSON.stringify(data, null, 2);
        setEditorContent(jsonContent);
      } catch (error) {
        console.log("Invalid Content" + error.message);
      }
    }
  };
  const code = "const a = 0;";
  const extensions = [javascript()];
  return (
    <div className="container  mx-auto max-w-full p-4">
      <div className="bg-slate-900/40 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">JSON Editor</h2>
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4 flex items-center justify-between px-3">
            <div className="w-1/3">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="px-1 py-2   border rounded text-white text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full  bg-gray-700 border-gray-600 placeholder-gray-400  "
              >
                <option value="json">SingBox</option>
                <option value="base64">Base64</option>
              </select>
            </div>

            <button
              onClick={handleConvert}
              className="w-fit h-fit px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Convert to JSON
            </button>
          </div>

          <CodeMirror
            value={editorContent}
            height="400px"
            theme={aura}
            extensions={extensions}
            className="border rounded-md p-1 font-mono"
            onChange={(value, viewUpdate) => {
              setEditorContent(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Configure;
