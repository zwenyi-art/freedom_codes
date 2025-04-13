import React from "react";

const HowItWorks = () => {
  return (
    <section className=" z_pd bg-[#5BC8A8] container mx-auto w-full h-full flex flex-col md:items-center justify-center gap-y-4">
      <h2 className="font-bebas text-5xl max-w-2xl pt-6">
        Free Access in 3 Simple Steps
      </h2>
      <p className="font-roboto max-w-3xl text-2xl font-light text-pretty  subpixel-antialiase tracking-wide md:text-center">
        Getting connected is quick and easy with our streamlined process.
      </p>

      <div className="w-full h-full flex flex-col md:flex-row gap-y-4 md:gap-x-6 px-0 md:px-3 py-2">
        <div className="max-w-md border rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
          <div class="w-12 h-12 flex items-center justify-center bg-[#112B51] text-white text-xl font-bold font-bebas rounded-full">
            1
          </div>
          <h1 className="text-center font-bebas text-2xl">
            Create Your Free Account
          </h1>
          <p className="text-center max-w-sm font-oswald text-xl">
            Use our Telegram bot to generate a personalized, secure profile in
            seconds.
          </p>
        </div>

        <div className="max-w-md border rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
          <div class="w-12 h-12 flex items-center justify-center bg-[#112B51] text-white text-xl font-bold font-bebas rounded-full">
            2
          </div>
          <h1 className="text-center font-bebas text-2xl">
            Choose Your ISP-Optimized Server
          </h1>
          <p className="text-center max-w-sm font-oswald text-xl">
            Servers are grouped by ISP to maximize speed and reliability.
          </p>
        </div>

        <div className="max-w-md border rounded-md shadow-md bg-[#D9DFDF] h-fit flex flex-col gap-y-3 items-center justify-center p-4">
          <div class="w-12 h-12 flex items-center justify-center bg-[#112B51] text-white text-xl font-bold font-bebas rounded-full">
            3
          </div>
          <h1 className="text-center font-bebas text-2xl">
            Connect & Stay Safe
          </h1>
          <p className="text-center max-w-sm font-oswald text-xl">
            Use Singbox or Hiddify protocols to bypass restrictions. Servers
            update daily!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
