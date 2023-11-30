"use client"

import React, { FC } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";


interface MessageLinkProps {
    typing: boolean,
    time: number,
    notifications: number,
}

const MessageLink: FC<MessageLinkProps> = ({ typing, time, notifications }) => (
    <div className="flex flex-row justify-between items-center gap-4 group">
        <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'online'} />

        <div className="flex flex-row justify-between w-8/10">
            <div className="flex flex-col justify-between w-7/10">
                <h3 className="text-lg font-bold">Leila</h3>
                {typing ?
                    <span className="italic text-md text-blue">Typing...</span>
                    :
                    <span className="text-md text-lightly">OK! See ya tomorrow!</span>
                }

            </div>

            <div className="flex flex-col justify-between items-end w-3/10">
                {time ? <h3 className="text-md text-lightly font-bold">8:30 PM</h3> : null}
                {notifications ? <span className="text-center bg-blue h-[1dvw] w-[1dvw] text-md rounded-full text-white">{ notifications }</span> : null}
            </div>
        </div>
    </div>
);

export default MessageLink;
