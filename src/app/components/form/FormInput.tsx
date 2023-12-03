import React, { FC, ReactNode } from 'react';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

interface SidebarIconProps {
    title: string;
    icon: ReactNode;
}

const FormInput: FC<SidebarIconProps> = ({ title, icon }) => (
    <div className="relative text-lightly text-2 w-full">
        <input type="text" className="pl-[3dvw] pr-[1dvw] py-[1dvh] border rounded-md bg-gray border-none w-full focus:outline-none text-white" placeholder={title} />
        <div className="absolute inset-y-0 left-0 pl-[1dvw] flex items-center pointer-events-none bg-gray rounded-lg">
            {icon}
        </div>
    </div>
);

export default FormInput;
