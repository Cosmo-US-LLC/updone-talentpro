import { useState, useEffect, useRef } from "react";
import "../index.css";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from '@/app/lib/context/ErrorProvider'
import { MdEdit } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import dynamic from "next/dynamic";
import { FaEdit } from "react-icons/fa";
import { Loader } from "@/app/_components/ui/dashboard-loader";


export default function PersonalDetails() {
    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        phone: "",
        location: "",
    });
    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();

    const [displayName, setDisplayName] = useState("");
    const [formData, setFormData] = useState(personalDetails);
    const [isEditing, setIsEditing] = useState(false);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [isModified, setIsModified] = useState(false); 
    const [successMessage, setSuccessMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const generateDisplayName = (fullName: string) => {
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastNameInitial = nameParts.length > 1 ? `${nameParts[1][0]}.` : "";
        return `${firstName} ${lastNameInitial}`.trim();
    };

    useEffect(() => {
        const fetchPersonalDetails = async () => {
            try {
                setIsLoading(true);
                // Make the API call using the same format as the sample
                const data = await apiRequest("/talentpro/my-details", {
                    method: "GET",
                    headers: {
                        ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                        "Accept": "application/json",
                    },
                }, handleError);
    
                // Directly set the data if the response is successful
                if (data) {
                    console.log("API Response:", data);
                    setPersonalDetails({
                        name: data.name,  // Adjust if the data structure differs
                        phone: data.phone || "",
                        location: data.location || "",
                    });
                    setDisplayName(generateDisplayName(data.name));
                    setSelectedCity(data.location || "");
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
    }, [personalDetails]);
    

    useEffect(() => {
        setDisplayName(generateDisplayName(formData.name));
        checkIfModified();
    }, [formData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkIfModified = () => {
        // Check if phone number is complete (should be 11 digits including country code)
        const isPhoneValid = formData.phone && formData.phone.length === 11;
        const hasChanges = JSON.stringify(formData) !== JSON.stringify(personalDetails);
        setIsModified(hasChanges && isPhoneValid ? true : false);
    };


    const handleSave = async () => {
        try {
            // Send API request to update details
            const response = await apiRequest("/talentpro/update-details", {
                method: "POST",
                headers: {
                    ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
                   
                },
                body:{
                    name: formData.name,
                    phone: formData.phone,
                    location: selectedCity,
                },
            }, handleError);
    
            if (response) {
            
                // Update state with new data
                setPersonalDetails(response);
                setIsEditing(false);
                setIsModified(false);

                setSuccessMessage("Profile updated successfully!");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false); // Triggers fade-out
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
    
    const handleCancel = () => {
        setFormData(personalDetails); // Reset form data to original values
        setSelectedCity(personalDetails.location); // Reset location as well
        setIsEditing(false);
    };

     if (isLoading) {
            return <Loader />;
        }
    

    return (
        <div className="mt-6 w-full bg-white rounded-lg shadow-lg p-6">
   {successMessage && (
    <div 
        className={`fixed bottom-12 left-1/2 transform -translate-x-1/2 flex justify-center w-[280px] px-4 py-3 z-10
                    bg-green-400 text-white font-semibold text-center text-[14px] 
                    shadow-lg shadow-green-200 rounded-sm transition-opacity 
                    duration-1000 ease-in-out ${showMessage ? "opacity-100" : "opacity-0"}`}
    >
        {successMessage}
    </div>
)}
           
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`border rounded-lg px-2 mt-1 focus:ring-1 focus:ring-gray-300 ${
                            isEditing ? "border-gray-200 " : "bg-gray-100"
                        }`}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        readOnly
                        className="border rounded-lg px-2 py-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none"
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
            value={formData.phone ? `+1 (${formData.phone.slice(1,4)}) ${formData.phone.slice(4,7)}-${formData.phone.slice(7)}` : ''}
            disabled
            className="border rounded-lg px-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
        />
    )}
</div>


<div className="flex flex-col">
    <label className="font-medium text-gray-700">Location</label>

    {/* Show Mapbox SearchBox only in editing mode */}
    {isEditing ? (
         <select
         value={selectedCity}
         onChange={handleCityChange}
         className="border rounded-md px-2 py-4 mt-1 focus:ring-1 focus:ring-gray-300"
     >
         <option value="" disabled>Select a city</option>
         {cities.map((city) => (
             <option key={city.id} value={city.name}>
                 {city.name}
             </option>
         ))}
     </select>
    ) : (
        // Show plain text when not editing
        <input
        type="text"
        name="location"
        value={selectedCity}
        disabled
        className="border rounded-lg px-2 mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
    />
    )}
</div>


            </div>
            <div className="flex justify-start mt-6">
    {isEditing ? (
        <div className="flex w-full mb-4 space-x-2">
            <button
                onClick={handleCancel}
                className="w-[50%] bg-gray-200 text-black py-2 rounded-sm transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                disabled={!isModified || formData.phone.length !== 11}
                className={`w-[50%] py-2 rounded-sm transition-colors ${
                    isModified && formData.phone.length === 11
                        ? "bg-[#5d0abc] text-white hover:bg-[#4a078f]"
                        : "bg-[#5d0abc] text-white cursor-not-allowed opacity-70"
                }`}
            >
                Save
            </button>
        </div>
    ) : (
        <div className="flex w-full mb-4" onClick={() => setIsEditing(true)}>
            <button className="w-full bg-[#5d0abc] text-white py-2 rounded-sm transition-colors hover:bg-[#4a078f]">
                Edit
            </button>
        </div>
    )}
</div>

            
        </div>
    );
}
