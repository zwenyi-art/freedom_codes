import React, { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("rememberMe")) || false
  );
  const [userInfo, setUserInfo] = useState({});
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
