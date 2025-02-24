interface VerificationStatusProps {
  id_is_verified: number; // Assuming 1 means verified
  contact_is_verified: number; // Assuming 1 means verified
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({ id_is_verified, contact_is_verified }) => {
  return (
    <div className="flex justify-between items-center flex-col w-[206px]">
      <div className="flex justify-between border-b-[1px] border-[#F6F6F6] px-[10px] py-[8px] items-center w-full">
        <span className="text-[#2C2240] text-[12px] font-[400] leading-[24px] flex justify-start items-center gap-2"><span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 17" fill="none">
          <path d="M14.6665 11.78V13.78C14.6672 13.9657 14.6292 14.1494 14.5548 14.3196C14.4804 14.4897 14.3713 14.6424 14.2345 14.7679C14.0977 14.8934 13.9362 14.989 13.7603 15.0485C13.5844 15.108 13.398 15.13 13.2131 15.1133C11.1617 14.8904 9.19112 14.1894 7.45979 13.0667C5.84901 12.0431 4.48335 10.6774 3.45979 9.06667C2.33311 7.32747 1.63195 5.34733 1.41313 3.28667C1.39647 3.10231 1.41838 2.91651 1.47746 2.74108C1.53654 2.56566 1.63151 2.40446 1.7563 2.26775C1.8811 2.13103 2.033 2.0218 2.20232 1.94701C2.37164 1.87222 2.55469 1.83351 2.73979 1.83333H4.73979C5.06333 1.83015 5.37699 1.94472 5.6223 2.15569C5.86761 2.36666 6.02784 2.65963 6.07313 2.98C6.15754 3.62004 6.31409 4.24848 6.53979 4.85333C6.62949 5.09195 6.6489 5.35127 6.59573 5.60059C6.54256 5.8499 6.41903 6.07874 6.23979 6.26L5.39313 7.10667C6.34216 8.7757 7.7241 10.1576 9.39313 11.1067L10.2398 10.26C10.4211 10.0808 10.6499 9.95723 10.8992 9.90406C11.1485 9.85089 11.4078 9.8703 11.6465 9.96C12.2513 10.1857 12.8797 10.3423 13.5198 10.4267C13.8436 10.4724 14.1394 10.6355 14.3508 10.885C14.5622 11.1345 14.6746 11.453 14.6665 11.78Z" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
        </svg></span>  Phone Number:</span>
        <span className={`text-[11px] font-[400] leading-[12px] ${contact_is_verified === 1 ? 'text-[#0C9000] ' : 'text-[#C20000]'}`}>
          {contact_is_verified === 1 ? 'Verified' : 'Not Verified'}
        </span>
      </div>
      <div className="flex justify-between py-[8px] px-[10px] items-center w-full">
        <span className="text-[#2C2240] text-[12px] font-[400] leading-[24px] flex justify-start items-center gap-2"> <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M13.9998 2.66667H1.99984C1.26346 2.66667 0.666504 3.26362 0.666504 4V12C0.666504 12.7364 1.26346 13.3333 1.99984 13.3333H13.9998C14.7362 13.3333 15.3332 12.7364 15.3332 12V4C15.3332 3.26362 14.7362 2.66667 13.9998 2.66667Z" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0.666504 6.66667H15.3332" stroke="#2C2240" strokeLinecap="round" strokeLinejoin="round" />
        </svg></span> ID Verified:</span>
        <span className={`text-[11px] font-[400] leading-[12px] ${id_is_verified === 1 ? 'text-[#0C9000] ' : 'text-[#C20000]'}`}>
          {id_is_verified === 1 ? 'Verified' : 'Not Verified'}
        </span>
      </div>
    </div>
  );
};
