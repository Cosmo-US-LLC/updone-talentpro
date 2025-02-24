import { RefObject, SetStateAction } from "react";

// staff-listing components props
export interface Staff {
  id: number;
  name: string;
  city: string;
  country: string;
  hourRate: number;
  totalJobs: number;
  services: string[];
  img: string;
}
//booking calander componets props
type SetDateType = React.Dispatch<React.SetStateAction<Date>>;
type ScrollRef = RefObject<HTMLDivElement>
type SetSelectedTimeId = React.Dispatch<SetStateAction<string | null>>

export interface BookingCalanderProps {
  setTimeMessage?:any
  date: Date;
  setWorkingTimes?:any
  workingTimes?:any
  setDate: SetDateType;
  setSelectedTimeId: SetSelectedTimeId
  scrollRef: ScrollRef
  availableTimesMap: { [date: string]: { id: string; time: string; disabled: boolean, isAvailable: boolean }[] };
  handleTimeSelection: (timeId: string, disabled: boolean) => void;
  selectedTimeId: string | null;
  scrollUp: () => void
  scrollDown: () => void
  timessss?: { date: string; times: string[] }[];
  handleAddToBooking: () => void
  selectedTimes?: any
  isCalander?: boolean;
  isStaffListerFilter?: boolean;
  selectedServiceId?: any
  handleServiceClick?: any
  isHeroFilterCalander?: boolean
  highlightedDatesNotAvailable?: any
  highlightedDatesAvailable?: any
  isStepOneCalander?:boolean;
}

//for children 
export interface RootLayoutProps {
  children: React.ReactNode
}
export interface SecurityItemTypes {
  src: string;
  alt: string;
  title: string;
  description: string;
}
export interface Breadcrumb {
  name: string;
  path: string;
}

//Client-portal dashboard --settings

export type Profile = {
  fullName: string;
  phoneNumber: string;
  company: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type Errors = {
  fullName?: string;
  phoneNumber?: string;
  company?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type UpdatedData = {
  full_name?: string;
  company_name?: string;
  contact_number?: string;
  current_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
  password?:string;
  confirmPassword?:string;
};
