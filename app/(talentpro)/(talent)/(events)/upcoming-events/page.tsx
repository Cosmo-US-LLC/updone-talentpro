"use client";
import { Suspense, useEffect, useState } from "react";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import useIsMobile from "@/app/lib/hooks/useMobile";
import UpcomingEventsMobile from "./UpcomingEventsMobile";
import UpcomingEventsDesktop from "./UpcommingEventsDesktop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const Page = () => {
  const isMobile = useIsMobile();
  const [eventCount, setEventCount] = useState(0);
  const [cityId, setCityId] = useState("0");

  if (isMobile === true) {
    return (
      <div className="flex flex-col">
        <MobileNavbar />
        <div className="w-full h-[100dvh] p-6 bg-[#F6F9FC] overflow-y-auto">
          <div className="mt-20">
            <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc] mb-4">
              <h3>Upcoming Events ({eventCount})</h3>
            </div>

            {/* <div className="flex items-center justify-start">
              <Select defaultValue={cityId} value={cityId} onValueChange={setCityId}>
                <div className="h-full flex items-center gap-3 text-sm text-neutral-800">
                  <SelectTrigger className="w-[150px] text-left">
                    <MapPin className="w-4 h-4" />
                    <SelectValue placeholder="Los Angeles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All Cities</SelectItem>
                    <SelectItem value="1">Los Angeles</SelectItem>
                    <SelectItem value="2">New York City</SelectItem>
                  </SelectContent>
                </div>
              </Select>
            </div> */}

            <UpcomingEventsMobile setEventCount={setEventCount} />
          </div>
        </div>
      </div>
    );
  }
  if (isMobile === false) {
    return (
      <div className="mt-2 mx-auto lg:w-[700px] xl:w-[970px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-[24px] text-[#350ABC] underline font-medium">
              Upcoming Events
            </h2>
            <p className="text-[14px] text-gray-600">
              Here you can see all the upcoming events!
            </p>
          </div>

          {/* <Select defaultValue={cityId} value={cityId} onValueChange={setCityId}>
            <div className="h-full flex items-center gap-3 text-sm text-neutral-800">
              Showing events in:
              <SelectTrigger className="w-[180px] text-left">
                <MapPin className="w-4 h-4" />
                <SelectValue placeholder="Los Angeles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All Cities</SelectItem>
                <SelectItem value="1">Los Angeles</SelectItem>
                <SelectItem value="2">New York City</SelectItem>
              </SelectContent>
            </div>
          </Select> */}
        </div>
        <UpcomingEventsDesktop />
      </div>
    );
  }
};

export default Page;
