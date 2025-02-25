import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiCurrencyDollarSimpleThin, PiLineVerticalThin } from "react-icons/pi";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { apiRequest } from "@/app/lib/services";
import { useError } from "@/app/lib/context/ErrorProvider";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import InfoCard from "@/components/ui/infoCard";

interface InputState {
  inputValue: string;
}

const MakeOffer = ({ jobData, setModalIsOpen }: any) => {
  const getHourlyRate = () => {
    if (jobData?.invite) {
      if (jobData?.invite?.offered_price === "default") {
        return Math.floor(jobData?.myWorkingDetails?.per_hours_rate);
      } else {
        return Math.floor(jobData?.invite?.offered_price);
      }
    } else {
      return Math.floor(jobData?.myWorkingDetails?.per_hours_rate);
    }
  };

  const hourRate = getHourlyRate();
  const [isDefaultRate, setIsDefaultRate] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<InputState>({
    inputValue: hourRate ? hourRate?.toString() : "",
  });
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();
  const [rateValueError, setRateValueError] = useState("");
  const [messageBodyError, setMessageBodyError] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [offerSuccessfull, setOfferSuccessfull] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    calculateTotalIncome();
  }, [state]);

  const getPriceValidationStatus = (price: number) => {
    if (price < 35) {
      return { message: "Cannot submit offer below $35/hour", color: "text-[#C20000]" };
    } else if (price > 80) {
      return { message: "Cannot submit offer above $80/hour", color: "text-[#C20000]" };
    }
    return { message: "", color: "" };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Validate if the input is a number
    if (!/^\d*$/.test(inputValue)) {
      setRateValueError("Please enter a valid number.");
      return;
    }

    // Convert input value to a number
    const numericValue = parseInt(inputValue);

    // Check if the input is empty
    if (inputValue === "") {
      setRateValueError("Rate cannot be empty.");
    }
    // Enforce minimum hourly rate
    else if (numericValue < 35) {
      setRateValueError("Cannot submit offer below $35/hour");
    }
    // Enforce maximum hourly rate
    else if (numericValue > 80) {
      setRateValueError("Cannot submit offer above $80/hour");
    }
    // Valid case
    else {
      setRateValueError(""); // Clear any previous errors
      setState({
        inputValue: inputValue,
      });
      return;
    }

    // Reset the input state if there's an error
    setState({
      inputValue: inputValue,
    });
  };

  const handleChangeMessage = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setMessageBodyError("This field cannot be empty");
    } else if (inputValue?.length > 1000) {
      setMessageBodyError("Description too long");
    } else {
      setMessageBodyError("");
      setMessageBody(inputValue);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsDefaultRate(isChecked);
    if (isChecked && hourRate) {
      setState({ inputValue: hourRate.toString() });
    } else {
      setState({ inputValue: "" });
    }
  };

  function calculateTotalHours() {
    const startTime = new Date(
      `${jobData?.job?.working_times[0]?.date}T${jobData?.job?.working_times[0]?.start_time}`
    ).getTime();
    const endTime = new Date(
      `${jobData?.job?.working_times[0]?.date}T${jobData?.job?.working_times[0]?.end_time}`
    ).getTime();

    // Adjust endTime if it falls on the next day
    let adjustedEndTime = endTime;
    if (endTime < startTime) {
      adjustedEndTime += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }

    const differenceInMilliseconds = adjustedEndTime - startTime;
    const totalHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)); // Round down
    return totalHours;
  }

  function calculateTotalIncome() {
    const numberOfHours = calculateTotalHours();
    if (isDefaultRate) {
      return numberOfHours * hourRate;
    } else {
      if (state.inputValue === "") {
        return 0;
      } else {
        return numberOfHours * parseInt(state.inputValue);
      }
    }
  }

  const onSubmit = async () => {
    if (messageBody === "") {
      setMessageBodyError("This field cannot be empty");
      return;
    } else if (messageBody?.length > 1000) {
      setMessageBodyError("Description too long");
      return;
    }

    const price = isDefaultRate ? hourRate : Number(state.inputValue);
    if (price < 35) {
      setRateValueError("Cannot submit offer below $35/hour");
      return;
    }
    if (price > 80) {
      setRateValueError("Cannot submit offer above $80/hour");
      return;
    }

    const body: {
      user_id: number;
      job_id: number;
      offered_price?: number;
      message_body?: string
    } = {
      user_id: Number(storedData?.user?.id),
      job_id: Number(jobData?.job?.id),
      message_body: messageBody
    };

    if (!isDefaultRate) {
      body.offered_price = Number(state.inputValue);
    }

    try {
      setLoading(true);
      const newData = await apiRequest(
        "/invitation/accept",
        {
          method: "POST",
          body: body,
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
        },
        handleError
      );

      if (newData.status === "accepted") {
        setOfferSuccessfull(true);
        location.reload();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f8fb] min-h-[100dvh]   flex flex-col items-left gap-4 relative">
      <div
        className="bg-[#f5f8fb] min-h-[100dvh] p-4 flex flex-col items-left gap-4 relative pb-24"
        style={{ scrollbarWidth: "none" }}
      >
        <div
          onClick={() => {
            setModalIsOpen(false);
          }}
          className="w-fit cursor-pointer"
        >
          <RxCross2 style={{ height: "20px", width: "20px" }} />
        </div>
        <div className="bg-white w-full flex flex-col items-center shadow-lg rounded-lg py-4">
          <p className="text-[20px] font-[400] leading-[30px] mb-4">
            Make your Offer
          </p>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="flex justify-center items-center">
                <PiCurrencyDollarSimpleThin color="#000" size={24} />
              </span>
              <input
                type="text" // Changed type to text
                inputMode="text" // Suggests numeric keypad for mobile users
                pattern="[0-9]*" // Allows only numeric input
                className="!outline-none w-[80px] py-[2px] px-[20px] border-[1px] text-center rounded-[4px] border-[#E5DDFF] !disabled:bg-[#efeeee]"
                value={state.inputValue}
                placeholder={hourRate?.toString() || "0"}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    // Ensure the input is numeric
                    handleChange(e);
                  }
                }}
                disabled={isDefaultRate} // Disable input when using default rate
              />
              <span className="pl-2">/ hour</span>
            </div>
            {!isDefaultRate && state.inputValue && !rateValueError && getPriceValidationStatus(Number(state.inputValue)).message && (
              <p className={`text-[12px] pt-[5px] font-[400] leading-[20px] ${getPriceValidationStatus(Number(state.inputValue)).color}`}>
                {getPriceValidationStatus(Number(state.inputValue)).message}
              </p>
            )}
            {rateValueError && (
              <p className="text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px]">
                {rateValueError}
              </p>
            )}
            <p className="flex items-center gap-2 text-[#9F9F9F] text-[16px] font-[400] leading-[28px] tracking-[-0.32px]">
              <input
                type="checkbox"
                className="!bg-[#774DFD]"
                checked={isDefaultRate}
                onChange={(handleCheckboxChange)}
              />
              offer with your default rate
            </p>
          </div>
          <div className="h-[56px] rounded-[4px] w-[80%] flex flex-row items-center justify-between py-8">
            <div>
              <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                Total hours
              </p>
              <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                {calculateTotalHours()} hrs
              </p>
            </div>
            <div>
              <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                Total income
              </p>
              <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                ${calculateTotalIncome()}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[14px] font-[600] leading-[24px] mb-2">Introduce yourself to the Client.
            <span className="text-[red]"> *</span>
          </p>
          <textarea
            placeholder="Hi, this is John Doe. I am a professional mixologist, RBS certified, and I have a full bar kit. I would be happy to help with your event."
            onChange={(e) => {
              handleChangeMessage(e);
            }}
            style={{
              boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.06)",
            }}
            className="!h-[140px] w-full p-2 border border-[#EBE6FF] !rounded-sm resize-none placeholder:text-[#9F9F9F] placeholder:text-[14px]"
          />
          {
            <p
              className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${messageBodyError !== "" ? "opacity-100" : "opacity-0"
                } ${messageBodyError !== "" ? "max-h-20" : "max-h-0"
                } overflow-hidden`}
            >
              {messageBodyError}
            </p>
          }
        </div>
        <div className="bg-[#FFF7EC] border border-2 border-[#FFE0B0] border-dashed flex flex-row items-start gap-6 p-4">
          <Image
            alt='assigned-person'
            height={35}
            width={35}
            className=""
            src="/images/mobile/talent/envelope.svg"
          />
          <div className="absolute border-l border-[#F9E1BE] h-[130px] left-[19%]"></div>
          <div>
            <p className="font-[500] text-[18px] leading-[8px] mb-4 mt-1">How to make an impact?</p>
            <ul className="list-disc pl-5">
              <li className="font-[400] text-[14px] leading-[24px] mb-2">
                Let the client know why you are the best choice for their event.
              </li>
              <li className="font-[400] text-[14px] leading-[24px] mb-2">
                Feel free to share your social media account.
              </li>
              <li className="font-[400] text-[14px] leading-[24px]">
                Do not share sensitive information i.e. email, phone number, address.
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white fixed bottom-0 left-0 w-full flex justify-center items-center shadow-3xl py-4 rounded-t-3xl">
          {
            offerSuccessfull ? (
              <div className="py-[12px] bg-[#350ABC] fixed bottom-4 w-[80%] flex flex-row items-center justify-center gap-2 rounded-[4px]">
                <div>
                  <img
                    src="/images/mobile/check_success.svg"
                    className="h-[23px] w-[23px]"
                    alt="check_success"
                  />
                </div>
                <div className="text-[16px] font-[400] leading-[26px] text-[#9DFF95]">
                  {"Offer Submitted Successfully"}
                </div>
              </div>
            ) : (
              <button
                disabled={loading || rateValueError !== ""}
                onClick={() => {
                  onSubmit();
                }}
                className="w-[12rem] bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-full disabled:opacity-50"
              >
                {loading ? "Submitting Offer" : "Submit Offer"}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default MakeOffer;
