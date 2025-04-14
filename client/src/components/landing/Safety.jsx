import React from "react";
import { BsArrowClockwise } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";

const Safety = () => {
  return (
    <section
      id="safety"
      className=" z_pd  container mx-auto w-full h-full flex flex-col md:items-center justify-center gap-y-4"
    >
      <h2 className="font-bebas text-5xl max-w-2xl pt-6">
        Your Safety Comes First
      </h2>
      <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
        We prioritize your privacy and security above all else.
      </p>

      <div className="w-full h-full flex flex-col md:flex-row gap-y-4 gap-x-6 px-3 py-2">
        <div className="w-full border rounded-md shadow-md bg-[#D9DFDF] h-full flex flex-col gap-y-3 items-center justify-center p-4">
          <MdBlock size={45} />
          <h1 className="text-center font-bebas text-2xl">
            No Data Collection
          </h1>
          <p className="text-center max-w-sm font-oswald text-xl">
            We don't store logs or personal information.
          </p>
        </div>

        <div className="w-full border rounded-md shadow-md bg-[#D9DFDF] h-full flex flex-col gap-y-3 items-center justify-center p-4">
          <BsArrowClockwise size={45} />
          <h1 className="text-center font-bebas text-2xl">Open-Source Tools</h1>
          <p className="text-center max-w-sm font-oswald text-xl">
            Built on transparent, audited protocols like Singbox and Hiddify.
          </p>
        </div>

        <div className="w-full border rounded-md shadow-md bg-[#D9DFDF] h-full flex flex-col gap-y-3 items-center justify-center p-4">
          <IoWarningOutline size={45} />
          <h1 className="text-center font-bebas text-2xl">Use Responsibly</h1>
          <p className="text-center max-w-sm font-oswald text-xl">
            Avoid accessing sensitive accounts through public servers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Safety;
