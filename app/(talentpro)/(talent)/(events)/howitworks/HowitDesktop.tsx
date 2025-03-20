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
      {/* ✅ Thumbnail with center play button */}
      <div className="relative w-[800px] h-[450px] mx-auto rounded-lg overflow-hidden cursor-pointer shadow-lg mt-8">
        <Image
          src="/images/thumbnail2.png"
          alt="Video Thumbnail"
          fill
          className="object-cover "
        />
        <button
          onClick={() => setOpenModal(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition"
        >
         <MdOutlinePlayCircle className="w-10 h-10 text-white"/>
        </button>
      </div>

      {/* ✅ Phone-like modal with blur */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-black w-[300px] h-[600px] rounded-[40px] border-4 border-gray-300 overflow-hidden shadow-2xl flex flex-col">
            <div
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-3 z-10 bg-black p-1 rounded-full shadow cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </div>
            <AdvancedVideo
              cldVid={cld.video("demo2_zmm4af").quality("auto").format("auto")}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
