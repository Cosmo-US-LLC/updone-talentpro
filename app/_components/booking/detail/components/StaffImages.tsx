// StaffImageGrid.js

import { STAFF_IAMHES } from '@/app/lib/constants';
import Image from 'next/image';

const StaffImageGrid = () => {
  return (
    <div className="w-[45%] grid grid-cols-2 grid-rows-2 gap-x-3 relative">
      {STAFF_IAMHES.map((staff, index) => (
        <div key={index} className="col-span-1 row-span-1">
          <Image
            src={staff.src}
            layout="responsive"
            width={500}
            height={500}
            className={staff.class}
            alt={staff.alt}
            quality={100}
            objectFit='fill'
          />
        </div>
      ))}
    </div>
  );
};

export default StaffImageGrid;
