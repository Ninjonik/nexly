"use client"

import React, {ChangeEvent, FC, ReactNode} from "react";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

interface ProfileIconProps {
    imageUrl: string,
    status?: "online" | "offline" | "away" | "dnd",
    size?: string,
    customClass?: string,
    divTitle?: string,
    // action 1 (left-positioned)
    actionTitle?: string,
    actionColor?: string,
    actionIcon?: ReactNode;
    actionFn?: () => void;
    // action 2 (right-positioned, unable to use with status)
    actionTitle2?: string,
    actionColor2?: string,
    actionIcon2?: ReactNode;
    actionFn2?: () => void;
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
const ProfileIcon: FC<ProfileIconProps> = ({ imageUrl, status, size, customClass, divTitle = "",
                                               actionTitle = "",  actionColor = "", actionIcon = <FontAwesomeIcon icon={faUsers} />, actionFn = () => {},
                                               actionTitle2 = "",  actionColor2 = "", actionIcon2 = <FontAwesomeIcon icon={faUsers} />, actionFn2 = () => {}
                                           }, ) => (
    <div className='flex flex-col items-center'>
        <div className={`w-[${size ?? '3dvw'}] h-[${size ?? '3dvw'}] ${customClass ?? ''} relative group`} title={divTitle}>
            {actionColor && (
                <button title={actionTitle} onClick={actionFn} className={`w-[1dvw] h-[1dvw] bottom-[0.1dvw] right-[2dvw] hover:border-blue absolute border-2 border-light rounded-full text-sm flex justify-center items-center bg-${actionColor}`} >{actionIcon}</button>
            )}

            <Image src={imageUrl} width="0" height="0" sizes={`${size ?? '3dvw'}`} className="w-full h-full rounded-full" alt={'user icon'}/>

            {actionColor2 && (
                <button title={actionTitle2} onClick={actionFn2} className={`w-[1dvw] h-[1dvw] bottom-[0.1dvw] left-[2dvw] hover:border-blue absolute border-2 border-light rounded-full text-sm flex justify-center items-center bg-${actionColor2}`} >{actionIcon2}</button>
            )}

            {status && (
                <div className={`w-[1dvw] h-[1dvw] bottom-[0.1dvw] left-[2dvw] group-hover:border-blue absolute border-2 border-light rounded-full ${handleStatusColor(status)}`} ></div>
            )}
        </div>
        <div>{divTitle}</div>
    </div>

);


export default ProfileIcon;