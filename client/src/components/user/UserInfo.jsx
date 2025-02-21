import React, { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const UserInfo = () => {
  const location = useLocation();
  const { userInfo, setUserInfo, auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.get("/user");
        // console.log("user info", response.data);
        isMounted && setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="z-50 fixed top-3 sm:top-0 right-8 sm:right-6  w-fit h-fit flex flex-row items-center justify-between gap-x-5">
      <div className="w-fit h-fit flex items-center justify-center gap-x-2">
        <IoPersonCircleOutline size={20} />
        <span className="text-sm">{userInfo?.user_id}</span>
      </div>
      <div className="bg-opacity-60 text-yellow-500 px-5 py-1 shadow-md rounded-md w-fit h-fit flex flex-row items-center justify-center gap-x-2">
        <FaCoins className="" size={18} />
        <span className="text-sm ">{userInfo?.coins}</span>
      </div>
    </div>
  );
};

export default UserInfo;
