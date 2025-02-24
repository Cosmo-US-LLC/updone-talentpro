import Image from "next/image";
import { useEffect, useState } from "react";

interface InputState {
  inputValue: string;
}

const AlreadyOffered = ({ jobData, setOpenDrawer }: any) => {
  const hourRate =
    jobData?.invite?.offered_price === "default"
      ? jobData?.myWorkingDetails?.per_hours_rate
      : jobData?.invite?.offered_price;
  const [isDefaultRate, setIsDefaultRate] = useState<boolean>(true);
  const [state, setState] = useState<InputState>({
    inputValue: hourRate ? hourRate?.toString() : "",
  });

  useEffect(() => {
    calculateTotalIncome();
  }, [state]);

  function calculateTotalHours() {
    const startTime = new Date(
      `${jobData?.job?.working_times[0]?.date}T${jobData?.job?.working_times[0]?.start_time}`
    ).getTime();
    const endTime = new Date(
      `${jobData?.job?.working_times[0]?.date}T${jobData?.job?.working_times[0]?.end_time}`
    ).getTime();
    const differenceInMilliseconds = endTime - startTime;
    const totalHours = differenceInMilliseconds / (1000 * 60 * 60);
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

  return (
    <div
      className="overflow-y-auto p-4 flex flex-col items-center gap-4"
      style={{ scrollbarWidth: "none" }}
    >
      <Image
        alt="assigned-person"
        height={35}
        width={83}
        quality={100}
        className=""
        src={"/images/mobile/talent/clinking-glass.svg"}
      />

      <p className="text-[20px] font-[400] leading-[30px]">
        You have made an offer
      </p>
      <p className="text-[16px] font-[400] leading-[24px] text-[#4C4B4B]">
        Now Check your emails regularly in case you get hired or for new job
        invites.
      </p>

      <div className="h-[56px] bg-[#FFEFD7] rounded-[4px] w-[100%] flex flex-row items-center justify-between py-8 px-2">
        <div>
          <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
            Per hour rate
          </p>
          <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
            ${isDefaultRate ? hourRate : state.inputValue}
          </p>
        </div>
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
      {/* <button
                onClick={() => {
                    setOpenDrawer(false);
                }}
                className="fixed bottom-4 w-[12rem] bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
            >
                {"Done"}
            </button> */}
      <div
        className="fixed bottom-2 p-2 w-full flex justify-center"
        style={{
          borderTop: "1px solid var(--Lavender, #EBE6FF)",
        }}
      >
        <button
          onClick={() => {
            setOpenDrawer(false);
          }}
          className="w-[12rem] mt-1 bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
        >
          {"Done"}
        </button>
      </div>
    </div>
  );
};

export default AlreadyOffered;
