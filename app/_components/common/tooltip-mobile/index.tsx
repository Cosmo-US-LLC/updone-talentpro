import React, { useState, useRef, useEffect, useMemo } from 'react';
import throttle from 'lodash/throttle';
import './index.css';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const TooltipMobile: React.FC<TooltipProps> = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a throttled toggle function
  const throttledToggle = useMemo(
    () => throttle((open: boolean) => {
      setIsOpen(open);
    }, 300), // Adjust the throttling time as needed
    []
  );

  useEffect(() => {
    if (!tooltipRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Determine tooltip position based on available space
    setPosition(containerRect.top > tooltipRect.height + 10 ? 'top' : 'bottom');
  }, [isOpen]);

  // Mouse enter and leave handlers
  const handleMouseEnter = () => {
    throttledToggle(true); // Open tooltip
  };

  const handleMouseLeave = () => {
    throttledToggle(false); // Close tooltip
  };

  // Cleanup throttled function on component unmount
  useEffect(() => {
    return () => {
      throttledToggle.cancel(); // Clear the cache
    };
  }, [throttledToggle]);

  return (
    <div className="relative inline-block cursor-pointer z-[40]" ref={containerRef}>
      <div 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        // Prevent tooltip from showing on click
        onClick={(e) => e.stopPropagation()} // Prevent click events from affecting the tooltip
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={tooltipRef}
          className={`absolute !left-[39px] ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 bg-[#FFF] text-black text-sm rounded shadow-lg z-50`}
        >
          {content}
          {position !== "bottom" && (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute w-full flex right-[15px] justify-center bottom-[1px] top-[79px] items-center`}
                width="24"
                height="12"
                viewBox="0 0 24 12"
                fill="none"
              >
                <path d="M0 0.5L10.7878 11.2878C11.4573 11.9573 12.5427 11.9573 13.2122 11.2878L24 0.5" fill="white" />
              </svg>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TooltipMobile;
