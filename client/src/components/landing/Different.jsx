import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { FiShield } from "react-icons/fi";
import { GiNetworkBars } from "react-icons/gi";
import { TfiLock } from "react-icons/tfi";

const Different = () => {
  return (
    <section className="z_pd container mx-auto w-full h-full gap-y-4 flex flex-col md:items-center justify-center">
      <h2 className="font-bebas text-5xl max-w-2xl pt-6">
        What Makes This Different
      </h2>
      <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
        Our solution stands out with these key features designed for reliability
        and accessibility.
      </p>
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-flow-row items-center justify-center  md:grid-cols-2 gap-7">
          <div className=" max-w-md  rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <FiShield size={45} />
            <h1 className="text-center font-bebas text-2xl">Free Forever</h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Funded by the community, for the community.
            </p>
          </div>

          <div className="max-w-md  rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <FaArrowsRotate size={45} />
            <h1 className="text-center font-bebas text-2xl">
              Dynamic Server Pool
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Access a dynamic pool of servers, updated live from our API.
            </p>
          </div>

          <div className="max-w-md  rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <GiNetworkBars size={45} />
            <h1 className="text-center font-bebas text-2xl">
              ISP-Specific Optimization
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              Tailored for various local ISPs to ensure optimal performance.
            </p>
          </div>

          <div className="max-w-md rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
            <TfiLock size={45} />
            <h1 className="text-center font-bebas text-2xl">
              Our Privacy Practices
            </h1>
            <p className="text-center max-w-sm font-oswald text-xl">
              We securely handle your data within our platform's systems.
            </p>
          </div>
        </div>
      </div>
      <p className="font-roboto italic tracking-normal font-semibold opacity-80 py-3 z-0 text-red-600">
        Note:Servers are crowdsourced from public networks. Speeds may vary, but
        we work tirelessly to improve reliability.
      </p>
    </section>
  );
};

export default Different;
