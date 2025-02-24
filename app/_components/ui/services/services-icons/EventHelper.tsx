"use client"
import React from 'react'

const EventHelper = ({ selectedServiceName, serviceName }: any) => {
  if (serviceName === selectedServiceName) {
    return (
      <img
        src="/images/mobile/service-icons/event-helper-selected.svg"
        className=""
        alt=""
      />
    )
  } else {
    return (
      <img
        src="/images/mobile/service-icons/event-helper.svg"
        className=""
        alt=""
      />
    )
  }
}

export default EventHelper
