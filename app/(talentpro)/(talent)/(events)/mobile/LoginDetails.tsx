import { useState, useEffect } from "react";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from '@/app/lib/context/ErrorProvider';
import { CiMail } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { Loader } from "@/app/_components/ui/dashboard-loader";


export default function LoginDetails({ activeTab }: { activeTab: string }) {
    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "********" });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // 🔹 Fetch user email from API on component mount
    useEffect(() => {
        const fetchLoginDetails = async () => {
            try {
                setIsLoading(true);
                const data = await apiRequest("/talentpro/my-details", {
                    method: "GET",
                    headers: {
                        ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                        "Accept": "application/json"
                    },
                }, );

                if (data) {
                    setLoginDetails((prev) => ({ ...prev, email: data.email }));
                }
            } catch (error) {
                setErrorMessage("Failed to load login details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoginDetails();
    }, []);

    // 🔹 Handle Password Update API Call
    const handleUpdatePassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");
    
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; 
        const capitalLetterRegex = /[A-Z]/;
        // Basic Frontend Validation
        if (newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }
        
        if (!specialCharRegex.test(newPassword)) {
            setErrorMessage("Password must contain at least one special character (!@#$%^&* etc.).");
            return;
        }
        if (!capitalLetterRegex.test(newPassword)) {
            setErrorMessage("Password must contain at least one uppercase letter (A-Z).");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }
        if (newPassword === currentPassword) {
            setErrorMessage("New password cannot be the same as the current password.");
            return;
        }
    
        try {
            const response = await apiRequest("/talentpro/update-password", {
                method: "POST",
                headers: {
                    ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                    
                },
                body:{
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword
                },
            });
    
        
    
            if (response.user.id) {
                setIsEditingPassword(false); // Close the password update div
                setSuccessMessage("Password updated successfully!");

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                return;
            }
            // Backend validation error
            else if (response?.status === 422) {
                setErrorMessage(response.errors?.new_password?.[0] || "Password validation failed.");
            } 
            // 🔹 Handle incorrect current password
            else if (response?.status === 403) {
                setErrorMessage("Current password is incorrect.");
            } 
            // 🔹 Handle unexpected errors
            else {
                setErrorMessage(response?.message || "An error occurred. Check your current password and try again.");
            }
    
        } catch (error) {
            console.error("Error updating password:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };
    
     if (isLoading) {
            return <Loader />;
        }

    return (
        <>
            {/* Main Container - Updated overflow and isolation */}
            <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-6 isolate">
                {/* Email Display - Added z-index */}
                <div className="flex flex-col mb-6 relative pb-6 border-b border-gray-300 z-10">
                    <label className="font-medium text-gray-700">Email</label>
                    <CiMail className="absolute top-[47px] left-3 text-gray-500" size={20} />
                    <input
                        type="email"
                        value={loginDetails.email}
                        readOnly
                        className="border rounded-lg pl-10 py-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed w-full"
                    />
                </div>

                {/* Password section - Updated z-index and transition */}
                {!isEditingPassword && (
                    <div className="flex items-center justify-start mb-4 relative z-10">
                        <div className="flex flex-col mr-2">
                            <label className="font-medium text-gray-700">Password</label>
                            <div className="mt-1 text-gray-700 cursor-not-allowed w-[130px]">
                                {loginDetails.password}
                            </div>
                        </div>

                        {/* Update Password Button - Only visible when not editing */}
                        <button
                            onClick={() => setIsEditingPassword(true)}
                            className="pt-4 text-[14px] flex border-b-2 border-gray-300 text-gray-700"
                        >
                            Update Password
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3.3291 8.00293H12.6657" stroke="#161616" strokeWidth="0.828387" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.99707 3.33496L12.6654 8.00326L7.99707 12.6715" stroke="#161616" strokeWidth="0.828387" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                )}

                {/* Password Editing Fields - Updated transition and overflow handling */}
                <div className={`transition-all duration-300 ease-in-out ${
                    isEditingPassword ? "max-h-[380px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}>
                    <div className="flex flex-col mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border rounded-lg px-2 py-2 mt-1 focus:ring-1 focus:ring-gray-300"
                            placeholder="Current password"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border rounded-lg px-2 py-2 mt-1 focus:ring-1 focus:ring-gray-300"
                            placeholder="New password"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border rounded-lg px-2 py-2 mt-1 mb-2 focus:ring-1 focus:ring-gray-300"
                            placeholder="Confirm new password"
                        />

<div className="flex items-center ">
        <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="ml-0.5 mr-2 w-3 h-3 cursor-pointer "
        />
        <label htmlFor="showPassword" className="text-gray-700 text-sm cursor-pointer">
            Show Password
        </label>
    </div>

                        {/* Error Message */}
                        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2 mt-4 mb-4">
                            <button onClick={() => setIsEditingPassword(false)} className="px-4 py-2 w-[40%] bg-gray-200 text-gray-700 rounded-sm">Cancel</button>
                            <button onClick={handleUpdatePassword} className="px-4 py-2 bg-[#5d0abc] text-white w-[70%] rounded-sm">Save Password</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Success Message at Bottom */}
            {successMessage && (
                <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex justify-center w-[280px] px-4 bg-green-400 text-white font-semibold text-center py-3 text-[14px] shadow-lg shadow-green-200 ">
                    {successMessage}
                </div>
            )}
        </>
    );
    
    
}
