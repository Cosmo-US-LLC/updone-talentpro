import React from 'react';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import Image from 'next/image';

interface InputProps {
  label?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  validation?: any;
  placeholder?: string;
  errors: FieldErrors;
  type?: string;
  defaultValue?: string;
  customStyles?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  onBlur?: () => void;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  name,
  register,
  validation,
  placeholder,
  errors,
  type = 'text',
  defaultValue = '',
  customStyles = '',
  iconSrc = '',
  iconAlt = 'icon',
  iconWidth = 16,
  iconHeight = 16,
  onBlur,
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={name} className="text-[#000000] font-[500]">
          {label}
        </label>
      )}

      {/* Icon div */}
      {iconSrc && (
        <div className="absolute inset-y-0 start-0 flex items-center pl-[16px] pointer-events-none pt-[4px]">
          <Image width={iconWidth} height={iconHeight} src={iconSrc} alt={iconAlt} />
        </div>
      )}

      {/* Input wrapper with conditional border */}
      <div className={`!border-[1px] ${!errors[name] ? '!border-[#EFEFEF]' : '!border-[#f963752e]'} rounded-[4px]`}>
        <input
          {...register(name, validation)}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          // Adjust the padding on the left to account for the icon width and extra spacing
          className={`w-full pl-[40px] pr-[10px] py-2 border-none rounded-lg ${errors[name] ? 'bg-[#FFF5F5]' : 'bg-white'} ${customStyles}`}
          onBlur={onBlur}
        />
      </div>

      {/* Error message span */}
      {errors[name] && (
        <span
          className={`text-[12px] absolute text-red-500 transition-all duration-1000 ease-out ${errors[name] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          style={{ top: '51px' }}
        >
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
