"use client"
import React from 'react'

const Cocktail = ({ selectedServiceName, serviceName }: any) => {
  if (serviceName === selectedServiceName) {
    return (
      <img
        src="/images/mobile/service-icons/coctail-server-selected.svg"
        className=""
        alt=""
      />
    )
  } else {
    return (
      <img
        src="/images/mobile/service-icons/coctail-server.svg"
        className=""
        alt=""
      />
    )
  }
}

export default Cocktail
