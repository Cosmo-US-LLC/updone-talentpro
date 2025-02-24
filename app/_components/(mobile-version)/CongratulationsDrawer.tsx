import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Congratulations from './drawer-screens/Congratulations';

export function CongratulationsDrawer() {
  return (
    <Drawer open={true}>
      <DrawerTrigger asChild>
        <div className='h-20 w-20 absolute flex justify-center right-[20px] bottom-[0px]' />
      </DrawerTrigger>
      <DrawerContent className={`bg-white h-[94%]`}>
        <Congratulations />
      </DrawerContent>
    </Drawer >
  );
}
