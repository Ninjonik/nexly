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

const ProfileIcon: FC<ProfileIconProps> = ({ imageUrl, status, size }) => (
    <div className={`w-[${size ?? '3dvw'}] h-[${size ?? '3dvw'}] relative group`}>
        <Image className={`w-full h-full rounded-full`} height={0} width={0} src={imageUrl} alt={'user icon'}/>
        {status && (
            <div className={`w-[1dvw] h-[1dvw] bottom-[0.1dvw] left-[2dvw] group-hover:border-blue absolute border-2 border-light rounded-full ${handleStatusColor(status)}`} ></div>
        )}</div>
);


export default ProfileIcon;