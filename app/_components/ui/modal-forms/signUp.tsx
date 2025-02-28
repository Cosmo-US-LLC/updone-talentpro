"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for schema validation
import { BiHide, BiShow } from "react-icons/bi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { apiRequest } from "@/app/lib/services";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/lib/store/features/authSlice";

// **Validation Schema**
const SignupFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().min(5, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(/[!@#$%^&*]/, "Password must have at least one special character"),
  phoneNumber: z
    .string()
    .min(6, "Phone number is required")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number"),
});

// **Props Interface**
interface SignupFormProps {
  onSwitchToSignIn: () => void; // Callback to switch to Sign In form
  onSuccess?: () => void; // Callback on successful signup
}

const Signup: React.FC<SignupFormProps> = ({ onSwitchToSignIn, onSuccess }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupFormSchema), // Zod schema resolver
    mode: "onBlur",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setSignupSuccess(false);
    const isUpdoneDomain =
      typeof window !== "undefined" &&
      window?.location?.hostname?.includes("updone");

    const body = {
      name: data.name,
      email: data.email,
      phone_number: data.phoneNumber,
      password: data.password,
    };

    try {
      const response = await apiRequest(
        "/register",
        {
          method: "POST",
          body: body,
        },
        setError
      );

      if (response?.token) {
        // ✅ Save token in Cookies
        Cookies.set("token", response.token, {
          expires: 30,
          path: "/",
          // ...(isUpdoneDomain && { domain: ".updone.com" }),
        });
        Cookies.set("authData", JSON.stringify(response.user), {
          expires: 30,
          path: "/",
          // ...(isUpdoneDomain && { domain: ".updone.com" }),
        });

        // ✅ Save user data in Redux store
        dispatch(setAuth(response));

        setSignupSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess(); // Close modal after success
        }, 1500);
      } else {
        throw new Error("Unable to signup");
      }
    } catch (err) {
      console.error(
        (err as Error)?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
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
        loading || signupSuccess ? "opacity-50" : "opacity-100"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>

      {/* Google Signup Button */}
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

      <div className="relative text-center my-6">
        <span className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </span>
        <span className="relative bg-white px-4 text-gray-500">Or</span>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 border ${
              errors.name
                ? "border-red-500 shadow-lg shadow-red-200"
                : "border-gray-300"
            } !rounded-full`}
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && typeof errors.name.message === "string" && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <PhoneInput
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value);
              setValue("phoneNumber", value); // Update react-hook-form value
            }}
            placeholder="Enter your phone number"
            className={`w-full px-4 border ${
              errors.phoneNumber
                ? "border-red-500 shadow-lg shadow-red-200"
                : "border-gray-300"
            } !rounded-full`}
          />
          {errors.phoneNumber &&
            typeof errors.phoneNumber.message === "string" && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
        </div>

        {/* Email */}
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

        {/* Password */}
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
                <BiHide size={20} className="text-gray-400" />
              ) : (
                <BiShow size={20} className="text-gray-400" />
              )}
            </div>
          </div>
          {errors.password && typeof errors.password.message === "string" && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 text-center text-white !rounded-full shadow-sm transition-all duration-500 ${
            loading
              ? "!bg-[#2C2240] cursor-not-allowed"
              : signupSuccess
              ? "!bg-[#2C2240] text-black shadow-lg shadow-green-200"
              : "bg-[#350ABC] hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2 py-2">
              <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
              <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-1000"></div>
            </div>
          ) : signupSuccess ? (
            <span className="text-[#9DFF95] text-shadow-xl">
              Sign up Successful!
            </span>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 text-center mt-4">{error}</p>
      )}

      {/* Links for Sign Up and Reset Password */}
      <div className="text-center text-[14px] mt-6 space-y-2">
        <p>
          Already have an account?{" "}
          <span
            onClick={onSwitchToSignIn}
            className="text-indigo-600 underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
