"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLocation } from "../../../lib/store/features/jobCreateSlice";
import { RootState } from "../../../lib/store/store";
const SearchBox = dynamic<any>(
  () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox as any),
  { ssr: false }
);

const AddLocationFirstScreen = ({
  setLocationError,
  locationError,
  setStep,
}: any) => {
  const {
    register,
    trigger,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onSubmit",
  });
  const jobCreateState = useSelector((state: RootState) => state?.jobCreate);
  const [selectedAddress, setSelectedAddress] = useState("");
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const handleClear = () => {
    setSelectedAddress("");
    setIsFocus(false);
    setValue("event_location", null);
    dispatch(setSelectedLocation(""));
  };

  // const handleInputChange = (event: any) => {
  //     if (event?.features?.length > 0) {
  //         let full_address = event.features[0]?.properties?.full_address || '';
  //         full_address = full_address.replace(/,\s*(united states|usa)$/i, '');
  //         setSelectedAddress(full_address);
  //         dispatch(setSelectedLocation(full_address))
  //         if (full_address) {
  //             setLocationError('')
  //         }
  //         setValue('event_location', full_address);
  //     } else {
  //         setSelectedAddress('');
  //         setValue('event_location', null);
  //     }
  // };

  const handleClickInputField = () => {
    setStep(-1);
  };

  return (
    <div
      className="px-4 pt-4 flex-grow overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <h2 className="text-[14px] font-medium leading-[20px] mb-[8px] text-[#000000] pt-2">
        Where will the event be held?
      </h2>
      {/* <p className="text-[#6B6B6B] font-[400] leading-[24px] text-[14px]">
        We’re currently available in Los Angeles.
      </p> */}
      <div className="relative !w-full flex mt-[8px]">
        <div className="w-full">
        <div
            onClick={handleClickInputField}
            ref={searchBoxRef}
            className={`search-container ${
              isFocus ? "focused-style" : "blurred-style"
            }`}
          >
          <div className="w-auto h-8 top-[11px] left-[2px] rounded-[8px] bg-[#FFF] absolute z-[999]">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                className="ml-2 relative top-[8px] flex justify-center items-center"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="#9F9F9F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14.0001L11.1 11.1001"
                  stroke="#9F9F9F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        
            <div
              className="rounded-[8px] border min-h-[58px] h-fit bg-white"
              style={{
                border: !!locationError
                  ? "1px solid #FF8F8F"
                  : "1px solid #EFEFEF",
                boxShadow: !!locationError
                  ? " 0px 0px 20px 0px rgba(194, 0, 0, 0.22)"
                  : "",
              }}
            >
              <SearchBox
                onClear={handleClear}
                // onRetrieve={handleInputChange}
                value={
                  jobCreateState?.selectedLocation
                    ? jobCreateState?.selectedLocation
                    : selectedAddress
                }
                className="custom-search-box"
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                placeholder="Enter your event's ZIP code to get started"
                options={{
                  country: "US",
                  bbox: [-118.9379, 33.6278, -117.5786, 34.7671],
                  // bbox: [-118.7913, 33.7037, -118.1514, 34.3373],
                }}
                theme={{
                  variables: {
                    padding: "14px 10px 14px 20px",
                    borderRadius: "8px",
                    fontFamily: "Poppins, sans-serif",
                    unit: "14px",
                    boxShadow: "0px 4px 24px 0px rgba(147, 147, 147, 0.05)",
                    fontWeight: "400",
                    minHeight: "60px",
                    height: "56px",
                    background: "red",
                    color: "red",
                    fontSize: "14px",
                  },
                }}
              />
            </div>
            <p
              className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-200 ease-linear ${
                locationError ? "opacity-100" : "opacity-0"
              } ${locationError ? "max-h-20" : "max-h-0"} overflow-hidden`}
            >
              {locationError}
            </p>
          </div>
          <div
            className={`flex justify-end items-center ${
              !!locationError
                ? "relative right-[30px] bottom-[54px] transition-all duration-200 ease-linear text-[#C20000]"
                : "opacity-0"
            }`}
          >
            <CiWarning size={26} className="absolute" />
          </div>
        </div>

        <div className="flex justify-start items-center custom-input-wrapper"></div>
      </div>
      <div className="flex w-full min-w-[340px] flex-col px-[12px] py-[16px] gap-[12px] rounded-[4px] border border-dashed border-[#FFE0B0] bg-[#FFF7EC] mt-4">
        <div className="flex flex-row items-center gap-[12px]">
          <div className="text-[#C08328] text-[22px]">
            <CiCircleInfo />
          </div>
          <p className="text-[#161616] font-[400] leading-[24px] text-[14px]">
            We’re currently available in Los Angeles.
          </p>
        </div>
        <p className="text-[#4C4B4B] font-[400] leading-[20px] text-[14px]">
          If you can't find your location, then select the nearest one. You'll
          be able to chat with the Talent later and share details.
        </p>
      </div>
    </div>
  );
};

export default AddLocationFirstScreen;
