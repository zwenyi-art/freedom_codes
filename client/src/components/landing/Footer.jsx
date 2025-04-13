import React from "react";
import { CiServer } from "react-icons/ci";
import { GoAlert } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="z_pd  container mx-auto w-full h-fit flex gap-y-2 flex-col md:flex-row items-center justify-center">
      <div className="font-roboto  opacity-80   font-semibold w-full flex  flex-col">
        <p className="flex flex-row gap-x-3 w-fit h-fit items-center">
          <CiServer size={20} />
          <span>This service relies on public servers.</span>
        </p>
        <p className="flex flex-row gap-x-3 w-fit h-fit items-center">
          <IoSpeedometerOutline size={20} />
          <span>Performance may vary.</span>
        </p>
        <p className="flex flex-row gap-x-3 w-fit h-fit items-center">
          <GoAlert size={20} />
          <span>Use at your own risk.</span>
        </p>
      </div>

      <div className="w-full flex flex-row items-center">
        <p className="font-roboto font-semibold w-full md:text-center">
          Made with ❤️ by volunteers.
        </p>
        <div className="w-full h-fit flex flex-col md:items-center">
          <a href="" className="underline">
            Telegram Support
          </a>
          <a href="" className="underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
