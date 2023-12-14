"use client"

import React, {FC, ReactNode} from 'react';


interface SmallIconProps {
    icon: ReactNode,
    size?: string,
    onClickFn?: () => void;
}

const SmallIcon: FC<SmallIconProps> = ({ icon, size, onClickFn }) => (
    <a onClick={onClickFn} className={`text-${size ?? '2'} text-lightly hover:text-blue transition-all duration-200 cursor-pointer`}>{icon}</a>
);

export default SmallIcon;
