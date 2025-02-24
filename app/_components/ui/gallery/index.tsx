import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface GalleryModalProps {
    show: boolean;
    onClose: () => void;
    images: string[];
}

const GalleryModal: React.FC<GalleryModalProps> = ({ show, onClose, images }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean[]>(new Array(images.length).fill(true));

    // Close modal when clicking outside of it
    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
                className="rounded-lg p-6 w-[80%] max-w-[600px] relative"
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Slideshow */}
                <Slide
                    autoplay={false}
                    transitionDuration={300}
                    easing="ease-in"
                    infinite={false}
                >
                    {images.map((imageUrl, index) => (
                        <div className="each-slide flex justify-center items-center relative" key={index}>
                            {/* Loader */}
                            {loading[index] && (
                                <div className="max-w-[600px] h-full absolute inset-0 flex justify-center items-center">
                                    <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Image */}
                            <Image
                                src={imageUrl}
                                alt={`Gallery Image ${index + 1}`}
                                className="rounded-lg"
                                quality={65} // Increase quality for better appearance
                                width={400}
                                height={300}
                                layout="intrinsic"
                                placeholder="blur"
                                blurDataURL={imageUrl}
                                priority={true}
                                onLoadingComplete={() => {
                                    setLoading((prev) => {
                                        const newLoadingState = [...prev];
                                        newLoadingState[index] = false;
                                        return newLoadingState;
                                    });
                                }}
                            />
                        </div>
                    ))}
                </Slide>
            </div>
        </div>
    );
};

export default GalleryModal;
