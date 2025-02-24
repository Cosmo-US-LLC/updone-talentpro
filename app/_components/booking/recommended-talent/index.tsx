"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { apiRequest } from "@/app/lib/services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/store/store";
import { resetJobCreate } from "@/app/lib/store/features/jobCreateSlice";
import TalentCard from "./TalentCard";
import Pagination from "../../ui/pagination";
import { useError } from "@/app/lib/context/ErrorProvider";
import { useSearchParams } from "next/navigation";

const RecommendedTalent = ({
  setSelectedTalentsLocal,
  selectedTalentsLocal,
}: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCount, setSelectedCount] = useState<number>(12);
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();
  const [jobApiData, setJobApiData] = useState<any>(null);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const jobId = searchParams?.get('jobId')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCount(Number(selectedValue)); // Update selectedCount with the new value
    setCurrentPage(1); // Reset to the first page when changing the page size
  };

  const handlePageChange = (page: number) => {
    setIsOptionSelected(false);
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let body: any = {
        city_id: 1,
        service_id: jobCreateState.selectedService.id,
        page_number: currentPage,
        page_size: selectedCount || 12,
        order: "ASC",
      };
      if (jobId) {
        body.job_id = parseInt(jobId)
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
        setData(newData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedCount, dispatch]);

  useEffect(() => {
    const fetchJobDetails = async (jobId: any) => {
      try {
        const apiResponse = await apiRequest(
          "/job/details/public",
          {
            method: "POST",
            body: {
              job_id: jobId,
            },
          },
          handleError
        );
        if (apiResponse) {
          setJobApiData(apiResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const jobIdInParams = queryParams.get("jobId");
      if (jobIdInParams) {
        fetchJobDetails(jobIdInParams);
      } else {
        fetchJobDetails(jobCreateState.selectedService.id);
      }
    }
  }, []);

  const calculateTotal = (
    hourRate: string | undefined,
    totalHours: string | undefined
  ) => {
    const parsedHourRate = parseFloat(hourRate || "0");
    const parsedTotalHours = parseFloat(totalHours || "0");
    return parsedHourRate * parsedTotalHours || 0;
  };

  const skeletonCards = Array(9).fill(null);

  return (
    <div>
      <div className="grid max-lg:grid-cols-1 max-2xl:grid-cols-2 grid-cols-2 gap-4 mb-[40px]">
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
                  isSelected={selectedTalentsLocal.some(
                    (selected: any) => selected.id === talent.id
                  ) || talent?.alreadyInvited}
                  onToggleSelect={() =>
                    !talent?.alreadyInvited && setSelectedTalentsLocal((prev: any) =>
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
      {!loading && data?.pagination && (
        <Pagination
          isFilterBookingFlow={false}
          currentPage={currentPage}
          pageSize={selectedCount}
          totalCount={data.pagination.total_records}
          onPageChange={handlePageChange}
          handleChange={handleChange}
          setIsOptionSelected={setIsOptionSelected}
        />
      )}
    </div>
  );
};

export default RecommendedTalent;
