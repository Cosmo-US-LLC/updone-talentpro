"use client";
import { montserrat } from "@/app/lib/Fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import Breadcrumbs from "../ui/bread-crumbs";
import { apiRequest } from "@/app/lib/services";
import { useAppSelector } from '@/app/lib/store/hooks';
import { selectAuth } from '@/app/lib/store/features/authSlice';
import { formatWorkingTimes } from "@/app/lib/helpers/formatDateTime";

const Settlements = ({ jobId }) => {
  const [data, setData] = useState({});
  const [additionalHours, setAdditionalHours] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { auth: storedData } = useAppSelector(selectAuth);

  const fetchSettlementDetails = async () => {
    try {
      const body = {
        job_id: jobId,
      };

      const settlementData = await apiRequest('/settlement/details', {
        method: 'POST',
        body: body,
        headers: {
          ...(storedData && { 'Authorization': `Bearer ${storedData.token}` }),
        },
      });

      setData(settlementData);

    } catch (error) {
    } finally {
    }
  };

  const submitSettlement = async () => {
    try {
      const body = {
        job_id: jobId,
        extra_hours: additionalHours,
      };

      const settlementData = await apiRequest('/invitation/requestExtraHours', {
        method: 'POST',
        body: body,
        headers: {
          ...(storedData && { 'Authorization': `Bearer ${storedData.token}` }),
        },
      });

      location.reload();

    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchSettlementDetails();
  }, []);

  const getDefaultRate = () => {
    if (data?.offered_amount) {
      return Math.trunc(data?.offered_amount);
    }
    // var output;
    // if (data?.offered_price === 'default') {
    //   output = data?.worker?.per_hours_rate;
    // } else {
    //   output = data?.offered_price;
    // }
    // return Math.trunc(output);
  };

  const getTotal = () => {
    if (data?.offered_amount) {
      return additionalHours * Math.trunc(data?.offered_amount);
    }
    // var getDefaultRate;
    // if (data?.offered_price === 'default') {
    //   getDefaultRate = data?.worker?.per_hours_rate;
    // } else {
    //   getDefaultRate = data?.offered_price;
    // }
    // return additionalHours * Math.trunc(getDefaultRate);
  }

  const handleHoursChange = (e) => {
    const value = e.target.value;
    setAdditionalHours(Number(value));
  };

  const handleChangeStartTime = (e) => {
    const value = e.target.value;
    setStartTime(value);
  };

  const handleChangeEndTime = (e) => {
    const value = e.target.value;
    setEndTime(value);
  };

  return (
    <div className="relative pb-[80px]">
      <div >
        <Image
          width={813}
          height={960}
          alt="verified"
          className="absolute left-0 top-[-15%]"
          src="/images/settlements/Vector (2).svg"
        />
      </div>
      <div>
        <Image
          width={813}
          height={906}
          alt="verified"
          className="absolute right-0 top-[-15%]"
          src="/images/settlements/Vector (1).svg"
        />
      </div>
      <div className="max-w-[1279px] mx-auto">
        <Breadcrumbs currentStep={2} />
        <div
          className="p-[24px] mt-[15px] rounded-[4px] mb-[30px] space-y-[24px] border border-[#fff] bg-[#fff]"
          style={{
            background:
              "linear-gradient(93deg, #FFF 0%, rgba(255, 255, 255, 0.00) 99.3%)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="flex items-center space-x-[16px]">
            <div className="flex items-center space-x-1">
              <Image
                width={14}
                height={14}
                alt="verified"
                src="/images/settlements/briefcase.svg"
              />
              <h3 className="text-[16px] font-[500] tracking-[-0.34px] leading-[normal]">
                Completed Service:
              </h3>
            </div>
            <div className="px-[18px] py-[8px] bg-[#F3F0FF] rounded-[32px]">
              <p className="text-[16px] text-center font-[400] leading-[26px]">
                {data?.job?.service.name}
              </p>
            </div>
          </div>
          <div className="space-y-[10px]">
            <h2
              className={`${montserrat.className} text-[#000] tracking-[-0.32px] leading-[normal] font-[600] text-[32px] treacking-[-1.28px]`}
            >
              {data?.job?.title}
            </h2>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-[16px]">
              <div className="flex space-x-[6px] items-center">
                <Image
                  width={14}
                  height={14}
                  alt="verified"
                  src="/images/settlements/map-pin.svg"
                />
                <h5 className="text-[16px] font-[500] text-[#000]">
                  Event Location:
                </h5>
              </div>
              <p className="text-[#6B6B6B] text-[16px] font-[400] treaking-[-0.32px] leading-[24px]">
                {data?.job?.event_location}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-[16px]">
            <div className="flex space-x-[6px] items-center">
              <Image
                width={14}
                height={14}
                alt="verified"
                src="/images/settlements/clock.svg"
              />
              <h5 className="text-[16px] font-[500] text-[#000]">
                Event Time & Date:
              </h5>
            </div>
            <p className="text-[#6B6B6B] text-[16px] font-[400] treaking-[-0.32px] leading-[24px]">
              {data?.job?.working_times && formatWorkingTimes(data?.job?.working_times)}
            </p>
          </div>
          <div className="flex items-center space-x-[16px]">
            <div className="flex space-x-[6px] items-center">
              <Image
                width={14}
                height={14}
                alt="verified"
                src="/images/settlements/note 1.svg"
              />
              <h5 className="text-[16px] leading-[normal] font-[500] text-[#000]">
                Task Details:
              </h5>
            </div>
            <p className="text-[#6B6B6B] text-[16px] font-[400] treaking-[-0.32px] leading-[24px]">
              {data?.job?.description}{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-between space-x-[30px]">
          <div className="w-[60%] border border-[#F3F0FF] space-y-[40px] p-[24px] rounded-[4px] space-y-[24px] rounded-[4px] !bg-[#fff] relative z-[1]">
            <div className="space-y-[20px]">
              <h2
                className={`${montserrat.className} text-[#000] tracking-[-0.32px] leading-[normal] font-[600] text-[24px] treacking-[-1.28px]`}
              >
                Add additional hours
              </h2>
              <p className="text-[#6B6B6B] tracking-[-0.32px] leading-[30px] font-[400] text-[16px] mb-[24px]">
                Add your additional working hour for settlement
              </p>
            </div>
            <div className="space-y-[20px]">
              {/* <div className="flex justify-between">
                <div className="space-y-[10px]">
                  <h5 className="text-[##2C2240] text-[16px] font-[500] leading-[17px] treacking-[0.282px]">
                    Extra Hours
                  </h5>
                  <input
                    type="number"
                    min={1}
                    value={additionalHours}
                    className='!outline-none pl-[85px] w-[168px] py-[16px] px-[30px] border-[1px] rounded-[4px] border-[#E5DDFF] mr-[24px]'
                    onChange={handleHoursChange}
                  />
                </div>
              </div> */}
              <div className="space-y-[20px]">
                <div className="space-y-[10px]">
                  <h5 className="text-[##2C2240] text-[16px] font-[500] leading-[17px] treacking-[0.282px]">
                    Extra Hours
                  </h5>
                  <div className="flex space-x-[10px]">
                    {[1, 2, 3, 4].map((hour) => (
                      <div
                        key={hour}
                        className={`w-[80px] h-[50px] flex justify-center items-center rounded-[8px] cursor-pointer transition-transform transform hover:scale-105 ${additionalHours === hour ? 'bg-[#774DFD] text-white' : 'bg-[#E5DDFF] text-[#2C2240]'
                          }`}
                        onClick={() => setAdditionalHours(hour)}
                      >
                        {hour}Hr{hour > 1 ? 's' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="w-[40%] border border-[#F3F0FF] space-y-[22px] pb-[22px] rounded-[4px]   !bg-[#fff] relative z-[1]">
            <div className="flex border-b border-[#F3F0FF] p-[24px] !bg-[#FBF9FF]">
              <div className="w-[55%] pr-[25px] ">
                <div className="flex justify-between py-[20px] px-[8px] border-b border-[#ECE6FF]">
                  <p className="text-[#2C2240] text-[16px] font-[500]">Additional hours</p>
                  <p className="treacking-[-0.28px] text-[#2C2240] text-[16px] font-[400]">{additionalHours}h</p>
                </div>
                <div className="flex justify-between py-[20px] px-[8px] border-b border-[#ECE6FF]">
                  <p className="text-[#2C2240] text-[16px] font-[500]">Rate per hour</p>
                  <p className="treacking-[-0.28px] text-[#2C2240] text-[16px] font-[400]">${data?.job && getDefaultRate()}</p>
                </div>
                <div className="flex justify-between pt-[20px] px-[8px]">
                  <p className="text-[#2C2240] text-[16px] font-[500]">Subtotal</p>
                  <p className="treacking-[-0.28px] text-[#2C2240] text-[16px] font-[400]"><span className="text-[#9F9F9F] text-[12px] font-[400] pr-2">{additionalHours} hours x {data?.job && getDefaultRate()}</span> ${data?.job && getTotal()}</p>
                </div>
              </div>
              <div className="w-[45%] pt-[20px] border-l border-[#fff] pl-[25px]">
                <h3 className="text-[70px] text-[500] treacking-[-2.8px] text-[#350ABC]">${data?.job && getTotal()}</h3>
                <p className="text-[12px] font-[400] text-[#6B6B6B]">Additional payable amount</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="py-[16px] flex  justify-center text-[#fff] items-center px-[20px] bg-[#774DFD] rounded-[4px]"
                onClick={() => {
                  submitSettlement();
                }}
                disabled={data?.settlementAlreadySubmitted}
              >
                {
                  data?.settlementAlreadySubmitted === false ? "Submit Settlement" : "Already Submitted"
                }
                <span>
                  <Image
                    width={16}
                    height={16}
                    alt="verified"
                    src="/images/settlements/send (1).svg"
                    className="ml-2"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settlements;