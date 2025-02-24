"use client";
import Pagination from "@/app/_components/ui/pagination";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import React, { useEffect, useState } from "react";
import TalentCard from "../../recommended-talent/TalentCard";

function InviteMoreTalents({
  jobId,
  selectedTalentsLocal,
  setSelectedTalentsLocal,
  handleInviteSelected,
  setInviteMore,
}: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCount, setSelectedCount] = useState(12);
  const [jobApiData, setJobApiData] = useState<any>(null);
  const skeletonCards = Array(selectedCount || 8).fill(null);

  const { auth: storedData } = useAppSelector(selectAuth);

  const fetchData = async () => {
    setLoading(true);
    let body: any = {
      city_id: 1,
      service_id: 1,
      page_number: currentPage,
      page_size: selectedCount || 12,
      order: "ASC",
    };
    if (jobId) {
      body.job_id = parseInt(jobId);
    }

    try {
      const newData = await apiRequest("/job/recommended-workers/public", {
        method: "POST",
        body: body,
        headers: {
          ...(storedData && {
            Authorization: `Bearer ${storedData.token}`,
          }),
        },
      });
      const apiResponse = await apiRequest("/job/details/public", {
        method: "POST",
        body: {
          job_id: jobId,
        },
      });
      setJobApiData(apiResponse);
      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const apiResponse = await apiRequest(
        "/job/details/public",
        {
          method: "POST",
          body: {
            job_id: jobId,
          },
        },
      );
      if (apiResponse) {
        setJobApiData(apiResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCount]);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCount(Number(selectedValue)); // Update selectedCount with the new value
    setCurrentPage(1); // Reset to the first page when changing the page size
  };

  const handlePageChange = (page: number) => {
    // setIsOptionSelected(false);
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid max-lg:grid-cols-1 max-2xl:grid-cols-2 grid-cols-2 gap-4 mb-[0px]">
        {loading
          ? skeletonCards.map((_, index) => (
              <div
                key={index}
                className="shadow-sm border border-1 min-w-[430px] min-h-[184px] rounded-2xl py-[16px] px-[12px] bg-gray-100 animate-pulse"
              >
                <div className="flex flex-row gap-2">
                  <div>
                    <div className="w-[74px] h-[74px] bg-gray-200 rounded-full border-4 border-[#EBE6FF]"></div>
                    <div className="w-[75px] h-6 bg-gray-200 rounded mt-2"></div>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="w-3/4 h-6 bg-gray-200 rounded"></div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-4"></div>

                <div className="flex justify-between items-center mt-4">
                  <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          : data?.records?.map((talent: any, index: number) => (
              <div key={index} className="">
                <TalentCard
                  talent={talent}
                  jobApiData={jobApiData}
                  isSelected={
                    selectedTalentsLocal.some(
                      (selected: any) => selected.id === talent.id
                    ) || talent?.alreadyInvited
                  }
                  onToggleSelect={() =>
                    !talent?.alreadyInvited &&
                    setSelectedTalentsLocal((prev: any) =>
                      prev.some((item: any) => item.id === talent.id)
                        ? prev.filter((item: any) => item.id !== talent.id)
                        : [
                            ...prev,
                            { id: talent.id, profile_pic: talent?.profile_pic },
                          ]
                    )
                  }
                />
              </div>
            ))}
      </div>
      {data?.pagination && (
        <Pagination
          isFilterBookingFlow={false}
          currentPage={currentPage}
          pageSize={selectedCount}
          totalCount={data.pagination.total_records}
          onPageChange={handlePageChange}
          handleChange={handleChange}
          bottomPadding={"py-[20px]"}
          //   setIsOptionSelected={setIsOptionSelected}
        />
      )}

      <div className="flex justify-center items-center gap-6">
        <button
          onClick={() => setInviteMore(false)}
          className="bg-[#d7cefc] text-[#5d0abe] relative rounded-[4px] flex justify-center items-center gap-2 py-[14px] px-[32px] text-[14px] font-[400] leading-[24px] tracking-[-0.28px] capitalize grow_ellipse"
        >
          Cancel
        </button>
        <button
          onClick={() => handleInviteSelected()}
          className="bg-[#350ABC] disabled:opacity-70 disabled:pointer-events-none relative rounded-[4px] flex justify-center items-center gap-2 py-[14px] px-[32px] text-[#dfdbec] text-[14px] font-[400] leading-[24px] tracking-[-0.28px] capitalize grow_ellipse"
          disabled={selectedTalentsLocal?.length < 1}
        >
          Invite {selectedTalentsLocal?.length} More Talents
        </button>
      </div>
    </div>
  );
}

export default InviteMoreTalents;
