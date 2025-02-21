import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";
const AdminLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    console.log(sidebar);
  }, [sidebar]);
  return (
    <main className="bg-gray-800 relative w-full  min-h-svh mx-auto flex flex-col overflow-y-auto  h-full text-white ">
      <NavBar sidebar={sidebar} setSidebar={setSidebar}></NavBar>
      {/* sidebar */}
      <SideBar sidebar={sidebar} setSidebar={setSidebar}></SideBar>
      {/* <DashBoardCards></DashBoardCards> */}
      <Outlet></Outlet>
    </main>
  );
};

export default AdminLayout;
