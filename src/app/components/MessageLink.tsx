"use client"

import React, { FC, useState } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import GroupsInterface from '../utils/interfaces/GroupsInterface';
import {useEffect} from 'react';
import {databases} from "@/app/appwrite";
import { Query } from 'appwrite';


interface MessageLinkProps {
    typing: boolean,
    time: number,
    notifications: number,
    group: GroupsInterface,
}

const database = process.env.NEXT_PUBLIC_APPWRITE_DB_NAME

const MessageLink: FC<MessageLinkProps> = ({ typing, time, notifications, group }) => {

    if(!database){
        return "<div>No database configured!</div>"
    }

    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            const fetchedMessage = await databases.listDocuments(database, 'messages', [Query.equal('group', '657757fb8430273aea4c')]);
            console.log(fetchedMessage)
            // setMessage(fetchedMessage);
        }
        fetchMessage();
    }, []);


    return (
        <div className="flex flex-row justify-between items-center gap-4 group">
            <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'online'} />

            <div className="flex flex-row justify-between w-8/10">
                <div className="flex flex-col justify-between w-7/10">
                    <h3 className="text-lg font-bold">Leila</h3>
                    {typing ?
                        <span className="italic text-md text-blue">Typing...</span>
                        :
                        <span className="text-md text-lightly">OK! See ya tomorrow!</span>
                    }

                </div>

                <div className="flex flex-col justify-between items-end w-3/10">
                    {time ? <h3 className="text-md text-lightly font-bold">8:30 PM</h3> : null}
                    {notifications ? <span className="text-center bg-blue h-[1dvw] w-[1dvw] text-md rounded-full text-white">{ notifications }</span> : null}
                </div>
            </div>
        </div>
    )
};

export default MessageLink;
