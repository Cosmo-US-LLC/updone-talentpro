import MyModal from "@/app/_components/common/modal/Modal";
import { useError } from "@/app/lib/context/ErrorProvider";
import { montserrat } from "@/app/lib/Fonts";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiCurrencyDollarSimpleThin, PiLineVerticalThin } from "react-icons/pi";
import { RiRecycleLine } from "react-icons/ri";

interface InputState {
  inputValue: string;
}

const Offered = ({
  jobId,
  hourRate,
  hoursWorked,
}: {
  jobId: number;
  hourRate?: number;
  hoursWorked: number;
}) => {
  const [state, setState] = useState<InputState>({
    inputValue: hourRate?.toString() || "", // Set default input value to the hourRate
  });
  const [isDefaultRate, setIsDefaultRate] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useError();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      inputValue: event.target.value,
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsDefaultRate(isChecked);
    if (isChecked && hourRate) {
      setState({
        inputValue: hourRate.toString(),
      });
    } else {
      setState({
        inputValue: "",
      });
    }
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    if (messageError && event.target.value.trim()) {
      setMessageError(null); // Clear error if user starts typing
    }
  };

  useEffect(() => {
    if (hourRate) {
      setState({
        inputValue: hourRate.toString(),
      });
    }
  }, [hourRate]);

  const { auth: storedData } = useAppSelector(selectAuth);

  const onSubmit = async () => {
    if (!message.trim()) {
      setMessageError("This field cannot be empty."); // Set error if the message is empty
      return;
    }

    const body: {
      user_id: number;
      job_id: number;
      offered_price?: number;
      message_body: string;
    } = {
      user_id: Number(storedData?.user?.id),
      job_id: Number(jobId),
      message_body: message.trim(),
    };

    if (!isDefaultRate) {
      body.offered_price = Number(state.inputValue);
    }

    try {
      setIsLoading(true);
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
        location.reload();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !state.inputValue && !isDefaultRate; // Disable if inputValue is empty and default rate is checked

  // Calculate the total amount based on the rate and hours worked
  const totalAmount = isDefaultRate
    ? (hourRate || 0) * hoursWorked
    : (Number(state.inputValue) || 0) * hoursWorked;

  return (
    <>
      <div className="max-w-[1100px] flex flex-col mx-auto mb-[300px]">
        <div className="!bg-[#EBE6FF] max-h-[220px] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1100"
            height="117"
            viewBox="0 0 1280 117"
            fill="none"
          >
            {/* <path d="M0.5 0H1280V85C1280 102.673 1265.67 117 1248 117H553.091C536.821 117 521.659 108.758 512.81 
                    95.1047L465.671 22.3664C456.833 8.72871 441.694 0.489129 425.443 0.471112L0.5 0Z" fill="#F3F0FF" /> */}
          </svg>
          <div className="relative bottom-[123px] top-[-97px] pl-[32px] flex flex-row justify-start items-center">
            <div className="flex flex-col pt-[30px]">
              {/* <span className="absolute pt-[12px] pl-[25px] flex justify-center items-center">
                <PiCurrencyDollarSimpleThin color="#D7D6D6" size={24} />
                <PiLineVerticalThin color="#F0F0F0" size={32} />
              </span> */}
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
                      setState({
                        inputValue: value,
                      });
                    }
                  }}
                  disabled={isDefaultRate} // Disable input when using default rate
                />
                <span className="pl-2">/ hour</span>
              </div>
              {/* <input
                type="text" // Changed type to text
                inputMode="text" // Suggests numeric keypad for mobile users
                pattern="[0-9]*" // Allows only numeric input
                className="!outline-none pl-[85px] w-[168px] py-[16px] px-[30px] border-[1px] rounded-[4px] border-[#E5DDFF] mr-[24px]"
                value={state.inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    // Ensure the input is numeric
                    setState({
                      inputValue: value,
                    });
                  }
                }}
                disabled={isDefaultRate} // Disable input when using default rate
              /> */}

              <h6 className="flex items-center gap-2 mb-[17px] text-[#6B6B6B] text-[16px] font-[400] leading-[18px] mt-[1px] tracking-[-0.32px]">
                <input
                  type="checkbox"
                  className="!bg-[#774DFD]"
                  checked={isDefaultRate}
                  onChange={handleCheckboxChange}
                />
                offer with your default rate
              </h6>
            </div>

            <div className="flex flex-col pl-[90px] border-r-[2px] border-gray-300 pr-[80px]">
              <p className="text-sm font-[600] mb-[4px]">
                Introduce yourself to the Client
                <span className="text-[#C20000] ml-1">*</span>
              </p>
              <textarea
                className={`p-[16px] w-[350px] h-[110px] border rounded-md ${messageError
                  ? "border-[#FF8F8F] shadow-md shadow-red-300"
                  : "border-gray-300"
                  } focus:outline-none placeholder:text-[14px]`}
                placeholder="Hi, this is John Doe. I am a professional mixologist, RBS certified, and I have a full bar kit. I would be happy to help with your event."
                value={message}
                onChange={handleMessageChange}
              ></textarea>
              {messageError && (
                <span className="text-red-500 text-sm mt-2">
                  {messageError}
                </span>
              )}
            </div>
            <div className="flex flex-col mt-[16px]">
              <h6 className="text-3xl pl-[120px] pb-[4px] font-[400] flex items-center gap-2">
                <span className="flex items-center">
                  <Image
                    src="/icons/dollar-sign.svg" // Replace with your actual path
                    alt="dollar sign"
                    className="inline-block" // Ensure inline behavior
                    width={20} // Adjust size as needed
                    height={20}
                  />
                  <span className="font-[600] text-3xl">{totalAmount}</span>
                </span>
                <span className="text-sm text-gray-600 mt-2">Total amount</span>
              </h6>

              <button
                onClick={!isButtonDisabled && !isLoading ? onSubmit : undefined}
                className={`py-[16px] ${isButtonDisabled || isLoading
                  ? "bg-[#330abc7a] cursor-not-allowed"
                  : "bg-[#350ABC] cursor-pointer"
                  } text-[#e0d9f8] !font-[400] leading-[26px] !text-[16px] tracking-[-0.32px] opacity-[${isButtonDisabled ? "0.5" : "0.9"
                  }] px-[80px] rounded-full ml-[55px] 
    transition-transform duration-150 ease-in-out 
    grow_ellipse active:scale-95 active:shadow-inner`}
                disabled={isButtonDisabled || isLoading}
              >
                {isLoading ? "Submitting offer..." : "Submit Offer"}
              </button>

              <h6 className="text-sm pl-[80px] mt-[4px]">
                * transaction charges will apply
              </h6>
            </div>
          </div>
        </div>
        <div className="bg-[#FFF7EC] w-full h-fit py-4 mt-[16px] flex justify-start items-center border-dotted border-2 border-[#F9E2B6]">
          <div className="border-r border-[#F9E2B6] pr-[10px] border-gray-400">
            <Image
              className="relative h-full pl-[8px] w-[92px]"
              width={32}
              height={100}
              alt="verified"
              src="/icons/messageIcon.svg"
            />
          </div>
          <ul className="pl-[40px] text-sm flex flex-col space-y-[8px] list-disc ">
            <p className="font-[500] text-[18px] leading-[8px] mb-2 mt-2">How to make an impact?</p>
            <li>Let the client know why you are the best choice for their event. </li>
            <li>Feel free to share your social media account.</li>
            <li>Do not share sensitive information i.e. email, phone number, address.</li>
            <li>Open this page in cell phone to chat with client.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Offered;
