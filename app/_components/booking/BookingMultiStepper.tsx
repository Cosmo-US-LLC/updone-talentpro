'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormDataSchema } from '@/app/lib/validations/schema'
import styles from './booking.module.css'
import FormNav from '../ui/booking-form-nav'
import FormTitles from './form-titles'
import StaffListing from '../staff'
import DetailForm from '../ui/forms/components/DetailForm'
import ThankYou from '../ui/forms/components/ThankYou'
import { Navigations } from './navigation'
import PaymentPay from '../payment'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Header from '../ui/header'
import { useAppSelector } from '@/app/lib/store/hooks'
import { selectAuth } from '@/app/lib/store/features/authSlice'

type Inputs = z.infer<typeof FormDataSchema>

export default function BookingMultiStepper({isAlreadyCreted, countInvited, setCountInvited, selectedAddress, setSelectedAddress, selectedStaff, setSelectedStaff, workingTimes, setWorkingTimes, selectedServiceId, setSelectedServiceId, secondFormData, setSecondFormData, onThirdSubmit, currentStep, setCurrentStep, setChangeActiveColor, changeActiveColor }: any) {
    const [previousStep, setPreviousStep] = useState(0)
    const [selectedService, setSelectedService] = useState<any>()
    const delta = currentStep - previousStep
    const { auth: storedData } = useAppSelector(selectAuth);



    // const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get("sort") === 'Invite-Members') {
            setCurrentStep(1);
        }
    }, []);


    const {
        handleSubmit,
        reset,
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    })
    const processForm: SubmitHandler<Inputs> = data => {
        reset()
    }

    const next = async () => {
        await handleSubmit(processForm)()
        setPreviousStep(currentStep)
        //@ts-ignore
        setCurrentStep(step => step + 1)
    }

    return (
        <>
            <div style={{ boxShadow: '0px 6px 26px 0px #0000000D' }} className='w-full bg-[#FFFFFF] relative top-[-134px]'>
                {currentStep === 1 && storedData?.token ?
                    <Header />
                    :
                    <FormNav steps={Navigations(changeActiveColor)}
                        currentStep={currentStep} changeActiveColor={changeActiveColor} setChangeActiveColor={setChangeActiveColor}
                    />

                }
            </div>
            <section style={{ maxHeight: changeActiveColor ? "800px" : "" }} className='max-w-[1279px] 2xl:max-w-[1440px] mx-auto max-h-[1000px] relative bottom-[95px]'>
                <FormTitles styles={styles} currentStep={currentStep} />
                <form onSubmit={handleSubmit(processForm)}>
                    {currentStep === 0 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className='flex gap-[34px] mx-auto min-h-[638px] mt-[0] mb-[0]'>

                                <DetailForm selectedService={selectedService} setSelectedService={setSelectedService} setSelectedAddress={setSelectedAddress} styles={styles} workingTimes={workingTimes} setWorkingTimes={setWorkingTimes} selectedServiceId={selectedServiceId} setSelectedServiceId={setSelectedServiceId} setSecondFormData={setSecondFormData} secondFormData={secondFormData} onThirdSubmit={onThirdSubmit} next={next} selectedAddress={selectedAddress} />
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {isAlreadyCreted !== "Invite-Members" && <> {currentStep === 1 && storedData?.token &&
                                <FormNav steps={Navigations(changeActiveColor)}
                                    currentStep={currentStep} changeActiveColor={changeActiveColor} setChangeActiveColor={setChangeActiveColor}
                                />
                            }</>}
                           
                            <StaffListing  countInvited={countInvited} setCountInvited={setCountInvited} selectedService={selectedService} selectedStaff={selectedStaff} setSelectedStaff={setSelectedStaff} selectedServiceId={selectedServiceId} isFilterBookingFlow />
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <>
                            <motion.div
                                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <ThankYou />
                            </motion.div>
                        </>
                    )}
                </form>
            </section>
        </>
    )
}
