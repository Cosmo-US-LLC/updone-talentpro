import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Logout from "./Logout";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const JoinUpdone = ({
  setCurrentScreen,
  version = "",
  setDrawerHeight,
  removeUpdoneText,
}: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const { auth: storedData } = useAppSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (storedData?.token) {
      setDrawerHeight("h-[370px]");
    }
  }, []);

  const isUpdoneDomain = window.location.hostname.includes("updone");

  const handleClickLogin = () => {
    Cookies.set("callbackUrl", pathname + window?.location?.search || "", {
      expires: 2,
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
    });
    // setCurrentScreen("login");
    router.push("/signin");
  };

  // const handleClickLogout = () => {
  //   const isUpdoneDomain = window?.location?.hostname?.includes("updone");
  //   dispatch(clearAuth());
  //   Cookies.remove("token", {
  //     path: "/",
  //     ...(isUpdoneDomain && { domain: ".updone.com" }),
  //   });
  //   Cookies.remove("authData", {
  //     path: "/",
  //     ...(isUpdoneDomain && { domain: ".updone.com" }),
  //   });
  //   location.reload();
  // };

  const handleClickRegister = () => {
    Cookies.set("callbackUrl", pathname + window?.location?.search || "", {
      expires: 2,
      path: "/",
      ...(isUpdoneDomain && { domain: ".updone.com" }),
    });
    // setCurrentScreen("register");
    router.push("/signup");
  };

  const bottomBarMessage = () => {
    if (version === "beforePostingEvent") {
      return (
        <p
          className={`text-[#6B6B6B] leading-[24px] font-[400] px-[4px] ${
            removeUpdoneText === true ? "text-[16px] mt-8" : "text-[14px]"
          }`}
        >
          You are just one step away <br /> from posting your event!
        </p>
      );
    } else if (version === "talentOffer") {
      return (
        <p className="text-[#6B6B6B] text-[14px] leading-[24px] font-[400] px-[4px]">
          Sign In or Sign up to your updone <br /> talent hub to make an offer.
        </p>
      );
    } else {
      return (
        <p className="text-[#6B6B6B] text-[14px] leading-[24px] font-[400] px-[4px]">
          Sign In or Sign up to updone to book pro event <br /> staff in a snap
        </p>
      );
    }
  };

  if (storedData?.token) {
    return <Logout />;
  } else {
    return (
      <div className="">
        <div className="mt-4 flex justify-center items-center ">
          <span className="bg-[#FFF] p-4 rounded-full">
            <svg
              width="31"
              height="33"
              viewBox="0 0 31 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2583_72498)">
                <path
                  d="M15.2382 16.1126C19.4401 16.1126 22.8572 12.6955 22.8572 8.49356C22.8572 4.29165 19.4401 0.874512 15.2382 0.874512C11.0363 0.874512 7.61914 4.29165 7.61914 8.49356C7.61914 12.6955 11.0363 16.1126 15.2382 16.1126ZM15.2382 2.14435C18.7391 2.14435 21.5874 4.99261 21.5874 8.49356C21.5874 11.9945 18.7391 14.8428 15.2382 14.8428C11.7372 14.8428 8.88898 11.9945 8.88898 8.49356C8.88898 4.99261 11.7372 2.14435 15.2382 2.14435Z"
                  fill="#350ABC"
                />
                <path
                  d="M14.4762 19.1602C14.0556 19.1602 13.7143 18.8189 13.7143 18.3983C13.7143 17.9777 14.0556 17.6364 14.4762 17.6364H15.2381C23.2198 17.6364 29.7143 24.1309 29.7143 32.1126C29.7143 32.5332 29.373 32.8745 28.9524 32.8745C28.5318 32.8745 28.1905 32.5332 28.1905 32.1126C28.1905 24.9705 22.3802 19.1602 15.2381 19.1602H14.4762Z"
                  fill="#350ABC"
                />
                <path
                  d="M15.2381 19.1602C15.6587 19.1602 16 18.8189 16 18.3983C16 17.9777 15.6587 17.6364 15.2381 17.6364H14.4762C6.49448 17.6364 0 24.1309 0 32.1126C0 32.5332 0.341333 32.8745 0.761905 32.8745C1.18248 32.8745 1.52381 32.5332 1.52381 32.1126C1.52381 24.9705 7.3341 19.1602 14.4762 19.1602H15.2381Z"
                  fill="#350ABC"
                />
              </g>
              <defs>
                <clipPath id="clip0_2583_72498">
                  <rect
                    width="30.4762"
                    height="32"
                    fill="white"
                    transform="translate(0 0.874512)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
        {/* <img
          src="/images/mobile/Ellipse 2625.png"
          className="absolute top-0 w-full z-[-1] rounded-tl-[9px] rounded-tr-[9px]"
          alt=""
        /> */}
        <div>
          <div className="text-center">
            <h3
              className={`text-[24px] text-[#100F14] font-[500] leading-normal mb-[6px]`}
            >
              {removeUpdoneText === true ? "" : "Join Updone"}
            </h3>
            {bottomBarMessage()}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mt-10 z-[9999]">
          <button
            onClick={handleClickLogin}
            className="rounded-[4px] py-[10px] max-w-[140px] w-full text-[#E77307] bg-[#FFEFE0]"
          >
            Login
          </button>
          <button
            onClick={handleClickRegister}
            className="rounded-[4px] py-[10px] max-w-[140px] w-full text-[#350ABC] bg-[#E3DAFF]"
          >
            Register
          </button>
        </div>
      </div>
    );
  }
};

export default JoinUpdone;
