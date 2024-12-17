import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { TfiYoutube } from "react-icons/tfi";
import { FaFacebookSquare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Sponsor = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="w-full h-full py-7 z-0"
    >
      <SwiperSlide className="py-3 px-3 flex flex-row items-center justify-center w-full  h-full ">
        <div className="w-full  h-full flex flex-col gap-y-5  sm:flex-row items-center justify-center">
          <div className="w-full h-full flex flex-row items-center sm:flex-col  ">
            <img
              className="w-28 h-full flex items-center justify-center"
              src="https://res.cloudinary.com/detwp36e7/image/upload/v1734452972/homebg_pwmj4o.png"
              alt=""
            />
            <div className="px-3 w-fit h-fit flex flex-col items-center justify-center">
              <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
                <div className="w-fit h-fit flex flex-row gap-x-1">
                  <FaTelegramPlane size={20} />
                </div>
                <a href="https://t.me/home9009">Telegram Channel</a>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col  gap-y-2">
            <h1>HOME VPN PRO</h1>
            <q className="">
              Highly recommended, and you can get the best customer care that
              you won't get anywhere else.
            </q>
            <div className="w-full h-full flex flex-row  sm:items-start   gap-x-3">
              <button className="w-fit h-fit px-2 py-1 border ">Contact</button>
              <button className="w-fit h-fit px-2 py-1 border ">
                Download
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className="py-3 px-3 flex flex-row items-center justify-center w-full  h-full ">
        <div className="w-full  h-full flex flex-col  sm:flex-row items-center justify-center">
          <div className="w-full h-full flex flex-row items-center sm:flex-col  ">
            <img
              className="w-28 h-full flex items-center justify-center"
              src="https://res.cloudinary.com/detwp36e7/image/upload/v1734452968/n4bg_snmqxa.png"
              alt=""
            />
            <div className="px-3 w-fit h-fit flex flex-col items-center justify-center">
              <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
                <div className="w-fit h-fit flex flex-row gap-x-1">
                  <FaTelegramPlane size={20} />
                </div>
                <a href="https://t.me/n4vpn">Telegram Channel</a>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col  gap-y-2">
            <h1>N4 VPN PRO</h1>
            <q className="">
              Highly recommended, and you can get the best customer care that
              you won't get anywhere else.
            </q>
            <div className="w-full h-full flex flex-row  sm:items-start   gap-x-3">
              <button className="w-fit h-fit px-2 py-1 border ">Contact</button>
              <button className="w-fit h-fit px-2 py-1 border ">
                Download
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Sponsor;
