import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { setAuth } from "@/app/lib/store/features/authSlice";
import { useDispatch } from "react-redux";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegisterFromDrawer = ({ setCurrentScreen }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [passwordVissible, setPasswordVissible] = useState(false);
  const [confirmPasswordVissible, setConfirmPasswordVissible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const dispatch = useDispatch();
  const {
    handleError,
    errorMessage: error,
    setErrorMessage: setError,
  } = useError();
  const isConfirmPasswordValid = confirmPassword === password;
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
  const allRequirementsMet = passwordRequirements.every((req) => req.test);

  useEffect(() => {
    setError("");
  }, []);

  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onChangeFullName = (e: any) => {
    const newFullName = e.target.value;
    setFullName(newFullName);

    if (newFullName.length === 0) {
      setFullNameError("Full name is required.");
    } else if (newFullName.length > 50) {
      setFullNameError("Full name cannot exceed 50 characters.");
    } else {
      setFullNameError("");
    }
  };

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

  // const onChangePhoneNumber = (e: any) => {
  //     const newPhoneNumber = e.target.value;
  //     setPhoneNumber(newPhoneNumber);

  //     if (newPhoneNumber.length === 0) {
  //         setPhoneNumberError("Phone number is required.");
  //     } else if (newPhoneNumber.length < 8 || newPhoneNumber.length > 15) {
  //         setPhoneNumberError("Phone number must be between 8 and 15 digits.");
  //     } else if (!/^\d+$/.test(newPhoneNumber)) {
  //         setPhoneNumberError("Please enter a valid phone number.");
  //     } else {
  //         setPhoneNumberError('');
  //     }
  // };

  const onChangePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);

    if (newPhoneNumber.length === 0) {
      setPhoneNumberError("Phone number is required.");
    } else if (newPhoneNumber !== "+1" && (newPhoneNumber.length < 8 || newPhoneNumber.length > 15)) {
      setPhoneNumberError("Phone number must be between 8 and 15 digits.");
    } else {
      setPhoneNumberError("");
    }
  };

  const onChangeCompany = (e: any) => {
    const newCompany = e.target.value;
    setCompany(newCompany);

    if (newCompany.length === 0) {
      setCompanyError("Company name is required.");
    } else if (newCompany.length > 50) {
      setCompanyError("Company name cannot exceed 50 characters.");
    } else {
      setCompanyError("");
    }
  };

  const onChangePassword = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setPasswordError("Password is required.");
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else if (newPassword.length > 50) {
      setPasswordError("Password cannot exceed 50 characters.");
    } else {
      setPasswordError("");
    }
  };

  const onChangeConfirmPassword = (e: any) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword.length === 0) {
      setConfirmPasswordError("Please confirm your password.");
    } else if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateInputFields = () => {
    let validate = true;
    if (fullName.length === 0) {
      setFullNameError("Full name is required.");
      validate = false;
    }
    if (email.length === 0) {
      setEmailError("Email is required.");
      validate = false;
    }
    if (phoneNumber.length === 0) {
      setPhoneNumberError("Phone number is required.");
      validate = false;
    }
    if (company.length === 0) {
      setCompanyError("Company name is required.");
      validate = false;
    }
    if (password.length === 0) {
      setPasswordError("Password is required.");
      validate = false;
    }
    if (confirmPassword.length === 0) {
      setConfirmPasswordError("Please confirm your password.");
      validate = false;
    }
    return validate;
  };

  const handleClickRegister = async () => {
    setError("");
    if (
      !validateInputFields() ||
      fullNameError !== "" ||
      emailError !== "" ||
      phoneNumberError !== "" ||
      companyError !== "" ||
      passwordError !== "" ||
      confirmPasswordError !== ""
    ) {
      return;
    }
    setLoading(true);
    const body = {
      name: fullName,
      email: email,
      company: company,
      phone_number: phoneNumber,
      password: password,
      password_confirmation: confirmPassword,
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

      if (newData?.token) {
        setLoading(false);
        setRegisterSuccess(true);
        setTimeout(() => {
          setCurrentScreen("login");
        }, 2000);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="overflow-y-auto p-2 pb-28"
      style={{ scrollbarWidth: "none" }}
    >
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
      <img
        src="/images/mobile/Ellipse 2625.png"
        className="absolute top-0 w-full z-[-1] rounded-tl-[9px] rounded-tr-[9px]"
        alt=""
      />
      <div className="mb-4">
        <div className="text-center">
          <h3
            className={`text-[24px] text-[#100F14] font-[500] leading-[29px] mb-[6px]`}
          >
            Create Account
          </h3>
          <p className="text-[#6B6B6B] text-[14px] leading-[24px] font-[400] px-[4px]">
            Register with Updone to hire the best talent in town.
          </p>
        </div>
      </div>
      <div>
        <div className="w-full relative">
          <img
            src="/images/mobile/user.svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            alt=""
          />
          <input
            type="input"
            value={fullName}
            onChange={(e) => {
              onChangeFullName(e);
            }}
            className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${fullNameError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
              } !rounded-[8px] bg-[#FFF] ${fullNameError !== ""
                ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                : ""
              }`}
            placeholder="Full Name"
          />
        </div>
        {
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${fullNameError !== "" ? "opacity-100" : "opacity-0"
              } ${fullNameError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
          >
            {fullNameError}
          </p>
        }
      </div>
      <div>
        <div className="w-full relative">
          <img
            src="/images/mobile/mail_input.svg"
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
      {/* <div>
                <div className="w-full relative">
                    <img
                        src="/images/mobile/phone.svg"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        alt=""
                    />
                    <input
                        type="input"
                        value={phoneNumber}
                        onChange={(e) => { onChangePhoneNumber(e); }}
                        className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${phoneNumberError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"} !rounded-[8px] bg-[#FFF] ${phoneNumberError !== "" ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]" : ""}`}
                        placeholder="Phone Number"
                    />
                </div>
                {
                    <p
                        className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${phoneNumberError !== "" ? 'opacity-100' : 'opacity-0'} ${phoneNumberError !== "" ? 'max-h-20' : 'max-h-0'} overflow-hidden`}
                    >
                        {phoneNumberError}
                    </p>
                }
            </div> */}
      <div className="w-full relative">
        {/* <div className="relative w-full number-input" style={{ width: "465px" }}> */}
        <PhoneInput
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${phoneNumberError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"} !rounded-[8px] bg-[#FFF] ${phoneNumberError !== "" ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]" : ""}`}
          defaultCountry="us"
        />
        {/* </div> */}
        {
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${phoneNumberError !== "" ? "opacity-100" : "opacity-0"
              } ${phoneNumberError !== "" ? "max-h-20" : "max-h-0"
              } overflow-hidden`}
          >
            {phoneNumberError}
          </p>
        }
      </div>
      <div>
        <div className="w-full relative">
          <img
            src="/images/mobile/buildings.svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            alt=""
          />
          <input
            type="input"
            value={company}
            onChange={(e) => {
              onChangeCompany(e);
            }}
            className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${companyError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
              } !rounded-[8px] bg-[#FFF] ${companyError !== ""
                ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                : ""
              }`}
            placeholder="Company"
          />
        </div>
        {
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${companyError !== "" ? "opacity-100" : "opacity-0"
              } ${companyError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
          >
            {companyError}
          </p>
        }
      </div>
      <div>
        <div className="w-full relative">
          <img
            onClick={() => {
              setPasswordVissible(!passwordVissible);
            }}
            src="/images/mobile/eye.svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            alt=""
          />
          <input
            type={passwordVissible ? "input" : "password"}
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
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </div>
        {
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${passwordError !== "" ? "opacity-100" : "opacity-0"
              } ${passwordError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
          >
            {passwordError}
          </p>
        }
      </div>
      <div>
        <div className="w-full relative">
          <img
            onClick={() => {
              setConfirmPasswordVissible(!confirmPasswordVissible);
            }}
            src="/images/mobile/eye.svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            alt=""
          />
          <input
            type={confirmPasswordVissible ? "input" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              onChangeConfirmPassword(e);
            }}
            className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${confirmPasswordError === ""
              ? "border-[#EFEFEF]"
              : "border-[#FF8F8F]"
              } !rounded-[8px] bg-[#FFF] ${confirmPasswordError !== ""
                ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                : ""
              }`}
            placeholder="Confirm Password"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
        </div>
        {
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${confirmPasswordError !== "" ? "opacity-100" : "opacity-0"
              } ${confirmPasswordError !== "" ? "max-h-20" : "max-h-0"
              } overflow-hidden`}
          >
            {confirmPasswordError}
          </p>
        }
      </div>
      {isPasswordFocused ? (
        <div className="mt-4 w-[80%]">
          <ul className="list-disc pl-5">
            {passwordRequirements.map((req, index) => (
              <li
                key={index}
                className={`flex items-center ${req.test
                  ? "text-green-500  text-[12px] font-[400] leading-[24px]"
                  : "text-[#C20000] text-[12px] font-[400] leading-[24px] "
                  }`}
              >
                {req.test ? <MdOutlineDone /> : <RxCross2 />}
                <span className="ml-2 normal-case">{req.message}</span>
              </li>
            ))}
            <li
              className={`flex items-center ${isConfirmPasswordValid && allRequirementsMet
                ? "text-green-500  text-[12px] font-[400] leading-[24px]"
                : "text-[#C20000] text-[12px] font-[400] leading-[24px]"
                }`}
            >
              {isConfirmPasswordValid && allRequirementsMet ? (
                <MdOutlineDone />
              ) : (
                <RxCross2 />
              )}
              <span className="ml-2 normal-case">Confirm password matches</span>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center items-center gap-4 mt-10 z-[9999]">
        {registerSuccess === true ? (
          <div className="rounded-[4px] py-[10px] w-[90%] text-[white] bg-[#350ABC] flex flex-row items-center justify-center gap-2">
            <img
              src="/images/mobile/check_success.svg"
              className="h-[23px] w-[23px]"
              alt="check_success"
            />
            <p className="text-[#9DFF95]">Register Successfull</p>
          </div>
        ) : (
          <button
            disabled={loading}
            onClick={() => {
              handleClickRegister();
            }}
            className="rounded-[4px] py-[10px] w-[90%] text-[white] bg-[#350ABC]"
          >
            {loading ? "Registering..." : "Register"}
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
      <div className="flex items-center justify-center w-full mt-4">
        <p className="text-[#494848] font-[400] text-[14px] leading-[24px]">
          Already have an account?
          <span
            onClick={() => {
              setCurrentScreen("login");
            }}
            className="cursor-pointer text-[#350ABC] ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterFromDrawer;
