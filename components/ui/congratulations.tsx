import React from "react";
import { motion } from "framer-motion";

const Congratulations = ({
  message = "Your action was successful! Keep up the great work.",
}) => {
  return (
    <motion.div
      className="flex items-start bg-green-50 border border-green-200 rounded-lg p-4 shadow-md space-x-3 mx-4 my-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div>
        <h3 className="text-green-800 font-semibold text-lg">
          Congratulations!
        </h3>
        <p className="text-green-700 text-sm mt-1">{message}</p>
      </div>
    </motion.div>
  );
};

export default Congratulations;
