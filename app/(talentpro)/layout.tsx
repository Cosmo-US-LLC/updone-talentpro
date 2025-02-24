
import { RootLayoutProps } from "@/app/lib/types";
import NavbarTalentPro from "@/components/layout/NavbarTalentPro";
import SideBarTalent from "../_components/ui/sidebarTalent";

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <>
       
            <div className="lg:hidden">
                {children}
            </div>
            <div className="max-lg:hidden">
                <div className="flex flex-col h-[100vh] w-[100]">
                    <NavbarTalentPro />
                    <div className="md:hidden">{children}</div>
                    <div className="overflow-y-auto hidden md:flex px-4 py-4 min-h-[calc(100vh-70px)] w-[100%] bg-[#F6F9FC] relative">
                        <div className="flex sticky top-[0px]">
                            <SideBarTalent />
                        </div>
                        <main className=" w-[100%] h-[100%] flex flex-col px-4 pt-2 relative">
                            <div className="flex absolute top-[28px] ">
                            </div>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );

};


export default RootLayout;
