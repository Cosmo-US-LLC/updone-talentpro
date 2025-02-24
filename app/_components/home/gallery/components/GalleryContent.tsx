import React from 'react'

const GalleryContent = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-8">
            <div className="flex flex-col md:flex-row">
                {/* Image 1 */}
                <div className="flex flex-col w-full md:w-1/3">
                    <div className="w-full mb-2 pr-2">
                        <div className="overflow-hidden">
                            <img className="w-full rounded-lg" src="./images/gallery/image1.jpg" alt="Image 1" style={{ maxWidth: '380px' }} />
                        </div>
                    </div>
                    {/* Image 2 */}
                    <div className="w-full mb-4 pr-2">
                        <div className="overflow-hidden">
                            <img className="w-full rounded-lg" src="./images/gallery/image2.png" alt="Image 2" style={{ maxWidth: '380px' }} />
                        </div>
                    </div>
                </div>
                {/* Image 3 (Main Image) */}
                <div className="mr-0 md:mb-0 flex-shrink-0">
                    <img className="w-[500px] rounded-lg mt-[87px]" src="./images/gallery/image3.jpg" alt="Main Image" />
                </div>
                {/* Image 4 */}
                <div className="w-full md:w-1/3 mb-4 px-2">
                    <div className="overflow-hidden">
                        <img className="w-full h-[511px] rounded-lg" src="./images/gallery/image4.jpg" alt="Image 4" style={{ maxWidth: '380px' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(GalleryContent)
