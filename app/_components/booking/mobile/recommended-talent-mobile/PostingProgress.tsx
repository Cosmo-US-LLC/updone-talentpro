import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../lib/store/store';
import { apiRequest } from '@/app/lib/services';
import { useError } from "@/app/lib/context/ErrorProvider";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useRouter } from "next/navigation";
import { resetJobCreate } from '@/app/lib/store/features/jobCreateSlice'

const PostingProgress = () => {
    const [currentStep, setCurrentStep] = useState(0); // Track the current step
    const [inProgress, setInProgress] = useState(true); // Track if the steps are still progressing
    const jobCreateState = useSelector((state: RootState) => state.jobCreate);
    const { auth: storedData } = useAppSelector(selectAuth);
    const { handleError } = useError();
    const [apiSuccess, setApiSuccess] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    // Paths to the SVGs
    const checkPending = '/images/gallery/confirm-booking/check-pending.svg';
    const checkInProgress = '/images/gallery/confirm-booking/check.svg';
    const checkCompleted = '/images/gallery/confirm-booking/check-completed.svg';

    // List of steps
    const steps = [
        { label: 'Compiling event details' },
        { label: 'Posting your event' },
        { label: 'Sending invitation to Talents' },
        { label: 'Updating your ClientHub' },
        { label: 'All Done! Getting you to the client hub' },
    ];

    // Helper function to convert 12-hour time to 24-hour format
    const convertTo24Hour = (time: string, amPm: string) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10).toString();

        if (amPm === "PM" && parseInt(hours) !== 12) {
            hours = (parseInt(hours) + 12).toString();
        } else if (amPm === "AM" && parseInt(hours) === 12) {
            hours = '0'; // Handle midnight case
        }

        return `${hours}:${minutes}`;
    };

    // Helper function to add hours to time
    const addHoursToTime = (startTime: string, hoursToAdd: number) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours + hoursToAdd, minutes);
        return `${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, '0')}`;
    };

    const createJobApi = async () => {
        const endpoint = "/job";
        // Extract date in 'YYYY-MM-DD' format
        const selectedDate = jobCreateState.selectedDate ? new Date(jobCreateState.selectedDate).toISOString().split('T')[0] : null;

        // Convert selected time and add hours to get the end time
        const startTime = convertTo24Hour(jobCreateState.selectedTime, jobCreateState.amPm);
        const endTime = addHoursToTime(startTime, parseInt(jobCreateState.selectedHours));

        // Create the payload
        const body = {
            postal_code: "null",
            city_id: 102,
            address: "null",
            event_location: jobCreateState?.selectedLocation,
            service_id: jobCreateState.selectedService.id,
            title: jobCreateState?.title,
            description: jobCreateState?.eventDescription,
            working_times: [
                {
                    date: selectedDate,
                    timing: [
                        {
                            start_time: `${startTime}`,
                            end_time: `${endTime}`,
                        },
                    ],
                },
            ],
            invited_workers: jobCreateState?.selectedTalents?.map((talent: any) => talent?.id),
        };

        const newData = await apiRequest(
            endpoint,
            {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
                },
            },
            handleError
        );

        if (newData && newData.id) {
            setApiSuccess(true);
        }
    }

    useEffect(() => {
        if (jobCreateState) {
            createJobApi();
        }
    }, [jobCreateState]);

    useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 1500);

            return () => clearTimeout(timer);
        } else {
            setInProgress(false);
            if (apiSuccess === true) {
                dispatch(resetJobCreate());
                const baseUrl = process.env.NEXT_PUBLIC_CLIENTHUB_URL ?? '';
                router.push(`${baseUrl}/events`);
            }
        }
    }, [currentStep, apiSuccess]);


    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
          @keyframes ellipsis {
            0% { content: "."; }
            33% { content: ".."; }
            66% { content: "..."; }
            100% { content: ""; }
          }

          .animate-ellipsis:after {
            content: "...";
            animation: ellipsis steps(4, end) 1s infinite;
          }
        `;
        document.head.append(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="text-left justify-center">
                <img
                    src={`/images/gallery/confirm-booking/progress_${currentStep ? currentStep : 1}.svg`}
                    alt="Progress icon"
                    className="w-[200px] h-[200px] mb-4 right-4"
                />
                <h2 className="text-2xl font-semibold mb-2">Job Posting in progress</h2>
                <p className="text-gray-500 mb-8">
                    Please wait while we are working on your job posting process...
                </p>

                <ul className="space-y-4">
                    {steps.map((step, index) => (
                        <li key={index} className="flex items-center space-x-4">
                            <img
                                src={
                                    currentStep > index
                                        ? checkCompleted // Completed step
                                        : currentStep === index
                                            ? checkInProgress // In-progress step
                                            : checkPending // Pending step
                                }
                                alt={`Step ${index + 1} check`}
                                className="w-6 h-6"
                            />
                            <p
                                className={`text-lg ${currentStep > index
                                    ? 'text-[#774DFD]' // Completed step color
                                    : currentStep === index
                                        ? 'text-[#6B6B6B]' // In-progress step color
                                        : 'text-[#6B6B6B]' // Pending step color
                                    }`}
                            >
                                {step.label}{' '}
                                {currentStep === index && inProgress && (
                                    <span className="animate-ellipsis">...</span>
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostingProgress;
