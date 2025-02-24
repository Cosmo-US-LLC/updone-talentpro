import React from "react";
import { motion } from "framer-motion";

const OfferCard = ({
  title = "My Offer",
  perHourRate = 25,
  totalHours = 5,
  totalIncome = 125,
}) => {
  return (
    <motion.div
      className="bg-[#F4EBFF] rounded-lg p-4 flex flex-col space-y-4 shadow-md mx-4 mt-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <h3 className="text-lg font-semibold text-[#161616]">{title}</h3>
      <div className="flex justify-between items-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-[#4C4B4B]">
            Per hour rate
          </span>
          <span className="text-xl font-semibold text-[#161616]">
            ${perHourRate}
          </span>
        </div>
        <div className="h-8 w-[1px] bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-[#4C4B4B]">
            Total hours
          </span>
          <span className="text-xl font-semibold text-[#161616]">
            {totalHours} hrs
          </span>
        </div>
        <div className="h-8 w-[1px] bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-[#4C4B4B]">
            Total income
          </span>
          <span className="text-xl font-semibold text-[#161616]">
            ${totalIncome}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;
