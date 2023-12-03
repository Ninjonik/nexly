"use client"

import React, {FC, ReactNode} from "react";
import Image from "next/image";

interface ProfileIconProps {
    imageUrl: string,
    status?: "online" | "offline" | "away" | "dnd",
    size?: string,
}

const handleStatusColor = (status: "online" | "offline" | "away" | "dnd") => {
    switch (status){
        case "online":
            return "bg-green-500"
        case "offline":
            return "bg-lightly"
        case "away":
            return "bg-yellow-500"
        case "dnd":
            return "bg-red-500"
    }
}

// @ts-ignore
const ProfileIcon: FC<ProfileIconProps> = ({ imageUrl, status, size }) => (
    <div className={`w-[${size ?? '3dvw'}] h-[${size ?? '3dvw'}] relative group`}>
        <Image src={imageUrl} width="0" height="0" sizes={`${size ?? '3dvw'}`} className="w-full h-full rounded-full" alt={'user icon'}/>
        {status && (
            <div className={`w-[1dvw] h-[1dvw] bottom-[0.1dvw] left-[2dvw] group-hover:border-blue absolute border-2 border-light rounded-full ${handleStatusColor(status)}`} ></div>
        )}</div>
);


export default ProfileIcon;