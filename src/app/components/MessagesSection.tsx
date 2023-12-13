"use client"

import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect} from 'react';
import MessageLink from "@/app/components/MessageLink";
import User from "@/app/utils/interfaces/User";
import {databases} from "@/app/appwrite";
import { Query } from 'appwrite';
import GroupInterface from '../utils/interfaces/GroupInterface';


interface MessagesSectionProps {
    title: string,
    icon: ReactNode,
    loggedInUser: User,
    setActiveGroup: Dispatch<SetStateAction<string | null>>
}

const MessagesSection: FC<MessagesSectionProps> = ({ title, icon, loggedInUser, setActiveGroup }) => {

    const groups = loggedInUser.groups

    useEffect(() => {
        // const fetchGroups = async () => {
        //     groups = await databases.listDocuments(database, 'groups', [Query.equal('', '')]);
        // }

    }, []);

    return (
        <div className="flex flex-col gap-2 w-full">

            <div className="text-lightly text-2">{icon} {title}</div>

            {groups.map((group: any) =>
                <MessageLink notifications={1} time={Date.now()} typing={false} group={group} key={group.title} setActiveGroup={setActiveGroup} />
            )}

            <hr className="w-full text-heavily my-2 text-2"/>

            {/* <MessageLink notifications={0} time={Date.now()} typing={true}/> */}

        </div>
    )

};

export default MessagesSection;
