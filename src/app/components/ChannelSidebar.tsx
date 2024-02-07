"use client"

import SidebarIcon from "@/app/components/sidebar/SidebarIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import logout from "@/app/utils/logout";
import {
    faBell, faEnvelope,
    faGear, faHeading, faHeadphones,
    faInbox,
    faMagnifyingGlass, faMicrophone,
    faPenToSquare, faPlus,
    faThumbtack,
    faUsers, faVideo
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProfileIcon from "@/app/components/ProfileIcon";
import getAvatar from "@/app/utils/getAvatar";
import React, {FC, useRef, useState} from "react";
import User from "@/app/utils/interfaces/User";
import {useUserContext} from "@/app/UserContext";
import Loading from "@/app/loading";
import Tippy from "@tippyjs/react";
import SmallIcon from "@/app/components/SmallIcon";
import FormInput from "@/app/components/form/FormInput";
import MessagesSection from "@/app/components/MessagesSection";
import {usePathname, useRouter} from "next/navigation";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import {FormModal} from "@/app/components/form/FormModal";
import fireToast from "@/app/utils/toast";
import AnchorLink from "@/app/components/AnchorLink";
import {headers} from "next/headers";
import {useSlideContext} from "@/app/SlideContext";

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = ({}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const { slide, setSlide, onTouchStart, onTouchMove, onTouchEnd } = useSlideContext();

    const router = useRouter();
    const currentPage = usePathname();

    const groupName = useRef<HTMLInputElement>(null)

    const [groupDialog, setGroupDialog] = useState<boolean>(false)
    const handleSubmit = async () => {
        if(groupName?.current?.value && groupName.current.value.length > 0){

            const groupNameValue = groupName.current.value

            const dbID = loggedInUser.dbID;
            const constructedBody = JSON.stringify({
                "dbID": dbID,
                "groupName": groupNameValue,
            });

            const response = await fetch(`/api/createGroup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: constructedBody
            });

            if (!response.ok) {
                fireToast('error', 'There has been an error while creating a group...', 'top-right', 2000)
                throw new Error('Failed to create group');
            }

            const resBody = await response.json()

            fireToast('success', 'Successfully created a group!', 'top-right', 2000)

            let newLoggedInUser = {...loggedInUser}
            newLoggedInUser.groups = [...loggedInUser.groups, resBody.result]
            setLoggedInUser(newLoggedInUser)
            router.push(`/group/${resBody.result.$id}`)
            setGroupDialog(false)
        }

    }

    if(currentPage === '/login'){
        return ''
    }

    if(loggedInUser === null){
        router.push('/login?login=true')
        return
    } else if (!loggedInUser || loggedInUser === 'pending'){
        return (
            <section className="w-full lg:w-2/10 bg-light h-full flex flex-col text-white">

                <header className='h-1/10 flex flex-col justify-center gap-8 p-6'>
                    <div className="flex flex-row justify-between items-center">
                        <div className="animate-pulse w-full h-[2dvw] bg-gray rounded-md"></div>
                    </div>
                </header>

                <article className='h-9/10 w-full flex flex-col justify-between'>

                    <div
                        className="max-h-9/10 flex flex-col gap-8 text-white pt-[2dvh] px-6 overflow-y-scroll no-scrollbar">

                        <div className="flex flex-col gap-2 w-full">

                            {Array.from({length: 10}).map((_, index) => (
                                <div key={index}
                                     className="flex flex-row gap-2 w-full h-[3.5dvw] w-full bg-gray rounded-md animate-pulse">

                                </div>
                            ))}

                        </div>

                    </div>

                    <div
                        className="w-full text-center h-1/10 border-t-2 border-blue flex flex-row justify-between px-4">
                        <div className="flex flex-row items-center justify-center gap-2 w-full">
                            <ProfileIcon imageUrl={undefined} status={'online'}/>
                            <div className="flex flex-col justify-between text-start text-2 w-full">
                                <div className="animate-pulse w-4/5 h-[2dvw] bg-gray rounded-md"></div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 items-center animate-pulse">
                            <a className={`h-[1.5dvw] w-[1.5dvw] rounded-full bg-gray text-lightly hover:text-blue transition-all duration-200 cursor-pointer`}></a>
                            <a className={`h-[1.5dvw] w-[1.5dvw] rounded-full bg-gray text-lightly hover:text-blue transition-all duration-200 cursor-pointer`}></a>
                            <a className={`h-[1.5dvw] w-[1.5dvw] rounded-full bg-gray text-lightly hover:text-blue transition-all duration-200 cursor-pointer`}></a>
                        </div>
                    </div>
                </article>

            </section>
        )
    } else {
        return (
            <section className={`w-${slide === 'sidebar' ? 'full' : '0'} lg:w-2/10 overflow-x-hidden bg-light h-full flex flex-col text-white transition-all`} onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>

                <header className='h-1/10 flex flex-col justify-center gap-8 p-6'>
                    <div className="flex flex-row justify-between items-center">
                        <AnchorLink size={'2'} description={'Messages'} color={'white'}
                                    onClickFn={() => router.push(`/`)}/>
                        <SmallIcon size={'1'} title={'New group'} icon={<FontAwesomeIcon icon={faPlus}
                                                                                         className="text-blue text-3 hover:text-blue-hover"/>}
                                   onClickFn={() => setGroupDialog(true)}/>
                    </div>
                </header>

                <FormModal title={"Create new group"} onSubmit={handleSubmit} modalState={groupDialog}
                           setModalState={setGroupDialog}>
                    <FormInput title={"Group's name"} icon={<FontAwesomeIcon icon={faHeading}/>} ref={groupName}
                               required={true}/>
                </FormModal>

                <article className='h-9/10 w-full flex flex-col justify-between'>

                    <div
                        className="max-h-9/10 flex flex-col gap-8 text-white pt-[2dvh] px-6 overflow-y-scroll no-scrollbar">

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
                            <ProfileIcon imageUrl={loggedInUser ? getAvatar(loggedInUser.avatarPath) : undefined}
                                         status={'online'}/>
                            <div className="flex flex-col justify-between text-start text-2">
                                <span>{loggedInUser.username ? loggedInUser.username : loggedInUser.name}</span>
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

}

export default Sidebar;