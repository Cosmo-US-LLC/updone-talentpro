"use client"
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import styles from './login.module.css'

const LoginFrom = ({ handleRegister, handleShowLogin, close, setShowLoginForm, handleShowRegisterForm, isHeaderLogin, handleClose }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div>
      {close ? <></> :
        <div
          ref={containerRef}
          style={{ height: "257px" }}
          className={`${styles.loginpopup} ${isHeaderLogin ? "right-14 top-16" : "right-0"} h-40 z-10 absolute overflow-hidden`}
        >
          <span className='relative bottom-[20px]'>
            <Image width={98} height={98} src='/images/booking/6.svg' alt='step-1' />
          </span>

          {/* Close button */}
          <button
            className="absolute top-[11px] right-[11px] text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <Image width={12} height={12} src='/images/booking/7.svg' alt='step-1' />
          </button>

          <div style={{ height: "300px", bottom: '-164.125px' }} className='login_backgorund w-[529px] h-[193px] absolute bottom-[-59.125px] z-1 rounded-[56%]'>

            <div className="relative text-center bottom-[-34px]">
              {/* <h2 className={styles.loginpopup_head}>
                Join Updone
              </h2> */}
              <p className={`${styles.loginpopup_body} text-center `}>You are just one step away from posting your event!</p>
              <div className='flex justify-center items-center gap-[7px] mx-24 relative bottom-[80px]'>
                <button
                  onClick={handleShowLogin}
                  className={`${styles.login_btn} transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105`}
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className={`${styles.register_btn} transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105`}
                >
                  Register
                </button>
              </div>

            </div>

          </div>

        </div>
      }
    </div>
  )
}

export default LoginFrom
