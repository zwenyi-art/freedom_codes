import React, { useEffect } from "react";
import { useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // useEffect(() => {
  //   console.log(`Is Loading : ${isLoading}`);
  //   console.log(`Auth:${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <p className="w-full h-svh text-white flex items-center justify-center">
          Loading...
        </p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
