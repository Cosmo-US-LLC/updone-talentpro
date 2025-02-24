"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLocation } from "../../../lib/store/features/jobCreateSlice";
import { RootState } from "../../../lib/store/store";
import { debounce } from "lodash";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';


const SearchBox = dynamic<any>(
  () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox as any),
  { ssr: false }
);

// Add this type
type MapboxFeature = {
  place_name: string;
  properties: {
    full_address?: string;
  };
};

const AddLocationSecondScreen = ({
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
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);
  const [selectedAddress, setSelectedAddress] = useState("");
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  // Add these new states
  const [customSearchValue, setCustomSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  // Add the search locations function
  const searchLocations = debounce(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      // Generate a session token (UUID) for the request
      const sessionToken = uuidv4();
      const searchUrl = new URL(
        'https://api.mapbox.com/search/searchbox/v1/suggest',
      );
      const params = {
        q: query,
        limit: 10,
        session_token: sessionToken,
        country: 'US',
        access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
        bbox: '-118.9379, 33.6278, -117.5786, 34.7671',
        // bbox: '-118.7913,33.7037,-118.1514,34.3373'
      };
      // Add parameters to URL
      Object.entries(params).forEach(([key, value]: any) => {
        searchUrl.searchParams.append(key, value);
      });
      const response = await fetch(searchUrl.toString());
      const data = (await response.json());
      const formattedSuggestions = data?.suggestions
        ?.filter((suggestion: any) => suggestion.full_address || suggestion.place_formatted)
        ?.map((suggestion: any) => ({
          place_name: suggestion.feature_type === "postcode" ? suggestion.place_formatted : suggestion.full_address,
        }));
      setSuggestions(formattedSuggestions || []);
      // const response = await fetch(
      //   `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      //     query
      //   )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&country=US&bbox=-118.7913,33.7037,-118.1514,34.3373`
      // );
      // const data = await response.json();
      // setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSuggestions([]);
    }
  }, 300);

  // Add these handlers
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomSearchValue(value);
    setShowSuggestions(true);
    searchLocations(value);
  };

  const handleSuggestionClick = (suggestion: MapboxFeature) => {
    const address = suggestion.place_name
      .replace(/,\s*(united states|usa)$/i, "")
      .replace(/,\s*california/i, "")
      .replace(/,\s*ca/i, "");

    setCustomSearchValue(address);
    setSelectedAddress(address);
    dispatch(setSelectedLocation(address));
    setValue("event_location", address);
    setShowSuggestions(false);
    setHoveredIndex(0);
    setLocationError("");
    setStep(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHoveredIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHoveredIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (hoveredIndex >= 0) {
          handleSuggestionClick(suggestions[hoveredIndex]);
        }
        break;
    }
  };


  useEffect(() => {
    setTimeout(() => {
      const inputElement = document.querySelector<HTMLInputElement>("[class*='--Input']");
      inputElement?.focus();
      inputElement?.click();
    }, 1000);
  }, []);

  const screenVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from below
    visible: { opacity: 1, y: 0 }, // Centered
    exit: { opacity: 0, y: -50 }, // Exit towards the top
  };

  const handleClear = () => {
    setSelectedAddress("");
    setIsFocus(false);
    setValue("event_location", null);
    dispatch(setSelectedLocation(""));
  };

  const handleInputChange = (event: any) => {
    if (event?.features?.length > 0) {
      let full_address = event.features[0]?.properties?.full_address || "";
      full_address = full_address.replace(/,\s*(united states|usa)$/i, "");
      setSelectedAddress(full_address);
      dispatch(setSelectedLocation(full_address));
      if (full_address) {
        //this is for me
        setStep(0);
      }
      if (full_address) {
        setLocationError("");
      }
      setValue("event_location", full_address);
    } else {
      setSelectedAddress("");
      setValue("event_location", null);
    }
  };



  return (
    <div
      className="px-4 pt-4 flex-grow overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        onClick={() => {
          setStep(0);
        }}
        className="flex flex-row justify-start items-center w-fit"
      >
        <img src="/images/mobile/x.svg" className="" alt="" />
      </div>
      <div className="relative !w-full flex mt-[12px]">
        <div className="w-full">
          <div
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            ref={searchBoxRef}
            className={`search-container ${isFocus ? "focused-style" : "blurred-style"
              }`}
          >
            <div className="relative">
              <IoSearchOutline
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B6B6B]"
                size={20}
              />
              <input
                autoFocus
                type="text"
                value={customSearchValue}
                onChange={handleCustomInputChange}
                onFocus={() => {
                  setShowSuggestions(true);
                  setHoveredIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your event's ZIP code"
                className={`w-full pl-[48px] pr-[40px] h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${locationError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
                  } !rounded-[8px] bg-[#FFF] ${locationError !== "" ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]" : ""
                  }`}
              />
              {customSearchValue && (
                <IoCloseOutline
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] cursor-pointer hover:text-[#350ABC] transition-colors duration-200"
                  size={20}
                  onClick={() => {
                    setCustomSearchValue('');
                    setShowSuggestions(false);
                    setHoveredIndex(0);
                  }}
                />
              )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div
                style={{ scrollbarWidth: "none", overflow: "auto" }}
                className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => {
                  const cleanedAddress = suggestion.place_name
                    .replace(/,\s*(united states|usa)$/i, "")
                    .replace(/,\s*california/i, "")
                    .replace(/,\s*ca/i, "");

                  return (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`p-3 cursor-pointer ${index === hoveredIndex ? 'bg-[#F5F1FF] text-[#350ABC]' : ''
                        }`}
                    >
                      {cleanedAddress}
                    </div>
                  );
                })}
              </div>
            )}

            {/* <div
              className="rounded-[8px]"
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
                id="location-input"
                onClear={handleClear}
                onRetrieve={handleInputChange}
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
                  bbox: [-118.7913, 33.7037, -118.1514, 34.3373],
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
            </div> */}
            <p
              className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-200 ease-linear ${locationError ? "opacity-100" : "opacity-0"
                } ${locationError ? "max-h-20" : "max-h-0"} overflow-hidden`}
            >
              {locationError}
            </p>
          </div>
          <div
            className={`flex justify-end items-center ${!!locationError
              ? "relative right-[30px] bottom-[54px] transition-all duration-200 ease-linear text-[#C20000]"
              : "opacity-0"
              }`}
          >
            <CiWarning size={26} className="absolute" />
          </div>
          <div className="flex w-full min-w-[340px] flex-col px-[12px] py-[16px] gap-[12px] rounded-[4px] border border-dashed border-[#FFE0B0] bg-[#FFF7EC] mt-6 ">
            <div className="flex flex-row items-center gap-[12px]">
              <div className="text-[#C08328] text-[22px]">
                <CiCircleInfo />
              </div>
              <p className="text-[#161616] font-[400] leading-[20px] text-[14px]">
                We’re currently available in Los Angeles.
              </p>
            </div>
            <p className="text-[#4C4B4B] font-[400] leading-[20px] text-[14px]">
              If you can't find your location, then select the nearest one.
              You'll be able to chat with the Talent later and share details.
            </p>
          </div>
        </div>

        <div className="flex justify-start items-center custom-input-wrapper"></div>
      </div>
    </div >
  );
};

export default AddLocationSecondScreen;