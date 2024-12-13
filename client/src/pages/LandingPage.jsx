import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoMdLogIn } from "react-icons/io";
import { title } from "framer-motion/client";
import { HiMiniLanguage } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
const welcome_content = {
  en: {
    title: "Welcome To Freedom Codes For Myanmar",
    description: `In the face of Myanmar’s challenges, where civil war has disrupted
          lives and internet freedom is increasingly restricted, we stand
          together to ensure access to uncensored information and
          connectivity. This platform is created for the people of Myanmar and
          those affected by internet censorship, offering tools and resources
          to help you stay connected, informed, and safe. Our mission is to
          empower you with the freedom to communicate, share, and thrive—even
          in the most difficult times. Together, we can overcome barriers and
          build a brighter future.`,
  },
  my: {
    title: "Freedom Codes For Myanmar မှကြိုဆိုပါတယ်။",
    description:
      "မြန်မာပြည်တွင် နေရာအနှံ့အပြား၌ပြည်တွင်းစစ်ကြီး ဖြစ်နေရုံမျှမက အင်တာနက် ပိတ်ဆို့ကန့်သတ်ဖြတ်တောက်မှုများစွာကြုံတွေ့နေရသည်ဖြစ်သည်။ ယခု platform သည် ထိုကဲ့သို့ ဖြတ်တောက်မှုများအားကျော်လွှားနိုင်ရန် နှင့် အသိပညာပေးချင်းလုပ်ငန်းများဆောင်ရွက်နိုင်ရန်ပြုလုပ်ထားချင်းဖြစ်သည်။",
  },
};
const LandingPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [background, setBackground] = useState("");
  const [language, setLanguage] = useState("en");
  const [languageBox, setLanguageBox] = useState(false);
  const [modalBox, setModalBox] = useState(false);
  console.log("landing page", auth);

  useEffect(() => {
    console.log("landing page", auth);

    if (auth?.accessToken) {
      navigate("/home", { state: { from: location }, replace: true });
    }
  }, []);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = "./public/images/close_face.webp";
  //   img.onload = () => setBackground(img.src);
  // }, []);

  const containerStyle = {
    backgroundImage: `url(${background})`,
  };

  const changeLanguage = () => {
    if (language === "en") {
      setLanguage("my");
    } else {
      setLanguage("en");
    }
  };
  useEffect(() => {
    console.log(modalBox);
  }, [modalBox]);
  return (
    <main
      onClick={() => modalBox && setModalBox(false)}
      className="relative w-full h-svh flex flex-col gap-y-3 text-white mx-auto container"
    >
      <nav className="w-full h-fit bg-black/30 sm:bg-transparent flex flex-row items-center justify-between px-3  py-4 sm:px-0 sm:py-1">
        <h1>FREEDM</h1>
        <div className=" flex-auto hidden sm:flex items-center justify-center">
          <div className="w-fit h-fit  flex flex-row bg-black/20 shadow-lg px-3 py-1 rounded-full items-center justify-center">
            <button className="w-fit h-fit px-2 py-1">About</button>
            <button className="w-fit h-fit px-2 py-1">Features</button>
            <button className="w-fit h-fit px-2 py-1">Tutorials</button>
            <button className="w-fit h-fit px-2 py-1">Support</button>
            <button
              onClick={() => navigate("/login")}
              className="w-fit h-fit px-2 py-1 flex items-center justify-center gap-x-1 text-white font-extrabold"
            >
              SingIn <IoMdLogIn size={20} />
            </button>
          </div>
        </div>

        <div className="hidden sm:block relative w-fit h-fit  cursor-pointer">
          {/* <button onClick={changeLanguage}>
            {language == "en" ? "မြန်မာ" : "English"}
          </button> */}
          <button
            className="w-fit h-fit text-sm flex items-center justify-center "
            onClick={() => setLanguageBox(!languageBox)}
          >
            <HiMiniLanguage size={17} /> <span>Languages</span>
          </button>
          <div
            className={
              languageBox
                ? "absolute  w-fit h-fit flex flex-col gap-y-2 rounded-lg bg-black/20 py-2 px-3 mt-2"
                : "hidden"
            }
          >
            <span
              className=""
              onClick={() => {
                setLanguageBox(false);
                setLanguage("en");
              }}
            >
              English
            </span>
            <span
              className=""
              onClick={() => {
                setLanguageBox(false);
                setLanguage("my");
              }}
            >
              မြန်မာ
            </span>
          </div>
        </div>
        <div className="w-fit sm:hidden h-fit flex flex-row gap-x-7 items-center justify-center">
          <div className="">
            <FaLanguage size={37} />
          </div>
          <div
            onClick={() => setModalBox(!modalBox)}
            className="block sm:hidden"
          >
            <CiMenuBurger size={25} />
          </div>
        </div>
      </nav>
      {modalBox ? (
        <div className="absolute sm:hidden md:hidden xl:hidden flex flex-col left-0 bg-slate-600 w-2/3 h-full">
          <div className="w-full h-full flex flex-col items-center pt-20 gap-y-9 ">
            <button className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
              <span className="text-xl font-bold">About</span>
              <IoIosArrowForward size={17} />
            </button>
            <button className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
              <span className="text-xl font-bold">Features</span>
              <IoIosArrowForward size={17} />
            </button>
            <button className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
              <span className="text-xl font-bold">Tutorials</span>
              <IoIosArrowForward size={17} />
            </button>
            <button className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
              <span className="text-xl font-bold">Support</span>
              <IoIosArrowForward size={17} />
            </button>
          </div>
          <div className="w-full h-[200px]  flex flex-col px-2 gap-y-4">
            <button
              onClick={() => window.open("https://t.me/codesmm_bot", "_blank")}
              className="w-full h-fit rounded-md px-2 py-2 flex items-center justify-center gap-x-1 bg-blue-500 text-xl text-white font-extrabold"
            >
              SingUp <IoMdLogIn size={20} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full h-fit rounded-md px-2 py-2 flex items-center justify-center gap-x-1 bg-white text-xl text-black font-extrabold"
            >
              Login <IoMdLogIn size={20} />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <section className="px-2 w-full h-fit flex flex-col items-center justify-center">
        <div className="w-full sm:w-[650px] h-fit sm:h-[350px] sm:bg-black/15 flex flex-col sm:py-4 px-1  pt-3 sm:px-5 rounded-none sm:rounded-xl">
          <h1 className="font-bold text-lg">
            {welcome_content[language].title}
          </h1>
          <p className="tracking-wide">
            {welcome_content[language].description}
          </p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
