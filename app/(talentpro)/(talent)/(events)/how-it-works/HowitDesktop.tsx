"use client";
import { useState } from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";
import { X } from "lucide-react";
import { MdOutlinePlayCircle } from "react-icons/md";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dnfyaipb6",
  },
});

export default function HowitDesktop() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Thumbnail with center play button */}
      <div className="relative w-[800px] h-[450px] mx-auto rounded-lg overflow-hidden cursor-pointer shadow-lg mt-8">
        <Image
          src="/images/thumbnail2.png"
          alt="Video Thumbnail"
          fill
          className="object-cover"
        />
        <button
          onClick={() => setOpenModal(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition"
        >
          <MdOutlinePlayCircle className="w-10 h-10 text-white" />
        </button>
      </div>

      {openModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpenModal(false)} // Close when clicking outside
        >
          {/* Wrapper for modal and close button */}
          <div className="relative">
            {/* Close button */}
            <div
              onClick={() => setOpenModal(false)}
              className="absolute -top-5 -right-4 z-[100] bg-black p-2 rounded-full shadow-xl cursor-pointer border border-white/20 hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6 text-white" />
            </div>

            {/* Phone modal */}
            <div
              className="bg-black w-[300px] h-[600px] rounded-[40px] border-4 border-gray-300 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <AdvancedVideo
                cldVid={cld.video("demo2_zmm4af").quality("auto").format("auto")}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}