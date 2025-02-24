import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import AlreadyOffered from './drawer-screens/AlreadyOffered';

export function TalentAlreadyOfferedDrawer({ setOpenDrawer, openDrawer, jobData }: any) {
  return (
    <Drawer onClose={() => { setOpenDrawer(!openDrawer) }} open={openDrawer}>
      <DrawerTrigger asChild>
        <div className='h-20 w-20 absolute flex justify-center right-[20px] bottom-[0px]' />
      </DrawerTrigger>
      <DrawerContent className={`bg-white h-[26rem]`}>
        <AlreadyOffered jobData={jobData} setOpenDrawer={setOpenDrawer} />
      </DrawerContent>
    </Drawer >
  );
}
