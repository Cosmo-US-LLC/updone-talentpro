import { useEffect, useState } from "react";
import { PiCurrencyDollarSimpleThin } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { apiRequest } from "@/app/lib/services";
import { useError } from "@/app/lib/context/ErrorProvider";
import Image from "next/image";

interface InputState {
  inputValue: string;
}

const MakeOffer = ({ jobData, setModalIsOpen }: any) => {
  const getHourlyRate = () => {
    if (jobData?.invite) {
      return jobData?.invite?.offered_price === "default"
        ? Math.floor(jobData?.myWorkingDetails?.per_hours_rate)
        : Math.floor(jobData?.invite?.offered_price);
    }
    return Math.floor(jobData?.myWorkingDetails?.per_hours_rate);
  };

  const hourRate = getHourlyRate();
  const [isDefaultRate, setIsDefaultRate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<InputState>({
    inputValue: hourRate ? hourRate.toString() : "",
  });
  const [rateValueError, setRateValueError] = useState("");
  const [messageBodyError, setMessageBodyError] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [offerSuccessfull, setOfferSuccessfull] = useState(false);
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();

  const calculateTotalHours = () => {
    const startTime = new Date(
      `${jobData?.job?.working_times[0]?.date}T${jobData?.job?.working_times[0]?.start_time}`
    ).getTime();
    const endTime = new Date(
      `${jobData?.job?.working_times[0]?.date}T${jobData?.job?.working_times[0]?.end_time}`
    ).getTime();

    let adjustedEndTime = endTime;
    if (endTime < startTime) adjustedEndTime += 24 * 60 * 60 * 1000;
    const diff = adjustedEndTime - startTime;
    return Math.floor(diff / (1000 * 60 * 60));
  };

  const calculateTotalIncome = () => {
    const hours = calculateTotalHours();
    if (isDefaultRate) return hours * hourRate;
    return state.inputValue ? hours * parseInt(state.inputValue) : 0;
  };

  const getPriceValidationStatus = (price: number) => {
    if (price < 30)
      return { message: "This price seems lower than the market rate.", color: "text-red-500" };
    else if (price > 200)
      return { message: "You are offering above the market rate.", color: "text-red-500" };
    return { message: "", color: "" };
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      setRateValueError("Please enter a valid number.");
      return;
    }
    const numericValue = parseInt(value || "0");
    if (value === "") setRateValueError("Rate cannot be empty.");
    else if (numericValue < 30) setRateValueError("This price seems low.");
    else if (numericValue > 200) setRateValueError("This price seems high.");
    else setRateValueError("");

    setState({ inputValue: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDefaultRate(checked);
    setState({ inputValue: checked ? hourRate.toString() : "" });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val === "") setMessageBodyError("This field cannot be empty.");
    else if (val.length > 1000) setMessageBodyError("Description too long.");
    else setMessageBodyError("");
    setMessageBody(val);
  };

  const onSubmit = async () => {
    if (messageBody.trim() === "") {
      setMessageBodyError("This field cannot be empty.");
      return;
    }
    const body: { user_id: number; job_id: number; offered_price?: number; message_body: string } = {
      user_id: Number(storedData?.user?.id),
      job_id: Number(jobData?.job?.id),
      message_body: messageBody,
    };
    if (!isDefaultRate) body.offered_price = Number(state.inputValue);

    try {
      setLoading(true);
      const res = await apiRequest(
        "/invitation/accept",
        {
          method: "POST",
          body,
          headers: storedData ? { Authorization: `Bearer ${storedData.token}` } : {},
        },
        handleError
      );
      if (res.status === "accepted") {
        setOfferSuccessfull(true);
        location.reload();
      }
    } catch (err) {
      // Handle errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f8fb] w-full flex flex-col items-center py-6 px-4">
      <div className="w-full flex justify-start mb-4">
        <button onClick={() => setModalIsOpen(false)}>
          <RxCross2 size={24} />
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <p className="text-xl font-semibold mb-4">Make your Offer</p>
        <div className="flex items-center justify-center gap-2">
          <PiCurrencyDollarSimpleThin size={24} />
          <input
            type="text"
            className="w-20 text-center border border-gray-300 rounded px-2 py-1"
            value={state.inputValue}
            onChange={handleRateChange}
            disabled={isDefaultRate}
          />
          <span>/ hour</span>
        </div>
        {!isDefaultRate && state.inputValue && !rateValueError && getPriceValidationStatus(Number(state.inputValue)).message && (
          <p className={`text-xs pt-2 ${getPriceValidationStatus(Number(state.inputValue)).color}`}>
            {getPriceValidationStatus(Number(state.inputValue)).message}
          </p>
        )}
        {rateValueError && <p className="text-xs pt-2 text-red-500">{rateValueError}</p>}
        <div className="flex items-center justify-center gap-2 mt-3">
          <input type="checkbox" checked={isDefaultRate} onChange={handleCheckboxChange} />
          <span className="text-sm text-gray-600">Offer with your default rate</span>
        </div>
        <div className="flex justify-between mt-6 px-6">
          <div>
            <p className="text-xs text-gray-500">Total hours</p>
            <p className="text-lg font-medium">{calculateTotalHours()} hrs</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total income</p>
            <p className="text-lg font-medium">${calculateTotalIncome()}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <p className="text-sm font-semibold mb-2">
          Introduce yourself to the Client. <span className="text-red-500">*</span>
        </p>
        <textarea
          placeholder="Hi, this is John Doe. I am a professional mixologist..."
          onChange={handleMessageChange}
          className={`w-full p-3 border ${
            messageBodyError ? "border-red-500 shadow shadow-red-200" : "border-gray-300"
          } rounded-lg`}
          rows={4}
        ></textarea>
        {messageBodyError && <p className="text-xs pt-2 text-red-500">{messageBodyError}</p>}
      </div>

      <div className="bg-[#FFF7EC] border border-dashed border-[#FFE0B0] p-4 mt-6 w-full max-w-md flex gap-4">
        <Image alt="envelope" width={35} height={35} src="/images/mobile/talent/envelope.svg" />
        <div>
          <p className="font-semibold text-lg mb-2">How to make an impact?</p>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Let the client know why you are the best choice for their event.</li>
            <li>Feel free to share your social media account.</li>
            <li>Do not share sensitive info like email, phone, or address.</li>
          </ul>
        </div>
      </div>

      <div className=" max-w-md mt-6 mb-6">
        <button
          disabled={loading || !state.inputValue}
          onClick={onSubmit}
          className="w-[200px] bg-[#350ABC] text-white py-3 flex justify-center items-center rounded-full text-lg disabled:opacity-50"
        >
          {loading ? "Submitting Offer..." : "Submit Offer"}
        </button>
      </div>
    </div>
  );
};

export default MakeOffer;
