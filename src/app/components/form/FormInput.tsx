import React, { FC, ReactNode } from 'react';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

interface SidebarIconProps {
    title: string;
    icon: ReactNode;
}

const FormInput: FC<SidebarIconProps> = ({ title, icon }) => (
    <div className="relative text-lightly w-full">
        <input type="text" className="pl-10 pr-4 py-2 border rounded-md bg-gray border-none w-full focus:outline-none" placeholder={title} />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-gray rounded-lg">
            {icon}
        </div>
    </div>
);

export default FormInput;
