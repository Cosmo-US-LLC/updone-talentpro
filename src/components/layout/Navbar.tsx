import { Link, useNavigate } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slice/auth";
import { FiLogOut } from "react-icons/fi";
import NavbarMobile from "./NavbarMobile";

function Navbar() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <header
        className={`max-lg:hidden header fixed top-0 z-40 left-0 w-full bg-[#FFF] !shadow-sm transition ease-in-out delay-150`}
      >
        <nav
          className={`border-gray-200 h-auto flex justify-between items-center py-[15px] w-full mx-auto min-w-[1024px] max-w-[1280px] px-6`}
        >
          <div
            className="justify-between items-center relative flex"
            style={{ cursor: "pointer", display: "contents" }}
          >
            <Link to={"/"} className="relative">
              <p className="text-2xl font-light text-[#4A4A4A] leading-[15px]">
                Talent<span className="font-medium text-[#6265F1]">Pro</span>
              </p>
              <p className="flex gap-1 w-[80px] items-center text-[12px] absolute left-[70%] whitespace-nowrap">
                by{" "}
                <span className="">
                  <img
                    src={"/images/logo.svg"}
                    alt="Updone"
                    height={140}
                    width={160}
                    className="w-[55px] h-fit relative"
                  />
                </span>
              </p>
              <div className="h-[13px]"></div>
            </Link>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex justify-center items-center flex-col mt-4 text-[#0B0B0B] text-[14px] font-[500] leading-[150%] capitalize lg:flex-row lg:space-x-3 lg:mt-0">
                <li className="relative">
                  <Link
                    to="/about"
                    className={`relative text-[14px] font-[400] leading-[150%] capitalize cursor-pointer py-1 px-4
                      transition-colors duration-300 delay-150 group text-[#0B0B0B] hover:text-[#350ABC]`}
                  >
                    About Us
                    <div
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-current w-0 transition-all duration-300 ease-in-out group-hover:w-full`}
                    ></div>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/add-event`}
                    className={`!ml-[22px] bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150`}
                  >
                    <span>Book a Talent Now</span>
                  </Link>
                </li>
                {user != false && (
                  <li>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger className="flex items-center gap-2 outline-none hover:text-black">
                        <Avatar>
                          <AvatarImage src={user?.image} />
                          <AvatarFallback>
                            {`
                            ${user?.name?.split(" ")[0][0]}${
                              user?.name?.split(" ")?.length > 1
                                ? user?.name?.split(" ")[1][0]
                                : ""
                            }
                            `}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-5 h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="relative right-5 p-0">
                        <DropdownMenuItem className="cursor-default pointer-events-none px-6">
                          <div className="my-[8px] flex gap-1 items-center">
                            <Avatar>
                              <AvatarImage src={user?.image} />
                              <AvatarFallback>
                                {`
                                ${user?.name?.split(" ")[0][0]}${
                                  user?.name?.split(" ").length > 1
                                    ? user?.name?.split(" ")[1][0]
                                    : ""
                                }`}
                              </AvatarFallback>
                            </Avatar>
                            <div className="group-hover:!text-[#2C2240]">
                              <h3 className="text-[#2C2240] group-hover:text-[#2C2240] text-[16px] font-[500] leading-[19.93px] tracking-[0.316px]">
                                {user?.name}
                              </h3>
                              <p
                                style={{ textTransform: "none" }}
                                className="text-[#6B6B6B] text-[12px] font-[400] leading-normal group-hover:text-[#2C2240]"
                              >
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(
                              `${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/`
                            )
                          }
                          className="hover:!bg-[#F1EEFF] max-lg:hidden duration-0 text-[#2C2240] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
                        >
                          {/* <User className="mr-[12px]" size={18} /> */}
                          <Settings className="mr-[12px]" size={18} />
                          Account Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => dispatch(logout())}
                          className="text-[#C20000] duration-0 hover:!bg-[#F1EEFF] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
                        >
                          <FiLogOut className="mr-[12px]" size={18} /> Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <nav className="lg:hidden">
        <NavbarMobile />
      </nav>
    </>
  );
}

export default Navbar;
