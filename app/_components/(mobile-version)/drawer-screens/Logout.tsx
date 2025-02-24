import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Cookies from "js-cookie";
import Image from "next/image";
import { LiaLevelUpAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();

  const handleClickLogout = () => {
    const isUpdoneDomain = window?.location?.hostname?.includes("updone");
    dispatch(clearAuth());
    dispatch(setStaffEmpty());
    dispatch(setBookingEmpty());
    dispatch(setJobEmpty());
    dispatch(setAuthEmpty());
    Cookies.remove("token", {
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
    });
    Cookies.remove("authData", {
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
    });
    location.reload();
  };

  return (
    <div className="overflow-y-auto p-4" style={{ scrollbarWidth: "none" }}>
      <div className="flex flex-row items-start justify-start gap-4">
        <Image
          src="/images/user.svg"
          alt="user"
          width={48}
          height={48}
          quality={100}
        />

        <div className="">
          <p className="leading-[27px] text-[18px] font-[500] text-[#2C2240]">
            {storedData?.user?.email}
          </p>
          <p className="text-[#575555] leading-[24px] text-[14px]">
            {storedData?.user?.name}
          </p>
        </div>
      </div>
      <div className="h-[1px] bg-[#EBEBEB] w-full my-4" />
      {storedData?.user?.role_id === 4 ? (
        <>
          <p className="font-[400] text-[14px] leading-[24px] text-[#575555]">
            <strong className="font-[400] text-[14px] leading-[24px] !text-black">
              Client Hub
            </strong>{" "}
            is coming to your mobile very soon. In the meantime, use desktop to
            manage your events.
          </p>
        </>
      ) : (
        <div className="flex flex-row items-center justify-center w-full">
          <div
            onClick={() => {
              setIsButtonLoading(true);
              router.push(
                `/`
              );
            }}
            className="bg-[#350ABC] rounded-full w-[50%] py-4 self-center"
          >
            <p className="flex items-center justify-center text-center text-[white] font-[500] text-[18px] leading-[24px]">
              {isButtonLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "TalentPro"
              )}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-center mt-6">
        <button
          onClick={handleClickLogout}
          className="rounded-[4px] py-[10px] w-[90%] text-[#C20000] bg-[#FFF8F8]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
LiaLevelUpAltSolid;
