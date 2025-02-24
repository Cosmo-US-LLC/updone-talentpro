import React, { useEffect } from "react";
import RenderServices from "../../services/RenderServices";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import {
  setTitle,
  setEventDescription,
  setSelectedService,
  setSelectedTalents,
} from "@/app/lib/store/features/jobCreateSlice";

const ServicesADetail = ({
  eventTitleError,
  setEventTitleError,
  eventDescriptionError,
  setEventDescriptionError,
  setSelectedTalentsLocal,
}: any) => {
  const dispatch = useDispatch();
  const services = [
    { name: "Bartender", icon: "/icons/services/bartender.svg", id: 1 },
    { name: "Waiter", icon: "/icons/services/bartender.svg", id: 2 },
    { name: "Cocktail Server", icon: "/icons/services/bartender.svg", id: 3 },
    { name: "Promo Model", icon: "/icons/services/bartender.svg", id: 4 },
    { name: "Event Helper", icon: "/icons/services/bartender.svg", id: 5 },
    { name: "Barback", icon: "/icons/services/bartender.svg", id: 6 },
  ];

  const { title, eventDescription, selectedService, selectedTalents } =
    useSelector((state: RootState) => state.jobCreate);

  const handleSelectService = (service: { name: any; id: number }) => {
    if (selectedService.name !== service.name) {
      setSelectedTalentsLocal([]);
      dispatch(setSelectedTalents([]));
    }
    dispatch(setSelectedService(service));
  };

  const onChangeTitle = (e: any) => {
    dispatch(setTitle(e.target.value));
    if (e.target.value.length === 0) {
      setEventTitleError("Title is required.");
    } else if (e.target.value.length > 70) {
      setEventTitleError("Cannot be more than 70 characters.");
    } else if (e.target.value.length < 10) {
      setEventTitleError("Title must be at least 10 characters.");
    } else {
      setEventTitleError("");
    }
  };

  const onChangeDescription = (e: any) => {
    dispatch(setEventDescription(e.target.value));
    if (e.target.value.length === 0) {
      setEventDescriptionError("Description is required.");
    } else if (e.target.value.length > 1000) {
      setEventDescriptionError("Cannot be more than 1000 characters.");
    } else if (e.target.value.length < 20) {
      setEventDescriptionError("Description must be at least 20 characters.");
    } else {
      setEventDescriptionError("");
    }
  };

  return (
    <div>
      <h2 className="text-[26px] font-[500] leading-[24px] mb-[36px] text-[#000000]">
        Tell us about your event and the service you need.
      </h2>

      <div>
        <h3 className="mb-[10px] text-[#161616] font-[500] leading-normal text-[14px]">
          What are you hosting?
          <span className="text-[#C20000]"> *</span>
        </h3>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            onChangeTitle(e);
          }}
          className={`w-full px-[16px] h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${
            eventTitleError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
          } !rounded-[8px] bg-[#FFF] ${
            eventTitleError !== ""
              ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
              : ""
          }`}
          placeholder="Hosting a corporate event."
        />
        <p
          className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${
            eventTitleError !== "" ? "opacity-100" : "opacity-0"
          } ${eventTitleError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
        >
          {eventTitleError}
        </p>
      </div>

      <div className="mt-[20px]">
        <h3 className="mb-[10px] text-[#161616] font-[500] leading-normal text-[14px]">
          Describe your event
          <span className="text-[#C20000]"> *</span>
        </h3>
        <textarea
          placeholder="I’m expecting 30 - 40 guests at my event. Looking to hire a professional and well dressed bartender."
          value={eventDescription}
          onChange={(e) => onChangeDescription(e)}
          className={`${
            eventDescriptionError !== ""
              ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
              : ""
          } flex h-24 w-full p-4 justify-between outline-none items-start self-stretch !text-[#6B6B6B] !font-[400] leading-[24px] text-[14px] border-[1px] border-[${
            eventDescriptionError === "" ? "#EFEFEF" : "#FF8F8F"
          }] !rounded-[8px] bg-[#FFF]`}
        />
        <p
          className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${
            eventDescriptionError !== "" ? "opacity-100" : "opacity-0"
          } ${
            eventDescriptionError !== "" ? "max-h-20" : "max-h-0"
          } overflow-hidden`}
        >
          {eventDescriptionError}
        </p>
      </div>

      <div className="w-full mt-[36px]">
        <h3 className="mb-[10px] text-[#161616] font-[500] leading-normal text-[14px]">
          Pick required service
          <span className="text-[#C20000]"> *</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleSelectService(service)}
              className={`flex flex-col gap-[14px] items-center justify-center !text-[14px] !font-[400] !leading-[24px] py-[16px] rounded-[8px] bg-[#FFF] cursor-pointer ${
                selectedService.name === service.name
                  ? "bg-gray-900 text-[#FFF] transition-all duration-300 !ease-linear"
                  : "bg-[#FFF] text-[#6B6B6B] hover:bg-gray-200 transition-all duration-300 !ease-linear"
              } `}
            >
              <span className="text-2xl">
                <RenderServices
                  serviceName={service}
                  selectedServiceName={selectedService.name}
                />
              </span>
              <span className="mt-2">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServicesADetail);
