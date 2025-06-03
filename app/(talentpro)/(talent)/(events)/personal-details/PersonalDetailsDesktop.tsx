import { useState, useEffect, useRef } from "react";
import "../index.css";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from "@/app/lib/context/ErrorProvider";
import { FaEdit } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { IoCameraOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PersonalDetails() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  ); // Default image

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await apiRequest(
          "/talentpro/languages",
          {
            method: "GET",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
          },
          handleError
        );

        if (response) {
          console.log(response);
          setLanguages(response.languages || []);
          setAboutMe(response.about_me || "");
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  // Add a new language to the list
  const handleLanguageAdd = () => {
    if (newLanguage.trim() !== "" && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  // Remove a language from the list
  const handleLanguageRemove = (languageToRemove: string) => {
    setLanguages(languages.filter((lang) => lang !== languageToRemove));
  };

  // Save languages to the backend
  const handleAboutMeSave = async () => {
    try {
      const response = await apiRequest(
        "/talentpro/languages",
        {
          method: "POST",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
          body: {
            about_me: aboutMe,
            languages: languages,
          },
        },
        handleError
      );

      if (response) {
        setLanguages(response.languages || []);
        setAboutMe(response.about_me || "");
        setIsEditingAboutMe(false);
        setNewLanguage(""); // Clear input

        setSuccessMessage("About Me and Languages updated successfully!");
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving about me and languages:", error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("profile_pic", file);
      // ✅ Debug FormData
      console.log("FormData Contents:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await apiRequest(
        "/talentpro/update-details",
        {
          method: "POST",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
            // Don't set Content-Type - let the browser set it with boundary
          },
          body: formDataToSend,
        },
        handleError
      );

      if (response && response.profile_pic) {
        setProfilePic(response.profile_pic);
        setIsEditing(false);
        setSuccessMessage("Profile picture updated successfully!");
        setShowMessage(true);

        // Update personal details if they're included in response
        if (response.name || response.phone || response.location) {
          setPersonalDetails((prev) => ({
            ...prev,
            ...response,
          }));
        }
      }
    } catch (error) {
      handleError("Failed to update profile picture");
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        setIsLoading(true);
        const data = await apiRequest(
          "/talentpro/my-details",
          {
            method: "GET",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
              Accept: "application/json",
            },
          },
          handleError
        );
        if (data) {
          setPersonalDetails({
            name: data.name,
            phone: data.phone || "",
            location: data.location || "",
          });
          setProfilePic(data.profile_pic || "https://via.placeholder.com/150"); // Set profile pic

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

  const handleAboutMeCancel = () => {
    setIsEditingAboutMe(false);
    setNewLanguage(""); // Clear new language input
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await apiRequest(
          "/talentpro/cities",
          {
            method: "GET",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
              Accept: "application/json",
            },
          },
          handleError
        );

        if (response) {
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
    
    const isPhoneValid = formData.phone && (formData.phone.length === 17 || formData.phone.length === 11);
    console.log("Change 2", hasFieldChanges, isPhoneValid, formData.phone, formData.phone.length)

    setHasChanges(Boolean(hasFieldChanges && isPhoneValid));
  }, [formData, selectedCity, personalDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    if (phone.length === 17) return phone;
    if (phone.length === 11) {
      console.log("Change 1", phone)
      let part1 = phone.slice(0, 1); // Country code
      let part2 = phone.slice(1, 4); // Area code
      let part3 = phone.slice(4, 7); // First 3 digits
      let part4 = phone.slice(7); // Last 4 digits
      return `+${part1} (${part2}) ${part3}-${part4}`;
    }
  }

  const handleSave = async () => {
    if (!hasChanges) {
      return; // Don't proceed if no changes were made
    }

    try {
      let payload: any = {};
      if (formData.name !== personalDetails.name) {
        payload.name = formData.name;
      }
      if (formData.phone !== personalDetails.phone) {
        payload.phone = formatPhoneNumber(formData.phone);
      }
      if (selectedCity !== personalDetails.location) {
        payload.location = selectedCity;
      }

      // @ts-ignore
      if (fileInputRef?.current?.files[0]) {
        // @ts-ignore
        payload.profile_pic = fileInputRef?.current?.files[0];
      }

      console.log("Payload to send:", payload);
      // return
      
      const response = await apiRequest(
        "/talentpro/update-details",
        {
          method: "POST",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
          },
          body: payload,
        },
        handleError
      );

      if (response) {
        setPersonalDetails(response);
        setProfilePic(response.profile_pic || profilePic);
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

  const handleCityChange = (e: any) => {
    setSelectedCity(e);
    setFormData((prev) => ({ ...prev, location: e }));
  };

  const checkIfModified = () => {
    // Check if phone number is complete (should be 11 digits including country code)
    const isPhoneValid = formData.phone && formData.phone.length === 11;
    const hasChanges =
      JSON.stringify(formData) !== JSON.stringify(personalDetails);
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
    <div className="flex flex-col gap-4 mt-6">
      {successMessage && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 flex justify-center w-fit px-4 md:px-8 py-3 z-10
                        bg-green-400 text-white font-semibold text-center text-[14px] 
                        shadow-lg shadow-green-200 rounded-sm transition-opacity 
                        duration-1000 ease-in-out ${
                          showMessage ? "opacity-100" : "opacity-0"
                        }`}
        >
          {successMessage}
        </div>
      )}
      {/* Left Panel: Personal Details Form */}

      <div className="w-full bg-white rounded-lg  border-2 ">
        <div className="flex justify-between items-center mb-6 p-6 bg-[#F8F6FF]">
          <h2 className="text-2xl font-semibold text-gray-800">
            Basic Information
          </h2>
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
        <div className="pb-8 px-8">
          <div className="flex items-center justify-start gap-x-10">
            <div className="relative w-28 h-28 flex justify-start rounded-full gap-x-3  shadow-lg group mb-8">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              {/* {isEditing && (
                <div
                  className="absolute bottom-0 right-0 bg-[#350ABC] text-white p-2 rounded-full cursor-pointer shadow-lg transform transition duration-200 hover:scale-105 flex items-center justify-center z-20"
                  onClick={isEditing ? triggerFileUpload : undefined}
                >
                  <IoCameraOutline className="w-5 h-5" />
                </div>
              )} */}
              {/* <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              /> */}
            </div>
            <div className="flex flex-col ">
              <h4 className="flex items-center justify-start text-[18px] font-semibold">
                Profile Photo
              </h4>
              <p className="flex items-center justify-start text-[14px]">
                This will be displayed on your profile
              </p>
            </div>
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
                className={` rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-[#5d0abc] ${
                  isEditing
                    ? "border border-gray-300"
                    : "bg-[#F8F6FF] text-gray-500"
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
                className=" rounded-lg px-4 py-2 mt-1 bg-[#F8F6FF] text-gray-700 cursor-not-allowed"
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
                    const phoneNumber = phone.startsWith("1")
                      ? phone
                      : `1${phone}`;
                    setFormData({ ...formData, phone: phoneNumber });
                  }}
                  inputClass="!w-full border !border-gray-300 rounded-lg p-2 !mt-1 focus:ring-1 focus:ring-gray-300"
                  countryCodeEditable={false} // Prevent country code editing
                />
              ) : (
                <input
                  type="text"
                  name="phone"
                  value={
                    formData.phone
                      ? `${formData.phone.split(" ")[1]} ${
                          formData.phone.split(" ")[2]
                        }`
                      : ""
                  }
                  disabled
                  className=" rounded-lg px-4 mt-1 bg-[#F8F6FF] text-gray-700 cursor-not-allowed"
                />
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Location</label>
              {isEditing ? (
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger className="border border-gray-300 rounded-sm px-4 py-[16px] h-[55px] focus:ring-2 focus:ring-[#5d0abc]">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <input
                  type="text"
                  name="location"
                  value={selectedCity}
                  disabled
                  className=" rounded-lg px-4 py-2 mt-1 bg-[#F8F6FF] text-gray-500 cursor-not-allowed"
                />
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end mt-8 space-x-4">
              <div
                onClick={handleCancel}
                className="transition-all duration-300 ease-out px-6 py-2 rounded-sm hover:text-white text-gray-700 bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </div>
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-6 py-2 rounded-sm ${
                  hasChanges
                    ? "bg-[#5d0abc] text-white hover:bg-[#4a078f] cursor-pointer"
                    : "bg-[#5d0abc] text-white hover:bg-[#4a078f] opacity-50 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* About Me Section */}
      {/* <div className="w-full bg-white rounded-lg border-2">
        <div className="flex justify-between items-center mb-6 p-6 bg-[#F8F6FF]">
          <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>

          {!isEditingAboutMe && (
            <div
              onClick={() => setIsEditingAboutMe(true)}
              className="flex items-center space-x-1 text-[#5d0abc] cursor-pointer"
            >
              <FaEdit />
              <span>Edit</span>
            </div>
          )}
        </div>

        <div className="flex flex-col px-8 pb-8">
          {!isEditingAboutMe ? (
            <p className="text-gray-700">
              {aboutMe ||
                "Welcome to my portfolio! Share a little bit about yourself."}
            </p>
          ) : (
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#5d0abc] mt-2"
              rows={5}
            />
          )}
        </div>

        <div className="flex flex-col px-8 pb-8">
          <h4 className="text-xl font-semibold mb-4">Languages</h4>

          <div className="flex flex-wrap gap-4 mb-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                  {lang}
                </span>
                {isEditingAboutMe && (
                  <button
                    onClick={() => handleLanguageRemove(lang)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditingAboutMe && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language"
                className="flex-grow rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-[#5d0abc]"
              />
              <button
                onClick={handleLanguageAdd}
                className="px-4 py-2 bg-[#5d0abc] text-white rounded-lg"
              >
                Add
              </button>
            </div>
          )}

          {isEditingAboutMe && (
            <div className="flex justify-end">
              <button
                onClick={handleAboutMeSave}
                className="px-6 py-2 bg-[#5d0abc] text-white rounded-lg mr-4"
              >
                Save
              </button>
              <button
                onClick={handleAboutMeCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
