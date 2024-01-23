"use client"

import React, {FC, ReactNode} from 'react';


interface SmallIconProps {
    size?: string,
    title?: string,
    description?: string,
    className?: string,
    color?: string,
    onClickFn?: () => void,
    href?: string,
    target?: string,
}

const AnchorLink: FC<SmallIconProps> = ({ size, title = "", description = "", className = "", color = "lightly", href="#", onClickFn, target = "_self" }) => (
    <a target={target} href={href} title={title} onClick={onClickFn} className={`text-${size ?? '2'} text-${color} hover:text-blue-hover transition-all duration-200 cursor-pointer ${className}`}>{description}</a>
);

export default AnchorLink;
