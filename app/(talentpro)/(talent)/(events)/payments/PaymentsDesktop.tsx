import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from '@/app/lib/context/ErrorProvider';
import { Loader } from "@/app/_components/ui/dashboard-loader";

export default function PaymentsDesktop() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
                     }, );
     
                    console.log(data)
                     setPayments(data || []);
                 } catch (error) {
                    console.error("Error fetching payments", error);
                } finally {
                     setIsLoading(false);
                 }
    };

    fetchPayments();
  }, []);

   if (isLoading) {
          return <Loader />;
      }

  return (
    <>
      {payments.map((event, index) => (
        <div key={index} className="space-y-4 mb-[30px] border">
          <h3 className="text-[18px] font-bold">
            Event: {event.event_title}
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>payment ID</th>
                <th>amount</th>
                <th>payment type</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {event.payments.map((payment, pIndex) => (
                <tr key={pIndex} >
                  <td>{payment.payment_id}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.payment_type}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
