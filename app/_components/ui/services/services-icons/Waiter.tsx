"use client"
import React from 'react'

const Waiter = ({ selectedServiceName, serviceName }: any) => {
  if (serviceName === selectedServiceName) {
    return (
      <img
        src="/images/mobile/service-icons/waiter-selected.svg"
        className=""
        alt=""
      />
    )
  } else {
    return (
      <img
        src="/images/mobile/service-icons/waiter.svg"
        className=""
        alt=""
      />
    )
  }
}

export default Waiter
