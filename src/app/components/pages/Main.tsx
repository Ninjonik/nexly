"use client"

import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {
    faBell, faCirclePlus, faEllipsisVertical, faEnvelope,
    faGear, faHeadphones, faImages,
    faInbox,
    faMagnifyingGlass, faMaximize, faMicrophone, faMinimize,
    faPenToSquare, faPhone,
    faThumbtack,
    faUsers, faVideo
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProfileIcon from "@/app/components/ProfileIcon";
import FormInput from "@/app/components/form/FormInput";
import MessagesSection from "@/app/components/MessagesSection";
import SmallIcon from "@/app/components/SmallIcon";
import ChannelMain from "@/app/components/ChannelMain";
import React, {FC, useState} from "react";
import logout from "@/app/utils/logout";
import User from "@/app/utils/interfaces/User";
import getAvatar from "@/app/utils/getAvatar";
import {act} from "react-dom/test-utils";
import GroupInterface from "@/app/utils/interfaces/GroupInterface";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import GifPicker from "gif-picker-react";
import Tippy from "@tippyjs/react";
import Sidebar from "@/app/components/Sidebar";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import {LiveKitRoom, VideoConference} from "@livekit/components-react";
import ChannelMessage from "@/app/components/channel/ChannelMessage";
import FormTextarea from "@/app/components/form/FormTextarea";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";
import UserInterface from "@/app/utils/interfaces/UserInterface";

interface MainProps {
    group?: string | null
}

const Main: FC<MainProps> = ({ group }) => {

    const [activeGroup, setActiveGroup] = useState<string | null>(null)

    return (
        <>
            {group ? (
                <ChannelMain activeGroup={group} />
            ) : (
                <section className="w-8/10 bg-gray-dark h-full flex flex-col text-white">

                    <header className='h-1/10 w-full bg-light flex flex-row justify-center items-center px-8'>
                        <h1 className='text-4'>NEXLY</h1>
                    </header>

                    <article className='h-9/10 w-full flex flex-col p-[2dvw]'>

                        <div className='h-2/10 w-full flex flex-col gap-[1dvw]'>
                            <h2 className='text-3'>Add Friend</h2>
                            <h3 className='text-2'>You can add friend using their @username</h3>
                            <div className='w-full flex flex-row gap-2'>
                                <div className='w-8/10'>
                                    <FormInput title={'Friend username - @username'} icon={<FontAwesomeIcon icon={faUser}/>} />
                                </div>
                                <div className='w-2/10'>
                                    <PrimaryButton title={'Send Request'} />
                                </div>
                            </div>

                        </div>

                        <div className='h-8/10 w-full flex flex-col'>

                        </div>

                    </article>

                </section>
            )}
        </>
    )

};

export default Main;