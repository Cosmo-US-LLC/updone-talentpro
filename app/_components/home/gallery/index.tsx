import { montserrat } from '@/app/lib/Fonts';
import React from 'react';
import Marquee from 'react-fast-marquee';
import loadable from '../../ui/lazy-load';
import { GALLERY_CONTENT_COUNT } from '@/app/lib/constants';
const GalleryContentLazy = loadable(() => import('./components/GalleryContent'));
function Gallery() {
    return (
        <div className='bg-[#FFFFFF]'>
            <div className="text-center md:pt-[90px]">
                <h2 className={`${montserrat.className} leading-normal uppercase text-[56px] text-[#000] font-[700] py-[60px]`}>
                    <span className={`${montserrat.className} leading-normal uppercase text-[56px] text-[#350ABC] font-[800]`}>
                        Events
                    </span> Gallery
                </h2>
            </div>
            <Marquee direction="left" speed={50} gradient={false} play={true}>
                {GALLERY_CONTENT_COUNT.map((item, index) => (
                    <GalleryContentLazy key={index} />
                ))}
            </Marquee>
        </div>
    );
}

export default Gallery;
