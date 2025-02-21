import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { NavLink } from "react-router";
const AddServer = () => {
  return (
    <NavLink
      to={"/servers/configure"}
      className="w-fit text-center bg-blue-500 rounded-md  h-fit fixed bottom-12 right-7 sm:right-24 flex px-5 py-3 text-white"
    >
      <FaRegSquarePlus size={30} />
    </NavLink>
  );
};

export default AddServer;
