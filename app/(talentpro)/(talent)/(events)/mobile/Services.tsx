import { useState, useEffect } from "react";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader } from "@/app/_components/ui/dashboard-loader";


const allServices = [
   
    { id: 3, name: "Cocktail Server", icon: "/images/mobile/service-icons/coctail-server-selected.svg", unselectedIcon: "/images/mobile/service-icons/coctail-server.svg" },
    { id: 2, name: "Waiter", icon: "/images/mobile/service-icons/waiter-selected.svg", unselectedIcon: "/images/mobile/service-icons/waiter.svg" },
    { id: 1, name: "Bartender", icon: "/images/mobile/service-icons/bartender-selected.svg", unselectedIcon: "/images/mobile/service-icons/bartender.svg" },
    { id: 4, name: "Promo Model", icon: "/images/mobile/service-icons/promo-model-selected.svg", unselectedIcon: "/images/mobile/service-icons/promo-model.svg" },
    { id: 5, name: "Event Helper", icon: "/images/mobile/service-icons/event-helper-selected.svg", unselectedIcon: "/images/mobile/service-icons/event-helper.svg" },
    { id: 6, name: "Barback", icon: "/images/mobile/service-icons/bar-back-selected.svg", unselectedIcon: "/images/mobile/service-icons/bar-back.svg" },
];

