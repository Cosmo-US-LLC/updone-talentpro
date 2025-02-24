import React, { Suspense, useEffect, useState } from 'react';
const StaffFilters = loadable(() => import('./components/staff-list-filter'));
const StaffMap = loadable(() => import('./components/staff-list-map'));
import { Staff } from '@/app/lib/types';
import Image from 'next/image'
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectAuth } from '@/app/lib/store/features/authSlice';
import Loader from '../ui/loader';
import Pagination from '../ui/pagination';
import CardSkeleton from '../ui/card-skeleton';
import loadable from '../ui/lazy-load';
import { apiRequest } from '@/app/lib/services';
import MyModal from '../common/modal/Modal';
import { montserrat } from '@/app/lib/Fonts';
import { RiRecycleLine } from 'react-icons/ri';
import { useSearchParams } from 'next/navigation';
import { selectStaff } from '@/app/lib/store/features/staffSlice';
import FormNav from '../ui/booking-form-nav';
import { Navigations } from '../booking/navigation';
import { useError } from '@/app/lib/context/ErrorProvider';

const StaffListing = ({ countInvited, setCountInvited, selectedService, setSelectedStaff, selectedStaff, selectedServiceId, isFilterBookingFlow }: any) => {
  const [data, setData] = useState<any>(null);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpenError] = useState(false); //open staff filter modal state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCount, setSelectedCount] = useState<null|number>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const { jobId } = useAppSelector(selectStaff);
  const isAlreadyCreted = searchParams.get('sort'); // Get the value of the 'sort' parameter
  const { handleError } = useError();
  const [jobApiData, setJobApiData] = useState(null);
  const JobId_params = searchParams.get('jobId');
  const sort = searchParams.get('sort');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false); // State to track whether a dropdown option is selected
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValueString = event.target.value;
    const selectedValueNumber = Number(selectedValueString); // Convert string to number
    setSelectedCount(selectedValueNumber);
  };

  const handlePageChange = (page: number) => {
    setIsOptionSelected(false)
    setCurrentPage(page);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  };


  const handleStaffClick = (staff: Staff) => {
    //@ts-ignore
    const staffIndex = selectedStaff.findIndex((selected) => selected.id === staff.id);

    let updatedSelectedStaff = [...selectedStaff];

    if (staffIndex !== -1) {
      updatedSelectedStaff[staffIndex] = {
        ...updatedSelectedStaff[staffIndex],
        isOffered: !updatedSelectedStaff[staffIndex].isOffered
      };

      // Remove staff if isOffered is false
      if (!updatedSelectedStaff[staffIndex].isOffered) {
        updatedSelectedStaff.splice(staffIndex, 1);
      }
    } else {
      updatedSelectedStaff = [...selectedStaff, { ...staff, isOffered: true }];
    }
    setSelectedStaff(updatedSelectedStaff);
    const selectedStaffIds = updatedSelectedStaff.map((s) => s.id);
  };


  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data?.records) {
      // Calculate the count of invited workers
      // const invitedCount = data.records.filter((worker: any) => worker.alreadyInvited && worker.invited_by_host).length;
      // Update the state with the new count
      const invitedCount = data?.totalInvitedAlready ? data?.totalInvitedAlready : 0;
      setCountInvited(invitedCount);
    }
  }, [data?.records, countInvited]); // Depend on 'data' to recalculate count when 'data' changes
  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      setLoading(true);
      const body = {
        city_id: 1,
        service_id: selectedServiceId,
        page_number: isOptionSelected ? 1 : (currentPage !== undefined && currentPage !== null ? currentPage : 12), // Only use currentPage if it is defined, otherwise default to 12
        page_size: selectedCount || 12, // Ensure `page_size` is set, default to 10 if `selectedCount` is falsy.
        order: "ASC",
        ...(isAlreadyCreted === "Invite-Members" && { job_id: JobId_params ? Number(JobId_params) : Number(jobId) }) // Conditionally include job_id
      };
      
      


      try {
        const newData = await apiRequest('/job/recommended-workers/public', {
          method: 'POST',
          body: body,
          headers: {
            ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
          }
        }, handleError);

        setData(newData);
        setLoading(false);
      } catch (error) {
      }
    };

    fetchDataIfNeeded();
  }, [currentPage, selectedCount]);

  // Helper function to convert 24-hour time to 12-hour AM/PM format
  const convertToAmPm = (time: any) => {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 or 24 to 12 for AM/PM format
    return `${hours}:${minutes} ${ampm}`;
  };

  const formattedTimeSelection = (dateTime: any) => {
    const date = Object.keys(dateTime)[0];
    const { start_time, end_time } = dateTime[date][0];
    return {
      date: date,
      timing: {
        start_time: convertToAmPm(start_time),
        end_time: convertToAmPm(end_time)
      }
    };
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const apiResponse = await apiRequest('/job/details/public', {
          method: 'POST',
          body: {
            job_id: JobId_params
          }
        }, handleError);
        if (apiResponse) {
          const workingTimeFormatted = formattedTimeSelection(apiResponse.working_times);
          const updatedApiResponse = {
            ...apiResponse,
            working_times: workingTimeFormatted
          };
          setJobApiData(updatedApiResponse);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (JobId_params) {
      fetchJobDetails();
    }
  }, []);

  if (!data?.records) {
    return (
      <div><Loader /></div>
    )
  }

  return (
    <>
      <div className="!max-w-[1279] mx-auto relative z-[-1]">
        <Suspense fallback={<>Loading..</>}>
          <StaffFilters
            isAlreadyCreted={isAlreadyCreted}
            selectedService={selectedService}
            isFilterBookingFlow={isFilterBookingFlow}
            modalOpen={modalOpen}
            scrollY={isFilterBookingFlow ? 0 : scrollY}
            handleLocationChange={handleLocationChange}
            handleTimeChange={handleTimeChange}
            jobApiData={jobApiData}
          />
        </Suspense>

        <div className={data?.records?.length === 0 ? `` : `relative ${!isFilterBookingFlow && "md:top-20 2xl:top-22"} bottom-[60px] grid gap-x-6 2xl:gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 top-[-5px] justify-center items-center z-101`}>
          {data?.length === 0 ? (
            <div className='w-full flex justify-center items-center'>
              <div className='flex justify-center  items-start relative'>
                <div>
                  <div className='w-[100%]'>
                    <Image width={571} height={528} src={'/images/staff-listing/OBJECT.svg'} alt='invite' />
                  </div>
                  <div className='flex justify-center py-[10px]'>
                    <h4 className='text-[46px] text-center font-[600] text-[#2C2240]'>Modify Search results </h4>
                  </div>
                  <div className='flex justify-center'>
                    <button className='text-[14px] font-[400] py-[16px] flex items-center text-[#fff] px-[32px] rounded-[4px] bg-[#2C2240]'><span className='mr-[8px]'><Image width={16} height={16} src={'/images/booking/offers/plus (1).svg'} alt='tick' /></span> Modify your filters </button>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            data?.records?.map((staff: any, index: number) => (
              <div key={staff.id} className='h-[412px] w-[310px]'>
                {data?.records?.length === 0 ?
                  <CardSkeleton staff={staff} />
                  :
                  <StaffMap
                    selectedService={selectedService}
                    index={index}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                    handleStaffClick={handleStaffClick}
                    staff={staff}
                    jobApiData={jobApiData}
                  />}
              </div>
            ))
          )}
        </div>
        {/* pagination */}
        <Pagination
          isFilterBookingFlow={isFilterBookingFlow}
          currentPage={currentPage}
          pageSize={data?.pagination?.page_size}
          totalCount={data?.pagination?.total_records}
          onPageChange={handlePageChange}
          handleChange={handleChange}
          setIsOptionSelected={setIsOptionSelected}
          isOptionSelected={isOptionSelected}
        />
      </div>
    </>
  );
}

export default StaffListing;
