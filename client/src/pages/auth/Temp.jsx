import React from "react";

const Temp = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      className=" w-full h-svh  flex items-center justify-center"
    >
      <div className="w-full  h-svh flex items-center justify-center">
        <Form className="w-fit h-fit  bg-slate-700 bg-opacity-45   px-12 py-10 gap-y-4 rounded-md   flex flex-col items-center justify-center">
          <div className=" w-fit h-fit flex flex-col items-center justify-center">
            <div className="relative text-white flex items-center justify-center">
              <div className="absolute left-0">
                <MdAccountBox size={30} />
              </div>
              <Field
                type="text"
                name="tid"
                id=""
                placeholder="Enter Your Telegram ID"
                className="pl-10 w-full py-2 bg-transparent border-b border-mono_blue focus:border-mono_blue/25 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                autoComplete="off"
              />
            </div>
            <ErrorMessage
              name="tid"
              component="div"
              className="text-red-500 text-sm mt-1"
            ></ErrorMessage>
          </div>
          <div className="text-white w-fit h-fit flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute left-0">
                <RxTokens size={30} />
              </div>
              <Field
                type="text"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                className="pl-10 w-full py-2 bg-transparent border-b border-mono_blue focus:border-mono_blue/25 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                autoComplete="off"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            ></ErrorMessage>
          </div>
          <div className="ml-2 flex items-center justify-start gap-x-2 w-full h-fit">
            <input
              type="checkbox"
              onChange={togglePersist}
              checked={persist}
              name="trustDevice"
              id=""
            />
            <label htmlFor="trustDevice" className="text-white text-sm">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-400 mt-2 w-fit h-fit px-16 py-1 text-white rounded-sm"
          >
            LOGIN
          </button>
          <span className="w-full h-fit flex items-center justify-center gap-x-2">
            <span className="text-white">Need Account?</span>
            <span className="underline text-sm text-blue-400">
              Sign up here
            </span>
          </span>
        </Form>
      </div>
    </Formik>
  );
};

const Sponsor = () => {
  return (
    <div className="w-full gap-x-3 h-fit flex flex-row items-center justify-center">
      <div className="w-fit px-4 py-2   h-fit flex flex-col items-center ">
        <img
          className="w-32 h-full"
          src="./public/images/n4bg1.png"
          alt=""
          srcset=""
        />
        <div className="px-3 w-fit h-fit flex flex-col items-center justify-center">
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <FaTelegramPlane size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <AiFillTikTok size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <TfiYoutube size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <FaFacebookSquare size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
        </div>
      </div>
      <div className="w-fit px-4 py-2 border bg-gradient-to-br rounded-md h-fit flex flex-col items-center ">
        <img
          className="w-32 h-full"
          src="./public/images/n4bg1.png"
          alt=""
          srcset=""
        />
        <div className="px-3 w-fit h-fit flex flex-col items-center justify-center">
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <FaTelegramPlane size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <AiFillTikTok size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <TfiYoutube size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-x-2">
            <div className="w-fit h-fit flex flex-row gap-x-1">
              <FaFacebookSquare size={20} />
            </div>
            <a href="https://t.me/n4vpn">https://t.me/n4vpn</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Temp;
