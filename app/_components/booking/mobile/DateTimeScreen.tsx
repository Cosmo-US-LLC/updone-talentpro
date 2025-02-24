"use client"
import { DatePickerMobile } from '../../ui/job-create/date-picker-mobile';
import HoursPickerMobile from '../../ui/job-create/hours-picker';
import TimePickerMobile from '../../ui/time-picker-mobile';

const DateTimeScreen = ({ setEventDateError, eventDateError, setEventStartTimeError, eventStartTimeError, setEventDurationError, eventDurationrror }: any) => {

    return (
        <div className='px-4 pt-4 pb-[20rem] flex-grow overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
            <h2 className={`text-[14px] font-[500] leading-[20px] mb-3 text-[#000000] pt-4`}>When is your event happening? </h2>
            <p className="text-[#6B6B6B] font-[400] leading-[20px] text-[12px] mb-[34px]">Choose the date and time, then let us know how long you’ll need our talent on site.</p>

            <div className='space-y-8'>
                <DatePickerMobile
                    eventDateError={eventDateError}
                    setEventDateError={setEventDateError}
                />
                <TimePickerMobile
                    eventStartTimeError={eventStartTimeError}
                    setEventStartTimeError={setEventStartTimeError}
                />
                <HoursPickerMobile
                    eventDurationrror={eventDurationrror}
                    setEventDurationError={setEventDurationError}
                />
            </div>
        </div>
    );
}

export default DateTimeScreen;
