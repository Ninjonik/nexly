"use client"

import React, {FC, useEffect, useRef, useState} from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import SmallIcon from "@/app/components/SmallIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faArrowUp, faArrowUp91, faCalendar, faCheck,
    faCirclePlus, faDisplay,
    faEllipsisVertical, faExpand, faHeading, faMaximize, faMicrophone, faMinimize,
    faPhone, faPlus, faRightFromBracket,
    faThumbtack,
    faUsers,
    faVideo, faXmark
} from "@fortawesome/free-solid-svg-icons";
import ChannelMessage from "@/app/components/channel/ChannelMessage";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import User from "@/app/utils/interfaces/User";
import {client, database, databases, storage} from "@/app/appwrite";
import {Models, Query} from "appwrite";
import UserInterface from "@/app/utils/interfaces/UserInterface";
import ChannelMainSkeleton from "@/app/components/skeletons/ChannelMain";
import FormTextarea from "@/app/components/form/FormTextarea";
import emojiNameMap from "emoji-name-map";
import '@livekit/components-styles';
import {
    CarouselLayout, DisconnectButton, GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    TrackToggle,
    useTracks,
    VideoConference,
    PreJoin,
} from '@livekit/components-react';
import {Track} from "livekit-client";
import {useUserContext} from "@/app/UserContext";
import FormModal from "@/app/components/form/FormModal";
import fireToast from "@/app/utils/toast";
import sha256 from "@/app/utils/sha256";
import {ID, Permission, Role} from "appwrite";
import {Md5} from "ts-md5";
import {useRouter} from "next/navigation";
import messageInterface from "@/app/utils/interfaces/MessageInterface";
import AnchorLink from "@/app/components/AnchorLink";
import uploadMultipleFiles from "@/app/utils/uploadMultipleFiles";
import {useSlideContext} from "@/app/SlideContext";
import {ChannelAside} from "@/app/components/channel/ChannelAside";

interface ChannelMainProps {
    activeGroup: string
}

