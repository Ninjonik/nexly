"use client"

import React, {FC, useState} from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import {useEffect} from 'react';
import {client, database, databases} from "@/app/appwrite";
import {Query} from 'appwrite';
import MessageInterface from "@/app/utils/interfaces/MessageInterface";
import formatTimestampToTime from "@/app/utils/convertTimestamp";
import { useRouter } from 'next/navigation';
import MessageLinkInterface from "@/app/utils/interfaces/MessageLinkInterface";
import formatTimestampToDate from "@/app/utils/formatTimestampToDate";


interface MessageLinkProps {
    typing: boolean,
    time: number,
    notifications: number,
    group: MessageLinkInterface,
}

const MessageLink: FC<MessageLinkProps> = ({ typing, time, notifications, group }) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<MessageInterface | {}>({});

    const router = useRouter();

    useEffect(() => {
        const fetchMessage = async () => {
            const fetchedMessage = await databases.listDocuments(database, 'messages', [Query.equal('group', group.$id), Query.orderDesc("$updatedAt"), Query.limit(1)]);
            if(fetchedMessage){
                setMessage(fetchedMessage.documents[0]);
            }
        }
        fetchMessage();

        setLoading(false)

        const unsubscribe = client.subscribe(`databases.${database}.collections.messages.documents`, response => {
            const res: any = response.payload

            if(res.group.$id === group.$id) setMessage(res)
        });

        setLoading(false)

        return () => {
            unsubscribe()
        };

    }, []);

    if (loading){
        return (
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        )
    }

    if(!group){
        return <div></div>
    }

    return (
        <button className="flex group p-2 flex-row justify-between text-start items-center gap-4 group" onClick={() => router.push(`/group/${group.$id}`)} type={'button'}>
            <ProfileIcon imageUrl={`/images/groups/${group.avatarPath}`}
                         // status={'online'}
            />

            <div className="flex flex-row justify-between w-8/10">
                <div className="flex flex-col justify-between w-6/10">
                    <h3 className="text-3xl lg:text-md font-bold group-hover:underline transition-all">{group.title.slice(0, 12)}</h3>
                    {typing ?
                        <span className="italic text-md text-blue">Typing...</span>
                        :
                        (
                            (message && Object.keys(message).length > 0) && (
                                <div className={'flex flex-row gap-[0.25dvw]'}>
                                    {/*<span className='text-blue'>*/}
                                    {/*    {message.author.username}:*/}
                                    {/* </span>*/}
                                    <span className="text-2 lg:text-md text-lightly">
                                      {"message" in message ? message.message.slice(0, 15) : ""}
                                    </span>
                                </div>
                            )
                        )
                    }

                </div>

                <div className="flex flex-col justify-between items-end w-4/10">
                    {(message && Object.keys(message).length > 0) && (
                        <>
                            <h3 className="text-1.5 lg:text-md text-lightly font-bold">{formatTimestampToTime("$updatedAt" in message ? message.$updatedAt : "")}</h3>
                            <h3 className="text-1.5 lg:text-md text-lightly font-bold">{formatTimestampToDate("$updatedAt" in message ? message.$updatedAt : "")}</h3>
                        </>
                    )}
                    {/*{notifications && <span className="text-center bg-blue h-[1dvw] w-[1dvw] text-md rounded-full text-white">{ notifications }</span>}*/}
                </div>
            </div>
        </button>
    )
};

export default MessageLink;
