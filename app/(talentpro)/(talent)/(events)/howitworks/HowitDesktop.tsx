export default function HowitDesktop(){

    return(
        <>
        <div className="relative w-full max-w-3xl bg-black mx-auto rounded-lg overflow-hidden shadow-lg mt-16">
                    <video
                        className="w-full max-h-[500px] rounded-lg"
                        controls // ✅ Allows user interaction to play video
                        poster="/images/video-thumbnail.jpg" // Thumbnail before playing
                        src="/videos/demo2.mp4" // ✅ Force reloading on re-renders
                    >
                        <source src="/videos/demo2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            
        </>
    )
}