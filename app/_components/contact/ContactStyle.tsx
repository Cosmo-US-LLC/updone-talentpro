import React from 'react'

const ContactStyle = () => {
  return (
  <>
    {/* Left icon */}
    <div className='absolute left-0 top-[35%] transform -translate-y-1/2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="603" height="571" viewBox="0 0 603 571" fill="none">
            <g opacity="0.2" filter="url(#filter0_f_268_18704)">
                <circle cx="301.5" cy="269.5" r="101.5" fill="#230ABC" />
            </g>
            <defs>
                <filter id="filter0_f_268_18704" x="0" y="-32" width="603" height="603" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_268_18704" />
                </filter>
            </defs>
        </svg>
    </div>
    {/* Right icon */}
    <div className='absolute right-0 top-1/2 transform -translate-y-1/2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="603" height="603" viewBox="0 0 603 603" fill="none">
            <g opacity="0.15" filter="url(#filter0_f_268_18702)">
                <circle cx="301.5" cy="301.5" r="101.5" fill="#0ABCBC" />
            </g>
            <defs>
                <filter id="filter0_f_268_18702" x="0" y="0" width="603" height="603" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_268_18702" />
                </filter>
            </defs>
        </svg>
    </div>
    {/* Bottom-left icon */}
    <div className='absolute left-0 bottom-0 mb-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="608" height="608" viewBox="0 0 608 608" fill="none">
            <g opacity="0.2" filter="url(#filter0_f_268_18703)">
                <circle cx="304" cy="304" r="104" fill="#FFF172" />
            </g>
            <defs>
                <filter id="filter0_f_268_18703" x="0" y="0" width="608" height="608" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_268_18703" />
                </filter>
            </defs>
        </svg>
    </div>
    {/* Bottom-right icon */}
    <div className='absolute right-0 bottom-0 mb-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="515" height="515" viewBox="0 0 515 515" fill="none">
            <g opacity="0.2" filter="url(#filter0_f_268_18705)">
                <circle cx="257.5" cy="257.5" r="107.5" fill="#F2C8FC" />
            </g>
            <defs>
                <filter id="filter0_f_268_18705" x="0" y="0" width="515" height="515" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_268_18705" />
                </filter>
            </defs>
        </svg>
    </div>
</>
  )
}

export default ContactStyle
