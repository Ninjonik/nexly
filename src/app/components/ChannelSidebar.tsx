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
import {useRouter} from "next/navigation";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import {FormModal} from "@/app/components/form/FormModal";

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = ({}) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const router = useRouter();

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
                throw new Error('Failed to create group');
            }

            setGroupDialog(false)
        }

    }

    return (
        <section className="w-2/10 bg-light h-full flex flex-col text-white">

            <header className='h-1/10 flex flex-col justify-center gap-8 p-6'>
                <div className="flex flex-row justify-between items-center">
                    <a className="text-3 hover:text-blue transition-all ease-in" onClick={() => router.push(`/`)} href={'#'}>Messages</a>
                    <SmallIcon title={'New group'} icon={<FontAwesomeIcon icon={faPenToSquare} className="text-blue text-3 hover:text-blue-hover"/>} onClickFn={() => setGroupDialog(true)} />
                </div>
            </header>

            <FormModal title={"Create new group"} onSubmit={handleSubmit} modalState={groupDialog} setModalState={setGroupDialog}>
                <FormInput title={"Group's name"} icon={<FontAwesomeIcon icon={faHeading} />} ref={groupName} required={true} />
            </FormModal>

            <article className='h-9/10 w-full flex flex-col justify-between'>

                <div className="max-h-9/10 flex flex-col gap-8 text-white pt-[2dvh] px-6 overflow-y-scroll no-scrollbar">

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

export default Sidebar;