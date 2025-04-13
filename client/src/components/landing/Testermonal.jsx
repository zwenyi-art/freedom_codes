import React from "react";

const Testermonal = () => {
  return (
    <section className=" z_pd bg-[#EC764E] container mx-auto w-full h-full flex flex-col items-center justify-center gap-y-4">
      <h2 className="font-bebas text-5xl max-w-2xl pt-6 text-center">
        Join Thousands of Users Fighting for Freedom
      </h2>
      <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide text-center">
        Be part of a growing community dedicated to open internet access.
      </p>
      <div className="w-full h-fit flex flex-col gap-y-2 md:flex-row items-center justify-center gap-x-7">
        <button className="w-fit  h-fit flex items-center gap-x-2 px-6 py-3 md:rounded-md text-white bg-black">
          Start Now With Telegram
        </button>
        <button className="w-fit  h-fit flex items-center gap-x-2 px-6 py-3 md:rounded-md text-white md:bg-black ">
          Need Help?
          <span className="underline">Join Our Support Channel</span>
        </button>
      </div>
    </section>
  );
};

export default Testermonal;
