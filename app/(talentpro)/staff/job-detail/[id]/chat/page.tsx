'use client'
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
    id: number;
    sender_user_id: number;
    receiver_user_id: number | null;
    message_body: string;
    created_at: string;
};

const ChatPage = () => {
    const params = useParams();
    const { auth: storedData } = useAppSelector(selectAuth);
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messageBody, setMessageBody] = useState("");
    const [assignedToMe, setIsAssignedToMe] = useState(false);
    const [jobId, setJobId] = useState(null);
    const [chatStatus, setChatStatus] = useState(null);
    const { handleError } = useError();
    const router = useRouter();
    const inviteId = params.id;
    const searchParams = useSearchParams();
const returnUrl = searchParams.get("returnUrl");


function timeAgo(dateTimeString:string) {
    const inputDate: any = new Date(dateTimeString);
    const now:any = new Date();
    const diffMs = now - inputDate;
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (seconds < 60) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours === 1) {
      return '1 hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (days < 14) {
      return '1 week ago';
    } else {
      const weeks = Math.floor(days / 7);
      return `${weeks} weeks ago`;
    }
  } 

    useEffect(() => {
        const getMessages = async () => {
            const newData = await apiRequest(
                "/chat/getAll",
                {
                    method: "POST",
                    body: {
                        offer_id: inviteId
                    },
                    headers: {
                        ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                    },
                },
                handleError
            );
            if (newData?.messages) {
                setMessages(newData.messages.reverse());
                setChatStatus(newData?.chat_status);
                setJobId(newData?.job_id);
                setIsAssignedToMe(newData?.assigned_to_me)
            }
        };
        getMessages();
    }, [inviteId, storedData, handleError]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const sendMessage = async () => {
        if (!messageBody.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            sender_user_id: storedData?.user?.id,
            receiver_user_id: null,
            message_body: messageBody.trim(),
            created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]); // Append to the end
        setMessageBody("");

        // Scroll after message is added
        scrollToBottom();

        await apiRequest(
            "/chat/sendMessage",
            {
                method: "POST",
                body: {
                    offer_id: inviteId,
                    message_body: messageBody.trim()
                },
                headers: {
                    ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                },
            },
            handleError
        );
    };

    const formatMessageDate = (date: string) => {
        const messageDate = moment(date);
        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'days').startOf('day');

        if (messageDate.isSame(today, 'day')) {
            return `Today, ${messageDate.format("h:mm A")}`;
        } else if (messageDate.isSame(yesterday, 'day')) {
            return `Yesterday, ${messageDate.format("h:mm A")}`;
        } else {
            return messageDate.format("ddd h:mm A, MMM D, YYYY");
        }
    };

    // Reverse the messages for grouping if needed
    const reversedMessages = [...messages];

    // Group messages by date
    const groupedMessages = reversedMessages.reduce((acc: any, msg: any) => {
        const date = formatMessageDate(msg.created_at);
        acc[date] = acc[date] || [];
        acc[date].push(msg);
        return acc;
    }, {});

    const handleClickBack = () => {
        if (returnUrl) {
            router.push(`/staff/job-detail/${jobId}?returnUrl=${returnUrl}`);
        } else {
            router.push(`/staff/job-detail/${jobId}`);
        }
    };
    

    return (
        <div className="flex flex-col h-[100dvh]">
            {/* Header */}
            <div className=" sticky top-0 md:top-3 p-2 flex cursor-pointer items-center space-x-2" onClick={() => {
                handleClickBack();
            }}>
                <Image
                    alt="Back"
                    height={25}
                    width={25}
                    src="/images/mobile/talent/arrowLeft.svg"
                />
                <p className="text-[14px] font-[400] leading-[24px]">Back</p>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4  md:mt-24">
                {Object.entries(groupedMessages).map(([date, msgs]: any) => (
                    <div key={date}>
                        {/* Date Timestamp */}
                        <p
                            className="text-[#72777A] text-[12px] font-[500] leading-[16px] text-center mb-4"
                        >
                            {date}
                        </p>

                        {/* Messages */}
                        {msgs.map((msg: any) => (
                            <div
                                key={msg.id}
                                className={`flex mb-2 ${msg?.sender_user_id === storedData?.user?.id
                                    ? "justify-end" // Sender's messages on the right
                                    : "justify-start" // Receiver's messages on the left
                                    }`}
                            >
                                <div
                                    style={{ wordBreak: "break-word", overflowWrap: "break-word", position: "relative" }}
                                    className={`max-w-[85%] py-3 px-4 ${msg?.sender_user_id === storedData?.user?.id
                                        ? "bg-[#774DFD] text-white rounded-bl-[24px] rounded-t-[24px]" // Sender's style
                                        : "bg-[#FFF6EA] text-black rounded-t-[24px] rounded-br-[24px]" // Receiver's style
                                        }`}
                                >
                                    {/* Elliptical Tail for Sender */}
                                    {msg?.sender_user_id === storedData?.user?.id && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                right: "-5px",
                                                width: "20px",
                                                height: "10px",
                                                background: "#774DFD",
                                                borderBottomLeftRadius: "15px",
                                                transform: "rotate(180deg)",
                                            }}
                                        ></div>
                                    )}

                                    {/* Elliptical Tail for Receiver */}
                                    {msg.sender_user_id !== storedData?.user?.id && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: "-5px",
                                                width: "20px",
                                                height: "10px",
                                                background: "#FFF6EA",
                                                borderBottomRightRadius: "15px",
                                                transform: "rotate(-180deg)",
                                            }}
                                        ></div>
                                    )}

                                    <div className="flex flex-col">
                                    {msg.sender_user_id !== storedData?.user?.id && msg.sender && (
  <div className="flex flex-col mb-2">
    <div className="bg-[#FFC56E] px-4 w-fit rounded-full">
      <p className="text-[14px] font-[500] leading-[24px]">{msg.sender?.name ?? "Unknown User"}</p>
    </div>
    {msg.sender?.last_active && (
      <p className="text-[12px] font-[400] text-gray-500 mt-1">
        Last seen {timeAgo(msg.sender.last_active)}
      </p>
    )}
  </div>
)}


                                        <p className="text-[14px] font-[400] leading-[28px]">
                                            {msg.message_body}
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}

                    </div>
                ))}
                {/* Ref for Auto-Scroll */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            {
                (chatStatus === "open" || assignedToMe === true) && chatStatus !== "completed" &&
                <div className="p-4 sticky bottom-0 bg-white flex items-center justify-start space-x-2">
                    <input
                        type="text"
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && messageBody.trim() !== "") {
                                sendMessage();
                            }
                        }}
                        className="w-[73%] p-3 border border-gray-300 outline-none rounded-full !rounded-full"
                        placeholder="Add your comment here..."
                    />
                    <div onClick={sendMessage}>
                        <Image
                            alt="Send"
                            height={30}
                            width={30}
                            src="/images/mobile/talent/sendMessageButton.svg"
                        />
                    </div>
                </div>
            }
            {
                chatStatus === "closed" &&
                <div className="flex flex-row items-center justify-center gap-4 p-4">
                    <Image
                        alt="Send"
                        height={30}
                        width={30}
                        src="/images/mobile/talent/lock.svg"
                    />
                    <p className="text-[12px] font-[400] leading-[18px]">
                        For smoother experience, please wait for the client to respond to continue the chat.
                    </p>
                </div>
            }
            {
                (chatStatus === "job_assigned" && assignedToMe === false) &&
                <div className="flex flex-row items-center justify-center gap-2 p-4">
                    <Image
                        alt="Send"
                        height={50}
                        width={50}
                        src="/images/mobile/talent/lock2.svg"
                        className="mt-2"
                    />
                    <p className="text-[12px] font-[400] leading-[18px]">
                        This job is already assigned to another talent.
                    </p>
                </div>
            }
            {
                chatStatus === "completed" &&
                <div className="flex flex-row items-center justify-center gap-2 p-4">
                    <Image
                        alt="Send"
                        height={50}
                        width={50}
                        src="/images/mobile/talent/lock2.svg"
                        className="mt-2"
                    />
                    <p className="text-[12px] font-[400] leading-[18px]">
                        This job has been completed.
                    </p>
                </div>
            }
        </div>
    );
};

export default ChatPage;
