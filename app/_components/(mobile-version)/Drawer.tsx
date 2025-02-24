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
import JoinUpdone from './drawer-screens/JoinUpdone';
import LoginFromDrawer from './drawer-screens/LoginFromDrawer';
import RegisterFromDrawer from './drawer-screens/RegisterFromDrawer';
import ResetPasswordFromDrawer from './drawer-screens/ResetPasswordFromDrawer';
import EmailSent from './drawer-screens/EmailSent';

export function BottomDrawer({ openDrawer = null, setOpenDrawer = () => { }, setIsDrawerOpen = () => { }, version = '', resetPassword,setResetPassword = () => { }, loginScreen, setLoginScreen = () => { }, removeUpdoneText, }: any) {
  const [currentScreen, setCurrentScreen] = useState('join-updone');
  const [drawerHeight, setDrawerHeight] = useState('h-[90%]');
  

  useEffect(() => {
    if (currentScreen === 'join-updone') {
      setDrawerHeight('h-[410px]');
    }
    if (currentScreen === 'login') {
      setDrawerHeight('h-[80%]');
    }
    if (currentScreen === 'reset-password') {
      setDrawerHeight('h-[500px]');
    }
    if (currentScreen === 'register') {
      setDrawerHeight('h-[80%]');
    }
  }, [currentScreen]);

  useEffect(()=>{
if(resetPassword===true){
  setCurrentScreen('reset-password');
}
if(loginScreen===true){
  setCurrentScreen('login');
}
 
  },[resetPassword,loginScreen,])

  const handleOnClose = () => {
    setCurrentScreen('join-updone');
    setOpenDrawer(false)
    setResetPassword(false) 
    setLoginScreen(false)
  }


  return (
    <Drawer onOpenChange={(open) => { setIsDrawerOpen(open) }} onClose={() => { handleOnClose() }} open={openDrawer !== null ? openDrawer : undefined}>
      <DrawerTrigger asChild>
        <div className='h-20 w-20 absolute flex justify-center right-[20px] bottom-[0px]' />
      </DrawerTrigger>
      <DrawerContent className={`bg-white ${drawerHeight} z-[50]`}>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <DrawerTitle></DrawerTitle>
        {
          currentScreen === 'join-updone' &&
          <JoinUpdone
            setCurrentScreen={setCurrentScreen}
            version={version}
            setDrawerHeight={setDrawerHeight}
            removeUpdoneText={removeUpdoneText}
          />
        }
        {
          currentScreen === 'login' &&
          <LoginFromDrawer
            setCurrentScreen={setCurrentScreen}
          />
        }
        {
          currentScreen === 'register' &&
          <RegisterFromDrawer
            setCurrentScreen={setCurrentScreen}
          />
        }
        {
          currentScreen === 'reset-password' &&
          <ResetPasswordFromDrawer
            setCurrentScreen={setCurrentScreen}
          />
        }
        {
          currentScreen === 'reset-password-email-sent' &&
          <EmailSent
            setCurrentScreen={setCurrentScreen}
          />
        }
        <DrawerFooter>
          <DrawerClose asChild className='bg-transparent'>
            <div className='bg-transparent h-20 w-20 absolute right-[20px] bottom-[0px]' />
          </DrawerClose>
          <DrawerClose asChild>
            <div className='bg-transparent h-28 w-20 absolute right-[40%] bottom-[0px]' />
          </DrawerClose>
          <DrawerClose asChild>
            <div className='bg-transparent h-20 w-20 absolute right-[75%] bottom-[0px]' />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  );
}
