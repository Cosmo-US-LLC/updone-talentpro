import Tooltip from "@/app/_components/common/tooltip";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { montserrat } from "@/app/lib/Fonts";
import Image from "next/image";
import { useState } from 'react';
import { useSelector } from "react-redux";
import 'react-slideshow-image/dist/styles.css';
import { RootState } from "../../../lib/store/store";
import GalleryModal from "../../ui/gallery";

const TalentCard = ({
  talent,
  jobApiData,
  isSelected,
  onToggleSelect,
}: any) => {
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);
  const [showModal, setShowModal] = useState(false);
  const galleryImages = talent?.gallery?.length > 0 ? talent?.gallery : [talent.profile_pic];
  function calculateTotal(hourRate: string, amount: string) {
    const totalHours = parseFloat(amount);
    const parsedHourRate = parseFloat(hourRate);
    return parsedHourRate * totalHours;
  }

  return (
    <div
      onClick={onToggleSelect}
      className={`shadow-sm ${talent.alreadyInvited === false && "cursor-pointer"
        } border border-1 w-full sm:w-full md:w-full lg:w-full min-h-[184px] rounded-2xl py-[16px] px-[12px] ${isSelected ? "bg-[#2C2240] border-[#2C2240]" : "bg-white"
        }`}
    >
      <div className="flex w-[100%] flex-row gap-4">
        <div className="flex flex-col items-center">
          <Image
            onClick={(event) => {
              event.stopPropagation();
              setShowModal(true)
            }}
            className="w-[74px] h-[74px] rounded-full object-cover relative border-4 border-[#EBE6FF]"
            src={
              talent.profile_pic
                ? talent.profile_pic
                : "/images/testiminial/testi3.jpg"
            }
            quality={100}
            objectFit="fill"
            width={120}
            height={120}
            alt=""
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,..."
            priority={true}
          />
          <div className="text-center w-[75px] py-0.5 relative bottom-[15px] bg-[#e6e0fa] text-[#350ABC] rounded-md">
            <span className="text-[16px] font-[400]">
              ${parseFloat(talent?.per_hours_rate).toFixed(0)}/hr
            </span>
          </div>
        </div>
        {/* Reusable Modal Component */}
        <GalleryModal
          show={showModal}
          onClose={() => setShowModal(false)}
          images={galleryImages}
        />
        {/* <div className=""> */}

        <div className="flex flex-col flex-1">
          <div className="flex flex-col items-center w-full relative">
            <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-[10px]">
              <div className="flex justify-start items-center">
                <h3
                  style={{
                    letterSpacing: "-1%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  className={`text-[20px] flex justify-start items-center min-w-auto gap-2 ${isSelected ? "text-white" : "text-[#2C2240]"
                    } relative bottom-[1px] font-[600] ${montserrat.className}`}
                >
                  {talent?.full_name?.length > 18
                    ? `${talent?.full_name?.slice(0, 18)}...`
                    : talent?.full_name}
                </h3>
                <Tooltip
                  content={
                    <VerificationStatus
                      id_is_verified={talent.id_is_verified}
                      contact_is_verified={talent.contact_is_verified}
                    />
                  }
                >
                  <div className=" text-white pr-4 pl-2  rounded">
                    <VerificationIcon
                      id_is_verified={talent.id_is_verified}
                      contact_is_verified={talent.contact_is_verified}
                      height={30}
                      width={30}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative bottom-[2px]">
                  <svg
                    className="w-4 h-4 text-[#F79809] me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <p
                  className={`ms-1 text-[14px] font-normal text-black ${isSelected ? "text-white" : "text-[#2C2240]"
                    }`}
                >
                  {parseFloat(talent?.rating).toFixed(1)}/5
                </p>
              </div>
            </div>
            <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-1">
              <div className="text-center text-[14px] font-normal text-[#989898] flex gap-2">
                <Image
                  src={`/images/gallery/${isSelected ? "location-white.svg" : "location.svg"
                    }`}
                  alt="location-svg"
                  width={16}
                  height={16}
                />{" "}
                <span
                  className={`flex justify-start items-center !text-[16px] !font-[400] ${isSelected ? "text-white" : "text-[#00000080]"
                    } cursor-pointer`}
                >
                  {talent?.city}
                </span>
              </div>
              <span
                className={`text-[16px] font-[400] leading-[28px] ${isSelected ? "text-white" : "text-[#6B6B6B]"
                  }`}
              >
                {talent?.total_jobs_count} Jobs
              </span>
            </div>
          </div>

          <div className="flex justify-start items-center mt-2 w-full">
            <div className="flex items-center ">
              <p
                className={`leading-[24px] ${isSelected ? "text-white" : "text-[#989898]"
                  } text-[!14px] font-normal inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm`}
              >
                <span className="mr-2 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_464_1076)">
                      <path
                        d="M10.8333 3.79163H2.16659C1.56828 3.79163 1.08325 4.27665 1.08325 4.87496V10.2916C1.08325 10.8899 1.56828 11.375 2.16659 11.375H10.8333C11.4316 11.375 11.9166 10.8899 11.9166 10.2916V4.87496C11.9166 4.27665 11.4316 3.79163 10.8333 3.79163Z"
                        stroke={isSelected ? "#ffffff" : "#2C2240"} // Conditionally set stroke color
                        strokeWidth="1.08333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.66658 11.375V2.70833C8.66658 2.42102 8.55245 2.14547 8.34928 1.9423C8.14612 1.73914 7.87057 1.625 7.58325 1.625H5.41659C5.12927 1.625 4.85372 1.73914 4.65055 1.9423C4.44739 2.14547 4.33325 2.42102 4.33325 2.70833V11.375"
                        stroke={isSelected ? "#ffffff" : "#2C2240"} // Conditionally set stroke color
                        strokeWidth="1.08333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_464_1076">
                        <rect width="13" height="13" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Last job was on {talent?.last_job}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div
        className={`border-t ${isSelected ? "border-[#3b2e55]" : "border-gray-300"
          }  mt-4`}
      />
      <div className={`flex justify-around items-center relative w-full mt-4`}>
        <div className={`flex justify-between w-full items-center`}>
          <div
            className={`${isSelected ? "text-white" : "text-black"
              } font-[500] text-[20px]`}
          >
            $
            {calculateTotal(
              talent?.per_hours_rate,
              jobApiData
                ? jobApiData?.total_hours
                : jobCreateState.selectedHours
            )}{" "}
            <span
              className={`!text-[12px] !leading-[14.63px] ${isSelected ? "text-white" : "text-black"
                }`}
            >
              Total.
            </span>
          </div>
          <div
            className={`${isSelected ? "text-white" : "text-black"
              } font-medium text-[14px] flex flex-row items-center gap-2`}
          >
            {talent.alreadyInvited === true
              ? "Already invited"
              : "Select Talent"}
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`checkbox-${talent.id}`} // Unique ID for linking the label
                className="hidden" // Hide the original checkbox
                checked={isSelected || talent?.alreadyInvited}
                onChange={onToggleSelect}
                disabled={talent?.alreadyInvited}
              />
              <label
                htmlFor={`checkbox-${talent.id}`} // Bind label to the input
                className={`h-[24px] w-[24px] border-[1px] rounded-full flex items-center justify-center cursor-pointer
        ${isSelected || talent?.alreadyInvited
                    ? "bg-white border-white"
                    : "border-black"
                  }`}
              >
                {(isSelected || talent?.alreadyInvited) && (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="#2C2240"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;