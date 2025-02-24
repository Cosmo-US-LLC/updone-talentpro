"use client";

import { useEffect, useState } from 'react';

const useIsMobile = (): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const handleResize = (): void => {
    const width = window.innerWidth;
    setIsMobile(width >= 320 && width <= 768);
  };

  useEffect(() => {
    handleResize(); // Set initial value on mount

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
