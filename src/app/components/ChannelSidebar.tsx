"use client"

import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import logout from "@/app/utils/logout";
import {
    faBell, faEnvelope,
    faGear, faHeadphones,
    faInbox,
    faMagnifyingGlass, faMicrophone,
    faPenToSquare, faPlus,
    faThumbtack,
    faUsers, faVideo
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProfileIcon from "@/app/components/ProfileIcon";
import getAvatar from "@/app/utils/getAvatar";
import React, {FC, useState} from "react";
import User from "@/app/utils/interfaces/User";
import {useUserContext} from "@/app/UserContext";
import Loading from "@/app/loading";
import Tippy from "@tippyjs/react";
import SmallIcon from "@/app/components/SmallIcon";
import FormInput from "@/app/components/form/FormInput";
import MessagesSection from "@/app/components/MessagesSection";
import {useRouter} from "next/navigation";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = ({}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const [groupDialog, setGroupDialog] = useState<boolean>(false)
    const router = useRouter();

    return (
        <section className="w-2/10 bg-light h-full flex flex-col text-white">

            <header className='h-1/10 flex flex-col justify-center gap-8 p-6'>
                <div className="flex flex-row justify-between items-center">
                    <a className="text-3 hover:text-blue transition-all ease-in" onClick={() => router.push(`/`)} href={'#'}>Messages</a>
                    <Tippy content={
                        <div className='flex flex-col'>
                            <SmallIcon icon={<FontAwesomeIcon icon={faPlus} />} description={'New group'} />
                        </div>
                    } trigger={'click'} interactive={true} appendTo={document.body} placement={'right'} >
                        <button>
                            <SmallIcon icon={<FontAwesomeIcon icon={faPenToSquare} className="text-blue text-3 hover:text-blue-hover"/>} />
                        </button>
                    </Tippy>
                </div>
            </header>

            <div className="absolute inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm">

            </div>

            <dialog className='flex flex-col mt-0.25/10 w-3/10 h-5/10 bg-gray-dark border-blue border-2 rounded-md z-50' open>

                <div className='w-full h-2/10 pt-[1dvw]'>
                    <h2 className='text-white pl-[0.5dvw] text-2'>Create new group</h2>
                </div>

                <div className='w-full h-full'>
                </div>

                <div className='w-full h-2/10 bg-light rounded-md flex justify-end items-center py-[0.5dvw] px-[2dvw]'>
                    <PrimaryButton title={'Submit'} width={'3/10'} height={'7/10'} />
                </div>

            </dialog>


            <article className='h-9/10 w-full'>

                <div className="h-9/10 flex flex-col gap-8 text-white pt-[2dvh] px-6">

                    <FormInput icon={<FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400"/>}
                               title={'Search'}/>

                    <MessagesSection icon={<FontAwesomeIcon className="text-blue pr-4" icon={faThumbtack}/>}
                                     title="Pinned"/>

                    <MessagesSection icon={<FontAwesomeIcon className="text-blue pr-4" icon={faEnvelope}/>}
                                     title="Groups"/>

                </div>

                <div
                    className="w-full text-center h-1/10 border-t-2 border-blue flex flex-row justify-between px-4">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <ProfileIcon imageUrl={getAvatar(loggedInUser.avatarPath)} status={'online'}/>
                        <div className="flex flex-col justify-between text-start text-2">
                            <span>{loggedInUser.name}</span>
                            <span className="text-lightly">#{loggedInUser.$id.slice(0, 4)}</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                        <SmallIcon icon={<FontAwesomeIcon icon={faMicrophone}/>}/>
                        <SmallIcon icon={<FontAwesomeIcon icon={faVideo}/>}/>
                        <SmallIcon icon={<FontAwesomeIcon icon={faHeadphones}/>}/>
                    </div>
                </div>
            </article>

        </section>
    )
}

export default Sidebar;