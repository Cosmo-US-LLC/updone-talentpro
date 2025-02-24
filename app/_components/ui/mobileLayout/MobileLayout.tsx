"use client";

import React from "react";
import MobileNavbar from "../../mobile/MobileNavbar";
import MobileFooter from "../../mobile/MobileFooter";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="lg:hidden flex flex-col">
      <MobileNavbar />
      <ProgressBar
        height="3px"
        color="#350abc"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <main>{children}</main>
    </div>
  );
};

export default MobileLayout;
