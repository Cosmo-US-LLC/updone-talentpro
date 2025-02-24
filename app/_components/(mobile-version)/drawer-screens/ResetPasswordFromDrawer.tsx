import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { useEffect, useState } from "react";

const ResetPasswordFromDrawer = ({ setCurrentScreen }: any) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleError,
    errorMessage: error,
    setErrorMessage: setError,
  } = useError();

  const getResetMessage = (error: string | undefined) => {
    if (error) {
      setError(error);
    }
  };

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
    } else {
      setEmailError("");
    }
  };

  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputFields = () => {
    if (emailError) {
      return false;
    }
    if (email.length === 0) {
      setEmailError("Email is required.");
      return false;
    }
    if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleClickResetPassword = async () => {
    if (!validateInputFields()) {
      return;
    }
    setLoading(true);
    setError("");
    const body = {
      email: email,
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
        setCurrentScreen("reset-password-email-sent");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto pt-1" style={{ scrollbarWidth: "none" }}>
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
      <div className="flex flex-col gap-4 mx-4 my-6">
        <div className="text-center">
          <h3
            className={`className="text-[#100F14] text-[24px] font-[500] text-center leading-normal`}
          >
            Reset Password
          </h3>
          <p className="text-[#6B6B6B] text-center font-poppins text-[14px] font-[400] leading-[24px] px-[4px]">
            Enter your email and get a new password.
          </p>{" "}
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
              className={`w-full px-10 h-[56px] !text-[#6B6B6B] outline-none !font-[400] leading-[24px] text-[14px] border-[1px] ${
                emailError === "" ? "border-[#EFEFEF]" : "border-[#FF8F8F]"
              } !rounded-[8px] bg-[#FFF] ${
                emailError !== ""
                  ? "shadow-[0px_0px_20px_0px_rgba(194,0,0,0.22)]"
                  : ""
              }`}
              placeholder="Email address"
            />
          </div>

          {
            <p
              className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${
                emailError !== "" ? "opacity-100" : "opacity-0"
              } ${emailError !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
            >
              {emailError}
            </p>
          }
        </div>
        {/* <hr className="bg-[#EBE6FF] h-[1px] border-0 w-full "/> */}
        <div className="flex justify-center items-center gap-4  z-[9999]">
          {
            <button
              disabled={loading}
              onClick={() => {
                handleClickResetPassword();
              }}
              className="rounded-[4px] py-[10px] w-[100%] text-[white] bg-[#350ABC]"
            >
              {loading ? "Resetting Password..." : "Reset my password"}
            </button>
          }
        </div>
        <div
          onClick={() => {
            setCurrentScreen("login");
          }}
          className="flex items-center justify-center w-full  "
        >
          <p className="text-[#350ABC] font-[400] text-[14px] leading-[24px]">
            Return to login
          </p>
        </div>
        <div className="flex items-center justify-center">
          <p
            className={`text-[#C20000] text-[12px] pt-[5px] font-[400] leading-[20px] transition-opacity duration-500 ease-linear ${
              error !== "" ? "opacity-100" : "opacity-0"
            } ${error !== "" ? "max-h-20" : "max-h-0"} overflow-hidden`}
          >
            {error}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordFromDrawer;
