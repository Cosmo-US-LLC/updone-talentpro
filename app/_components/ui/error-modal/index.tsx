import Image from 'next/image';
import { RiRecycleLine } from 'react-icons/ri'; // Assuming you're using this icon
import MyModal from '../../common/modal/Modal';
import { useError } from '@/app/lib/context/ErrorProvider';

const GlobalErrorModal = () => {
  const { isModalOpen, closeError, errorMessage } = useError();

  const handleRefresh = () => {
    window.location.reload(); // Or any other retry logic
  };

  return (
    <MyModal isOpen={isModalOpen} onClose={closeError}>
      <div className='flex'>
        <div className='w-[50%]'>
          <Image
            src='/images/error.png'
            alt='error'
            className='max-h-[100%] max-w-[100%]'
            width={500}
            height={500}
          />
        </div>
        <div className='w-[50%] flex justify-center flex-col items-start'>
          <h2 className='font-[600] text-[38px] text-[#2C2240] mb-[17px]'>
            Something went wrong.
          </h2>
          <p className='text-[#6B6B6B] text-[18px]'>{errorMessage || "It might be on our end, we’re looking into it."}</p>
          <button
            className='mt-4 bg-[#350ABC] py-[12px] px-[16px] text-[#F3F0FF] rounded-[4px] text-[16px] flex justify-center items-center font-[400] leading-[24px]'
            onClick={handleRefresh}
          >
            <RiRecycleLine size={20} className='mr-2' />Please Retry Again
          </button>
        </div>
      </div>
    </MyModal>
  );
};

export default GlobalErrorModal;
