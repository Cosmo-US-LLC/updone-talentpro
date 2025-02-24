"use client";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { resetJobCreate } from "@/app/lib/store/features/jobCreateSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../lib/store/store";
import Loader from "../../../ui/loader";
import TalentCard from "./TalentCard";
import PaginationMobile from "../pagination";

const RecommendedTalentMobile = ({
  setSelectedTalents,
  selectedTalents,
}: any) => {
  const [data, setData] = useState<any>(null);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRecords, setDisplayedRecords] = useState<any[]>([]);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const pageSize = 12;
  const { handleError } = useError();
  const [jobApiData, setJobApiData] = useState<any>(null);
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      const startIndex = displayedRecords.length;
      const endIndex = startIndex + pageSize;
      const nextBatch = allRecords.slice(startIndex, endIndex);

      setDisplayedRecords((prev) => [...prev, ...nextBatch]);
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  const fetchInitialData = async (jobId: any, serviceId: any) => {
    setLoading(true);

    const body = {
      city_id: 1,
      service_id:
        serviceId !== null ? serviceId : jobCreateState.selectedService.id,
      page_number: 1,
      page_size: 1000,
      order: "ASC",
      ...(jobId !== null && { job_id: Number(jobId) }),
    };

    try {
      const newData = await apiRequest(
        "/job/recommended-workers/public",
        {
          method: "POST",
          body: body,
          headers: {
            ...(storedData && {
              Authorization: `Bearer ${storedData.token}`,
            }),
          },
        },
        handleError
      );

      if (newData?.records) {
        setAllRecords(newData.records);
        setData(newData);
        setDisplayedRecords(newData.records.slice(0, pageSize));
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const jobIdInParams = queryParams.get("jobId");
      if (jobIdInParams && jobApiData?.service_id) {
        fetchInitialData(jobIdInParams, jobApiData.service_id);
      } else {
        fetchInitialData(null, null);
      }
    }
  }, [jobApiData]);

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

  const handleTalentSelection = (
    id: number,
    profile_pic: string,
    wasAlreadyInvited: boolean
  ) => {
    if (wasAlreadyInvited === true) {
      return;
    }
    setSelectedTalents(
      (prevSelectedTalents: any) =>
        prevSelectedTalents.some((talent: any) => talent.id === id)
          ? prevSelectedTalents.filter((talent: any) => talent.id !== id) // Remove if already selected
          : [...prevSelectedTalents, { id, profile_pic }] // Add if not selected
    );
  };

  return (
    <div
      className="flex-grow overflow-y-auto pb-40 pt-4 px-3"
      style={{ scrollbarWidth: "none" }}
    >
      {loading
          ? Array(pageSize)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full min-h-[184px] rounded-2xl py-[16px] px-[12px] mt-4 bg-gray-100 animate-pulse"
                >
                  <div className="flex flex-row gap-2">
                    <div>
                      <div className="w-[74px] h-[74px] bg-gray-300 rounded-full border-4 border-[#EBE6FF]"></div>
                      <div className="w-[75px] h-6 bg-gray-300 rounded mt-2"></div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-4"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                    <div className="w-1/4 h-8 bg-gray-300 rounded"></div>
                  </div>
                </div>
            ))
          : <div className="grid grid-cols-1 gap-4">
          {displayedRecords.map((talent: any, index: number) => (
            <div key={talent.id || index}>
              <TalentCard
                talent={talent}
                jobApiData={jobApiData}
                isSelected={
                  talent.alreadyInvited ||
                  selectedTalents.some(
                    (selected: any) => selected.id === talent.id
                  )
                }
                onToggleSelect={() =>
                  handleTalentSelection(
                    talent.id,
                    talent.profile_pic,
                    talent.alreadyInvited
                  )
                }
              />
            </div>
          ))}
  
          <PaginationMobile
            currentCount={displayedRecords.length}
            totalCount={allRecords.length}
            onLoadMore={handleLoadMore}
            loading={loading}
          />
        </div>}
      
    </div>
  );
};

export default RecommendedTalentMobile;
