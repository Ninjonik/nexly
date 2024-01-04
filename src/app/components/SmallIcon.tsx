"use client"

import React, {FC, ReactNode} from 'react';


interface SmallIconProps {
    icon: ReactNode,
    size?: string,
    title?: string,
    description?: string,
    className?: string,
    onClickFn?: () => void;
}

const SmallIcon: FC<SmallIconProps> = ({ icon, size, title = "", description = "", className = "", onClickFn }) => (
    <a title={title} onClick={onClickFn} className={`text-${size ?? '2'} text-lightly hover:text-blue transition-all duration-200 cursor-pointer ${className}`}>{icon} {description}</a>
);

export default SmallIcon;
