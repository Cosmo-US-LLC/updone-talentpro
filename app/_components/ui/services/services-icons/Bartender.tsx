"use client"
import React from 'react'

const Bartender = ({ serviceName, selectedServiceName }: any) => {
    if (serviceName === selectedServiceName) {
        return (
            <img
                src="/images/mobile/service-icons/bartender-selected.svg"
                className=""
                alt=""
            />
        )
    } else {
        return (
            <img
                src="/images/mobile/service-icons/bartender.svg"
                className=""
                alt=""
            />
        )
    }

}

export default Bartender
