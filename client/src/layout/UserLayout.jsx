import React, { useEffect } from "react";
import NavBar from "../components/common/NavBar";
import { Outlet } from "react-router-dom";
import UserInfo from "../components/user/UserInfo";
import PageTransition from "../components/common/PageTransition";
const UserLayout = () => {
  return (
    <section className="bg-gray-900 px-0 sm:px-3 relative overscroll-none min-w-full min-h-full h-svh  sm:container sm:mx-auto flex   sm:flex-row items-center justify-between sm:justify-between text-white">
      <UserInfo></UserInfo>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </section>
  );
};

export default UserLayout;
