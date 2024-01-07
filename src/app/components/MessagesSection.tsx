"use client"

import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from 'react';
import MessageLink from "@/app/components/MessageLink";
import User from "@/app/utils/interfaces/User";
import {client, database, databases} from "@/app/appwrite";
import { Query } from 'appwrite';
import {useUserContext} from "@/app/UserContext";
import MessageLinkInterface from "@/app/utils/interfaces/MessageLinkInterface";
import FriendRequestInterface from "@/app/utils/interfaces/FriendRequestInterface";


interface MessagesSectionProps {
    title: "Pinned" | "Groups" | "People",
    icon: ReactNode,
}

const MessagesSection: FC<MessagesSectionProps> = ({ title, icon }) => {

    const { loggedInUser } = useUserContext();
    const [groups, setGroups] = useState<MessageLinkInterface[] | 'loading'>('loading')

    useEffect(() => {
        setGroups(loggedInUser.groups)
    }, [loggedInUser.groups]);


    if(groups === 'loading'){
        return <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
    }

    return (
        <div className="flex flex-col gap-2 w-full">

            <div className="text-lightly text-2">{icon} {title}</div>

            {groups?.map((group: MessageLinkInterface) =>
                <MessageLink notifications={1} time={Date.now()} typing={false} group={group} key={group.title} />
            )}

            <hr className="w-full text-heavily my-2 text-2"/>

            {/* <MessageLink notifications={0} time={Date.now()} typing={true}/> */}

        </div>
    )

};

export default MessagesSection;
