"use client"
import React, { useEffect, useState } from 'react'
import AddLocationFirstScreen from './AddLocationFirstScreen';
import NavigationBar from './NavigationBar';
import { useRouter } from 'next/navigation';
import { MdOutlineChevronLeft } from "react-icons/md";
import Image from 'next/image';
import AddJobGuide from '../../ui/add-job-guide';
import BookingHeader from './BookingHeader';
import DateTimeScreen from './DateTimeScreen';
import ServiceDetailScreen from './ServiceDetailScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/store/store';
import RecommendedTalentMobile from './recommended-talent-mobile';
import BottomBarMobile from './recommended-talent-mobile/BottomBar';
import ConfirmDetailsScreen from './ConfirmDetailScreen';
import PostingProgressMobileScreen from './PostingProgressMobileScreen';
import AddLocationSecondScreen from './AddLocationSecondScreen';
import { motion } from 'framer-motion';

const BookingMobileScreen = () => {
    const jobCreateState = useSelector((state: RootState) => state.jobCreate);
    const [selectedTalents, setSelectedTalents] = useState<any>(jobCreateState?.selectedTalents ? jobCreateState?.selectedTalents : []);
    const stepLabels = ["event-location", "date-time", "service-details", "recommended-talents", "confirm-details", "posting-event"];
    const [stepInQuery, setStepInQuery] = useState("");
    const [jobIdInQuery, setJobIdInQuery] = useState<any>(null);
    const [step, setStep] = useState<number>(0);
    const [eventTitleError, setEventTitleError] = useState("");
    const [eventDescriptionError, setEventDescriptionError] = useState("");
    const [eventDateError, setEventDateError] = useState("");
    const [eventStartTimeError, setEventStartTimeError] = useState("");
    const [eventDurationrror, setEventDurationError] = useState("");
    const [locationError, setLocationError] = useState('');
    const [locationFilled, setLocationFilled] = useState(false);
    const router = useRouter();

    const updateQueryParam = (stepIndex: number) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('step', stepLabels[stepIndex]);
        router.push(`${window.location.pathname}?${queryParams.toString()}`);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            const queryStep = queryParams.get('step');
            setStepInQuery(queryStep ?? "");
            const job_id = queryParams.get('jobId');
            if (queryStep === "invite-more-talents") {
                setStep(3);
                setStepInQuery("invite-more-talents");
                setJobIdInQuery(job_id);
            } else if (stepLabels.includes(queryStep as any)) {
                const stepIndex = stepLabels.indexOf(queryStep as any);
                setStep(stepIndex);
            }
        }
    }, [router]);

    const handleNext = () => {
        if (!jobCreateState?.selectedLocation || locationError !== "") {
            setLocationError('Please select a location from the dropdown.');
            return;
        }
        else if (step === 1 && (!jobCreateState?.selectedDate || jobCreateState?.selectedTime === "" || jobCreateState?.selectedTime === "" || jobCreateState?.selectedHours === "")) {
            if (!jobCreateState?.selectedDate) {
                setEventDateError("Don't forget to choose your event date!");
            }
            if (jobCreateState?.selectedTime === "") {
                setEventStartTimeError("Don't forget to choose your event start time!");
            }
            if (jobCreateState?.selectedHours === "") {
                setEventDurationError("Don't forget to choose your event duration!");
            }
            return;
        }
        else if (step === 2 && (eventTitleError !== "" || eventDescriptionError !== "" || jobCreateState?.title.length === 0 || jobCreateState?.eventDescription.length === 0 || jobCreateState?.eventDescription.length > 100 || jobCreateState?.eventDescription.length < 20 || jobCreateState?.title.length < 10 || jobCreateState?.title.length > 40)) {
            if (jobCreateState?.title.length === 0) {
                setEventTitleError("Title is required.");
            } else if (jobCreateState?.title.length < 10) {
                setEventTitleError("Title must be at least 10 characters.");
            } else if (jobCreateState?.title.length > 40) {
                setEventTitleError("Title must not exceed 40 characters.");
            }

            if (jobCreateState?.eventDescription.length === 0) {
                setEventDescriptionError("Description is required.");
            } else if (jobCreateState?.eventDescription.length > 100) {
                setEventDescriptionError("Description must not exceed 100 characters.");
            }
            else if (jobCreateState?.eventDescription.length < 20) {
                setEventDescriptionError("Description must be at least 20 characters.");
            }
            return;
        } else if (step === 4) {
            const queryParams = new URLSearchParams(window.location.search);
            const queryStep = queryParams.get('step');
            if (queryStep === "confirm-details") {
                updateQueryParam(step + 1);
                setStep(step + 1);
                return;
            } else {
                return;
            }
        }
        else {
            updateQueryParam(step + 1);
            setStep(step + 1);
            return;
        }
    };

    const bottomButtonText = () => {
        if (step === 4) {
            return 'Post Event';
        } else if (step === -1) {
            return 'Save Location';
        } else {
            return 'Continue';
        }
    }

    const screenVariants = {
        hidden: { opacity: 0, y: 50 }, // Start from below
        visible: { opacity: 1, y: 0 }, // Centered
        exit: { opacity: 0, y: -50 } // Exit towards the top
    };

    if (stepInQuery === "") {
        return (
            <AddJobGuide setStepInQuery={setStepInQuery} />
        )
    } else {
        return (
            <div className='bg-[#f6f9fc] h-dvh flex flex-col'>
                {
                    step !== 4 && step !== 5 && step !== -1 &&
                    <BookingHeader
                        stepInQuery={stepInQuery}
                        jobIdInQuery={jobIdInQuery}
                        setStep={setStep}
                        step={step}
                        stepLabels={stepLabels}
                    />
                }
                {
                    step !== 4 && step !== 5 && step !== -1 &&
                    <NavigationBar
                        step={step}
                    />
                }

                {
                    step === 0 &&
                    <motion.div
                        key="AddLocationFirstScreen"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={screenVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <AddLocationFirstScreen
                            setLocationError={setLocationError}
                            locationError={locationError}
                            setStep={setStep}
                        />
                    </motion.div>

                }
                {
                    step === -1 &&
                    <motion.div
                        key="AddLocationSecondScreen"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={screenVariants}
                        transition={{ duration: 0.5 }}
                        className="min-h-[100dvh] flex flex-col"
                    >
                        <AddLocationSecondScreen
                            setLocationError={setLocationError}
                            locationError={locationError}
                            setStep={setStep}
                        />
                    </motion.div>
                }
                {
                    step === 1 &&
                    <DateTimeScreen
                        setEventDateError={setEventDateError}
                        eventDateError={eventDateError}
                        setEventStartTimeError={setEventStartTimeError}
                        eventStartTimeError={eventStartTimeError}
                        setEventDurationError={setEventDurationError}
                        eventDurationrror={eventDurationrror}
                    />
                }
                {
                    step === 2 &&
                    <ServiceDetailScreen
                        setEventTitleError={setEventTitleError}
                        eventTitleError={eventTitleError}
                        setEventDescriptionError={setEventDescriptionError}
                        eventDescriptionError={eventDescriptionError}
                        setSelectedPeople={setSelectedTalents}
                    />
                }
                {
                    step === 3 &&
                    <RecommendedTalentMobile
                        setSelectedTalents={setSelectedTalents}
                        selectedTalents={selectedTalents}
                    />
                }
                {
                    step === 4 &&
                    <ConfirmDetailsScreen
                        setSelectedTalents={setSelectedTalents}
                        selectedTalents={selectedTalents}
                        updateQueryParam={updateQueryParam}
                        setStep={setStep}
                    />
                }
                {
                    step !== 3 && step !== 5 &&
                    <div
                        style={{ boxShadow: '0 -8px 12px rgba(0, 0, 0, 0.1)' }}
                        className='fixed bottom-0 z-[9999] bg-[white] flex flex-row w-full h-20 rounded-t-2xl items-center justify-center border-[black]'>
                        <button
                            onClick={() => { handleNext(); }}
                            className="w-[12rem] bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-[4px]"
                        >
                            {bottomButtonText()}
                        </button>
                    </div>
                }
                {
                    step === 3 &&
                    < BottomBarMobile
                        selectedTalents={selectedTalents}
                        setStep={setStep}
                        updateQueryParam={updateQueryParam}
                    />
                }
                {
                    step === 5 &&
                    <PostingProgressMobileScreen />
                }
            </div >
        )
    }
}

export default BookingMobileScreen;
