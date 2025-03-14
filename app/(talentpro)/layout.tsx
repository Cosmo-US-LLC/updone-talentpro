"use client";

import { RootLayoutProps } from "@/app/lib/types";
import NavbarTalentPro from "@/components/layout/NavbarTalentPro";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import BlurredOverlay with SSR disabled
const BlurredOverlay = dynamic(
  () => import("@/app/_components/booking/worker/components/BlurredOverlay"),
  { ssr: false }
);

const RootLayout = ({ children }: RootLayoutProps) => {
    const { auth: storedData } = useAppSelector(selectAuth);
    const [loggingOut, setLoggingOut] = useState(false); // 🔹 Manage logout state here

    return (
        <SidebarProvider>
            <div className="max-md:hidden"></div>
            <AppSidebar />

            <div className="flex flex-col max-h-[100vh] w-[100%] relative">
                {/* Prevent BlurredOverlay from showing when logging out */}
                {!loggingOut && typeof window !== "undefined" && !storedData?.token && <BlurredOverlay />}

                <div className={`${!storedData?.token ? "blur-md" : ""}`}>
                    <div className="hidden md:block">
                        {/* 🔹 Pass setLoggingOut to NavbarTalentPro */}
                        <NavbarTalentPro setLoggingOut={setLoggingOut} />
                    </div>
                    <div className="md:hidden">{children}</div>
                    <div className="hidden md:flex px-4 py-4 h-[calc(100vh-75px)] w-[100%] bg-[#F6F9FC] relative">
                        <main className="w-[100%] h-[100%] flex flex-col px-4 pt-0 relative overflow-y-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default RootLayout;
