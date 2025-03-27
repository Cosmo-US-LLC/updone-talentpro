import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from '@/app/lib/context/ErrorProvider';
import { Loader } from "@/app/_components/ui/dashboard-loader";

import { CiFilter } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";     // Approved
import { MdPendingActions } from "react-icons/md"; // Pending
import { MdOutlineRequestPage } from "react-icons/md"; // Requested
import { MdFormatListBulleted } from "react-icons/md"; // All


interface Payment {
    payment_id: number;
    amount: string;
    payment_type: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}

interface EventPaymentGroup {
    event_title: string;
    payments: Payment[];
}

export default function PaymentsDesktop() {
    const [payments, setPayments] = useState<EventPaymentGroup[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'approved' | 'pending' | 'requested'>('all');
    const [searchQuery, setSearchQuery] = useState('');
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
                        "Accept": "application/json"
                    },
                });
                setPayments(data || []);
            } catch (error) {
                console.error("Error fetching payments", error);
                handleError("Failed to fetch payments");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'release_approved':
                return 'bg-[#F8F6FF] text-[#350ABC]';
            case 'release_pending':
                return 'bg-gray-100 text-gray-600';
            case 'release_requested':
                return 'bg-green-50 text-green-700';
            default:
                return 'bg-gray-50 text-gray-800';
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
    .filter(event =>
        event.event_title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(event => ({
        ...event,
        payments: event.payments.filter(payment => {
          if (activeTab === 'approved' && payment.status !== 'release_approved') {
            return false;
          }
          if (activeTab === 'pending' && payment.status !== 'release_pending') {
            return false;
          }
          if (activeTab === 'requested' && payment.status !== 'release_requested') {
            return false;
          }
          return true; // includes 'all'
        })
        
    }))
    .filter(event => event.payments.length > 0);


    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-4">
           
            
            {/* Search bar positioned to the right */}
            <div className="flex justify-end mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Filter by Event's name ..."
                        className="pl-10 pr-4 py-2 border !rounded-full !h-12 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <CiFilter className=" absolute h-5 w-5 top-[15px] left-3 text-gray-600"/>
                </div>
            </div>

            {/* White background container for the entire table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Angled tabs with original names */}
                <div className="flex">
  {[
    { label: "All", value: "all", icon: <MdFormatListBulleted className="w-4 h-4" /> },
    { label: "Approved", value: "approved", icon: <MdDoneAll className="w-4 h-4" /> },
    { label: "Pending", value: "pending", icon: <MdPendingActions className="w-4 h-4" /> },
    { label: "Requested", value: "requested", icon: <MdOutlineRequestPage className="w-4 h-4" /> },
  ].map((tab, idx) => (
    <div
      key={tab.value}
      onClick={() => setActiveTab(tab.value as typeof activeTab)}
      className={`relative cursor-pointer px-6 py-3 text-sm font-medium flex items-center gap-2 ${
        activeTab === tab.value
          ? 'text-[#350ABC] bg-white'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
      style={{
        clipPath:
          idx === 0
            ? 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)'
            : idx === 3
            ? 'polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%)'
            : 'polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)',
        marginLeft: idx === 0 ? '0' : '-6px',
      }}
    >
      {tab.icon}
      <span className="capitalize">{tab.label}</span>
      {activeTab === tab.value && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#350ABC]"></div>
      )}
    </div>
  ))}
</div>



                {filteredPayments.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No payments found
                    </div>
                ) : (
                    filteredPayments.map((event, index) => (
                        <div key={index} className="p-4">
                            <h3 className="text-lg font-semibold mb-4">
                                Event: {event.event_title}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {event.payments.map((payment, pIndex) => (
                                            <tr key={pIndex}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{payment.payment_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.payment_type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                                                    {getStatus(payment.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                                               
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}