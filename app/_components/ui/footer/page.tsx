"use client";

import React from "react";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";

const Footer = () => {
  return (
    <>
      <div className="max-lg:hidden">
        <DesktopFooter />
      </div>
    </>
  );
};

export default Footer;
