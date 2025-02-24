import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store/store";

const ConfirmDetailsModal = ({
  setStep,
  modalIsOpen,
  setModalIsOpen,
  selectedTalents,
}: any) => {
  const router = useRouter();
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);

  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0", // Remove default padding for better control with Tailwind
      borderRadius: "30px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "650px",
      border: "0px",
      height: "75vh",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.57)",
      backdropFilter: "blur(4px)",
      zIndex: "1000",
    },
  };

  const formatEventDateTime = (): { date: string; time: string } => {
    const { selectedDate, selectedTime, amPm, selectedHours } = jobCreateState;

    // Safely handle the selectedDate (in case it's null)
    if (!selectedDate) {
      return {
        date: "No date selected",
        time: "No time selected",
      };
    }

    // Parse the date
    const date = new Date(selectedDate);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit", // Day of the month, e.g., "25"
      month: "long", // Short month name, e.g., "Oct"
      year: "numeric", // Full year, e.g., "2024"
    }).format(date);

    // Safely handle the selectedTime and selectedHours
    if (!selectedTime || !selectedHours) {
      return {
        date: formattedDate,
        time: "No time or duration selected",
      };
    }

    // Parse the selectedTime (e.g., "11:30")
    const [hourStr, minuteStr] = selectedTime.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    // Adjust hour for AM/PM
    if (amPm === "PM" && hour !== 12) {
      hour += 12;
    } else if (amPm === "AM" && hour === 12) {
      hour = 0; // Handle midnight case
    }

    // Create the start time from the selectedDate and selectedTime
    const startTime = new Date(date);
    startTime.setHours(hour, minute);

    // Extract the number of hours from "4 hours" (selectedHours) and handle if it's invalid
    const durationInHours = parseInt(selectedHours, 10);
    if (isNaN(durationInHours) || durationInHours <= 0) {
      return {
        date: formattedDate,
        time: "Invalid duration",
      };
    }

    // Create the end time by adding the duration
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + durationInHours);

    // Helper function to format time to "11:00 am" or "03:00 pm"
    const formatTime = (time: Date) =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true, // 12-hour format with am/pm
      })
        .format(time)
        .toLowerCase();

    // Format the start time and end time
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    // Format the duration
    const formattedDuration = `(${durationInHours} hours)`;

    // Combine the formatted time string
    const formattedTime = `${formattedStartTime} - ${formattedEndTime} ${formattedDuration}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const formattedEvent = formatEventDateTime();

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg h-screen flex flex-col">
          <div className="h-[5%] p-10">
            {" "}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-medium underline leading-[32px]">
                Please Confirm Your Event Details
              </h2>
              <Image
                className="cursor-pointer"
                src="/images/gallery/confirm-booking/x.svg"
                height={32}
                width={32}
                alt="x-icon"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              />
            </div>
          </div>

          <div className="h-[50%] overflow-y-auto mx-8 px-2 mt-2">
            <div className="mb-8">
              <div className="flex flex-row justify-between items-center">
                <div className="flex gap-2">
                  <Image
                    src="/images/gallery/confirm-booking/map-pin.svg"
                    height={16}
                    width={16}
                    alt="map-icon"
                  />
                  <h3 className="font-semibold text-[14px] leading-[24px]">
                    Where will the event be held?
                  </h3>
                </div>
                <Image
                  className="cursor-pointer"
                  src="/images/gallery/confirm-booking/edit.svg"
                  height={16}
                  width={16}
                  alt="edit-icon"
                  onClick={() => {
                    setModalIsOpen(false);
                    router.push("/add-job?step=event-location");
                    setStep(0);
                  }}
                />
              </div>
              <p className="text-[#6B6B6B] text-[14px] font-normal mt-1 leading-[24px]">
                {jobCreateState?.selectedLocation}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex gap-2">
                  <Image
                    src="/images/gallery/confirm-booking/required-service.svg"
                    height={16}
                    width={16}
                    alt="required-service"
                  />
                  <h3 className="font-semibold text-[14px] leading-[24px]">
                    {jobCreateState?.title}
                  </h3>
                </div>
                <Image
                  onClick={() => {
                    setModalIsOpen(false);
                    router.push("/add-job?step=date-time");
                    setStep(2);
                  }}
                  className="cursor-pointer"
                  src="/images/gallery/confirm-booking/edit.svg"
                  height={16}
                  width={16}
                  alt="edit-icon"
                />
              </div>
              <p className="text-[#6B6B6B] text-[14px] font-normal mt-1 leading-[24px]">
                {jobCreateState?.eventDescription}
              </p>
            </div>

            <hr className="my-4" style={{ borderColor: "#EBE6FF" }} />
            <div className="mb-6 items-center">
              <div className="flex flex-row justify-between items-center gap-2 mb-2">
                <div className="flex gap-2">
                  <Image
                    src="/images/gallery/confirm-booking/briefcase.svg"
                    height={16}
                    width={16}
                    alt="briefcase-icon"
                  />
                  <h3 className="font-semibold text-[14px] leading-[24px]">
                    Requested Service:
                  </h3>
                </div>
                <Image
                  onClick={() => {
                    setModalIsOpen(false);
                    router.push("/add-job?step=service-details");
                    setStep(2);
                  }}
                  className="cursor-pointer"
                  src="/images/gallery/confirm-booking/edit.svg"
                  height={16}
                  width={16}
                  alt="edit-icon"
                />
              </div>
              <p className="text-[#6B6B6B] text-[14px] font-normal leading-[24px]">
                {jobCreateState?.selectedService.name}
              </p>
            </div>

            <div className="mb-6 bg-[#F6F9FC] p-4 rounded-lg">
              <div className="flex gap-2 items-center justify-between mb-4">
                <h3 className="font-semibold text-[14px] leading-[24px]">
                  Your selected event day and time are:
                </h3>
                <Image
                  onClick={() => {
                    setModalIsOpen(false);
                    router.push("/add-job?step=service-details");
                    setStep(1);
                  }}
                  className="cursor-pointer"
                  src="/images/gallery/confirm-booking/edit.svg"
                  height={16}
                  width={16}
                  alt="edit-icon"
                />
              </div>
              <div className="flex flex-col items-start justify-between">
                <div className="flex items-center mb-2">
                  <span className="mr-1">
                    <Image
                      src="/images/gallery/confirm-booking/calendar.svg"
                      height={16}
                      width={16}
                      alt="calendar-icon"
                    />
                  </span>
                  <span className="font-semibold text-[14px] leading-[24px]">
                    Date:{" "}
                  </span>
                  <p className="font-normal text-[14px] text-[#6B6B6B] ml-2 leading-[24px]">
                    {formattedEvent.date}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">
                    <Image
                      src="/images/gallery/confirm-booking/clock.svg"
                      height={16}
                      width={16}
                      alt="clock-icon"
                    />
                  </span>
                  <span className="font-semibold text-[14px] leading-[24px]">
                    Time:{" "}
                  </span>
                  <p className="font-normal text-[14px] text-[#6B6B6B] ml-2 leading-[24px]">
                    {formattedEvent.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-row items-center gap-2 mb-2">
                <Image
                  src="/images/gallery/confirm-booking/user-plus.svg"
                  height={16}
                  width={16}
                  alt="user-plus"
                />
                <h3 className="font-semibold text-[14px] leading-[24px]">
                  Invited Talent
                </h3>
              </div>
              <div className="flex items-center mt-2">
                <p className="font-normal text-[14px] text-[#9F9F9F] leading-[24px]">{`${jobCreateState?.selectedTalents?.length} Talent has been invited to your job.`}</p>
                <div
                  onClick={() => {
                    setModalIsOpen(false);
                    router.push("/add-job?step=recommended-talents");
                  }}
                  className="cursor-pointer text-[#350ABC] text-[12px] leading-[20px] font-normal ml-4"
                >
                  + add more
                </div>
              </div>
            </div>
            <div className="flex -space-x-2 mt-2">
              {/* {selectedTalents?.map((talent: any, index: any) => (
                            <img
                                key={index}
                                src={talent?.profile_pic}
                                alt={`Talent ${index + 1}`}
                                className="w-[40px] h-[40px] rounded-full -ml-3 first:ml-0 object-cover"
                            />
                        ))} */}
              {selectedTalents.slice(0, 5).map((talent: any, index: any) => (
                <img
                  key={index}
                  src={talent?.profile_pic}
                  alt={`Talent ${index + 1}`}
                  className="w-[40px] h-[40px] rounded-full -ml-3 first:ml-0 object-cover"
                />
              ))}

              {selectedTalents.length > 5 && (
                <div className="w-[45px] h-[45px] rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
                  +{selectedTalents.length - 5}
                </div>
              )}
            </div>
          </div>

          <div className="h-[10%] flex justify-end items-end px-10">
            <div className=" flex justify-center items-end">
              <div
                onClick={() => setModalIsOpen(false)}
                className="text-black text-[14px] leading-[26px] font-normal px-4 py-2 cursor-pointer"
              >
                Cancel
              </div>
              <button
                className="w-[217px] h-[48px] bg-[#350ABC] text-white text-[14px] leading-[26px] font-normal rounded-md ml-2"
                onClick={() => {
                  router.push("add-job/posting-event");
                }}
              >
                Post Event
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmDetailsModal;
