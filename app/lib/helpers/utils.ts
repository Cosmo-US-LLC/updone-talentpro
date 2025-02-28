import { Dispatch } from "redux";
import { Breadcrumb, Profile, UpdatedData } from "../types";
import { apiRequest } from "../services";
import { setAuth } from "../store/features/authSlice";
import Cookies from "js-cookie";

// Helper function to check if a string is a number
const isNumber = (str: string) => /^\d+$/.test(str);
export const generateBreadcrumbs = (
  pathSegments: string[],
  currentStep?: number,
  jobId?: string
): Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [
    { name: "Home", path: `${process.env.NEXT_PUBLIC_BASE_URL || "/"}` },
  ];

  const hasStaff = pathSegments.includes("staff");
  const hasJobDetail = pathSegments.includes("job-detail");
  const hasSettlements = pathSegments.includes("settlements");
  const hasPayment = pathSegments.includes("payment");

  // Special case for Home/payment
  if (pathSegments.join("/") === "payment") {
    breadcrumbs.push({
      name: "Add Event Details",
      path: "/add-job?step=event-location",
    });
    breadcrumbs.push({
      name: "Event Details",
      path: `staff/job-detail/${jobId}`,
    });
    breadcrumbs.push({ name: "Payment", path: "/add-job/payment" });
    return breadcrumbs;
  }

  if (hasStaff) {
    if (hasJobDetail) {
      breadcrumbs.push({
        name: "Add Event Details",
        path: "/add-job?step=event-location",
      });
      breadcrumbs.push({ name: "Event Details", path: "/staff/job-detail" });
    } else if (!hasSettlements && !hasJobDetail && !hasPayment) {
      breadcrumbs.push({
        name: "Add Event Details",
        path: "/add-job?step=event-location",
      });
      if (currentStep === 1) {
        breadcrumbs.push({
          name: "Invite Talents",
          path: "/add-job/invite-members",
        });
      }
    }

    if (hasSettlements) {
      breadcrumbs.push({ name: "Settlements", path: "/staff/settlements" });
    }

    if (hasPayment) {
      breadcrumbs.push({
        name: "Booking",
        path: "/add-job?step=event-location",
      });
      breadcrumbs.push({
        name: "Event Details",
        path: "/add-job/event-details",
      });
      breadcrumbs.push({ name: "Payment", path: "/add-job/payment" });
    }
  } else {
    // Remove any numeric segment (like '157' in 'my-events/job-detail/157')
    const filteredSegments = pathSegments.filter(
      (segment) => !isNumber(segment)
    );

    filteredSegments.reduce((prevPath, currentSegment) => {
      const nextPath = `${prevPath}/${currentSegment}`;
      breadcrumbs.push({
        name: capitalizeSegment(currentSegment),
        path: nextPath,
      });
      return nextPath;
    }, "");
  }

  // Handle specific case for 'my-events/job-detail/:id'
  if (pathSegments.join("/").startsWith("my-events/job-detail")) {
    // breadcrumbs.push({ name: 'Events', path: '/my-events' });
    // breadcrumbs.push({ name: 'Event Details', path: '/my-events/job-detail' });
  }

  return breadcrumbs;
};
export function calculateTotal(hourRate: number, amount: number) {
  const total = Number(hourRate) * Number(amount);
  // Store the total in localStorage as a string
  localStorage.setItem("totalAmount", total.toString());
  return total;
}

// Utility function to capitalize the first letter of each breadcrumb name
const capitalizeSegment = (segment: string): string => {
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
};
// Helper function to validate and prepare the data for API request
export const prepareUpdatedData = (
  profile: Profile,
  originalProfile: Profile | null,
  showPasswordFields: boolean,
  password: string,
  confirmPassword: string
): UpdatedData => {
  const updatedData: UpdatedData = {};

  // Include only modified fields in the API request
  if (profile.fullName !== originalProfile?.fullName)
    updatedData.full_name = profile.fullName;
  if (profile.company !== originalProfile?.company)
    updatedData.company_name = profile.company;
  if (profile.phoneNumber !== originalProfile?.phoneNumber)
    updatedData.contact_number = profile.phoneNumber;

  if (showPasswordFields && password && confirmPassword) {
    updatedData.current_password = profile.currentPassword || "";
    updatedData.new_password = password || "";
    updatedData.new_password_confirmation = confirmPassword || "";
  }

  return updatedData;
};

// Helper function to update profile via API
export const updateProfile = async (
  updatedData: UpdatedData,
  storedData: any, // Type as per your auth state structure
  dispatch: Dispatch<any> // Type as per your Redux setup
): Promise<void> => {
  try {
    const response = await apiRequest("/update", {
      method: "POST",
      headers: {
        ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
      },
      body: updatedData,
    });

    if (response.user) {
      const updatedAuth = {
        ...storedData,
        user: {
          ...storedData.user,
          ...response.user,
        },
      };
      dispatch(setAuth(updatedAuth));
      const isUpdoneDomain = window.location.hostname.includes("updone");

      Cookies.set("token", updatedAuth.token || "", {
        expires: 30,
        path: "/",
        // ...(isUpdoneDomain && { domain: ".updone.com" }),
      });

      Cookies.set("authData", JSON.stringify(updatedAuth.user), {
        expires: 30,
        path: "/",
        // ...(isUpdoneDomain && { domain: ".updone.com" }),
      });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export const formatDate = (inputDate: any) => {
  // Check if the input is already a Date object
  let date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  // Validate if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format.");
  }

  // Define month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract date components
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format and return the date string
  return `${month} ${day}, ${year}`;
};
