"use client"

import React, { FC } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import formatTimestampToTime from "@/app/utils/convertTimestamp";


interface ChannelMessageProps {
    typing?: boolean,
    time: number,
    user?: Object,
}

const ChannelMessage: FC<ChannelMessageProps> = ({ typing, time, user }) => (
    <div className='w-full flex flex-row gap-[0.5dvw] h-[6dvh]'>
        <ProfileIcon imageUrl={'/images/users/atrih.png'} size={'3dvw'}/>
        <div className='w-9/10 flex flex-col justify-center'>
            <div className='flex flex-row gap-[0.5dvw] items-center'>
                <h4 className='font-bold text-xl'>Turcute</h4>
                <span className='text-lightly text-md'>{formatTimestampToTime(time)}</span>
            </div>
            <span className='w-full text-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi cupiditate delectus ea exercitationem fuga, molestias sunt! Atque eos et inventore, ipsam modi nisi numquam porro qui quo veritatis voluptatibus!</span>
        </div>
    </div>
);

export default ChannelMessage;
