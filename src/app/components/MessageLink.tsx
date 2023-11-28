"use client"

import React, { FC } from 'react';


interface MessageLinkProps {
    typing: boolean,
    time: number,
    notifications: number,
}

const MessageLink: FC<MessageLinkProps> = ({ typing, time, notifications }) => (
    <div className="flex flex-row justify-between items-center gap-4 group">
        <div className="w-[5dvw] h-[7dvh]">
            <img className="w-full h-full rounded-full" src="https://openseauserdata.com/files/3085b3fc65f00b28699b43efb4434eec.png" alt='profile picture'/>
            <div className="group-hover:border-blue relative bottom-6 left-12 border-2 border-light bg-green-500 h-6 w-6 text-lg rounded-full text-white"></div>
        </div>

        <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col justify-between w-7/10">
                <h3 className="text-lg font-bold">Leila</h3>
                {typing ?
                    <span className="italic text-sm text-blue">Typing...</span>
                    :
                    <span className="text-sm text-lightly">OK! See ya tomorrow!</span>
                }

            </div>

            <div className="flex flex-col justify-between items-end w-3/10">
                {time ? <h3 className="text-md text-lightly font-bold">8:30 PM</h3> : null}
                {notifications ? <span className="flex justify-center text-center items-center bg-blue h-6 w-6 text-lg rounded-full text-white">{ notifications }</span> : null}
            </div>
        </div>
    </div>
);

export default MessageLink;
