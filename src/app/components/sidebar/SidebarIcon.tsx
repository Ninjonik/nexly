import React, { FC, ReactNode } from 'react';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SidebarIconProps {
    title: string;
    icon: ReactNode;
}

const SidebarIcon: FC<SidebarIconProps> = ({ title, icon }) => (
    <div className="flex items-center group relative">
        <div className="bg-blue h-6 w-8 rounded-md absolute left-[-1.25dvw] group-hover:h-8 transition-all invisible"></div>
        <div className="text-white group-hover:text-blue transition-all ease-linear cursor-pointer flex justify-center relative z-10 text-4">
            {icon}
        </div>
        {title && (
            <div className="absolute w-auto p-2 m-4 min-w-max left-[2.25dvw] rounded-md shadow-md text-white bg-gray text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-20">
                {title}
            </div>
        )}
    </div>
);

export default SidebarIcon;
