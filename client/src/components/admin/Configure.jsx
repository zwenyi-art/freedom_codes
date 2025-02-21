import React, { useState } from "react";

const Configure = () => {

  const [sshContent, setSshContent] = useState({
    tag: "",
    server: "",
    server_port: "",
    user: "",
    password: "",
  });
  return (
    <section className=" px-1 w-full h-full min-h-full pt-5  grid grid-cols-1 sm:grid-cols-3  gap-x-5 gap-y-2 grid-flow-row">
      <article className="relative overflow-hidden border-none bg-slate-900  rounded-lg w-full sm:w-fit py-3 px-4 border-2 h-full flex flex-col ">
        <h1 className="uppercase  absolute w-full text-center h-fit  -left-28 text-xs bg-blue-500 px-1 py-2 font-bold   -rotate-45">
          Shadowsock
        </h1>
        <div className="w-full h-28 py-1 flex overflow-hidden">
          <img
            src="https://flagsapi.com/BE/shiny/64.png"
            className="w-full h-full object-cover bg-no-repeat bg-cover"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-1 justify-center">
          <p>Server : 202.124.253.53</p>
          <p>Remote Port : 443</p>
          <p className="w-full h-fit flex">
            <span>Method :</span>
            <input
              type="text"
              className="bg-transparent pl-1 "
              readOnly
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjssdfffffffffffffffffffffffffffff"}
            />
          </p>
          <p className="w-full h-fit flex">
            <span>Password :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              readOnly
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
        </div>
      </article>
      <article className="relative overflow-hidden border-none bg-slate-900  rounded-lg w-full sm:w-fit py-3 px-4 border-2 h-full flex flex-col ">
        <h1 className="absolute w-full text-center h-fit  -left-28 text-xs bg-blue-500 px-1 py-2 font-bold   -rotate-45">
          SSH
        </h1>
        <div className="w-full h-28 py-1 flex overflow-hidden">
          <img
            src="https://flagsapi.com/BE/shiny/64.png"
            className="w-full h-full object-cover bg-no-repeat bg-cover"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-1 justify-center">
          <p>Server : 202.124.253.53</p>
          <p>Remote Port : 443</p>
          <p className="w-full h-fit flex">
            <span>Method :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
          <p className="w-full h-fit flex">
            <span>Password :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
        </div>
      </article>
      <article className="relative overflow-hidden border-none bg-slate-900  rounded-lg w-full sm:w-fit py-3 px-4 border-2 h-full flex flex-col ">
        <h1 className="uppercase absolute w-full text-center h-fit  -left-28 text-xs bg-blue-500 px-1 py-2 font-bold   -rotate-45">
          VMESS
        </h1>
        <div className="w-full h-28 py-1 flex overflow-hidden">
          <img
            src="https://flagsapi.com/BE/shiny/64.png"
            className="w-full h-full object-cover bg-no-repeat bg-cover"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-1 justify-center">
          <p>Server : 202.124.253.53</p>
          <p>Remote Port : 443</p>
          <p className="w-full h-fit flex">
            <span>Method :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
          <p className="w-full h-fit flex">
            <span>Password :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
        </div>
      </article>
      <article className="relative overflow-hidden border-none bg-slate-900  rounded-lg w-full sm:w-fit py-3 px-4 border-2 h-full flex flex-col ">
        <h1 className="uppercase absolute w-full text-center h-fit  -left-28 text-xs bg-blue-500 px-1 py-2 font-bold   -rotate-45">
          Trojan
        </h1>
        <div className="w-full h-28 py-1 flex overflow-hidden">
          <img
            src="https://flagsapi.com/BE/shiny/64.png"
            className="w-full h-full object-cover bg-no-repeat bg-cover"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-1 justify-center">
          <p>Server : 202.124.253.53</p>
          <p>Remote Port : 443</p>
          <p className="w-full h-fit flex">
            <span>Method :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
          <p className="w-full h-fit flex">
            <span>Password :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
        </div>
      </article>
      <article className="relative overflow-hidden border-none bg-slate-900  rounded-lg w-full sm:w-fit py-3 px-4 border-2 h-full flex flex-col ">
        <h1 className="absolute uppercase w-full text-center h-fit  -left-28 text-xs bg-blue-500 px-1 py-2 font-bold   -rotate-45">
          Hysteria
        </h1>
        <div className="w-full h-28 py-1 flex overflow-hidden">
          <img
            src="https://flagsapi.com/BE/shiny/64.png"
            className="w-full h-full object-cover bg-no-repeat bg-cover"
            alt=""
          />
        </div>
        <div className="w-full h-full flex flex-col gap-y-1 justify-center">
          <p>Server : 202.124.253.53</p>
          <p>Remote Port : 443</p>
          <p className="w-full h-fit flex">
            <span>Method :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
          <p className="w-full h-fit flex">
            <span>Password :</span>
            <input
              type="text"
              className="bg-transparent pl-1"
              name=""
              id=""
              value={"skfsfjsfjkfjsfksjkfsjfkjs"}
            />
          </p>
        </div>
      </article>
    </section>
  );
};

export default Configure;
