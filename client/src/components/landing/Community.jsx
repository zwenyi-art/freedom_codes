import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const Community = () => {
  return (
    <section
      id="community"
      className="z_pd bg-[#F3AB56] container mx-auto w-full h-full flex flex-col xl:flex-row items-center justify-center gap-y-4"
    >
      <article className="w-full h-fit flex flex-col gap-y-5">
        <h1 className="font-bebas text-5xl max-w-2xl pt-6">
          By the Community, For the Community
        </h1>
        <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide">
          This is not a business. It's a platform built by volunteers to resist
          censorship and keep people connected.
        </p>
        <div className="w-full h-fit flex flex-col gap-y-2">
          <div className="w-full h-fit flex flex-row gap-x-2 items-center">
            <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-1">
              <IoIosArrowForward size={14} className="mt-[1px]" />
            </div>
            <p className="font-roboto">
              <span className="font-oswald">Share feedback</span> via Telegram
              to help us improve.
            </p>
          </div>
          <div className="w-full h-fit flex flex-row gap-x-2 items-center">
            <div className="w-fit h-fit rounded-full bg-[#D8DEDE] p-1">
              <IoIosArrowForward size={14} className="mt-[1px]" />
            </div>
            <p className="font-roboto">
              <span className="font-oswald">Spread the word:</span> The more
              users, the stronger our network becomes.
            </p>
          </div>
        </div>
        <button className="w-fit  h-fit flex items-center gap-x-2 px-6 py-3 rounded-md text-white bg-black">
          Join Our Community
        </button>
      </article>
      <div className=" h-full rounded-md overflow-hidden ">
        <img
          className="w-full"
          src="https://res.cloudinary.com/detwp36e7/image/upload/v1742917211/community_epi1jj.png"
          alt=""
          srcSet=""
        />
      </div>
    </section>
  );
};

export default Community;
