import React, { useState, useEffect, useRef } from "react";
import SignIn from "@/app/_components/ui/modal-forms/signIn";
import Signup from "@/app/_components/ui/modal-forms/signUp";
import ResetPassword from "@/app/_components/ui/modal-forms/resetPassword";

const BlurredOverlay: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(true);  // Always open for this example
  const [currentForm, setCurrentForm] = useState<"signIn" | "resetPassword">("signIn");

  const modalRef = useRef<HTMLDivElement>(null);

  // Switch between forms
  const switchToSignIn = () => setCurrentForm("signIn");
  const switchToResetPassword = () => setCurrentForm("resetPassword");

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setAuthModalOpen(false);
        setCurrentForm("signIn");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (authModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [authModalOpen]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-10 backdrop-blur-md z-20 flex flex-col justify-center items-center">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <div
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          &times;
        </div>

        {/* Render the current form */}
        {currentForm === "signIn" && (
          <SignIn
            onSwitchToResetPassword={switchToResetPassword}
            onSuccess={() => setAuthModalOpen(false)}  // Close modal on successful login
          />
        )}
        {currentForm === "resetPassword" && (
          <ResetPassword onSwitchToSignIn={switchToSignIn} />
        )}
      </div>
    </div>
  );
};

export default BlurredOverlay;
