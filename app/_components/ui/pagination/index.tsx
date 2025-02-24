import React, { useState, useEffect } from "react";
import CommonSelect from "../../common/select-option";
import { PAGINATION_LIMIT } from "@/app/lib/constants/index";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isFilterBookingFlow?: boolean;
  setIsOptionSelected?: any;
  isOptionSelected?: any;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  handleChange,
  isFilterBookingFlow,
  setIsOptionSelected,
  isOptionSelected,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const maxVisiblePages = 4; // Number of page numbers to show before showing ellipsis
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, pageSize, totalPages]);

  const updateVisiblePages = (currentPage: number) => {
    const pages = [];
    if (totalPages <= maxVisiblePages) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }
    } else {
      if (currentPage <= Math.floor(maxVisiblePages / 2)) {
        for (let page = 1; page <= maxVisiblePages; page++) {
          pages.push(page);
        }
      } else if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
        for (
          let page = totalPages - maxVisiblePages + 1;
          page <= totalPages;
          page++
        ) {
          pages.push(page);
        }
      } else {
        const startPage = currentPage - Math.floor(maxVisiblePages / 2);
        const endPage = currentPage + Math.floor(maxVisiblePages / 2);
        for (let page = startPage; page <= endPage; page++) {
          pages.push(page);
        }
      }
    }
    setVisiblePages(pages);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(event);

    // Reset to page 1 when the page size changes
    onPageChange(1);

    // Update the boolean state based on whether a valid option is selected
    const selectedValue = event.target.value;
    if (selectedValue && selectedValue !== "0") {
      setIsOptionSelected(true); // If a valid option is selected, set to true
    } else {
      setIsOptionSelected(false); // If no valid option is selected, set to false
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (visiblePages.length > 0 && visiblePages[0] !== 1) {
      pages.push(
        <li key="ellipsis-start" className="px-2 mb-[7px]">
          <span>...</span>
        </li>
      );
    }

    visiblePages.forEach((page) => {
      const isActive = currentPage === page;
      pages.push(
        <li key={page}>
          <div
            onClick={() => onPageChange(page)}
            className={`px-4 py-1  rounded-[5px] ${
              isActive
                ? "bg-[#350ABC] hover:!bg-none text-white"
                : "bg-[#FFFFFF] text-[#2C2240] hover:bg-[#e6e0fa]"
            } `}
            style={{
              border: isActive ? "2px solid #350ABC" : "none",
              cursor: "pointer",
            }}
          >
            {page}
          </div>
        </li>
      );
    });

    if (
      visiblePages.length > 0 &&
      visiblePages[visiblePages.length - 1] !== totalPages
    ) {
      pages.push(
        <li key="ellipsis-end" className="px-2 mb-[7px]">
          <span>...</span>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className={`flex justify-between items-center pb-[200px] w-[100%] pr-6`}>
      <div className="flex cursor-pointer">
        <p className="">Records Per Page:</p>
        
        <CommonSelect
          options={PAGINATION_LIMIT}
          defaultValue={pageSize.toString()}
          valueKey="value"
          labelKey="label"
          onChange={handlePageSizeChange}
          className="w-14 h-8 border-none !bg-[#FFF] ml-8 !cursor-pointer outline-none font-[400] leading-[24px] text-[14px] tracking-[-0.28px] rounded-md focus:border-none p-1"
          isLimit
        />
      </div>
      <ul
        className="flex rounded-[6px] text-[15px] bg-white gap-3 h-12 lg:ml-44 font-[700] items-center"
        style={{ boxShadow: "0px 8px 26px 0px rgba(0, 0, 0, 0.06)" }}
      >
        <li>
          <div
            onClick={() => {
              if (currentPage !== 1) handlePrevClick();
            }}
            className={`px-4 rounded-tl-[6px] rounded-bl-[6px]  py-1 ${
              currentPage === 1
                ? "bg-[#FFFFFF] text-gray-600 cursor-not-allowed"
                : "bg-[#FFFFFF] text-[#2C2240] hover:bg-gray-300 cursor-pointer h-[48px] flex justify-center items-center"
            }`}
            style={{ border: "none" }}
          >
            <FaAngleLeft color={currentPage === 1 ? "gray" : "#2C2240"} />
          </div>
        </li>
        {renderPageNumbers()}
        <li>
          <div
            onClick={() => {
              if (currentPage !== totalPages) handleNextClick();
            }}
            className={`px-4 py-1  rounded-tr-[6px] rounded-br-[6px] ${
              currentPage === totalPages
                ? "text-gray-100 cursor-not-allowed"
                : "bg-[#FFFFFF] text-[#2C2240] hover:bg-gray-300 h-[48px] flex justify-center items-center cursor-pointer"
            }`}
            style={{ border: "none" }}
          >
            <FaAngleRight
              color={currentPage === totalPages ? "gray" : "#2C2240"}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
