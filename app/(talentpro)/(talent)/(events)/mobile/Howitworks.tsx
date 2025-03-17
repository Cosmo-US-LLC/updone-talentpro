import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dnfyaipb6',
  },
});

export default function Howitworks({activeTab}:{activeTab:string}) {
    return (
        <div className="relative w-full h-[450px]  bg-black mx-auto rounded-lg overflow-hidden shadow-lg mt-4">
            <AdvancedVideo 
                cldVid={cld.video("demo2_zmm4af").quality("auto").format("auto")} 
                controls 
                className="w-full h-full object-contain"

            />
        </div>
    );
}
