import React from "react";

const Features = ({ language, featuresRef }) => {
  return (
    <article
      ref={featuresRef}
      className="w-full  min-h-svh   flex gap-y-5  flex-col  items-center justify-center "
    >
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
  );
};

export default Features;
