import React, { FC, ReactNode, RefObject, forwardRef } from 'react';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

interface SidebarIconProps {
   title: string;
   icon: ReactNode;
   inputType?: string;
   required?: boolean;
}

const FormInput = forwardRef<any, SidebarIconProps>(({ title, icon, inputType, required }, ref) => {
   return (
       <div className="relative text-lightly text-2 w-full">
           <input required={required ?? false} type={inputType ?? 'text'} ref={ref} className="pl-[3dvw] pr-[1dvw] py-[1dvh] border rounded-md bg-gray border-none w-full focus:outline-none text-white" placeholder={title} />
           <div className="absolute inset-y-0 left-0 pl-[1dvw] flex items-center pointer-events-none bg-gray rounded-lg">
               {icon}
           </div>
       </div>
   )
});

export default FormInput;
