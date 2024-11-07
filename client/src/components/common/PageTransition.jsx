import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`w-full h-full`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