const ChannelMain: FC<ChannelMainProps> = ({ activeGroup }) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();

    const [loading, setLoading] = useState<boolean>(true)
    const [newMessage, setNewMessage] = useState<string>("")
    const [gifValue, setGifValue] = useState<string>("")
    const [attachments, setAttachments] = useState<File[]>([])
    const [messages, setMessages] = useState<any>([])
    const [group, setGroup] = useState<any>([])
    const [submitting, setSubmitting] = useState(false)
    const [token, setToken] = useState("");
    const [inCall, setInCall] = useState<boolean>(false);
    const [hiddenCall, hideCall] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    const { slide, setSlide, onTouchStart, onTouchMove, onTouchEnd } = useSlideContext();

    const router = useRouter();

    const [usersShown, setUsersShown] = useState<boolean>(true)
    const [lastLoadedMessageId, setLastLoadedMessageId] = useState<string>('')

    const fetchData = async (refreshInfinite: boolean = false) => {
        try {
            const fetchedGroup = await databases.getDocument(database, 'groups', activeGroup)

            let query = [Query.equal('group', activeGroup), Query.orderDesc("$updatedAt"), Query.limit(10)];
            if (lastLoadedMessageId && refreshInfinite) {
                query.push(Query.cursorAfter(lastLoadedMessageId))
            }

            const fetchedMessage = await databases.listDocuments(
                database,
                'messages',
                query
            );

            if(fetchedGroup) {
                setGroup(fetchedGroup);
            }

            if (fetchedMessage) {
                const transformedMessages: Models.Document[] = fetchedMessage.documents;
                if(lastLoadedMessageId && refreshInfinite){
                    setMessages((prevMessages: messageInterface[]) => [...prevMessages, ...transformedMessages]);
                } else {
                    setMessages(transformedMessages)
                }


                if (transformedMessages.length > 0) {
                    setLastLoadedMessageId(transformedMessages[transformedMessages.length - 1].$id);
                }
            }

        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {

        fetchData();

        const unsubscribe = client.subscribe(`databases.${database}.collections.messages.documents`, response => {
            const res: any = response.payload
            if(res.group.$id === activeGroup) setMessages((oldMessages: any) => [res, ...oldMessages])
        });

        const unsubscribeGroup = client.subscribe(`databases.${database}.collections.groups.documents`, response => {
            const res: any = response.payload
            if(res.$id === activeGroup) setGroup(res)
        });

        setLoading(false)

        return () => {
            unsubscribe()
            unsubscribeGroup()
        };

    }, []);

    const messageSubmit = async (messageToSubmit: string, fileId?: string) => {
        if((messageToSubmit && messageToSubmit !== "") || attachments.length > 0 || gifValue !== ""){
            try {
                setSubmitting(true);

                if(!messageToSubmit) messageToSubmit = " ";

                const dbID = loggedInUser.dbID;
                let constructedBody
                let fileIds: string[] = []

                if(attachments.length > 0){
                    fileIds = await uploadMultipleFiles(attachments);
                }

                if(messageToSubmit === 'file' && fileId){
                    constructedBody = JSON.stringify({
                        "dbID": dbID,
                        "activeGroup": activeGroup,
                        "message": messageToSubmit,
                        "attachments": [fileId]
                    });
                } else {
                    constructedBody = JSON.stringify({
                        "dbID": dbID,
                        "activeGroup": activeGroup,
                        "message": messageToSubmit,
                        "attachments": fileIds
                    });
                }

                const response = await fetch(`/api/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: constructedBody
                });

                if (!response.ok) {
                    console.error(response.body);
                    throw new Error('Failed to submit message');
                }

                setNewMessage("")
                setAttachments([])
                setGifValue("")
            } catch (err: any) {
                fireToast('error', err.message, 'top-right', 2000)
                console.error(err);
            } finally {
                setSubmitting(false);
            }
        }
    };

    useEffect(() => {
        const keyDownHandler = (event: { key: string; shiftKey: boolean; preventDefault: () => void; }) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                messageSubmit(newMessage.replace(/\\n/g, "\n"));
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [messageSubmit]);

    useEffect(() => {
        if(gifValue !== "") messageSubmit(gifValue)
    }, [gifValue]);

    useEffect(() => {

        if(group.call){
            fetchCallData()
        }

    }, [group.call]);

    const fetchCallData = async () => {
        try {
            const resp = await fetch(
                `/api/getParticipantToken?room=${group.$id}&username=${loggedInUser.name}`
            );
            const data = await resp.json();
            setToken(data.token);
        } catch (e) {
            console.error(e);
        }
    };


    const call = async (status: boolean) => {

        try {
            setSubmitting(true);

            const dbID = loggedInUser.dbID;
            const constructedBody = JSON.stringify({
                "dbID": dbID,
                "activeGroup": activeGroup,
                "status": status
            });

            const response = await fetch(`/api/call`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: constructedBody
            });

            if (!response.ok) {
                throw new Error('Failed to call');
            }

            setInCall(true)

        } catch (err: any) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }

    }

    const convertText = (inputText: string) => {
        return inputText.replace(/:\w+:/g, (match) => {
            const emojiName = match.slice(1, -1);
            const emoji = emojiNameMap.get(emojiName);
            return emoji || match;
        });
    };

    const onDisconnectedFn = async () => {

        try {
            setInCall(false)

            const response = await fetch(`/api/checkRoomStatus?room=${activeGroup}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to call');
            }

        } catch (err: any) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    const leaveGroup = async () => {
        const constructedBody = JSON.stringify({
            dbID: loggedInUser.$id,
            groupId: activeGroup
        })

        const response = await fetch(`/api/leaveGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: constructedBody
        });

        if (!response.ok) {
            fireToast('error', 'There has been an error while leaving group...', 'top-right', 2000)
            throw new Error('Failed to leave group');
        }

        let newLoggedInUser = {...loggedInUser}
        newLoggedInUser.groups = newLoggedInUser.groups.filter((group: any) => group.$id !== activeGroup);

        setLoggedInUser(newLoggedInUser)

        fireToast('success', 'Successfully left the group.', 'top-right', 2000)
        router.push(`/`)
    }

    const handleTextAreaPaste = async (file: File) => {

        try {
            const res = await storage.createFile(
                'messageAttachments',
                ID.unique(),
                file,
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(loggedInUser.$id)),
                    Permission.delete(Role.user(loggedInUser.$id)),
                ]
            );

            messageSubmit(' ', res.$id)

            fireToast('success', 'File uploaded.')

        } catch (e) {
            fireToast('error', 'Cannot upload your image!')
            return console.log(e)
        }
    }

    const pinGroup = async () => {

        if(loggedInUser.pinnedGroups.includes(group.$id)){
            try {
                let updatedArray = [...loggedInUser.pinnedGroups]
                const index = updatedArray.indexOf(group.$id);
                if (index > -1) {
                    updatedArray.splice(index, 1);
                }

                await databases.updateDocument(
                    database,
                    'users',
                    loggedInUser.$id,
                    {
                        pinnedGroups: updatedArray
                    },
                );

                let newLoggedInUser = {...loggedInUser}
                newLoggedInUser.pinnedGroups = updatedArray
                setLoggedInUser(newLoggedInUser)

                fireToast('success', 'Group unpinned.')
            } catch (e) {
                console.log(e)
                fireToast('error', 'There has been an error while unpinning the group.')
            }
        } else {
            try {
                let updatedArray = [group.$id, ...loggedInUser.pinnedGroups]

                await databases.updateDocument(
                    database,
                    'users',
                    loggedInUser.$id,
                    {
                        pinnedGroups: updatedArray
                    },
                );

                let newLoggedInUser = {...loggedInUser}
                newLoggedInUser.pinnedGroups = updatedArray
                setLoggedInUser(newLoggedInUser)

                fireToast('success', 'Group pinned.')
            } catch (e) {
                console.log(e)
                fireToast('error', 'There has been an error while pinning the group.')
            }
        }

    }

    if (loading || !group || !group?.users) {
        return <ChannelMainSkeleton />;
    }

    return (
        <section className={`w-${slide === 'main' ? 'full' : '0'} lg:w-8/10 overflow-x-hidden bg-gray h-full flex flex-col text-white`} onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>

            <header className='h-1/10 w-full bg-light flex flex-row justify-between px-8'>
                <div className='flex flex-row gap-2 w-1/2 items-center'>
                    <ProfileIcon imageUrl={`/images/groups/${group.avatarPath}`}/>
                    <div className='flex flex-col justify-center'>
                        <h3 className='text-3xl lg:text-xl font-bold'>{group.title}</h3>
                        <span className='text-lightly text-2xl lg:text-md'>{group.users.length} members</span>
                    </div>
                </div>
                <div className='flex flex-row gap-6 justify-center items-center'>
                    <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>} size={'4xl'} className={'lg:text-3'} onClickFn={() => call(true)} title={'Start a call'} />
                    {/*<SmallIcon icon={<FontAwesomeIcon icon={faVideo}/>} size={'3'}/>*/}
                    <SmallIcon icon={<FontAwesomeIcon icon={faThumbtack}/>} size={'4xl'} className={'lg:text-3'} onClickFn={pinGroup} title={'Pin/Unpin group'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faUsers}/>} size={'4xl'} className={'lg:text-3'} onClickFn={() => setUsersShown(!usersShown)} title={'Show/Hide users'} />
                    <SmallIcon icon={<FontAwesomeIcon icon={faRightFromBracket}/>} size={'4xl'} className={'lg:text-3'} onClickFn={leaveGroup} title={'Leave group'} />
                </div>
            </header>

            <article className='h-0 w-full flex flex-row flex-grow'>

                <div className='h-full w-full flex flex-col'>

                    {group.call && (
                        <>
                            { (!hiddenCall && inCall) ? (
                                <div className={`flex flex-col gap-[1dvw] bg-light transition-all duration-100 ${fullscreen ? 'absolute w-[100dvw] h-[100dvh] top-0 left-0 z-50' : 'relative w-full h-4/10'}`}>
                                    <LiveKitRoom
                                        video={false}
                                        audio={false}
                                        connect={inCall}
                                        token={token}
                                        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                                        data-lk-theme="default"
                                        className='flex flex-col h-full'
                                        onDisconnected={onDisconnectedFn}
                                    >
                                        <VideoConference />
                                        <button className='h-[2dvw] w-[2dvw] p-[1dvw] text-lightly hover:text-white transition-all flex justify-center items-center text-center rounded-xl absolute right-[0.5dvw] bottom-[0.5dvw]' onClick={() => setFullscreen(!fullscreen)}>{fullscreen ? <FontAwesomeIcon icon={faMinimize} /> : <FontAwesomeIcon icon={faMaximize} />}</button>

                                    </LiveKitRoom>
                                </div>
                            ) : (
                                <div className='flex flex-row justify-center items-center w-full h-3/10 text-2 gap-[1dvw] p-[1dvw] bg-light z-10'>
                                    {(!inCall && !hiddenCall) && (
                                        <button className='h-[2dvw] w-[4dvw] p-[1dvw] bg-green-400 hover:bg-green-600 transition-all flex justify-center items-center text-center rounded-xl' onClick={() => setInCall(true)}>Join</button>
                                    )}
                                    <button className='right-10 h-[2dvw] w-[4dvw] p-[1dvw] bg-green-400 hover:bg-green-600 transition-all flex justify-center items-center text-center rounded-xl' onClick={() => hideCall(!hiddenCall)}>{hiddenCall ? 'Show' : 'Hide'}</button>
                                </div>
                            )}
                        </>
                    )}

                    <div className='h-full w-full bg-gray-dark p-[2dvw] flex flex-col-reverse gap-[3dvw] lg:gap-[2dvw] overflow-y-scroll no-scrollbar'>
                        {messages.map((message: any) => (
                            <ChannelMessage message={message} key={message.$id} localUser={(message.author.$id === loggedInUser.$id)} />
                        ))}
                        {messages.length > 9 && (
                            <AnchorLink size={'1'} description={'Show more'} color={'blue'} className={'text-center'} onClickFn={async () => fetchData(true)} />
                        )}
                    </div>

                    <form
                        className='max-h-5/10 flex-grow w-full bg-light lg:p-[1dvw] p-[2dvw] flex justify-center items-center'
                        onSubmit={(e) => {
                            e.preventDefault();
                            messageSubmit(newMessage.replace(/\\n/g, "\n"));
                        }}
                    >
                        <FormTextarea
                            icon={<FontAwesomeIcon icon={faCirclePlus} className="text-gray-400 text-2" />}
                            title={''}
                            valueProp={newMessage}
                            onChangeFn={(value) => setNewMessage(convertText(value))}
                            handlePasteFn={handleTextAreaPaste}
                            gifValue={gifValue}
                            setGifValue={(value) => setGifValue(value)}
                            attachments={attachments}
                            setAttachments={setAttachments}
                            submitting={submitting}
                            setSubmitting={setSubmitting}
                            required={false}
                        />
                    </form>

                </div>

                <ChannelAside group={group} usersShown={usersShown} activeGroup={activeGroup} />

            </article>

        </section>
    )
};

export default ChannelMain;