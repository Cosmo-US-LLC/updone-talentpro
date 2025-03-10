"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for validation
import { apiRequest } from "@/app/lib/services";
import { useRouter } from "next/navigation";

// **Validation Schema**
const ResetPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

// **Props Interface**
interface ResetPasswordFormProps {
  onSwitchToSignIn: () => void; // Callback to switch to Sign In form
}

const ResetPassword: React.FC<ResetPasswordFormProps> = ({
  onSwitchToSignIn,
}) => {
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(60); // 1-minute timer
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    mode: "onSubmit",
  });

  // **Start the resend timer when reset request is successful**
  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(60);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // **Form Submission**
  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);

    const body = { email: data.email };

    try {
      await apiRequest("/resetPassword", {
        method: "POST",
        body: body,
      });

      setTimeout(() => {
        setMessageSent(true);
        setLoading(false);
        startResendTimer(); // Start timer after successful reset request
      }, 1000);
    } catch (err) {
      setError((err as Error)?.message || "An error occurred while sending the reset link.");
      setLoading(false);
    }
  };

  // **Handle Resend Button Click**
  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);

    try {
      await apiRequest("/resetPassword", { method: "POST", body: { email: "" } });

      setLoading(false);
      startResendTimer();
    } catch (err) {
      setError((err as Error)?.message || "An error occurred while resending the reset link.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      {!messageSent ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your email address to reset your password.
          </p>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border ${errors.email ? "border-red-500 shadow-red-200" : "border-gray-300"
                  } !rounded-full`}
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && typeof errors.email.message === 'string' && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-center py-3 px-4 h-[48px] flex justify-center items-center text-white font-medium !rounded-full shadow-sm transition-all duration-500
                  ${loading ? "!bg-[#2C2240]" : "bg-[#350ABC] hover:bg-indigo-700"}`}
            >
              {loading ? (
                <div className="flex justify-center items-center w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 49" fill="none">
                    <circle cx="16" cy="24.48" r="4" fill="#EBE6FF" />
                    <circle cx="32" cy="24.48" r="4" fill="#B199FF" />
                  </svg>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}
        </>
      ) : (
        // ✅ Confirmation Message instead of Form
        <div className=" rounded-lg flex justify-center items-center flex-col">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M18.9208 43.3388C23.9095 35.6696 42.2579 15.9296 57.4741 5.67451C58.1203 5.23898 58.85 6.09391 58.3142 6.65977C43.8586 21.9257 28.4072 39.1934 19.5332 54.1248C19.286 54.5407 18.6893 54.5554 18.431 54.1462C13.9654 47.0729 10.1356 36.9054 1.92654 33.7898C1.31671 33.5583 1.37532 32.6961 2.00945 32.5433C9.87625 30.6479 13.5625 37.3759 18.9208 43.3378V43.3388Z"
              fill="#6BA231"
            />
          </svg>
          <p className="text-sm font-medium text-gray-600 mt-2 pl-4">
          You will receive a new password on this email. Please check your inbox and login again.
        
          </p>

          {/* ✅ Resend Button with Timer */}
          <div className="flex justify-start items-center w-full mt-4 text-sm text-gray-600">
            <span className="pl-4 font-medium">Haven't received the link yet?</span>
            <div
              onClick={() => {
                if (canResend) {
                  handleResend();
                }
              }}
              className={`text-indigo-600 ml-2 font-medium hover:underline cursor-pointer transition-all ${!canResend && "opacity-50 cursor-not-allowed"
                }`}
            >
              {canResend ? "Resend" : `Resend in ${resendTimer}s`}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Go Back to Login Button (Always Visible) */}
      <div className="text-center text-[14px] mt-6">
        <p className="flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="#350ABC" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span onClick={onSwitchToSignIn} className="text-indigo-600 cursor-pointer">
            Go Back to Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
