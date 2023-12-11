"use client"

import React, {FC, ReactNode, useEffect} from 'react';
import MessageLink from "@/app/components/MessageLink";
import User from "@/app/utils/interfaces/User";
import {databases} from "@/app/appwrite";


interface MessagesSectionProps {
    title: string,
    icon: ReactNode,
    loggedInUser: User | null,
}

const MessagesSection: FC<MessagesSectionProps> = ({ title, icon, loggedInUser }) => {

    const database = process.env.NEXT_PUBLIC_APPWRITE_DB_NAME
    if(!database){
        return "<div>No database configured!</div>"
    }

    let groups = null

    useEffect(() => {
        const fetchGroups = async () => {
            groups = await databases.listDocuments(database, 'groups');
        }

    }, []);

    console.log(groups)

    return (
        <div className="flex flex-col gap-2 w-full">

            <div className="text-lightly text-2">{icon} {title}</div>

            <MessageLink notifications={1} time={Date.now()} typing={false}/>

            <hr className="w-full text-heavily my-2 text-2"/>

            <MessageLink notifications={0} time={Date.now()} typing={true}/>

        </div>
    )

};

export default MessagesSection;
