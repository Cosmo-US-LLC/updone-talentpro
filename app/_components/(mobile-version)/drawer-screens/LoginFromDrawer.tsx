import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { setAuth } from "@/app/lib/store/features/authSlice";
import { useDispatch } from "react-redux";

const LoginFromDrawer = ({ setCurrentScreen }: any) => {
  const isUpdoneDomain = window.location.hostname.includes("updone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleError,
    errorMessage: error,
    setErrorMessage: setError,
  } = useError();

  useEffect(() => {
    setError("");
  }, []);

  const onChangeEmail = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.length > 40) {
      setEmailError("Email cannot exceed 40 characters.");
    } else if (newEmail.length === 0) {
      setEmailError("Email is required.");
    } else if (!validateEmailFormat(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const onChangePassword = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setPasswordError("Password is required.");
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }
  };

  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputFields = () => {
    let isValid = true;

    if (email.length === 0) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (password.length === 0) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleClickLogin = async () => {
    setError("");
    if (!validateInputFields()) {
      return;
    }
    if (emailError || passwordError) {
      return;
    }
    setLoading(true);
    const body = {
      email: email,
      password: password,
    };
    try {
      const newData = await apiRequest(
        "/login",
        {
          method: "POST",
          body: body,
        },
        handleError
      );

      if (newData?.token) {
        dispatch(setAuth(newData));
        setLoginSuccess(true);
        Cookies.set("token", newData?.token, {
          expires: 30,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });
        Cookies.set("authData", JSON.stringify(newData), {
          expires: 30,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });
        setTimeout(() => {
          // if (newData?.user?.role_id === 3) {
          //   router.push(`${process.env.NEXT_PUBLIC_TALENTPRO_URL}/talent/events`)
          // } else {
          location.reload();
          // }
        }, 1000);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto pt-1" style={{ scrollbarWidth: "none" }}>
      <div className="flex justify-center items-center ">
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
      <div className="flex flex-col gap-4 mx-4 my-2">
        <div className="text-center">
          <h3 className="text-[24px] text-[#100F14] font-[500] text-center leading-normal mb-[6px]">
            Login To Make an Offer
          </h3>
          {/* <p className="text-[#6B6B6B] text-[14px] leading-[24px] font-[400] px-[4px]">
            View details, make an offer, start earning!
          </p> */}
        </div>

        <div>
          <div className="w-full relative">
            <img
              src="/images/mobile/user.svg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              alt=""
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                onChangeEmail(e);
              }}
              className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${emailError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
                } !rounded-[8px] bg-[#FFF] ${emailError !== ""
                  ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                  : ""
                }`}
              placeholder="Email address"
            />
          </div>
          {
            <p
              className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${emailError !== "" ? "opacity-100" : "opacity-0"
                } ${emailError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
            >
              {emailError}
            </p>
          }
        </div>
        <div>
          <div className="w-full relative">
            <img
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              src="/images/mobile/eye.svg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              alt=""
            />
            <input
              type={showPassword ? "input" : "password"}
              value={password}
              onChange={(e) => {
                onChangePassword(e);
              }}
              className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${passwordError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
                } !rounded-[8px] bg-[#FFF] ${passwordError !== ""
                  ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                  : ""
                }`}
              placeholder="Password"
            />
          </div>
          {
            <p
              className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${passwordError !== "" ? "opacity-100" : "opacity-0"
                } ${passwordError !== "" ? "max-h-20" : "max-h-0"
                } overflow-hidden`}
            >
              {passwordError}
            </p>
          }
        </div>
        <div className="cursor-pointer flex items-center justify-end   ">
          <p
            onClick={() => {
              setCurrentScreen("reset-password");
            }}
            className="text-[#350ABC] font-[400] text-[14px] leading-[24px]"
          >
            Reset password
          </p>
        </div>

        {/* <hr className="bg-[#EBE6FF] h-[1px] border-0 w-full " /> */}
        <div className="flex justify-center items-center gap-4  z-[9999]">
          {loginSuccess === true ? (
            <div className="rounded-[4px] py-[10px] w-[90%] text-[white] bg-[#350ABC] flex flex-row items-center justify-center gap-2">
              <img
                src="/images/mobile/check_success.svg"
                className="h-[23px] w-[23px]"
                alt="check_success"
              />
              <p className="text-[#9DFF95]">Login Successfull</p>
            </div>
          ) : (
            <button
              disabled={loading}
              onClick={() => {
                handleClickLogin();
              }}
              className="rounded-[4px] py-[10px] w-[100%] text-[white] bg-[#350ABC]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          )}
        </div>
        <div className="flex items-center justify-center">
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${error !== "" ? "opacity-100" : "opacity-0"
              } ${error !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
          >
            {error}
          </p>
        </div>
      </div>
      {/* <div className='flex items-center justify-center w-full mt-4'>
                <p className='text-[#494848] font-[400] text-[14px] leading-[24px]'>
                    Do not have an account?
                    <span
                        onClick={() => {
                            setCurrentScreen('register')
                        }}
                        className='cursor-pointer text-[#350ABC] ml-1'>
                        Register
                    </span>
                </p>
            </div> */}
    </div>
  );
};

export default LoginFromDrawer;
