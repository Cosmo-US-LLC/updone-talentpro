"use client";

import React from "react";
import MobileNavbar from "../../mobile/MobileNavbar";
import MobileFooter from "../../mobile/MobileFooter";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="  flex flex-col">
      <MobileNavbar />

      <main>{children}</main>
    </div>
  );
};

export default MobileLayout;
