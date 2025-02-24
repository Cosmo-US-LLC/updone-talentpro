"use client"
import React from 'react'

const BarBack = ({ selectedServiceName, serviceName }: any) => {
    if (serviceName === selectedServiceName) {
        return (
            <img
                src="/images/mobile/service-icons/bar-back-selected.svg"
                className=""
                alt=""
            />
        )
    } else {
        return (
            <img
                src="/images/mobile/service-icons/bar-back.svg"
                className=""
                alt=""
            />
        )
    }
}

export default BarBack
