"use client"

import React, { FC } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import SmallIcon from "@/app/components/SmallIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faMagnifyingGlass, faMicrophone,
    faPhone,
    faThumbtack,
    faUsers,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import ChannelMessage from "@/app/components/channel/ChannelMessage";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";


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

        <article className='h-full w-full flex flex-row'>

            <div className='h-full w-full flex flex-col'>

                <div className='h-8/10 w-full bg-gray-dark p-[2dvw] flex flex-col-reverse gap-[2dvw] overflow-y-scroll no-scrollbar'>

                    <ChannelMessage time={17013761257} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1701376127} />
                    <ChannelMessage time={1801371147} />

                </div>

                <footer className='h-1/10 w-full bg-light'>

                </footer>

            </div>

            <aside className='h-full w-3/10 bg-light border-t-2 border-blue flex flex-col p-[2dvw] gap-[2dvw]'>

                <h3 className='text-xl font-bold'>Stay Woke</h3>
                <div className="relative text-lightly">
                    <input type="text" className="pl-10 pr-4 py-2 border rounded-lg bg-gray border-none w-full" placeholder="Search" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-gray rounded-lg">
                        <FontAwesomeIcon icon={faFileLines} className="text-gray-400" />
                    </div>
                </div>

                <div className='flex flex-col gap-[0.5dvw]'>
                    <div className='flex flex-row justify-between'>
                        <div className=""><FontAwesomeIcon icon={faUser} className="text-blue pr-[0.5dvw]" /> Members (8)</div>
                        <a href='#' className='text-blue hover:text-lightly transition-all'>Add</a>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='flex flex-row gap-[0.5dvw] items-center'>
                            <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'dnd'} />
                            <h3 className='font-bold'>Turcute</h3>
                        </div>
                        <div className='flex flex-row gap-[0.5dvw]'>
                            <SmallIcon icon={<FontAwesomeIcon icon={faPhone} />} />
                            <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots} />} />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-row gap-[0.5dvw] items-center'>
                            <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'away'} />
                            <h3 className='font-bold'>Turcute</h3>
                        </div>
                        <div className='flex flex-row gap-[0.5dvw]'>
                            <SmallIcon icon={<FontAwesomeIcon icon={faPhone} />} />
                            <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots} />} />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-row gap-[0.5dvw] items-center'>
                            <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'offline'} />
                            <h3 className='font-bold'>Turcute</h3>
                        </div>
                        <div className='flex flex-row gap-[0.5dvw]'>
                            <SmallIcon icon={<FontAwesomeIcon icon={faPhone} />} />
                            <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots} />} />
                        </div>
                    </div>
                    <a href='#' className='text-blue text-md hover:text-lightly transition-all text-center'>Show More</a>
                </div>



            </aside>

        </article>

    </section>
);

export default ChannelMain;