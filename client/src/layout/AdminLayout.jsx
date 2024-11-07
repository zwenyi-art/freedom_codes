import React, { useState } from "react";

import PublicServersList from "../components/admin/PublicServersList";
import PrivateServersList from "../components/admin/PrivateServersList";
import AddNewServer from "../components/admin/AddNewServer";
import TotalInfo from "../components/admin/TotalInfo";
import UsersList from "../components/admin/UsersList";
import Testing from "../components/admin/Testing";
const AdminLayout = () => {
  const [selected, setSelected] = useState("servers");

  return (
    <section className="min-w-full  min-h-svh py-4 text-white px-3   sm:container mx-auto flex flex-col gap-y-5">
      <h1 className="text-2xl font-semibold">Welcome Admin !</h1>
      <TotalInfo></TotalInfo>
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
          <PublicServersList></PublicServersList>
          <PrivateServersList></PrivateServersList>
          <AddNewServer></AddNewServer>
        </>
      )}
      {selected === "users" && (
        <section>
          <UsersList></UsersList>
        </section>
      )}
    </section>
  );
};

export default AdminLayout;
