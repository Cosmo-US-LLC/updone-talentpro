"use client"
import React from 'react'

const PromoModel = ({ selectedServiceName, serviceName }: any) => {
  if (serviceName === selectedServiceName) {
    return (
      <img
        src="/images/mobile/service-icons/promo-model-selected.svg"
        className=""
        alt=""
      />
    )
  } else {
    return (
      <img
        src="/images/mobile/service-icons/promo-model.svg"
        className=""
        alt=""
      />
    )
  }
}

export default PromoModel