export default function ServicesProvided({ activeTab }: { activeTab: string }) {
    const { auth: storedData } = useAppSelector(selectAuth);
    const [selectedServices, setSelectedServices] = useState<{ id: number; name: string; rate: number }[]>([]);
    const [editingRates, setEditingRates] = useState<any>({});
    const [perHourRate, setPerHourRate] = useState<number>(0);
    const [initialServices, setInitialServices] = useState<{ id: number; name: string; rate: number }[]>([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: number]: string }>({}); 

    const [showMessage, setShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 

    useEffect(() => {
        const fetchWorkerDetails = async () => {
            try {
                setIsLoading(true);
                const data = await apiRequest("/talentpro/my-details", {
                    method: "GET",
                    headers: {
                        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
                    },
                });

                if (data?.services_provided) {
                    setPerHourRate(data.per_hours_rate); // Set worker's default per hour rate

                    const servicesWithRates = data.services_provided.map((service: { id: number; name: string; rate: number }) => ({
                        id: service.id,
                        name: service.name,
                        rate: service.rate !== null && service.rate !== undefined ? service.rate : "",
                    }));

                    setSelectedServices(servicesWithRates);
                    setInitialServices(servicesWithRates);
                }
            } catch (error) {
                console.error("Error fetching worker details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkerDetails();
    }, []);

    const toggleService = (service: { id: number; name: string }) => {
        setSelectedServices((prev) => {
            const exists = prev.some((s) => s.id === service.id);
            if (exists) {
                const updatedServices = prev.filter((s) => s.id !== service.id);
                return updatedServices;
            } else {
                return [...prev, { ...service, rate: perHourRate }];
            }
        });
    };

    const handleRateChange = (serviceId: number, value: string) => {
        const numericValue = value.replace(/^0+/, '');
        const parsedValue = parseInt(numericValue, 10);
    
        setEditingRates((prev: any) => ({
            ...prev,
            [serviceId]: isNaN(parsedValue) ? '' : parsedValue,
        }));
    
        // Updated error validation
        let errorMessage = "";
        if (!parsedValue) {
            errorMessage = "Please enter your service rate";
        } else if (parsedValue < 30) {
            errorMessage = "Rate cannot be less than $30/hr";
        } else if (parsedValue > 200) {
            errorMessage = "Rate cannot exceed $200/hr";
        }
    
        setErrors((prevErrors) => ({
            ...prevErrors,
            [serviceId]: errorMessage,
        }));
    };
    

    const hasChanges = () => {
        // Check if services were added or removed
        if (selectedServices.length !== initialServices.length) {
            return true;
        }

        // Check if any rates were changed
        const hasRateChanges = Object.keys(editingRates).length > 0;
        if (hasRateChanges) {
            return true;
        }

        // Check if selected services are different from initial services
        const initialIds = initialServices.map(s => s.id).sort();
        const selectedIds = selectedServices.map(s => s.id).sort();
        return JSON.stringify(initialIds) !== JSON.stringify(selectedIds);
    };

    const saveRates = async () => {
        let hasError = false;
        const newErrors: { [key: number]: string } = {}; // ✅ Fix the error by explicitly defining the type
    
        // ✅ Validate all services (edited & non-edited)
        selectedServices.forEach((service) => {
            const rateValue = editingRates[service.id] !== undefined ? editingRates[service.id] : service.rate;
    
            if (rateValue === 0 || rateValue === undefined) {
                newErrors[service.id] = "Please enter your service rate";
                hasError = true;
            } else if (rateValue < 30) {
                newErrors[service.id] = "Rate cannot be less than $30/hr";
                hasError = true;
            } else if (rateValue > 200) {
                newErrors[service.id] = "Rate cannot exceed $200/hr";
                hasError = true;
            }
        });
    
        if (hasError) {
            setErrors(newErrors);
            return;
        }
    
        const updatedRates = selectedServices.map((service) => ({
            service_id: service.id,
            rate: editingRates[service.id] !== undefined ? editingRates[service.id] : service.rate, // ✅ Include unchanged rates
        }));
    
        const removedServiceIds = initialServices
            .filter((service) => !selectedServices.some((s) => s.id === service.id))
            .map((service) => service.id);
    
        try {
            const response = await apiRequest("/talentpro/update-service-rate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
                },
                body: { rates: updatedRates, removed_services: removedServiceIds },
            });
            setSelectedServices((prev) =>
                prev.map((service) => ({
                    ...service,
                    rate: editingRates[service.id] !== undefined ? editingRates[service.id] : service.rate,
                }))
            );
        
                
    
                setEditingRates({});
                setErrors({}); // ✅ Clear errors after successful update
                setInitialServices([...selectedServices]);
                setIsEditing(false);
    
                setSuccessMessage("Rates updated successfully!");
                setShowMessage(true);
    
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);

                setTimeout(() => {
                    setSuccessMessage("");
                }, 4000);
            
        } catch (error) {
            console.error("Error updating service rates:", error);
        }
    };
    

    const cancelEdit = () => {
        // Reset state to initial values and exit edit mode
        setSelectedServices([...initialServices]);
        setEditingRates({});
        setIsEditing(false);
        setErrors({}); 

    };

     if (isLoading) {
            return <Loader />;
        }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full mt-4 mb-12 ">

{successMessage && (
    <div 
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center w-[280px] px-4 py-3 z-10
                    bg-green-400 text-white font-semibold text-center text-[14px] 
                    shadow-lg shadow-green-200 rounded-sm transition-opacity 
                    duration-1000 ease-in-out ${showMessage ? "opacity-100" : "opacity-0"}`}
    >
        {successMessage}
    </div>
)}
            <h2 className="text-[16px] font-semibold text-gray-800 mb-4">Offered Services</h2>

            <div className="flex flex-wrap gap-3 pb-6 border-b mb-6">
                {allServices.map((service) => {
                    const isSelected = selectedServices.some((s) => s.id === service.id);
                    return (
                        <button
                            key={service.id}
                            className={`px-4 py-2 text-[14px] flex rounded-full border transition-all ${isSelected ? "bg-[#5d0abc] text-white" : "bg-gray-100 text-gray-700"
                                } ${!isEditing ? "cursor-not-allowed" : "cursor-pointer"}`}
                            onClick={() => isEditing && toggleService(service)} // Prevent click when not editing
                            disabled={!isEditing} // Disable button in non-edit mode
                        >
                            <img     src={isSelected ? service.icon : service.unselectedIcon} 
 alt={service.name} className="w-5 h-5 object-contain mr-1" />
                            {service.name}
                        </button>
                    );
                })}
            </div>

            <h3 className="text-[16px] font-medium text-gray-700 mb-4">Add your services per hour rate</h3>

            <ul className="space-y-3">
                {selectedServices.map((service) => (
                    <li key={service.id} className="flex flex-col border-b pb-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 text-[14px]">{service.name}</span>
                            <div className="flex items-center space-x-1">
                                <span className="text-gray-500 text-[14px]">$</span>
                                <input
                                    type="number"
                                    value={editingRates[service.id] !== undefined ? editingRates[service.id] : service.rate || ""}
                                    onChange={(e) => handleRateChange(service.id, e.target.value)}
                                    className={`border rounded-sm text-[14px] px-2 py-5 !h-6 w-16 text-center 
                                    ${errors[service.id] ? "border-red-500" : "border-gray-300 focus:ring-1 focus:ring-gray-300 "}
                                    ${!isEditing ? "bg-gray-200 text-gray-500" : ""}`}
                                    disabled={!isEditing}
                                />
                                <span className="text-gray-500 text-[14px]">/hr&nbsp;&nbsp;</span>
                            </div>
                        </div>

                        {/* ✅ Show Error Message Below Input */}
                        {errors[service.id] && (
                            <p className="text-red-500 text-[12px] mt-1">{errors[service.id]}</p>
                        )}
                    </li>
                ))}
            </ul>

            <div className="flex justify-end space-x-2 mt-4">
                {isEditing && (
                    <button
                        onClick={cancelEdit}
                        className="px-4 py-2 text-[16px] w-[50%] rounded-sm bg-gray-200 text-gray-700 "
                    >
                        Cancel
                    </button>
                )}
                <button
                    onClick={() => (isEditing ? saveRates() : setIsEditing(true))}
                    disabled={isEditing && !hasChanges()}
                    className={`px-4 py-2 text-[16px] rounded-sm ${isEditing
                            ? hasChanges()
                                ? "bg-[#5d0abc] text-white w-[50%] hover:bg-[#4a078f]"
                                : "bg-[#5d0abc] text-white w-[50%] opacity-50 cursor-not-allowed"
                            : "bg-[#5d0abc] text-white w-full hover:bg-[#4a078f]"
                        }`}
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>
        </div>
    );
}
