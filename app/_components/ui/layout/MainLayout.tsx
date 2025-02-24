import React from "react";
import Header from "../header";
import Footer from "../footer";

interface LayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    </div>
  );
};

export default Layout;
