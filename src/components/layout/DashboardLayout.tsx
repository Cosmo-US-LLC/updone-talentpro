import { Outlet } from "react-router";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="bg-[#f6f9fc] h-full flex flex-col">
      <Navbar />
      <div className="h-[70px] w-full"></div>
      <div className="grow p-4 flex">
        <SideBar />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
