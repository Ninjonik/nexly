"use client"

import React, { FC } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import MessageInterface from "@/app/utils/interfaces/MessageInterface";
import convertTimestamp from "@/app/utils/convertTimestamp";


interface ChannelMessageProps {
    typing?: boolean,
    message: MessageInterface,
    user?: Object,
}

const ChannelMessage: FC<ChannelMessageProps> = ({ typing, message, user }) => (
    <div className='w-full flex flex-row gap-[0.5dvw] h-[4dvh] items-center'>
        <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} />
        <div className='w-9/10 flex flex-col justify-center'>
            <div className='flex flex-row gap-[0.5dvw] items-center'>
                <h4 className='font-bold text-xl'>{message.author?.username}</h4>
                <span className='text-lightly text-md'>{convertTimestamp(message.$updatedAt)}</span>
            </div>
            <span className='w-full text-md break-words'>{message.message}</span>
        </div>
    </div>
);

export default ChannelMessage;
