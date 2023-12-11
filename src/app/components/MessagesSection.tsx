"use client"

import React, {FC, ReactNode} from 'react';
import MessageLink from "@/app/components/MessageLink";
import User from "@/app/utils/interfaces/User";


interface MessagesSectionProps {
    title: string,
    icon: ReactNode,
    loggedInUser: User | null,
}

const MessagesSection: FC<MessagesSectionProps> = ({ title, icon, loggedInUser }) => (
    <div className="flex flex-col gap-2 w-full">

        <div className="text-lightly text-2">{icon} { title }</div>

        <MessageLink  notifications={1} time={Date.now()} typing={false}/>

        <hr className="w-full text-heavily my-2 text-2" />

        <MessageLink  notifications={0} time={Date.now()} typing={true}/>

    </div>
);

export default MessagesSection;
