"use client"
import { useForm } from 'react-hook-form';
import { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { CITY_OPTIONS, services } from '@/app/lib/constants';
import { useBookingContext } from '@/app/lib/context/BookingContext';
import TimeAndCalander from '../../booking-calander/calander-time';
import { loginInputStyles, selectStyles } from '@/app/lib/styles';
// Dynamic import for AddressAutofill to avoid SSR issues
const AddressAutofill = dynamic<any>(
  () => import('@mapbox/search-js-react').then(mod => mod.AddressAutofill as any),
  { ssr: false }
);
import '../AccordionForm.css'
import { setSelectedLocationName, setSelectedServiceName, setSelectedServiceNameFromHomeClear } from '@/app/lib/store/features/bookingSlice';
import { useDispatch } from 'react-redux';
import { LuMapPin } from 'react-icons/lu';
import { lato, montserrat } from '@/app/lib/Fonts';
import dynamic from 'next/dynamic';
import { CiLocationOn } from 'react-icons/ci';
import { color } from 'framer-motion';
const SearchBox = dynamic<any>(
  () => import('@mapbox/search-js-react').then(mod => mod.SearchBox as any),
  { ssr: false }
);
const DetailForm = ({ selectedAddress, setSelectedAddress, workingTimes, setWorkingTimes, selectedServiceId, setSelectedServiceId, secondFormData, setSecondFormData, next }: any) => {
  const isSelectedAddress = !!selectedAddress
  const [selectedServiceName] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedName = localStorage.getItem('selectedServiceName');
      return storedName || ''; // Default to empty string if not found
    } else {
      return ''; // Default value
    }
  });
  const [timeMessage, setTimeMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState('');
  const [selectedService, setSelectedService] = useState<any>()
  const [firstFormData, setFirstFormData] = useState<any>()
  const [isOpenFirst, setIsOpenFirst] = useState(true);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);
  const dispatch = useDispatch()
  const [firstSectionComplete, setFirstSectionComplete] = useState(false);
  const [secondSectionComplete, setSecondSectionComplete] = useState(false);
  const { register, trigger, handleSubmit, clearErrors, formState: { errors }, setValue, watch } = useForm({
    mode: 'onSubmit'
  });
  const { scrollRef, scrollDown, scrollUp } = useBookingContext();
  const highlightedDatesAvailable = ['2024-07-21', '2024-07-26'];


  const toggleFirstAccordion = () => {
    if (!firstFormData?.message1 && !firstFormData?.message2 && !firstFormData?.event_location) {
      setIsOpenFirst(isOpenFirst);
    } else {
      setIsOpenFirst(!isOpenFirst);
    }
    setIsOpenThird(false)
    setIsOpenSecond(false);
  };

  const toggleSecondAccordion = () => {
    if (firstFormData?.message1 && firstFormData?.message2 && firstFormData?.event_location) {
      setIsOpenSecond(!isOpenSecond);
    }
    if (!firstSectionComplete) {
      return
    }
    setIsOpenFirst(false);
    setIsOpenThird(false)
  };

  const toggleThirdAccordion = () => {
    if (firstFormData?.message1 && firstFormData?.message2 && firstFormData?.event_location) {
      setIsOpenThird(!isOpenThird);
    }

    setIsOpenFirst(false);
    setIsOpenSecond(false);
  };


  const handleContinueFirst = () => {
    handleSubmit(onFirstSubmit)(); // Trigger form submission
    if (firstSectionComplete &&
      !errors.message1?.message &&
      !errors.message2?.message && isSelectedAddress) {
      toggleSecondAccordion()
    }
  };
  const handleContinueSecond = () => {
    // Perform validation using react-hook-form methods
    handleSubmit(onSecondSubmit)(); // Trigger form submission
  };
  const onFirstSubmit = (data: any) => {
    setFirstSectionComplete(true);
    setSecondFormData(data)
    setFirstFormData(data)
    // Handle further submission logic here
  };
  // Use effect to react to the firstSectionComplete change
  useEffect(() => {
    if (firstSectionComplete) {
      toggleThirdAccordion(); // Toggle the second accordion when firstSectionComplete changes
    }
  }, [firstSectionComplete]);

  useEffect(() => {
    if (isOpenSecond) {
      toggleThirdAccordion(); // Toggle the second accordion when firstSectionComplete changes
    }
  }, [isOpenSecond]);



  const onSecondSubmit = (data: any) => {
    setSecondFormData(data)
    // Handle further submission logic here
    setSecondSectionComplete(true);
    toggleSecondAccordion(); // Close the second accordion
    toggleThirdAccordion()
  };

  const hasMounted = useRef(false); // Initialize a ref to track if component has mounted

  const handleServiceClick = (id: number, text: string) => {
    setSelectedServiceId(id);
    dispatch(setSelectedServiceName(text)); // Dispatch selected service name

    dispatch(setSelectedServiceNameFromHomeClear());
    //@ts-ignore
    localStorage.setItem("post-job-persist-service-id", text);

    setSelectedService(text);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      dispatch(setSelectedServiceName("Bartender"));
      hasMounted.current = true;
    }
  }, [dispatch]);
  const handleInputChange = (event: any) => {
    if (event && event.features && event.features.length > 0) {
      const full_address = event.features[0]?.properties?.full_address || '';
      setSelectedAddress(full_address);
      setValue('event_location', full_address);
    } else {
      setSelectedAddress('');
      setValue('event_location', null);
    }
  };
  // Watch the value of title and description
  const titleValue = watch('message1');
  const descriptionValue = watch('message2');

  useEffect(() => {
    if (focusedField === 'message2') {
      trigger('message1'); // Trigger validation for title when focusing on description
    } else if (focusedField === 'message1') {
      clearErrors('message2'); // Clear description error when focusing back on title
    }
  }, [focusedField, trigger, clearErrors]);

  // Real-time validation for maxLength and clear errors when fixed
  useEffect(() => {
    // Show error while typing if title exceeds 20 characters
    if (titleValue?.length > 40) {
      trigger('message1'); // Trigger validation if title exceeds maxLength
    } else if (titleValue?.length <= 40) {
      clearErrors('message1'); // Clear error when it meets the condition
    }

    // Show error while typing if description exceeds 30 characters
    if (descriptionValue?.length > 100) {
      trigger('message2'); // Trigger validation if description exceeds maxLength
    } else if (descriptionValue?.length <= 100) {
      clearErrors('message2'); // Clear error when it meets the condition
    }
  }, [titleValue, descriptionValue, trigger, clearErrors]);

  const suggestionsRef = useRef(null);
  return (
    <div className="w-full">
      {/* First accordion section */}
      <div style={{ boxShadow: '0px 6px 26px 0px rgba(0, 0, 0, 0.07)' }} className={`rounded-[8px] bg-[#FFF]  mb-4  ${isOpenFirst ? "pb-[24px]" : "pb-[37.5px] !py-[24px] pt-[37.5px]"} pt-[24px] px-[40px] ${isOpenFirst ? 'open' : ''}`}>
        <div
          className="flex items-center justify-between    cursor-pointer"
          onClick={toggleFirstAccordion}
        >
          <div className='flex justify-start items-center flex-col w-full'>
            <div className={`flex justify-start gap-[12px] items-center w-full ${isOpenFirst && "border-b-[1px] border-[#DDDDDD]"} `}>
              <div className='flex flex-col gap-[30px]'>
                <div className='flex flex-col gap-[12px]'>
                  <div className='flex gap-[6px]'>
                    <Image width={23} height={23} src='/images/booking/detailTask.svg' alt='user' />
                    <h2 className={` !text-[#000000] text-[20px] font-[500] leading-[24px] tracking-[-2%] ${montserrat.className} capitalize`}>tell us about your event </h2>
                  </div>
                </div>
                <div className='flex  justify-center items-center gap-4'>
                  {!isOpenFirst && <div className='bg-[#F3F0FF] rounded-[25.878px] py-[8px] px-[15px]  text-center text-[#2C2240] min-w-[160px] max-w-[200px] tracking-[-0.25px] leading-[21.416px] font-[400] text-[12.493px] capitalize'>{selectedServiceName ? selectedServiceName : selectedService ? selectedService : "Bartenders"}</div>}
                  {!isOpenFirst && <div className='text-[#2C2240] text-[14px] leading-[24px] tracking-[-0.28px] font-[400] flex justify-center items-center gap-1.5'><span><CiLocationOn size={18} /></span>{selectedAddress}</div>}
                </div>
              </div>
            </div>

          </div>
          {!isOpenFirst && (
            <div className="flex items-center justify-center flex-col gap-[16px]">
              <Image className='ml-[90px]' layout="intrinsic" src="/images/booking/done.svg" height={17} width={24} alt="tick" />
            </div>
          )}
        </div>
        {isOpenFirst && (
          <form onSubmit={handleSubmit(onFirstSubmit)}>
            <div className="relative w-full flex mt-[32px]">
              <div className='!w-full p-[24px] rounded-[8px] border-[1px] border-[#F9F9F9]' style={{ background: "linear-gradient(90deg, #F9F7FF 0%, rgba(243, 240, 255, 0) 100%)" }}>
                <div className='flex justify-start items-start gap-[6px]'>
                  <LuMapPin className='!text-[16px]' />   <label className='text-[18px] text-[#000000] font-[500] leading-[17.78px] tracking-[0.28px] pb-[16px]'>Event Location  <small className='text-[12px] text-[#9F9F9F] font-[400] leading-[17.78px] tracking-[0.28px]'>(we are currently available in Los Angeles only)</small></label>
                </div>

                <div className={`h-[30px] w-8 absolute z-[1] top-[70px] left-[28px] bg-[#fff] ${!isSelectedAddress &&
                  (errors as any)?.event_location?.message === "Location is required." ? "!bg-[#FFF5F5]" : "!bg-[#FFF]"}`}>

                </div>
                <div style={{
                  boxShadow: !isSelectedAddress &&
                    (errors as any)?.event_location?.message === "Location is required."
                    ? "rgb(255 0 0 / 18%) 0px 0px 12px 0px"
                    : ""
                }} className={`rounded-[4px] border-[1px] border-[#EFEFEF] ${!isSelectedAddress &&
                  (errors as any)?.event_location?.message === "Location is required."
                  ? "!border-[#ff00002c] !border-[1px]"
                  : ""
                  }`}
                >
                  <SearchBox
                    className="custom-search-box "
                    accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    options={{ 
                      country: 'US', 
                      bbox: [-118.9379, 33.6278, -117.5786, 34.7671],
                      // bbox: [-118.7913, 33.7037, -118.1514, 34.3373] 
                    }}
                    onRetrieve={handleInputChange}
                    value={selectedAddress}
                    placeholder={'Choose an area in Los Angeles'}
                    onClear={() => {
                      setSelectedAddress('');
                      setValue('event_location', null);
                    }}
                    theme={{
                      variables: {
                        padding: '14px 10px 14px 20px',
                        borderRadius: '4px',
                        fontFamily: 'Poppins, sans-serif',
                        unit: '14px',
                        boxShadow: '0',
                        fontWeight: '400',
                        minHeight: '60px',
                        height: '50px',
                      },
                    }}
                  />
                </div>

                <div className='flex justify-start items-center custom-input-wrapper'>

                  <input
                    {...register('event_location', {
                      required: "Location is required.",
                      minLength: {
                        value: 3,
                        message: "Location must be at least 3 characters."
                      },
                      maxLength: {
                        value: 200,
                        message: "Location must not exceed 200 characters."
                      }
                    })}
                    name="event_location"
                    id="event_location"
                    role="combobox1"
                    className={`event_location defaultsearch pl-[20px] relative pr-[20px] border-[.5px] h-[50px] text-[#000000] w-full ${(!isSelectedAddress && (errors as any)?.event_location?.message === "Location is required.")
                      ? "input-error" // Apply the error class conditionally
                      : ""
                      } border-[#EFEFEF] py-[14px] pl-[50px] pr-[10px] min-h-[52px] rounded-[4px] input mb12`}
                    type="hidden"
                    value={selectedAddress}
                    style={{
                      ...loginInputStyles, // Apply base styles
                      ...(errors as any)?.event_location?.message && {
                        boxShadow: 'rgb(255 0 0 / 18%) 0px 0px 12px 0px', // Apply error-specific styles if there's an error
                        position: "relative",
                      }
                    }}
                  />
                  {!isSelectedAddress &&
                    (errors as any)?.event_location?.message === "Location is required." && <div className='h-[47px] absolute left-[27px] bottom-[26px] rounded-[4px] bg-[#FFF5F5] w-[95.5%]'>

                    </div>}
                  {/* {!isSelectedAddress && <>{errors.event_location && <span className="text-[12px] error-message mt-[2px] absolute text-red-500 top-[112px]">{(errors as any).event_location.message}</span>}</>} */}

                </div>
              </div>
              {/* Smooth transition for the error message */}
              {/* {!isSelectedAddress && <>{errors.event_location && <span className="text-[12px] error-message mt-[2px] absolute text-red-500 top-[112px]">{(errors as any).event_location.message}</span>}</>} */}
              <span
                className={`text-[12px] absolute text-red-500 ${isSelectedAddress && errors.event_location && "!opacity-0"} transition-all duration-1000 ease-out ${errors.event_location ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                style={{
                  top: '112px', // Adjust this value based on your layout
                  left: '25px'
                }}
              >
                {errors.event_location?.message as any}
              </span>
            </div>
            <div className="accordion-content mt-[32px]">
              <div className='flex justify-center items-start !gap-[48px]'>
                <div className='space-y-[17px] pb-[28px] !w-[18%] capitalize'>
                  <h3 className='font-[500] text-center leading-[19.93px] tracking-[0.28px] !text-[16px] !text-[#000000]'>
                    Choose Service
                  </h3>
                  {services.map((service) => (
                    <p
                      key={service.id}
                      onClick={() => handleServiceClick(service.id, service.name)}
                      style={{
                        background: service.id === selectedServiceId ? "#20192e" : "#F3F0FF",
                        color: service.id === selectedServiceId ? "#FFF" : "#2C2240",
                        opacity: service.id === selectedServiceId ? 1 : .9,
                      }}
                      className={`cursor-pointer !text-[18px] w-full leading-[21.42px] tracking-[-2%] font-[400] text-center rounded-[29px] !py-[10px] !px-[32px]
           active:shadow-inner hover:bg-[#e0d9f8] hover:text-[#20192e]`}
                    >
                      {service.name}
                    </p>
                  ))}

                </div>
                <div className={`space-y-[20px] !w-[82%] ${errors.message1 && "space-y-[28px]"}`}>
                  <h3 className='font-[500] flex justify-start gap-2 items-start text-start leading-[19.93px] tracking-[0.28px] !text-[18px] !text-[#000000]'>
                    What Are You Hosting?
                  </h3>
                  <div className="relative m-0">
                    <div>
                      <div className="absolute inset-y-0 start-0 flex items-center ps-[16px] pointer-events-none !pt-[4px]">
                        <Image width={16} height={16} src='/images/booking/message.svg' alt='step-1' />
                      </div>
                      <div className={`!border-[1px] ${!errors.message1 ? "!border-[#EFEFEF]" : "!border-[#f963752e]"} rounded-[4px]`}>
                        <input
                          {...register('message1', {
                            required: "Title is required.",
                            minLength: {
                              value: 10,
                              message: "Title must be at least 10 characters."
                            },
                            maxLength: {
                              value: 40,
                              message: "Title must not exceed 40 characters."
                            }
                          })}
                          style={{
                            boxShadow: errors.message1 && "rgb(255 0 0 / 18%) 0px 0px 12px 0px"
                          }}
                          type="search"
                          id="message1"
                          name="message1"
                          className={`${errors.message1 ? "!border-[-0.5px]" : 'border-[.5px]'} ${errors.message1 && "bg-[#FFF5F5]"} focus:outline-none text-[#000000bf] ${errors.message1 ? "border-[#f963752e] outline-[#f963752e]" : "border-[#EFEFEF] outline-none"} !py-[12px] !text-[14px] leading-[24px] tracking-[-2%] !font-[400] pl-[38px] pr-[10px] w-full rounded-[4px]`}
                          placeholder="e.g. Hosting a corporate event."
                          onBlur={() => trigger('message1')} // Trigger validation onBlur
                        />
                      </div>
                    </div>

                    <span
                      className={`text-[12px] error-message absolute text-red-500 transition-all duration-1000 ease-out ${errors.message1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                      style={{
                        top: '51px',
                      }}
                    >
                      {errors.message1?.message as any}
                    </span>
                  </div>


                  <h3
                    className={`font-[500] flex justify-start items-start gap-2 text-start leading-[19.93px] tracking-[0.28px] !text-[18px] !text-[#000000] transition-all duration-1000 ease-out ${errors.message1 ? 'mt-[40px]' : 'mt-[20px]'
                      }`}
                  >
                    Give Us Some Details.
                  </h3>
                  <div className="relative">
                    <div>
                      <div className="absolute inset-y-0 start-0 !mt-[18px] items-center ps-[16px] pointer-events-none">
                        <Image width={16} height={16} src='/images/booking/message.svg' alt='step-1' />
                      </div>
                      <textarea
                        {...register('message2', {
                          required: "Description is required.",
                          minLength: {
                            value: 20,
                            message: "Description must be at least 20 characters."
                          },
                          maxLength: {
                            value: 100,
                            message: "Description must not exceed 100 characters."
                          }
                        })}
                        style={{
                          boxShadow: errors.message2 && "rgb(255 0 0 / 18%) 0px 0px 12px 0px"
                        }}
                        id="message2"
                        name='message2'
                        className={`!h-[210px] border-[1px] ${errors.message2 && "bg-[#FFF5F5]"} focus:outline-none text-[#000000bf] ${errors.message2 ? "border-[#f963752e] outline-[#f963752e]" : "border-[#EFEFEF] border-[2px] outline-none"} !py-[12px] !text-[14px] leading-[24px] tracking-[-2%] !font-[400] pl-[38px] pr-[10px] w-full rounded-[4px]`}
                        placeholder="Expecting 30 people to be at the event."
                        onBlur={() => trigger('message2')} // Trigger validation onBlur
                      ></textarea>
                    </div>

                    {/* Error message always rendered with opacity and translate applied */}
                    <span
                      className={`text-[12px] absolute text-red-500 transition-all duration-1000 ease-out ${errors.message2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                      style={{
                        top: '211px', // Position the error message
                      }}
                    >
                      {errors.message2?.message || '' as any} {/* Ensure there's some text to transition */}
                    </span>
                  </div>


                </div>


              </div>
              <div className="flex justify-end items-end">
                <button
                  type="button"
                  onClick={handleContinueFirst}
                  className="flex justify-center mr-0 rounded-[4px] w-[216px] py-2 text-[16px] font-[400] leading-[26px] tracking-[-2%] items-center m-auto gap-[12px] px-[20px] bg-[#350ABC] h-[48px]
     transform active:scale-95 active:shadow-inner grow_ellipse"
                >
                  <span className='opacity-[90%] text-[#F3F0FF] !text-[16px] leading-[26px]'>Continue</span>
                  <span><Image width={16} height={16} src='/images/booking/arrowleft.svg' alt='step-1' /></span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>

      {/* Third accordion section */}
      <div style={{ boxShadow: '0px 6px 26px 0px rgba(0, 0, 0, 0.07)', height: isOpenThird ? "675px" : "auto" }} className={`   rounded-[8px] bg-[#FFF]  mb-20 pb-[100px]  ${isOpenThird ? "pb-[24px] " : "pb-[37.5px] !py-[24px] pt-[37.5px]"} pt-[37.5px] px-[40px] ${isOpenThird ? 'open' : ''}`}>
        <div
          className={`flex items-center justify-between    cursor-pointer ${isOpenThird && "border-b border-[#DDD] pb-[22px]"}`}
          onClick={() => {
            // Check all three conditions
            if (
              firstSectionComplete &&
              !errors.message1?.message &&
              !errors.message2?.message && isSelectedAddress
            ) {
              toggleThirdAccordion();
            }
          }}
        >
          <div className='flex justify-center gap-[12px] items-center'>
            <Image width={24} height={25} src='/images/booking/clock.svg' alt='user' />
            <h2 className={` !text-[#000000] text-[20px] font-[500] leading-normal tracking-[-0.36px] ${montserrat.className}`}>Event Date & Time</h2>

          </div>
        </div>
        <div className='relative right-[22px]'>
          {isOpenThird && (
            <div className="accordion-content mt-[22px] flex justify-start items-start gap-[33px]">
              <Suspense fallback={<p className='w-full flex justify-center items-center'>Loading...</p>}>
                <TimeAndCalander
                  date={new Date()}
                  setTimeMessage={setTimeMessage}
                  setWorkingTimes={setWorkingTimes}
                  isStepOneCalander
                  scrollRef={scrollRef}
                  isStaffListerFilter
                  scrollUp={scrollUp}
                  scrollDown={scrollDown}
                  highlightedDatesAvailable={highlightedDatesAvailable}
                  workingTimes={workingTimes}
                />

              </Suspense>
            </div>
          )}
        </div>
        {isOpenThird &&
          <div className="text-center relative bottom-[-81px]" >
            <div className='relative top-[-96px] text-[red] z-[999] right-[38px]'>
              {timeMessage}
            </div>
            <div onClick={next} className='fixed flex justify-end w-[22%] right-[24.5px] bottom-[99px]'>
              <button

                type="button"
                className="flex justify-center items-center rounded-[4px] py-2 text-[16px] font-[400] leading-[26px] tracking-[-2%]  m-auto gap-[12px] px-[20px] bg-[#350ABC] h-[48px] 
     transform active:scale-95 grow_ellipse"
              >
                <span className='bottom-[-1.5px]'>
                  <Image width={16} height={16} src='/images/booking/arrowleft.svg' alt='step-1' />
                </span>
                <span className='opacity-[90%] text-[#F3F0FF] !text-[16px] leading-[26px] ' >
                  See Talents and Rates
                </span>
              </button>
            </div>

          </div>
        }
      </div>
    </div>
  );
};

export default DetailForm;
