import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoMdLogIn } from "react-icons/io";
import { title } from "framer-motion/client";
import { HiMiniLanguage } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { FaAndroid } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { MdOutlineCrisisAlert } from "react-icons/md";
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
    title: "Welcome To Freedom Codes For Myanmar",
    description:
      "မြန်မာပြည်တွင် လူသုံးများသော social media platform များသာမက VPN applications များအား ပိတ်ဆို့ကန့်သတ်ထားသဖြင့် သတင်းအချက်လက်ရရှိရန်နဲ့ အချင်းချင်းဆက်သွယ်ရာတွင် လူတိုင်းနီးပါး အခက်ခဲ ကြုံတွေနေရသည်။ထိုပြသနာအား အနည်းငယ်ဖြေရှင်းနိုင်လိမ့်မည်ဟူသော မျှော်လင့်ချက်ဖြင့် ယခု website အားပြုလုပ်လိုက်ရချင်းဖြစ်သည်။",
  },
};
const LandingPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [background, setBackground] = useState("");
  const [language, setLanguage] = useState("my");
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
    // Block scrolling when modal is active
    if (modalBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up style when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalBox]);
  return (
    <main
      onClick={() => modalBox && setModalBox(false)}
      className=" w-full h-full flex flex-col bg-gray-800 gap-y-3 text-white mx-auto container"
    >
      <nav className="fixed top-0 right-0 left-0 w-full h-fit bg-black/30 sm:bg-transparent flex flex-row items-center justify-between backdrop-blur-md px-3  py-4 sm:px-3 sm:py-1">
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

        {/* language box */}
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
          <div className="w-full h-fit">
            <div onClick={() => setLanguageBox(!languageBox)} className="">
              <FaLanguage size={37} />
            </div>
            <div
              className={
                languageBox
                  ? "absolute right-0 w-fit h-fit flex flex-col gap-y-2 bg-black/20 py-2 px-5 mt-4"
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

          <div
            onClick={() => setModalBox(!modalBox)}
            className="block sm:hidden"
          >
            <CiMenuBurger size={25} />
          </div>
        </div>
      </nav>
      {/* spacing */}
      <div className="w-full h-28 sm:h-11"></div>
      {modalBox ? (
        <div className="fixed sm:hidden md:hidden xl:hidden flex flex-col left-0 bg-slate-600 w-2/3 h-full">
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

      <section className="px-2 w-full h-full gap-y-5  flex flex-col items-center justify-center">
        <article className="w-full  h-fit sm:h-[350px] sm:bg-black/15 flex gap-y-5 sm:gap-y-6 flex-col sm:items-center justify-center sm:py-4 px-1  pt-3 sm:px-5 rounded-none sm:rounded-xl">
          <h1 className="font-semibold font-serif uppercase text-center text-2xl">
            <span className="text-green-400">F</span>reedom{" "}
            <span className="text-blue-600">C</span>odes{" "}
            <span className="text-pink-500">F</span>or{" "}
            <span className="text-lime-400">M</span>yanmar
          </h1>
          <p className="tracking-wide text-center text-base">
            {welcome_content[language].description}
          </p>
          <div className="w-full h-fit gap-x-4 gap-y-2 flex flex-wrap flex-row items-center justify-center">
            <button className="w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2">
              Download For <FaAndroid />
            </button>
            <button className="w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2">
              Download For <FaApple />
            </button>
            <button className=" w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2">
              Download For <FaWindows />
            </button>
          </div>
        </article>
        <article className="w-full h-full  flex gap-y-5  flex-col  items-center justify-center ">
          <div className="w-full h-fit flex items-center justify-center">
            <h1 className=" font-semibold font-serif uppercase text-center text-2xl">
              <span className="text-green-500">F</span>eatures
            </h1>
          </div>
          <p className="text-center">
            VPN များအား ဝယ်ယူအသုံးပြုရန် ငွေကြေးအရအဆင်မပြေသောလူများအတွက် အခမဲ့
            အသုံးပြုနိုင်ရန်ပြုလုပ်ထားခြင်းဖြစ်သည်။
          </p>
          <div className="w-full h-fit gap-y-2 py-1 flex flex-col items-center justify-center">
            <div className="w-full h-full  grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="w-fit h-fit bg-black/15 px-3 py-3 flex flex-col gap-y-1 border-cyan-50/35 border ">
                <h1 className="text-2xl text-white font-extrabold">01</h1>
                <h2 className="text-xl uppercase">Bypassing Censorship</h2>
                <p>
                  Firewall အား ကျော်လွှားနိုင်စေရန် မတူညီသော protocols
                  များအသုံးပြုထားခြင်း
                </p>
              </div>
              <div className="w-fit h-fit bg-black/15 px-3 py-3 flex flex-col gap-y-1 border-cyan-50/35 border ">
                <h1 className="text-2xl text-white font-extrabold">02</h1>
                <h2 className="text-xl uppercase">Seamless Server Updates</h2>
                <p>
                  အချိန်တိုင်း Servers များ အလိုအလျောက်ပြောင်းလဲကာ
                  ပေါက်တတ်ကရတွေဖြစ်၍နေခြင်း
                </p>
              </div>
              <div className="w-fit h-fit bg-black/15 px-3 py-3 flex flex-col gap-y-1 border-cyan-50/35 border ">
                <h1 className="text-2xl text-white font-extrabold">03</h1>
                <h2 className="text-xl uppercase">Internet Speed Testing</h2>
                <p>
                  လက်ရှိမိမိအသုံးပြုနေသောအင်တာနက်Speedအားစမ်းသပ်စစ်ဆေးနိုင်ခြင်း
                </p>
              </div>
              <div className="w-fit h-fit bg-black/15 px-3 py-3 flex flex-col gap-y-1 border-cyan-50/35 border ">
                <h1 className="text-2xl text-white font-extrabold">04</h1>
                <h2 className="text-xl uppercase">Update Servers Freely</h2>
                <p>
                  Server
                  Updateလုပ်ရန်အသုံးပြုရန်လိုအပ်သောCoinsများအားကူပွန်အသုံးပြူခြင်းမှရရှိနိုင်ခြင်း
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className="w-full h-full  flex gap-y-5  flex-col  items-center justify-center">
          
        </article>
      </section>
    </main>
  );
};

export default LandingPage;
