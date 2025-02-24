import { STEPS_DATA } from '@/app/lib/constants';
import Image from 'next/image';
import React from 'react';
import Breadcrumbs from '../../ui/bread-crumbs';

interface FormTitlesProps {
  styles: { [key: string]: string };
  currentStep: number;
}

const FormTitles: React.FC<FormTitlesProps> = ({ styles, currentStep }) => {

  // Determine the step to render
  const stepData = STEPS_DATA[currentStep] || STEPS_DATA[2]; // Default to index 2 (default step)

  // If the current step should be excluded, return only breadcrumbs
  if (stepData.imageSrc === '/images/booking/find-workder-title.svg') {
    return (
      <div>
        <Breadcrumbs currentStep={currentStep} />
        {/* You can also include some placeholder or message here if needed */}
      </div>
    );
  }

  // If the step should hide both icon and description, return only breadcrumbs
  if (stepData.imageSrc === '/images/booking/editPancel.svg') {
    return (
      <div>
        <Breadcrumbs currentStep={currentStep} />
      </div>
    );
  }

  const { imageSrc, imageAlt, description } = stepData;

  return (
    <div>
      <Breadcrumbs currentStep={currentStep} />
      <div className={`${styles.tell_us} text-center text-[#000000] flex justify-center items-center gap-[20px] leading-[20.4px] tracking-[-0.32px] !text-[16px] px-[10px] ${currentStep === 1 || currentStep === 0 ? "" : "mb-[58.5px]"}`}>
        <Image width={24} height={24} src={imageSrc} alt={imageAlt} />
        {description}
      </div>
    </div>
  );
};

export default React.memo(FormTitles);
