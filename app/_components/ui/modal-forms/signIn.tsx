"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for validation
import { BiShow, BiHide } from "react-icons/bi";
import { apiRequest } from "@/app/lib/services";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/lib/store/features/authSlice";
import Cookies from "js-cookie";
import { redirect, usePathname, useRouter } from "next/navigation";

// **Validation Schema**
const SignInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

interface signInProps {
  onSuccess?: () => void; // Callback on successful login (Closes modal)
  onSwitchToSignUp?: () => void; // Callback to switch to Sign Up form
  onSwitchToResetPassword: () => void; // Callback to switch to Reset Password form
}

const SignIn: React.FC<signInProps> = ({
  onSuccess,
  onSwitchToSignUp,
  onSwitchToResetPassword,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInFormSchema),
    mode: "onBlur",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    const isUpdoneDomain =
      typeof window !== "undefined" &&
      window?.location?.hostname?.includes("updone");

    try {
      const response = await apiRequest(
        "/login",
        {
          method: "POST",
          body: data,
        },
        setError
      );

      if (response?.token) {
        // ✅ Save token in Cookies
        Cookies.set("token", response.token, {
          expires: 30,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });
        Cookies.set("authData", JSON.stringify(response), {
          expires: 30,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });

        // ✅ Save user data in Redux store
        dispatch(setAuth(response));

        setLoginSuccess(true); // Show success message
        setTimeout(() => {
          if (onSuccess) onSuccess(); // Close modal after success
        }, 1500);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.error((err as Error)?.message || "Invalid email or password.");
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  function handleGoogleAuth() {
    const isUpdoneDomain = window.location.hostname.includes("updone");
    console.log(pathname + window.location.search);
    if (process.env.NEXT_PUBLIC_GOOGLE_AUTH_LINK) {
      console.log("Redirecting...");
      Cookies.set("callbackUrl", pathname + window?.location?.search || "", {
        expires: 30,
        path: "/",
        ...(isUpdoneDomain && { domain: ".updone.com" }),
      });
      router.push(process.env.NEXT_PUBLIC_GOOGLE_AUTH_LINK || "");
    } else {
      console.error("Unable to redirect to google auth due to missing url");
    }
  }

  return (
    <div
      className={`w-full p-6 transition-opacity ${
        loading || loginSuccess ? "opacity-50" : "opacity-100"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-2">Log in</h2>
      {/* <p className="text-sm text-gray-600 text-center mb-6">
        Log in to create events and jobs to hire the best talent in town.
      </p> */}

      {/* Google Login Button */}
      <button
        onClick={() => handleGoogleAuth()}
        className="w-full flex items-center justify-center py-3 px-4 !rounded-full shadow-sm bg-[#F6F9FC] text-gray-600 font-medium"
      >
        <img
          src="/images/signup/Google.svg"
          alt="Google"
          className="w-5 h-6 mr-2"
        />
        Google
      </button>

      <div className="relative text-center mt-3 mb-2">
        <span className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </span>
        <span className="relative bg-white px-4 text-gray-500">Or</span>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-2 border ${
              errors.email
                ? "border-red-500 shadow-lg shadow-red-200"
                : "border-gray-300"
            } !rounded-full`}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && typeof errors.email.message === "string" && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full px-4 py-2 border ${
                errors.password
                  ? "border-red-500 shadow-lg shadow-red-200"
                  : "border-gray-300"
              } !rounded-full`}
              placeholder="Password"
              {...register("password")}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
            >
              {showPassword ? (
                <BiHide className="text-gray-400" size={20} />
              ) : (
                <BiShow className="text-gray-400" size={20} />
              )}
            </div>
          </div>
          {errors.password && typeof errors.password.message === "string" && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Reset Password Link */}
        <div className="flex justify-end">
          <div
            className="text-sm text-indigo-600 hover:underline cursor-pointer"
            onClick={onSwitchToResetPassword}
          >
            Reset Password?
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || loginSuccess}
          className={`w-full py-3 px-4 h-[48px] flex justify-center items-center text-white !rounded-full shadow-sm transition-all duration-500 ${
            loading
              ? "!bg-[#2C2240] cursor-not-allowed"
              : loginSuccess
              ? "!bg-[#2C2240] text-black font-semibold text-lg text-shadow-lg"
              : "bg-[#350ABC] hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2 py-2">
              <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
              <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-1000"></div>
            </div>
          ) : loginSuccess ? (
            <span className="text-[#9DFF95] text-shadow-xl">
              Log in in Successful!
            </span>
          ) : (
            "Log in"
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 text-center mt-4">{error}</p>
      )}

      {/* Links for Sign Up and Reset Password */}
      {onSwitchToSignUp && (
      <div className="text-center text-[14px] mt-6 space-y-2">
        <p>
          Don’t have an account?{" "}
          <span
            onClick={onSwitchToSignUp}
            className="text-indigo-600 underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
      )}
    </div>
  );
};

export default SignIn;
