import { useState, useEffect } from "react";
import "../index.css";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from '@/app/lib/context/ErrorProvider';
import { FaEdit } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Loader } from "@/app/_components/ui/dashboard-loader";

export default function PersonalDetails() {
    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        phone: "",
        location: "",
    });

    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();
    const [isLoading, setIsLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [formData, setFormData] = useState(personalDetails);
    const [isEditing, setIsEditing] = useState(false);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [isModified, setIsModified] = useState(false); 
    const [successMessage, setSuccessMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchPersonalDetails = async () => {
            try {
                setIsLoading(true);
                const data = await apiRequest("/talentpro/my-details", {
                    method: "GET",
                    headers: {
                        ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                        "Accept": "application/json",
                    },
                }, handleError);
                if (data) {
                    setPersonalDetails({
                        name: data.name,
                        phone: data.phone || "",
                        location: data.location || "",
                    });
                    setSelectedCity(data.location || "");
                    setDisplayName(generateDisplayName(data.name));
                }
            } catch (error) {
                console.error("Error fetching personal details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPersonalDetails();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await apiRequest("/talentpro/cities", {
                    method: "GET",
                    headers: {
                        ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                        "Accept": "application/json",
                    },
                }, handleError);

                if (response ) {
                    setCities(response); // Store city list
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        setFormData(personalDetails);
        setSelectedCity(personalDetails.location);
        setDisplayName(generateDisplayName(personalDetails.name));
    }, [personalDetails]);

    useEffect(() => {
        // Check if any field has changed from original values AND phone number is valid
        const hasFieldChanges = 
            formData.name !== personalDetails.name ||
            formData.phone !== personalDetails.phone ||
            selectedCity !== personalDetails.location;
        
        const isPhoneValid = formData.phone && formData.phone.length === 11;
        
        setHasChanges(Boolean(hasFieldChanges && isPhoneValid));
    }, [formData, selectedCity, personalDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!hasChanges) {
            return; // Don't proceed if no changes were made
        }

        try {
            const response = await apiRequest("/talentpro/update-details", {
                method: "POST",
                headers: {
                    ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
                },
                body: {
                    name: formData.name,
                    phone: formData.phone,
                    location: selectedCity,
                },
            }, handleError);

            if (response) {
                setPersonalDetails(response);
                setIsEditing(false);
                setSuccessMessage("Personal details updated successfully!");
                setShowMessage(true);
                setHasChanges(false);
    
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
    
                setTimeout(() => {
                    setSuccessMessage("");
                }, 4000);
            }
        } catch (error) {
            console.error("Error updating details:", error);
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        setFormData((prev) => ({ ...prev, location: e.target.value }));
    };

   
    const checkIfModified = () => {
        // Check if phone number is complete (should be 11 digits including country code)
        const isPhoneValid = formData.phone && formData.phone.length === 11;
        const hasChanges = JSON.stringify(formData) !== JSON.stringify(personalDetails);
        setIsModified(hasChanges && isPhoneValid ? true : false);
    };

    const handleCancel = () => {
        setFormData(personalDetails);
        setSelectedCity(personalDetails.location);
        setIsEditing(false);
        setHasChanges(false);
    };

    const generateDisplayName = (fullName: string) => {
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastNameInitial = nameParts.length > 1 ? `${nameParts[1][0]}.` : "";
        return `${firstName} ${lastNameInitial}`.trim();
    };

     if (isLoading) {
            return <Loader />;
        }

    return (
        <div className="flex gap-4 mt-6">
            {successMessage && (
        <div
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 flex justify-center w-fit px-4 md:px-8 py-3 z-10
                        bg-green-400 text-white font-semibold text-center text-[14px] 
                        shadow-lg shadow-green-200 rounded-sm transition-opacity 
                        duration-1000 ease-in-out ${showMessage ? "opacity-100" : "opacity-0"}`}
        >
            {successMessage}
        </div>
    )}
            {/* Left Panel: Personal Details Form */}
            <div className="lg:w-[440px] xl:w-[640px] 2xl:w-[800px] bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
                    {!isEditing && (
                        <div
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-1 text-[#5d0abc] cursor-pointer"
                        >
                            <FaEdit />
                            <span>Edit</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-[#5d0abc] ${isEditing ? "border-gray-300" : "bg-gray-100 text-gray-500"}`}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Display Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={displayName}
                            readOnly
                            className="border rounded-lg px-4 py-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col">
    <label className="font-medium text-gray-700">Phone Number</label>
    {isEditing ? (
        <PhoneInput
            country={"us"}
            onlyCountries={["us"]}
            value={formData.phone}
            onChange={(phone) => {
                // Ensure phone number starts with 1 (US country code)
                const phoneNumber = phone.startsWith('1') ? phone : `1${phone}`;
                setFormData({ ...formData, phone: phoneNumber });
            }}
            inputClass="!w-full border !border-gray-300 rounded-lg p-2 !mt-1 focus:ring-1 focus:ring-gray-300"
            countryCodeEditable={false}  // Prevent country code editing
        />
    ) : (
        <input
            type="text"
            name="phone"
            value={formData.phone ? ` (${formData.phone.slice(1,4)}) ${formData.phone.slice(4,7)}-${formData.phone.slice(7)}` : ''}
            disabled
            className="border rounded-lg px-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
        />
    )}
</div>

                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Location</label>
                        {isEditing ? (
                            <select
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="border border-gray-300 rounded-sm px-4 py-[14px] mt-1 focus:ring-2 focus:ring-[#5d0abc]"
                            >
                                <option value="" disabled>Select a city</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                name="location"
                                value={selectedCity}
                                disabled
                                className="border rounded-lg px-4 py-2 mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end mt-8 space-x-4">
                        <div onClick={handleCancel} className="transition-all duration-300 ease-out px-6 py-2 rounded-sm hover:text-white text-gray-700 bg-gray-200 hover:bg-gray-300 cursor-pointer">
                            Cancel
                        </div>
                        <button 
                            onClick={handleSave} 
                            disabled={!hasChanges}
                            className={`px-6 py-2 rounded-sm ${hasChanges
                                ? 'bg-[#5d0abc] text-white hover:bg-[#4a078f] cursor-pointer' 
                                : 'bg-[#5d0abc] text-white hover:bg-[#4a078f] opacity-50 cursor-not-allowed'}`}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="lg:w-[260px] xl:w-[320px] 2xl:w-[400px] bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Profile Summary</h3>
                <p className="text-gray-600 mb-2"><strong>Name:</strong> {formData.name}</p>
                <p className="text-gray-600 mb-2"><strong>Display Name:</strong> {displayName}</p>
                <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> {formData.phone ? 
                        ` (${formData.phone.slice(1,4)}) ${formData.phone.slice(4,7)}-${formData.phone.slice(7)}` 
                        : ''}
                </p>
                <p className="text-gray-600"><strong>Location:</strong> {selectedCity}</p>
            </div>
        </div>
    );
}
