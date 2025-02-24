import React from "react";
import Loader from "../../../ui/loader";

interface PaginationProps {
  currentCount: number;
  totalCount: number;
  onLoadMore: () => void;
  loading: boolean;
}

const PaginationMobile: React.FC<PaginationProps> = ({
  currentCount,
  totalCount,
  onLoadMore,
  loading,
}) => {
  const getRemainingCount = () => {
    return Math.max(0, totalCount - currentCount);
  };

  const getButtonText = () => {
    const remaining = getRemainingCount();
    if (remaining <= 12) {
      return `Load ${remaining} more`;
    }
    return "Load 12 more";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-4">
        <Loader />
      </div>
    );
  }

  if (totalCount === 0) {
    return null;
  }

  if (currentCount >= totalCount) {
    return (
      <div className="flex flex-col items-center pt-4 pb-14">
        <p className="text-[#350ABC] text-center font-medium bg-white px-6 py-4 rounded-md shadow-md text-[16px]">
          No more talents to show
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end px-8 pt-4 pb-14">
      <button
        onClick={onLoadMore}
        className="bg-white text-[#350ABC] px-6 py-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 text-[16px]"
        disabled={loading}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default PaginationMobile;
