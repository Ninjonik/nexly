"use client"

import React, { FC } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import SmallIcon from "@/app/components/SmallIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faPhone, faThumbtack, faUsers, faVideo} from "@fortawesome/free-solid-svg-icons";


interface ChannelMainProps {
}

const ChannelMain: FC<ChannelMainProps> = ({}) => (
    <section className="w-8/10 bg-gray h-full flex flex-col">

        <header className='h-1/10 w-full bg-light flex flex-row justify-between p-4 px-8'>
            <div className='flex flex-row gap-2'>
                <ProfileIcon imageUrl={'/images/users/atrih.png'} />
                <div className='flex flex-col justify-center'>
                    <h3 className='text-xl font-bold'>Stay Woke</h3>
                    <span className='text-lightly'>8 members, 2 online</span>
                </div>
            </div>
            <div className='flex flex-row gap-6 justify-center items-center'>
                <SmallIcon icon={<FontAwesomeIcon icon={faPhone} />} size={'3'} />
                <SmallIcon icon={<FontAwesomeIcon icon={faVideo} />} size={'3'} />
                <SmallIcon icon={<FontAwesomeIcon icon={faThumbtack} />} size={'3'} />
                <SmallIcon icon={<FontAwesomeIcon icon={faUsers} />} size={'3'} />
                <SmallIcon icon={<FontAwesomeIcon icon={faEllipsisVertical} />} size={'3'} />
            </div>
        </header>

        <article className='h-9/10 w-full flex flex-row'>

            <div className='h-full w-full bg-gray-dark'>

            </div>

            <aside className='h-full w-3/10 bg-light border-t-2 border-blue'>

            </aside>

        </article>

    </section>
);

export default ChannelMain;