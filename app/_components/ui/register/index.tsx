import React, { useEffect, useRef, useState } from "react";
import styles from "./register.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/app/lib/validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInputStyles } from "@/app/lib/styles";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { apiRequest } from "@/app/lib/services";
import MyModal from "../../common/modal/Modal";
import { montserrat } from "@/app/lib/Fonts";
import { RiRecycleLine } from "react-icons/ri";
import { BiHide, BiShow } from "react-icons/bi";
import { useError } from "@/app/lib/context/ErrorProvider";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegisterForm = ({
  isPostRegister,
  handleClose,
  setShowRegister,
  setShowLogin,
  handleShowLogin,
  setRegisterMenuOpen,
  setLoginMenuOpen,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [registerResponse, setData] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track visibility of password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
  });
  const [error, setError] = useState<string | null>(null);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [formData, setFormData] = useState<any>();
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const { handleError } = useError();
  const onSubmit = async (data: any) => {
    setLoading(true); // Show loading indicator
    const body = {
      name: data?.name,
      email: data?.email,
      company: data?.company,
      phone_number: data?.phoneNumber,
      password: data?.password,
      password_confirmation: data?.confirmPassword,
    };
    try {
      const newData = await apiRequest(
        "/register",
        {
          method: "POST",
          body: body,
        },
        handleError
      );
      setRegisterSuccess(true);
      setTimeout(() => {
        if (newData?.token) {
          setShowLogin?.(true);
          setShowRegister?.(false);
          setRegisterMenuOpen(false);
          setLoginMenuOpen(true);
        }
      }, 2500);
      setLoading(false);
      setData(newData);
      setFormData(data?.confirmPassword);
    } catch (error) {
    } finally {
      setLoading(false);
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

  const handleLoginClick = () => {
    handleShowLogin?.();
    setLoginMenuOpen?.(true);
    setRegisterMenuOpen?.(false);
  };

  const passwordRequirements = [
    {
      test: /[A-Z]/.test(password),
      message: "At least 1 uppercase letter",
    },
    {
      test: /[0-9]/.test(password),
      message: "At least 1 number",
    },
    {
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: "At least 1 special character",
    },
  ];

  // Determine if confirm password matches and validate requirements
  const isConfirmPasswordValid = confirmPassword === password;
  const allRequirementsMet = passwordRequirements.every((req) => req.test);
  const inputRef = useRef(null); // Create a ref for the input
  useEffect(() => {
    const inputElement = inputRef.current;

    const checkFocus = () => {
      if (document.activeElement === inputElement) {
        setIsConfirmPasswordFocused(true);
      } else {
        setIsConfirmPasswordFocused(false);
      }
    };

    // Set up an interval to periodically check focus
    const intervalId = setInterval(checkFocus, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="rounded-[47%] h-[560px] w-[567px] top-[384px] right-[83px] relative"
      >
        <div className="login_backgorund"></div>
        <div
          className={`overflow-auto ${
            isConfirmPasswordFocused || isPasswordFocused
              ? "overflow-scroll"
              : ""
          } relative ${
            isPostRegister ? "bottom-[420px]" : "bottom-[406px]"
          } pb-[40px] h-[756px] left-[64px]`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative right-[28px]"
          >
            <div className="flex justify-between flex-col gap-[8px] items-center">
              <div
                className="relative w-full top-[21px] left-[37px]"
                style={{ width: "465px" }}
              >
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
                    className={`${styles.loginpopup_heads} ${
                      loading && "opacity-[10%]"
                    }`}
                  >
                    Create Account
                  </h3>
                  <p
                    className={`${styles.loginpopup_bodys} ${
                      loading && "opacity-[10%]"
                    } text-center`}
                  >
                    Register with Updone to hire the best talent in town.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-col gap-[8px] items-center">
              <div
                className="relative w-full h-[70px] left-[37px]"
                style={{ width: "465px" }}
              >
                <div className="z-50 relative top-[47px] inset-y-0 mt-3 ml-[15px] start-0 flex items-center ps-3 pointer-events-none">
                  <Image
                    width={14}
                    height={14}
                    src="/images/auth/name.svg"
                    alt="step-1"
                  />
                </div>
                <input
                  type="text"
                  id="default-search"
                  className={`${styles.defaultsearch} ${
                    loading && "opacity-[10%]"
                  } ${
                    errors.name && "bg-[#FFF5F5]"
                  }  relative z-10 mt-[12px] pb-[14px] pt-[17px] pl-[50px] min-h-[52px] w-full ${
                    (errors as any)?.name?.message
                      ? "focus:outline-none !border-[.2px] border-[red]"
                      : "focus:outline-blue-200"
                  }`}
                  placeholder="Full Name*"
                  style={{
                    ...loginInputStyles, // Apply base styles
                    ...((errors as any).name?.message && {
                      boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                    }),
                  }}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-[#C20000] normal-case relative bottom-[3px] text-[12px] font-[400] leading-[24px] block">
                    {(errors as any).name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between flex-col gap-[8px] items-center">
              <div
                className="relative w-full h-[70px] left-[37px]"
                style={{ width: "465px" }}
              >
                <div className="z-50 relative top-[47px] inset-y-0 mt-3 ml-[12px] start-0 flex items-center ps-3 pointer-events-none">
                  <Image
                    width={14}
                    height={15}
                    src="/images/auth/email.svg"
                    alt="step-1"
                  />
                </div>
                <input
                  id="default-search"
                  className={`${styles.defaultsearch} ${
                    loading && "opacity-[10%]"
                  } ${
                    errors.email && "bg-[#FFF5F5]"
                  } relative z-10 mt-[12px] pb-[14px] pt-[17px] pl-[50px] min-h-[52px] w-full ${
                    error === "Email already in use" ||
                    (errors as any)?.email?.message
                      ? "focus:outline-none !border-[.2px] border-[red]"
                      : "focus:outline-blue-200"
                  }`}
                  placeholder="Email Address*"
                  style={{
                    ...loginInputStyles, // Apply base styles
                    ...(error === "Email already in use" ||
                    (errors as any)?.email?.message
                      ? {
                          boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                        }
                      : {}), // Fallback to an empty object if no error
                  }}
                  {...register("email")}
                  // Add onChange handler to reset the error when typing
                  onChange={(e) => {
                    // Clear the error when user starts typing
                    setError(null);
                    //@ts-ignore
                    clearErrors("email");
                    register("email").onChange(e); // call the register onChange method as well
                  }}
                />

                {error === "Email already in use" ? (
                  <span className="text-[#C20000] normal-case relative bottom-[3px] text-[12px] font-[400] leading-[24px] block">
                    {error}
                  </span>
                ) : (
                  errors.email && (
                    <span className="text-[#C20000] normal-case relative bottom-[3px] text-[12px] font-[400] leading-[24px] block">
                      {(errors as any).email.message}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-between flex-col gap-[8px] items-center">
              <div
                className="relative w-full h-[70px] left-[37px]"
                style={{ width: "465px" }}
              >
                <div className="z-50 relative top-[47px] inset-y-0 mt-3 ml-[12px] start-0 flex items-center ps-3 pointer-events-none">
                  <Image
                    width={16}
                    height={16}
                    src="/images/booking/company.svg"
                    alt="step-1"
                  />
                </div>
                
              </div>
            </div>
            <div className="flex justify-between flex-col gap-[8px] items-center">
              <div
                className="relative w-full mt-[40px] left-[37px]"
                style={{ width: "465px" }}
              >
                <PhoneInput
                  id="default-search"
                  className={`${styles.defaultsearch} ${
                    loading && "opacity-[10%]"
                  } ${
                    errors.phoneNumber && "bg-[#FFF5F5]"
                  }   pl-[22px] min-h-[52px] w-full relative z-[12] !rounded-[4px] ${
                    (errors as any)?.phoneNumber?.message
                      ? "focus:outline-none !border-[.2px] border-[red]"
                      : "focus:outline-blue-200"
                  }`}
                  defaultCountry="us"
                  style={{
                    ...loginInputStyles, // Apply base styles
                    ...((errors as any).phoneNumber?.message && {
                      boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                    }),
                  }}
                  {...(register("phoneNumber") as any)} // Bypass type-checking temporarily
                />
                {errors.phoneNumber && (
                  <span className="text-[#C20000] normal-case relative bottom-[3px] text-[12px] font-[400] leading-[24px] block">
                    {(errors as any)?.phoneNumber?.message}
                  </span>
                )}
              </div>
            </div>

            {/* Dotted Border */}
            <div
              style={{ width: "320px", margin: "14px auto 0px" }}
              className={`border border-b border-dashed left-[37px] relative !w-[463px] ${
                (errors as any)?.phoneNumber?.message && "!mt-[0]"
              }`}
            ></div>
            <div className="flex">
              <div className="flex justify-between flex-col gap-[8px] items-center">
                <div
                  className="relative w-full h-[70px] left-[37px]"
                  style={{ width: "465px" }}
                >
                  <input
                    type={showPassword ? "text" : "password"} // Toggle input type between text and password
                    id="password"
                    className={`${styles.defaultsearch} ${
                      loading && "opacity-[10%]"
                    } ${
                      errors.password && "bg-[#FFF5F5]"
                    } relative left-[49px] z-10 mt-[12px] pb-[14px] pt-[17px] pl-[20px] min-h-[52px] w-[48%] ${
                      (errors as any)?.password?.message
                        ? "focus:outline-none !border-[.2px] border-[red]"
                        : "focus:outline-blue-200"
                    } pr-10`}
                    placeholder="Password*"
                    style={{
                      ...loginInputStyles, // Apply base styles
                      ...((errors as any).password?.message && {
                        boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                      }),
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    //@ts-ignore
                    onBlur={() => setIsPasswordFocused(false)}
                    {...register("password")}
                  />

                  {/* Show/Hide password toggle button */}
                  <div
                    className="absolute inset-y-0 top-[7px]  right-[204px] z-10 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} // Toggle the visibility
                  >
                    {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}{" "}
                    {/* Toggle icons */}
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-col gap-[8px] items-center">
                <div
                  className="absolute w-full left-[37px]"
                  style={{ width: "465px" }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className={`${styles.defaultsearch} ${
                      loading && "opacity-[10%]"
                    } ${
                      errors.confirmPassword && "bg-[#FFF5F5]"
                    } relative left-[291px] z-10 mt-[12px] pb-[14px] pt-[17px] pl-[20px] min-h-[52px] w-[48%] pr-10  ${
                      (errors as any)?.confirmPassword?.message
                        ? "focus:outline-none !border-[.2px] border-[red]"
                        : "focus:outline-blue-200"
                    }`}
                    placeholder="Confirm Password*"
                    style={{
                      ...loginInputStyles, // Apply base styles
                      ...((errors as any).confirmPassword?.message && {
                        boxShadow: "rgb(255 0 0 / 18%) 0px 0px 12px 0px", // Apply error-specific styles if there's an error
                      }),
                    }}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    //@ts-ignore
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    {...register("confirmPassword")}
                  />
                  {/* Show/Hide password toggle button */}
                  <div
                    className="absolute inset-y-0 top-[12px]  right-[-39px] z-10 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle the visibility
                  >
                    {showConfirmPassword ? (
                      <BiHide size={20} />
                    ) : (
                      <BiShow size={20} />
                    )}{" "}
                    {/* Toggle icons */}
                  </div>
                </div>
              </div>
            </div>
            {/* Password Validation Feedback */}
            {(errors as any).password?.message &&
            (errors as any).confirmPassword?.message ? (
              <></>
            ) : (
              <>
                {isPasswordFocused || isConfirmPasswordFocused || formData ? (
                  <div className="mt-4 relative left-[67px] w-[80%]">
                    <ul className="list-disc pl-5">
                      {passwordRequirements.map((req, index) => (
                        <li
                          key={index}
                          className={`flex items-center ${
                            req.test
                              ? "text-green-500  text-[12px] font-[400] leading-[24px]"
                              : "text-[#C20000] text-[12px] font-[400] leading-[24px] "
                          }`}
                        >
                          {req.test ? <MdOutlineDone /> : <RxCross2 />}
                          <span className="ml-2 normal-case">
                            {req.message}
                          </span>
                        </li>
                      ))}
                      <li
                        className={`flex items-center ${
                          isConfirmPasswordValid && allRequirementsMet
                            ? "text-green-500  text-[12px] font-[400] leading-[24px]"
                            : "text-[#C20000] text-[12px] font-[400] leading-[24px]"
                        }`}
                      >
                        {isConfirmPasswordValid && allRequirementsMet ? (
                          <MdOutlineDone />
                        ) : (
                          <RxCross2 />
                        )}
                        <span className="ml-2 normal-case">
                          Confirm password matches
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
            <button
              disabled={loading}
              type="submit"
              className={`${styles.login_btn_} ${
                loading ? "!bg-[#2C2240]" : "bg-[#350ABC]"
              } mt-[20px] !w-[83%] !my-[21px] !mx-auto !ml-[86px] justify-center bg-[#350ABC] text-[#F3F0FF3] opacity-[0.9] rounded-[4px] px-[16px] py-[18px] text-center inline-flex items-center`}
            >
              {loading ? <div className="loader_login"></div> : "Register"}

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
          </form>
          <div className="flex justify-center flex-col items-center gap-2">
            {registerSuccess && (registerResponse as any)?.token && (
              <div className="text-green-500 text-center">
                Register Successful!
              </div>
            )}
            <div className="flex justify-center items-center gap-2">
              <p className="text-[#494848] normal-case text-[14px] fonr-[400] leading-[24px] tracking-[-0.28px]">
                Already have an account ?{" "}
              </p>
              <p
                className="text-[#350ABC] text-[14px] font-[600] leading-[24px] tracking-[-0.28px] cursor-pointer"
                onClick={handleLoginClick}
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="login_backgorund "></div>
    </div>
  );
};

export default RegisterForm;
