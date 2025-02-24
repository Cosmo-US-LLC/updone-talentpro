import React, { useEffect, useRef, useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/lib/store/features/authSlice";
import { useForm } from "react-hook-form";
import { loginInputStyles } from "@/app/lib/styles";
import Cookies from "js-cookie";
import { apiRequest } from "@/app/lib/services";
import MyModal from "../../common/modal/Modal";
import { montserrat } from "@/app/lib/Fonts";
import { RiRecycleLine } from "react-icons/ri";
import { BiLock, BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useError } from "@/app/lib/context/ErrorProvider";
import { getErrorMessage } from "@/app/lib/validations/schema";

const LoginForm = ({
  isOpenresetPasswordModal,
  setIsOpenResetPasswordModal,
  handleClose,
  handleRegisterClick,
  setShowLogin,
  hideRegisterLink = false,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [resetMessage, setResetPasswordMessage] = useState<any>("");
  const {
    handleError,
    errorMessage: error,
    setErrorMessage: setError,
  } = useError();
  const isUpdoneDomain = window.location.hostname.includes("updone");
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  // const [error, setError] = useState<string | undefined | null>(null);
  const getResetMessage = (error: string | undefined) => {
    if (error) {
      setResetPasswordMessage(error);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const body = {
      email: data?.email,
      password: data?.password,
    };
    try {
      const newData = await apiRequest(
        "/login",
        {
          method: "POST",
          body: body,
        },
        handleError
      ); // API call
      if (newData?.token) {
        handleClose?.();
        setShowLogin?.(false);
      }
      if (newData?.token) {
        setLoginSuccess(true);
        // Set the token cookie
        Cookies.set("authToken", newData?.token);

        // Set the authData cookie
        Cookies.set("authData", JSON.stringify(newData));

        dispatch(setAuth(newData));
      }
      setTimeout(() => {
        if (newData?.token) {
          setShowLogin?.(false);
        }
      }, 2500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitResetPassword = async (data: any) => {
    setLoadingResetPassword(true);
    const body = {
      email: data?.email,
    };
    try {
      const newData = await apiRequest(
        "/resetPassword",
        {
          method: "POST",
          body: body,
        },
        handleError,
        getResetMessage
      );
      if (newData) {
        setResetPasswordSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingResetPassword(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginComponent = () => {
    return (
      <div className="w-[300px] relative bottom-[311px] right-[-83px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full" style={{ width: "413px" }}>
            <div>
              <span className="flex justify-center items-center relative top-[21px]">
                <Image
                  width={98}
                  height={98}
                  src="/images/booking/6.svg"
                  alt="step-1"
                />
              </span>
              <h3
                style={{}}
                className={`${styles.loginpopup_heads} ${
                  loading && "opacity-[10%]"
                }`}
              >
                Welcome Back
              </h3>
              {/* <p className={`${styles.loginpopup_bodys} ${loading && "opacity-[10%]"} text-center`}>Login to create events and job to hire the best talent in town. </p> */}
            </div>

            <div className="absolute inset-y-0 mt-[165px] ml-[12px] start-0 flex items-center ps-3 pointer-events-none">
              <Image
                width={14}
                height={14}
                src="/images/booking/8.svg"
                alt="step-1"
              />
            </div>
            <input
              style={{
                ...loginInputStyles, // Apply base styles
                ...(error == "User not found" && {
                  boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                }),
              }}
              id="default-search"
              type="email"
              className={`${
                error == "User not found" && "border-[1px] border-[red]"
              } ${error == "User not found" && "bg-[#FFF5F5]"} ${
                styles.defaultsearch
              } ${
                loading && "opacity-[10%]"
              } mt-[12px] shadow-lg pb-[14px] pt-[17px] pl-[50px] min-h-[52px] w-full focus:outline-blue-200`}
              placeholder="Email Address*"
              {...register("email")}
            />
          </div>
          <div className="relative w-full" style={{ width: "413px" }}>
            <div className="relative w-full max-w-full mt-3">
              {/* Left icon (Password Icon) */}
              <span
                className={`absolute ${
                  !!error && "!top-[25%]"
                } top-[34%] transform -translate-y-1/2 left-[12px] flex items-center pl-3 pointer-events-none`}
              >
                <Image
                  width={14}
                  height={14}
                  src="/images/booking/9.svg"
                  alt="step-1"
                />
              </span>

              {/* Input field */}
              <input
                style={{
                  ...loginInputStyles, // Apply base styles
                  ...(error === "Invalid credentials" && {
                    boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                  }),
                }}
                type={showPassword ? "text" : "password"} // Switch between password and text
                {...register("password")}
                id="default-search"
                className={`${
                  error == "Invalid credentials" && "border-[1px] border-[red]"
                } ${error === "Invalid credentials" && "bg-[#FFF5F5]"} ${
                  styles.defaultsearch
                } ${
                  loading && "opacity-[10%]"
                } shadow-lg pb-[14px] pt-[14.5px] pl-[50px] min-h-[52px] w-full focus:outline-blue-200`}
                placeholder="Password*"
              />

              {/* Right icon (Toggle Password Visibility) */}
              <span
                className={`absolute top-[34%] ${
                  !!error && "!top-[25%]"
                } transform -translate-y-1/2 right-0 flex items-center pr-3 cursor-pointer`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BiHide className="text-gray-400" size={20} />
                ) : (
                  <BiShow className="text-gray-400" size={20} />
                )}
              </span>
              {error && (
                <span
                  className={`text-[#C20000] normal-case mt-1 relative bottom-[3px] text-[12px] font-[400] leading-[24px] block ${
                    resetPasswordSuccess && "opacity-0"
                  }`}
                >
                  {getErrorMessage(error)}
                </span>
              )}

              <div className="flex justify-end">
                <div
                  className={`${
                    error ? "mb-2" : "mt-2"
                  } text-[#350ABC] cursor-pointer text-[14px] font-[600]`}
                  onClick={() => {
                    setIsOpenResetPasswordModal?.(true);
                  }}
                >
                  Reset Password
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`${styles.login_btn_} !mx-0 !w-full ${
                error ? "!mt-0" : "mt-[20px]"
              } justify-center ${
                loading ? "!bg-[#2C2240]" : "bg-[#350ABC]"
              } text-[#F3F0FF3] opacity-[0.9] rounded-[4px] px-[16px] py-[18px] text-center inline-flex items-center cursor-pointer active:scale-95 active:shadow-inner transition-transform duration-150`}
            >
              {loading ? <div className="loader_login"></div> : "Login"}
              {!loading && (
                <span className={`ml-2`}>
                  <Image
                    width={16}
                    height={16}
                    src="/images/booking/arrowleft.svg"
                    alt="step-1"
                  />
                </span>
              )}
            </button>

            {loginSuccess && (
              <div className="text-green-500 text-center mt-4 absolute w-full top-[176px]">
                Login Successful!
              </div>
            )}

            {!hideRegisterLink && ( // Conditionally render the register link
              <div className="flex justify-center items-center gap-2">
                <p
                  className={`text-[#494848] normal-case text-[14px] fonr-[400] leading-[24px] tracking-[-0.28px]`}
                >
                  Do not have an account?
                </p>
                <p
                  className={`text-[#350ABC] text-[14px] font-[600] leading-[24px] tracking-[-0.28px] cursor-pointer`}
                  onClick={handleRegisterClick}
                >
                  Register
                </p>
              </div>
            )}

            {/* <div className='flex justify-center items-center gap-2'>
                            <p className={`text-[#494848] normal-case text-[14px] fonr-[400] leading-[24px] tracking-[-0.28px]`}>
                                Do not have an account?
                            </p>
                            <p className={`text-[#350ABC] text-[14px] font-[600] leading-[24px] tracking-[-0.28px] cursor-pointer`} onClick={handleRegisterClick}>
                                Register
                            </p>
                        </div> */}
          </div>
        </form>
      </div>
    );
  };

  const ResetPasswordComponent = () => {
    return (
      <div className="w-[300px] relative bottom-[274px] right-[-83px]">
        <form
          onSubmit={handleSubmit(onSubmitResetPassword)}
          className="space-y-8"
        >
          <div className="relative w-full space-y-5" style={{ width: "413px" }}>
            <div className="relative top-[-14px]">
              <span className="flex justify-center items-center relative top-[21px]">
                <Image
                  width={98}
                  height={98}
                  src="/images/booking/6.svg"
                  alt="step-1"
                />
              </span>
              <h3
                style={{}}
                className={`${styles.loginpopup_heads} ${
                  loadingResetPassword && "opacity-[10%]"
                }`}
              >
                Reset Password
              </h3>
              <p
                className={`text-center styles.loginpopup_bodys ${
                  loading && "opacity-[10%]"
                }`}
                style={{ textTransform: "none" }}
              >
                Please Enter Your Email to Reset
              </p>
            </div>

            <div className="absolute bottom-[-168px] inset-y-0 mt-[162px] ml-[12px] start-0 flex items-center ps-3 pointer-events-none">
              <Image
                width={14}
                height={14}
                src="/images/booking/8.svg"
                alt="step-1"
              />
            </div>
            <input
              style={{
                ...loginInputStyles,
                ...(resetMessage === "The given data was invalid." && {
                  boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px",
                }),
              }}
              id="default-search"
              type="email"
              className={`${
                error == "User not found" && "border-[1px] border-[red]"
              } ${
                resetMessage === "The given data was invalid." && "bg-[#FFF5F5]"
              } ${styles.defaultsearch} ${
                loadingResetPassword && "opacity-[10%]"
              } mt-[12px] shadow-lg pb-[14px] pt-[17px] pl-[45px] min-h-[52px] w-full focus:outline-blue-200`}
              placeholder="Email Address*"
              {...register("email")}
            />
          </div>
          <div className="relative w-full" style={{ width: "413px" }}>
            <button
              disabled={loadingResetPassword}
              type="submit"
              className={`${styles.login_btn_} !mx-0 !w-full ${
                error ? "!mt-0" : "mt-[20px]"
              } justify-center ${
                loadingResetPassword ? "!bg-[#2C2240]" : "bg-[#350ABC]"
              } } 
    text-[#F3F0FF3] opacity-[0.9] rounded-[4px] px-[16px] py-[18px] text-center inline-flex items-center 
    cursor-pointer active:scale-95 active:shadow-inner transition-transform duration-150`}
            >
              {loadingResetPassword ? (
                <div className="loader_login"></div>
              ) : (
                "Reset my password"
              )}
              {!loadingResetPassword && (
                <span className={`ml-2`}>
                  <Image
                    width={16}
                    height={16}
                    src="/images/booking/arrowleft.svg"
                    alt="step-1"
                  />
                </span>
              )}
            </button>
            <div className="mt-[20px] w-full">
              <div className="flex justify-center">
                <div
                  className="mt-2 cursor-pointer text-[#350ABC]  cursor-pointertext-[14px] font-[600] hover:underline"
                  onClick={() => {
                    setError("");
                    setResetPasswordSuccess?.(false);
                    setIsOpenResetPasswordModal?.(false);
                  }}
                >
                  Return to login
                </div>
              </div>
            </div>
            {resetPasswordSuccess && (
              <div
                className={` text-center text-[14px] mt-2 w-full ${
                  resetMessage === "The given data was invalid."
                    ? "text-[#C20000]"
                    : "text-green-500"
                }`}
              >
                {resetMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    );
  };
  return (
    <div
      ref={containerRef}
      className="login_backgorund rounded-[47%] h-[507px] w-[567px] top-[309px] right-[54px] relative"
    >
      {isOpenresetPasswordModal === false ? (
        <LoginComponent />
      ) : (
        <ResetPasswordComponent />
      )}
    </div>
  );
};

export default LoginForm;
