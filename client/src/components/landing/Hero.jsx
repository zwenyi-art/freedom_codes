import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Hero = () => {
  return (
    <section
      id="hero"
      className="z_pd container mx-auto  bg-green-400  w-full h-full min-h-svh  flex  md:items-center justify-center"
    >
      <div className="w-full h-full flex flex-col  gap-y-5">
        <div className="w-full h-12 md:hidden "></div>
        <h1 className="font-bebas text-5xl max-w-2xl">
          Stay Connected. Break Through the Firewall. For Free.
        </h1>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide ">
          Access the open internet safely with free, community-powered VPN
          protocols designed for local ISPs. No payment. No tracking. Just
          freedom.
        </p>
        <button className="font-roboto w-fit h-fit flex items-center justify-center bg-black text-white mt-6 px-3 py-2 rounded-sm gap-x-3">
          <span>Get Started Now</span> <MdOutlineArrowRightAlt size={30} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
