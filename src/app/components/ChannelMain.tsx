"use client"

import React, {FC, useEffect, useState} from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import SmallIcon from "@/app/components/SmallIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faEllipsisVertical,
    faMagnifyingGlass, faMicrophone,
    faPhone,
    faThumbtack,
    faUsers,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import ChannelMessage from "@/app/components/channel/ChannelMessage";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import User from "@/app/utils/interfaces/User";
import GroupInterface from "@/app/utils/interfaces/GroupInterface";
import {client, database, databases, ID} from "@/app/appwrite";
import {Models, Query} from "appwrite";
import Loading from "@/app/loading";
import MessageInterface from "@/app/utils/interfaces/MessageInterface";
import {Permission, Role} from "node-appwrite";


interface ChannelMainProps {
    loggedInUser: User,
    activeGroup: string
}

const ChannelMain: FC<ChannelMainProps> = ({ loggedInUser, activeGroup }) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [newMessage, setNewMessage] = useState<string>("")
    const [messages, setMessages] = useState<any>([]);
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const fetchedMessage = await databases.listDocuments(
                    database,
                    'messages',
                    [Query.equal('group', activeGroup), Query.orderDesc("$updatedAt"), Query.limit(10)]
                );

                if (fetchedMessage) {
                    const transformedMessages: Models.Document[] = fetchedMessage.documents;
                    setMessages(transformedMessages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };


        fetchMessages();

        const unsubscribe = client.subscribe(`databases.${database}.collections.messages.documents`, response => {
            const res: any = response.payload
            setMessages([res, ...messages]) // TODO: Fix aby to appendovalo a nereplacovalo
        });

        setLoading(false)

    }, []);

    // TODO: fixnúť to, aby bol cooldown, keď sa niečo napíše a aby to teda stále neupdatovalo state cez setNewMessage

    const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setSubmitting(true);

            console.log('Message to submit: ', newMessage);

            const dbID = loggedInUser.dbID

            const response = await fetch(`/api/sendMessage?dbID=${dbID}&activeGroup=${activeGroup}&message=${newMessage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to submit message');
            }

            // Handle success if needed

        } catch (err: any) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <section className="w-8/10 bg-gray h-full flex flex-col text-white">

            <header className='h-1/10 w-full bg-light flex flex-row justify-between p-4 px-8'>
                <div className='flex flex-row gap-2 w-1/2 items-center'>
                    <ProfileIcon imageUrl={'/images/users/atrih.png'} size={'3dvw'}/>
                    <div className='flex flex-col justify-center'>
                        <h3 className='text-xl font-bold'>{activeGroup}</h3>
                        {/*<span className='text-lightly'>{console.log(activeGroup)} members</span>*/}
                    </div>
                </div>
                <div className='flex flex-row gap-6 justify-center items-center'>
                    <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>} size={'3'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faVideo}/>} size={'3'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faThumbtack}/>} size={'3'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faUsers}/>} size={'3'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faEllipsisVertical}/>} size={'3'}/>
                </div>
            </header>

            <article className='h-9/10 w-full flex flex-row'>

                <div className='h-full w-full flex flex-col'>

                    <div
                        className='h-9/10 w-full bg-gray-dark p-[2dvw] flex flex-col-reverse gap-[2dvw] overflow-y-scroll no-scrollbar'>

                        {messages.map((message: any) => (
                            <ChannelMessage message={message} key={message.$id}/>
                        ))}

                    </div>

                    <form className='h-1/10 w-full bg-light p-8 flex justify-center items-center' onSubmit={messageSubmit}>

                        <FormInput icon={<FontAwesomeIcon icon={faCirclePlus} className="text-gray-400"/>} title={''}
                                   valueProp={newMessage} onChangeFn={(e) => setNewMessage(e.target.value)} required={true}
                        />

                        <button className={'invisible'} type="submit" disabled={submitting}>Login</button>

                    </form>

                </div>

                <aside className='h-full w-3/10 bg-light border-t-2 border-blue flex flex-col p-[2dvw] gap-[2dvw]'>

                    <h3 className='text-xl font-bold'>Stay Woke</h3>

                    <FormInput icon={<FontAwesomeIcon icon={faFileLines} className="text-gray-400"/>}
                               title={'Description'}/>


                    <div className='flex flex-col gap-[0.5dvw] text-2'>
                        <div className='flex flex-row justify-between'>
                            <div className=""><FontAwesomeIcon icon={faUser} className="text-blue pr-[0.5dvw]"/> Members (8)
                            </div>
                            <a href='#' className='text-blue hover:text-lightly transition-all'>Add</a>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row gap-[0.5dvw] items-center'>
                                <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'dnd'}/>
                                <h3 className='font-bold'>Turcute</h3>
                            </div>
                            <div className='flex flex-row gap-[0.5dvw]'>
                                <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>}/>
                                <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots}/>}/>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row gap-[0.5dvw] items-center'>
                                <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'away'}/>
                                <h3 className='font-bold'>Turcute</h3>
                            </div>
                            <div className='flex flex-row gap-[0.5dvw]'>
                                <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>}/>
                                <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots}/>}/>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row gap-[0.5dvw] items-center'>
                                <ProfileIcon imageUrl={'/images/users/atrih.png'} status={'offline'}/>
                                <h3 className='font-bold'>Turcute</h3>
                            </div>
                            <div className='flex flex-row gap-[0.5dvw]'>
                                <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>}/>
                                <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots}/>}/>
                            </div>
                        </div>
                        <a href='#' className='text-blue text-md hover:text-lightly transition-all text-center'>Show
                            More</a>
                    </div>


                </aside>

            </article>

        </section>
    )
};

export default ChannelMain;