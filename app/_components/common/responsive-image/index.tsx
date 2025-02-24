'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ResponsiveImageProps {
    src: string;
    alt: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt }) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const width = document.getElementById('image-container')?.clientWidth ?? 0;
            setContainerWidth(width);
        };

        // Initial size calculation
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id="image-container"  style={{width:'112%'}}>
            <Image
                src={src}
                alt={alt}
                layout="responsive"
                width={containerWidth}
                height={containerWidth} // Adjust height according to your aspect ratio needs
            />
        </div>
    );
};

export default ResponsiveImage;
