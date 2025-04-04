import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from "@/app/lib/context/ErrorProvider";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { MdDoneAll } from "react-icons/md";
import { MdPendingActions, MdOutlineRequestPage, MdFormatListBulleted } from "react-icons/md";

import { CiFilter } from "react-icons/ci";

interface Payment {
  payment_id: number;
  amount: string;
  payment_type: string;
  status: string;
}

interface EventPaymentGroup {
  event_title: string;
  payments: Payment[];
}

export default function PaymentsMobile() {
  const [payments, setPayments] = useState<EventPaymentGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending" | "requested">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const data = await apiRequest("/talentpro/worker-payments", {
          method: "GET",
          headers: {
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
            Accept: "application/json",
          },
        });
        setPayments(data || []);
      } catch (error) {
        handleError("Failed to fetch payments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const parseAmount = (amount: string) => {
    return parseFloat(amount.replace('$', '').trim()); // Remove $ and convert to float
};

const getTotalAmount = (event: EventPaymentGroup) => {
    // Sum the amounts of the different payment types (initial payment, additional hours, and tip)
    return event.payments.reduce((total, payment) => {
        const amount = parseAmount(payment.amount);
        return total + amount;
    }, 0); // Return the total amount formatted to 2 decimal places
};

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "release_approved":
        return "bg-[#F8F6FF] text-[#350ABC]";
      case "release_pending":
        return "bg-gray-200 text-gray-600";
      case "release_requested":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-800";
    }
  };

  const getStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "release_approved":
        return "Approved";
      case "release_pending":
        return "Pending";
      case "release_requested":
        return "Requested";
      default:
        return "Null";
    }
  };

  const filteredPayments = payments
    .filter((event) =>
      event.event_title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((event) => ({
      ...event,
      payments: event.payments.filter((payment) => {
        if (activeTab === "approved" && payment.status !== "release_approved") return false;
        if (activeTab === "pending" && payment.status !== "release_pending") return false;
        if (activeTab === "requested" && payment.status !== "release_requested") return false;
        return true; // for "all"
      }),
      
    }))
    .filter((event) => event.payments.length > 0);

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
  {[
    { label: "All", value: "all", icon: <MdFormatListBulleted /> },
    { label: "Pending", value: "pending", icon: <MdPendingActions /> },
    { label: "Requested", value: "requested", icon: <MdOutlineRequestPage /> },
    { label: "Approved", value: "approved", icon: <MdDoneAll /> },
  
  ].map((tab) => (
    <button
      key={tab.value}
      onClick={() => setActiveTab(tab.value as typeof activeTab)}
      className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
        activeTab === tab.value
          ? "bg-blue-600 text-white shadow"
          : "bg-white border border-gray-300 text-gray-600"
      }`}
    >
      
      {tab.label}
    </button>
  ))}
</div>

      {/* Search bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search event name..."
          className="pl-10 pr-4 py-2 border !rounded-full !h-10 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiFilter className="absolute h-5 w-5 top-[10px] left-3 text-gray-600" />
      </div>

      {/* Cards */}
      {filteredPayments.length === 0 ? (
  <div className="text-center text-gray-500 mt-10">No payments found</div>
) : (
  filteredPayments.map((event, index) => (
    <div key={index} className="mb-8">
      <h2 className="text-base font-bold mb-2">{event.event_title}</h2>
      <div className="bg-white shadow rounded-lg p-4 space-y-3">
        {event.payments.map((payment, pIndex) => (
          <div
            key={pIndex}
            className="border rounded-lg p-3 flex flex-col gap-1"
          >
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Payment ID</span>
              <span className="font-semibold text-sm">#{payment.payment_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Type</span>
              <span className="text-sm">{payment.payment_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Status</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                  payment.status
                )}`}
              >
                {getStatus(payment.status)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Amount</span>
              <span className="text-sm">{payment.amount}</span>
            </div>
          </div>
        ))}
        <div className=" flex justify-end mr-1 mt-2 ">
        <span className="font-semibold text-sm">Total: ${getTotalAmount(event)}</span>

        </div>
      </div>
    </div>
  ))
)}

    </div>
  );
}
