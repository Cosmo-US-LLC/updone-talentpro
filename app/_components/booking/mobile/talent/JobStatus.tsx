const JobStatus = ({ jobStatus, offers }: any) => {
    return (
        <div className="flex flex-row items-center justify-start gap-4">
            <div className='w-fit'>
                <h6 className={`flex items-center gap-1 text-[14px] font-[500] px-4 rounded-[32px] leading-[30px] 
            ${jobStatus === "completed" ? 'text-[#E60000] bg-[#FDE7E7]' :
                        jobStatus === "assigned" ? "text-[#0C9000] bg-[#EAFDE7]" :
                            'text-[#0076E6] bg-[#E7F4FD]'}`}>
                    {jobStatus}
                </h6>
            </div>
            <div>
                <p className="text-[#350ABC] leading-[24px] font-[400] text ">Offers({offers})</p>
            </div>
        </div>
    );
};

export default JobStatus;
