import { RootLayoutProps } from "@/app/lib/types";
import NavbarTalentPro from "@/components/layout/NavbarTalentPro";
import SideBarTalent from "../_components/ui/sidebarTalent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <SidebarProvider>
            <div className="max-md:hidden"></div>
            <AppSidebar />
            <div className="flex flex-col max-h-[100vh] w-[100%]">
                <div className="hidden md:block">
                    <NavbarTalentPro />
                </div>
                <div className="md:hidden">{children}</div>
                <div className="hidden md:flex px-4 py-4 h-[calc(100vh-75px)] w-[100%] bg-[#F6F9FC] relative">
                    {/* <div className="flex">
                    <SideBarTalent />
                    </div> */}
                    <main className="w-[100%] h-[100%] flex flex-col px-4 pt-0 relative overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default RootLayout;
