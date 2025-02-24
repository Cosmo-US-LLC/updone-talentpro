import Image from 'next/image'
import React from 'react'

export const Navigations = ({changeActiveColor}:{changeActiveColor:boolean}) => {
    const steps = [
        {
            id: 'Task Details',
            image: <Image style={{ maxWidth: "80px" }} width={300} height={300} src='/images/stepBlue2.svg' alt='step-1' />,
            name: 'Describe your event',
            fields: ['firstName', 'lastName', 'email']
        },
        {
            id: 'Find Worker',
            name: 'Find best fit worker and invite them',
            image: changeActiveColor ? <Image style={{ maxWidth: "80px" }} width={300} height={300} src='/images/stepBlue2.svg' alt='step-1' /> : <Image style={{ maxWidth: "80px" }} width={300} height={300} src='/images/step2.svg' alt='step-1' />,
            fields: ['country', 'state', 'city', 'street', 'zip']
        },
        {
            id: 'Post Event', name: 'Post your event and receive offers',
            image: changeActiveColor ? <Image style={{ maxWidth: "80px" }} width={300} height={300} src='/images/stepBlue2.svg' alt='step-1' /> : <Image style={{ maxWidth: "80px" }} width={300} height={300} src='/images/step3.svg' alt='step-1' />,

        }
    ]
    return steps;
}
