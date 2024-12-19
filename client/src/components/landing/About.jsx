import React, { useRef } from "react";
import { FaAndroid } from "react-icons/fa6";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { VscTerminalLinux } from "react-icons/vsc";
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
const About = ({ language, aboutRef }) => {
  return (
    <section
      ref={aboutRef}
      className="w-full relative min-h-svh  flex flex-col gap-y-12  px-1  sm:px-5 items-center justify-center sm:bg-black/15 rounded-none sm:rounded-xl"
    >
      <h1 className="font-semibold font-serif uppercase text-center text-2xl">
        <span className="text-green-400">B</span>eyond{" "}
        <span className="text-blue-600">T</span>he{" "}
        <span className="text-pink-500">L</span>imitations
      </h1>
      <p className="tracking-wide text-center text-base">
        {welcome_content[language].description}
      </p>
      <div className="w-full h-fit gap-x-4 gap-y-2 flex flex-wrap flex-row items-center justify-center">
        <button
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=io.nekohasekai.sfa",
              "_blank"
            )
          }
          className="w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2"
        >
          Download For <FaAndroid />
        </button>
        <button
          onClick={() =>
            window.open(
              "https://apps.apple.com/us/app/sing-box-vt/id6673731168?platform=iphone",
              "_blank"
            )
          }
          className="w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2"
        >
          Download For <FaApple />
        </button>
        <button
          onClick={() =>
            window.open(
              "https://github.com/GUI-for-Cores/GUI.for.SingBox/releases/download/v1.8.3/GUI.for.SingBox-windows-amd64.zip",
              "_blank"
            )
          }
          className=" w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2"
        >
          Download For <FaWindows />
        </button>
        <button
          onClick={() =>
            window.open(
              "https://github.com/SagerNet/sing-box/releases",
              "_blank"
            )
          }
          className=" w-fit text-xs h-fit flex flex-row items-center justify-center gap-x-2 border  rounded-full px-7 py-4 sm:px-4 sm:py-2"
        >
          Download For <VscTerminalLinux />
        </button>
      </div>
    </section>
  );
};

export default About;
