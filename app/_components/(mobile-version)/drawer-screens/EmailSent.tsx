import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { useEffect, useState } from "react";

const EmailSent = ({ setCurrentScreen }: any) => {
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
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setEmailError("");
      return;
    }
  };

  const validateInputFields = () => {
    if (email.length === 0) {
      setEmailError("Email is required.");
    }
  };

  const handleClickLogin = async () => {
    setError("");
    validateInputFields();
    if (emailError) {
      return;
    }
    setLoading(true);
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
    <div
      className="flex items-center justify-center h-screen overflow-y-auto p-4"
      style={{ scrollbarWidth: "none" }}
    >
      {/* <img
        src="/images/mobile/email-sent-bg.svg"
        className="top-0 w-full z-[-1]"
        alt=""
      /> */}

      <div className="flex flex-col items-center justify-center gap-3">
        <img
          src="/images/mobile/mailIcon.svg"
          alt="Email Sent Icon"
          className="w-[70px] h-[70px] "
        />
        <p className="text-[#100F14] text-center  text-[24px] font-[500] leading-normal ">
          Email Sent!
        </p>
        <p className="text-[#6B6B6B] text-center font-poppins text-[14px] font-[400] leading-[24px]">
          Come back quickly with your new password and make an offer!
        </p>
        <hr className="bg-[#EBE6FF] h-[1px] border-0 w-full" />
        <p className="text-[#4C4B4B]  font-poppins font-[400] text-[14px] leading-[24px] text-center">
          Haven’t got the email?
          <span
            onClick={() => {
              setCurrentScreen("reset-password");
            }}
            className="text-[#350ABC] ml-1"
          >
            Resend new password
          </span>
        </p>

        <p className="text-[#6B6B6B] font-poppins font-[400] text-[14px] leading-[24px] text-center">
          <span
            onClick={() => {
              setCurrentScreen("register");
            }}
            className="text-[#350ABC] ml-1"
          >
            Return to login
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
