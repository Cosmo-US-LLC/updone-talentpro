'use client';
import { useState } from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { MdOutlinePlayCircle } from "react-icons/md";

import Image from 'next/image';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dnfyaipb6',
  },
});

export default function Howitworks({ activeTab }: { activeTab: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = cld.video("demo2_zmm4af").quality("auto").format("auto");

  return (
    <div className="relative w-full h-[450px] bg-black mx-auto rounded-lg overflow-hidden shadow-lg mt-4">
      {!isPlaying ? (
        <div className="relative w-full h-full">
          {/* Thumbnail */}
          <Image
            src="/images/Mobile-Thumbnail.jpg" // ✅ Local thumbnail
            alt="How it works thumbnail"
            fill
            className="object-contain"
          />
          {/* Play button at center */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
                    <MdOutlinePlayCircle className="w-10 h-10 text-white"/>

          </button>
        </div>
      ) : (
        <AdvancedVideo
          cldVid={video}
          controls
          autoPlay
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}
