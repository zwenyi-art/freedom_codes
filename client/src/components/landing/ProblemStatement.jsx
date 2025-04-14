import React from "react";
import { FiShield, FiUnlock } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

const ProblemStatement = ({ control_ref }) => {
  return (
    <section
      ref={control_ref}
      id="problem_statement"
      className="z_pd container mx-auto w-full h-full min-h-svh flex flex-col md:items-center justify-center gap-y-4"
    >
      <h2 className="font-bebas text-5xl max-w-2xl">Why This Matters</h2>
      <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
        We're addressing critical connectivity challenges in regions with
        restricted internet access.
      </p>
      <div className="w-full h-full flex flex-col xl:flex-row items-center justify-center gap-5">
        <div className=" h-full rounded-md overflow-hidden ">
          <img
            className="w-full"
            src="https://res.cloudinary.com/detwp36e7/image/upload/v1742885371/Untitled_design_h1cbda.png"
            alt=""
            srcSet=""
          />
        </div>

        <article className="w-full h-full flex flex-col gap-y-7 md:gap-y-4">
          <div className="w-full h-fit flex flex-row items-center gap-x-5">
            <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-2">
              <MdBlock size={35} />
            </div>
            <div className="w-full h-fit flex flex-col ">
              <h1 className="text-2xl font-oswald font-bold">
                Access Restrictions
              </h1>
              <p className="text-xl font-roboto font-light divide-opacity-85 ">
                Firewalls block access to news, social media, and communication
                tools.
              </p>
            </div>
          </div>

          <div className="w-full h-fit flex flex-row items-center gap-x-5">
            <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-2">
              <FiShield size={35} />
            </div>
            <div className="w-full h-fit flex flex-col ">
              <h1 className="text-2xl font-oswald font-bold">
                Expensive Alternatives
              </h1>
              <p className="text-xl font-roboto font-light divide-opacity-85 ">
                Paid VPNs are expensive and aren't usable everywhere.
              </p>
            </div>
          </div>

          <div className="w-full h-fit flex flex-row items-center gap-x-5">
            <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-2">
              <FiUnlock size={35} />
            </div>
            <div className="w-full h-fit flex flex-col ">
              <h1 className="font-oswald font-bold text-2xl">
                Community Solution
              </h1>
              <p className="text-xl font-roboto font-light divide-opacity-85 ">
                We built this platform for you—to keep people connected,
                informed, and united.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProblemStatement;
