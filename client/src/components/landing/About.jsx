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
      "မြန်မာနိုင်ငံတွင် ပြည်တွင်းစစ်ကြောင့် လူ့အသက်များစွာပျက်စီးနေရပြီး အင်တာနက်လွတ်လပ်ခွင့်တွေဆုံးရှုံးခြင်းနှင့်အတူ အခက်အခဲများစွာရင်ဆိုင်နေရပါသည်။ကျွန်ုပ်တို့သည် အင်တာနက်လွတ်လပ်ခွင့်တွေရရှိစေရန်အတွက် ပြည်သူများနှင့်အတူရပ်တည်လျက်ရှိပါသည်။အတားအဆီးတွေကိုဖြတ်ကျော်ပြီး တောက်ပတဲ့အနာဂတ်ကို ကျွန်ုပ်တို့ အတူတကွတည်ဆောက်ကြပါစို့။",
  },
};
const About = ({ language, aboutRef }) => {
  return (
    <section
      ref={aboutRef}
      className="w-full relative min-h-svh  flex flex-col    px-1  sm:px-5  justify-center items-center rounded-none "
    >
      <div className="w-full h-full z-30 flex flex-col absolute justify-center items-center gap-y-6 ">
        <h1 className="text-2xl max-w-xl text-center">
          We Stand Together: Uncensored Information for a United Myanmar.
        </h1>

        <div className="w-full h-fit flex flex-col items-center justify-center gap-y-6">
          <p className="tracking-wide  text-base max-w-lg">
            {welcome_content[language].description}
          </p>
          <div className="w-full h-fit flex items-center justify-center gap-x-6">
            <button
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=io.nekohasekai.sfa",
                  "_blank"
                )
              }
              className="w-fit  h-fit flex flex-row items-center justify-center gap-x-2 border   px-7 py-4 sm:px-4 sm:py-2"
            >
              Download For <FaAndroid />
            </button>
            <button
             onClick={() =>
              window.open("https://t.me/NetFlow4MM_bot", "_blank")
            }
              className="w-fit  font-extrabold h-fit flex flex-row items-center justify-center gap-x-2 border bg-green-600   px-7 py-4 sm:px-4 sm:py-2"
            >
              Join For Free ✨
            </button>
          </div>
        </div>
      </div>
      <div className="w-full animate-pulse h-full opacity-30 mix-blend-color-dodge">
        <img
          src="https://res.cloudinary.com/detwp36e7/image/upload/v1741878367/NetFlowLandingPhoto_lugaql.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default About;
