import { useState } from 'react';
import Image from 'next/image';
import { apiRequest } from '@/app/lib/services';
import { LiaLongArrowAltDownSolid } from "react-icons/lia";

const MobileComingSoon = () => {
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Email validation function
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle input change and email validation
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setIsButtonDisabled(!validateEmail(inputEmail));
    };

    // Handle form submission
    const handleSubmit = async () => {
        setMessage(''); // Reset messages
        setError('');

        try {
            const response = await apiRequest('/discountEmail', {
                method: 'POST',
                body: {
                    email: email
                }
            });
            if (response.status === 200) {
                setMessage(response.message);
            } else if (response.status === 409) {
                setError(response.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#f3f4f6] p-10">
            <Image
                src="/images/mobile/Ellipse.svg"
                className="absolute top-40 right-0"
                alt="ellipse"
                height={250}
                width={200}
            />
            {/* Logo */}
            <Image
                src="/images/mobile/headerLogo.svg"
                className="object-contain mb-10 absolute top-5"
                alt="coming soon"
                height={170}
                width={170}
            />

            {/* Coming Soon Text */}
            <h1 className="text-left text-[48px] font-light text-[#161616] leading-[50px] mb-2 mt-16 z-10">
                Coming Soon                     to your <span className="text-[28px] font-bold text-[#2C2240] z-10">Mobile Device!</span>

                {/* <h2 className="text-left text-[28px] font-light text-[#2C2240] leading-[40px] z-10">
                </h2> */}
            </h1>

            {/* On Your Mobiles Text */}

            <a
                href="https://updone.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-end gap-2 text-left text-[16px] font-normal leading-[30px] text-[#774DFD] mb-8 z-10"
            >
                Use the DESKTOP VERSION in the meantime.
            </a>


            <div className="md-4 w-full rounded-t-[20px] border border-[#FFF] bg-gradient-to-b from-[rgba(255,255,255,0.36)] to-[#FFF] backdrop-blur-[2px] p-6">
                {/* Description Text */}
                {/* <LiaLongArrowAltDownSolid className="h-[100px] w-[60px] absolute z-50 right-4 top-10" /> */}
                <p className="text-left text-[20px] font-[300] text-black leading-[28px]">
                    While we put the finishing touches on our mobile website, feel free to explore our desktop version. <br /><br />As a special offer, we're giving away a complimentary event booking upon the launch of our mobile site.<br /><br /> Simply submit your email address to redeem your free booking.                </p>
                {/* Email Input */}
                <div className="relative w-full max-w-sm mb-4 mt-8">
                    {/* Email Icon */}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Image width={14} height={15} src='/images/mobile/mail.svg' alt='email-icon' />
                    </span>

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChange={handleEmailChange}
                        className="border border-[#EBE6FF] rounded-[4px] px-10 py-2 w-full text-left text-black placeholder-[#6B6B6B] placeholder:font-normal"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                    className={`w-[100%] text-[14px] font-[400] py-[16px] flex items-center justify-center text-[#fff] rounded-[4px] bg-[#350ABC] 
        transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Claim Your Offer
                </button>
                <p className="text-center text-[12px] font-normal text-gray-400 mt-1">
                    *terms & conditions
                </p>

                {/* Message */}
                {message !== '' && <p className="text-green-600 mt-4 z-50">{message}</p>}
                {error !== '' && <p className="text-red-600 mt-4 z-50">{error}</p>}
            </div>
            <div className="relative text-center mt-4">

                {/* Social Media Links */}
                {/* <div className="flex justify-center items-center">
                    <a href="https://www.instagram.com/updoneusa" className="">
                        <Image
                            src="https://updone.nyc3.digitaloceanspaces.com/updone-assets/email-temp-assets/high-res/Frame%201410126002.png"
                            alt="Instagram"
                            width={50}
                            height={50}
                        />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61555428023126" className="">
                        <Image
                            src="https://updone.nyc3.digitaloceanspaces.com/updone-assets/email-temp-assets/high-res/Frame%201410126004.png"
                            alt="Facebook"
                            width={50}
                            height={50}
                        />
                    </a>
                </div> */}
                {/* Separator Line */}
                <div className="w-full border-t border-gray-300"></div>
                {/* Footer Text */}
                <p className="text-[14px] font-[400] leading-[24px] text-[#6B6B6B]">
                    ©2024 Updone. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default MobileComingSoon;
