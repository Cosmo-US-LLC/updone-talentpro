// import React from 'react';
// import MobilePageFooter from './MobilePageFooter';
import MobileHome from './MobileHome';
import MobileNavbar from './MobileNavbar';

const MobileLayut: React.FC = () => (
  <div className='overflow-hidden'>
   <div>
    <MobileNavbar />
    <div className="pt-[80px] overflow-y-auto">
    <MobileHome/>
    </div>
   </div>
  </div>
);

export default MobileLayut;
