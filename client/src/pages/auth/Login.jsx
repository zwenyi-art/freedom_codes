import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { MdAccountBox } from "react-icons/md";
import { RxTokens } from "react-icons/rx";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsMailbox } from "react-icons/bs";
import { BiLock } from "react-icons/bi";

const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const [errMsg, setErrMsg] = useState();
  const initialValues = {
    tid: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { tid, password } = values;
      const response = await axios.post(
        LOGIN_URL,
        { user_id: tid, pwd: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ tid, password, accessToken, roles });

      navigate(from, { replace: true });
      resetForm({ values: { tid: "", password: "" } });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const validate = (values) => {
    const isNumber = /^\d+$/;
    let errors = {};
    if (!values.tid) {
      errors.tid = "Required ID !";
    }
    if (!values.password) {
      errors.password = "Required Password !";
    }
    if (values.tid) {
      if (!isNumber.test(values.tid)) {
        errors.tid = "ID must be number!";
      }
    }
    return errors;
  };

  const togglePersist = () => {
    setPersist((prev) => {
      let newPrev = !prev;
      localStorage.setItem("rememberMe", newPrev);
      return newPrev;
    });
  };
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  //   validate: (values) => {
  //     let errors = {};
  //     if (!values.tid) {
  //       errors.tid = "Required ID !";
  //     }
  //     if (!values.token) {
  //       errors.token = "Required Token !";
  //     }
  //     console.log(errors);
  //     return errors;
  //   },
  // });
  // console.log(formik.touched);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      className=" w-full h-svh  flex items-center justify-center"
    >
      <div className="px-2 w-full  h-svh flex items-center justify-center">
        <Form className="w-fit h-fit  bg-slate-700    px-12 py-10 gap-y-4 rounded-md   flex flex-col items-center justify-center">
          <div className=" w-fit h-fit flex flex-col items-center justify-center">
            <div className="relative text-white flex items-center justify-center">
              <div className="absolute left-0">
                <MdAccountBox size={30} />
              </div>
              <Field
                type="text"
                name="tid"
                id="tid"
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
              id="checkbox"
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
            <span
              onClick={() =>
                window.open("https://t.me/NetFlow4MM_bot", "_blank")
              }
              className=" underline text-sm text-blue-400 cursor-pointer"
            >
              Sign up here
            </span>
          </span>
        </Form>
      </div>
    </Formik>
  );
};

export default Login;
