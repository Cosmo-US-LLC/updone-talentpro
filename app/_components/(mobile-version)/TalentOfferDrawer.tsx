import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import MakeOffer from './drawer-screens/MakeOffer';

export function TalentOfferDrawer({ setOpenDrawer, openDrawer, jobData }: any) {
  return (
    <Drawer onClose={() => { setOpenDrawer(!openDrawer) }} open={openDrawer}>
      <DrawerTrigger asChild>
        <div className='h-20 w-20 absolute flex justify-center right-[20px] bottom-[0px]' />
      </DrawerTrigger>
      <DrawerContent className={`bg-white h-[60%]`}>
        <MakeOffer jobData={jobData} />
      </DrawerContent>
    </Drawer >
  );
}

