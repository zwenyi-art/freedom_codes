import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AddServer from "../components/AddServer";
const Servers = () => {
  // const articles = [
  //   { title: "Shadowsock", type: "shadowsock" },
  //   { title: "SSH", type: "ssh" },
  //   { title: "VMESS", type: "vmess" },
  //   { title: "Trojan", type: "trojan" },
  //   { title: "Hysteria", type: "hysteria" },
  //   { title: "Hysteria", type: "hysteria" },
  // ];
  const [articles, setArticles] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const getServers = async () => {
      console.log("get server ip");
      try {
        // const [usersData, publicServersData, privateServerData] =
        //   await Promise.all([
        //     axiosPrivate
        //       .get("/user/userLists")
        //       .then((response) => response.data.data),
        //     axiosPrivate
        //       .get("/publicServers")
        //       .then((response) => response.data[0].servers),
        //     axiosPrivate
        //       .get("/privateServers")
        //       .then((response) => response.data),
        //   ]);
        const response = await axiosPrivate.get("/privateServers");
        setArticles(response.data);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getServers();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  const deleteButton = async (_id, server_type) => {
    const toDeleteServer = { serverId: _id, serverType: server_type };
    const result = await axiosPrivate.delete("/", {
      data: toDeleteServer,
    });
    console.log("Deleted server", result);
  };
  useEffect(() => {
    console.log(articles);
  }, [articles]);
  return (
    <section className="relative w-full h-full px-2 mx-auto  py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {articles.map((article, index) => (
          <article
            key={index}
            className="relative overflow-hidden bg-slate-900/40 rounded-lg w-full max-w-sm py-3 px-4 border-2 border-slate-800 flex flex-col"
          >
            <div
              className={`uppercase absolute w-full text-center h-fit -left-28 text-xs bg-blue-500 px-1 py-2 font-bold -rotate-45 ${
                article.type === "ssh" ? "normal-case" : ""
              }`}
            >
              {article.type}
            </div>
            <button
              onClick={() => deleteButton(article._id, article.type)}
              className="absolute top-3 right-2 w-fit h-fit rounded-md bg-indigo-900 opacity-70 hover:opacity-95 transition-all ease-in-out text-red-500 font-semibold border border-blue-500 px-1.5 py-1"
            >
              <MdDeleteForever size={25} />
            </button>
            <div className="w-full h-28 py-1 flex overflow-hidden">
              <img
                src="https://flagsapi.com/BE/shiny/64.png"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                alt="Belgium flag"
              />
            </div>
            <div className="w-full flex-1 flex flex-col gap-y-1 justify-center">
              <p>Tag : {article.tag}</p>
              <p>Server : {article.server}</p>
              <p>Remote Port : {article.server_port}</p>
              <p className="w-full h-fit flex">
                <span>Method :</span>
                <input
                  type="text"
                  className="bg-transparent pl-1 flex-1 truncate"
                  readOnly
                  value="skfsfjsfjkfjsfksjkfsjfkjssdfffffffffffffffffffffffffffff"
                />
              </p>
              <p className="w-full h-fit flex">
                <span>Password :</span>
                <input
                  type="text"
                  className="bg-transparent pl-1 flex-1 truncate"
                  readOnly
                  value="skfsfjsfjkfjsfksjkfsjfkjs"
                />
              </p>
            </div>
          </article>
        ))}
      </div>
      <AddServer></AddServer>
    </section>
  );
};

export default Servers;
