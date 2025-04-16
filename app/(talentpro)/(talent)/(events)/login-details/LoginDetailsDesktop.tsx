import { useState, useEffect } from "react";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from '@/app/lib/context/ErrorProvider';
import { CiMail } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { Loader } from "@/app/_components/ui/dashboard-loader";


export default function LoginDetails() {
    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "**********" });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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
                });

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

    const handleUpdatePassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");
    
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; 
        const capitalLetterRegex = /[A-Z]/;
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
                setIsEditingPassword(false);
                setSuccessMessage("Password updated successfully!");
                setShowMessage(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
    
                setTimeout(() => {
                    setSuccessMessage("");
                }, 4000);
                return;
            }
            else if (response?.status === 422) {
                setErrorMessage(response.errors?.new_password?.[0] || "Password validation failed.");
            } 
            else if (response?.status === 403) {
                setErrorMessage("Current password is incorrect.");
            } 
            else {
                setErrorMessage(response?.message || "An error occurred. Check your current password and try again.");
            }
    
        } catch (error) {
            console.error("Error updating password:", error);
            setErrorMessage("Something went wrong. Check your current password and try again.");
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className=" lg:w-[700px] xl:w-[980px] xl:mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login Details</h2>
            <div className="space-y-6">
                {/* Email Display */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                        <CiMail className="absolute top-[19px] left-3 text-gray-500" size={20} />
                        <input
                            type="email"
                            value={loginDetails.email}
                            readOnly
                            className="border rounded-lg pl-10 py-2 bg-gray-100 text-gray-700 cursor-not-allowed w-full"
                        />
                    </div>
                </div>

                {/* Password Section */}
                {!isEditingPassword ? (
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <label className="font-medium text-gray-700 mb-2">Password</label>
                            <div className="text-gray-700">********</div>
                        </div>
                        <div
                            onClick={() => setIsEditingPassword(true)}
                            className="underline font-medium cursor-pointer"
                        >
                            Update Password
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full"
                            placeholder="Current password"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full"
                            placeholder="New password"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full"
                            placeholder="Confirm new password"
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="mr-2"
                            />
                            <label htmlFor="showPassword" className="text-sm text-gray-700">
                                Show Password
                            </label>
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsEditingPassword(false)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdatePassword}
                                className="px-6 py-2 bg-[#5d0abc] text-white rounded-sm hover:bg-[#4a078f]"
                            >
                                Save Password
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {successMessage && (
        <div
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 flex justify-center w-fit px-4 md:px-8 py-3 z-10
                        bg-green-400 text-white font-semibold text-center text-[14px] 
                        shadow-lg shadow-green-200 rounded-sm transition-opacity 
                        duration-1000 ease-in-out ${showMessage ? "opacity-100" : "opacity-0"}`}
        >
            {successMessage}
        </div>
    )}
        </div>
    );
}