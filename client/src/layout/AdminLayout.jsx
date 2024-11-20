import React, { useEffect, useState } from "react";
import PublicServersList from "../components/admin/PublicServersList";
import PrivateServersList from "../components/admin/PrivateServersList";
import AddNewServer from "../components/admin/AddNewServer";
import TotalInfo from "../components/admin/TotalInfo";
import UsersList from "../components/admin/UsersList";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const AdminLayout = () => {
  const [selected, setSelected] = useState("servers");
  const [usersList, setUsersList] = useState([]);
  const [public_serversList, setPublic_ServersList] = useState([]);
  const [private_serversList, setPrivate_ServersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [usersData, publicServersData, privateServerData] =
          await Promise.all([
            axiosPrivate
              .get("/user/userLists")
              .then((response) => response.data.data),
            axiosPrivate
              .get("/publicServers")
              .then((response) => response.data[0].servers),
            axiosPrivate
              .get("/privateServers")
              .then((response) => response.data),
          ]);
        isMounted && setUsersList(usersData);
        isMounted && setPublic_ServersList(publicServersData);
        isMounted && setPrivate_ServersList(privateServerData);
        // console.log("PublicServers", publicServersData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log("successfully fetched");
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section className="relative min-w-full  min-h-svh py-4 text-white px-3   sm:container mx-auto flex flex-col gap-y-5">
      <h1 className="text-2xl font-semibold">Welcome Admin !</h1>
      <TotalInfo
        usersList={usersList}
        public_serversList={public_serversList}
        private_serversList={private_serversList}
      ></TotalInfo>
      <article className="w-fit h-fit rounded-md px-1 py-1 flex flex-row bg-gray-800 items-center justify-center">
        <button
          onClick={() => setSelected("servers")}
          className={
            selected === "servers"
              ? "w-fit h-fit transition-all rounded-sm bg-slate-700 py-2 px-5"
              : "w-fit h-fit ease-in-out delay-100 rounded-sm py-2 px-5"
          }
        >
          Servers
        </button>
        <button
          onClick={() => setSelected("users")}
          className={
            selected === "users"
              ? "w-fit h-fit transition-all rounded-sm bg-slate-700 py-2 px-5"
              : "w-fit h-fit ease-in-out delay-100 rounded-sm py-2 px-5"
          }
        >
          Users
        </button>
      </article>
      {selected === "servers" && (
        <>
          <PublicServersList
            public_serversList={public_serversList}
          ></PublicServersList>
          <PrivateServersList
            private_serversList={private_serversList}
          ></PrivateServersList>
          <AddNewServer></AddNewServer>
        </>
      )}
      {selected === "users" && (
        <section>
          <UsersList userList={usersList}></UsersList>
        </section>
      )}
    </section>
  );
};

export default AdminLayout;
