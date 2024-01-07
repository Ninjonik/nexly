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
    faPhone, faPlus,
    faThumbtack,
    faUsers,
    faVideo, faXmark
} from "@fortawesome/free-solid-svg-icons";
import ChannelMessage from "@/app/components/channel/ChannelMessage";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import User from "@/app/utils/interfaces/User";
import {client, database, databases} from "@/app/appwrite";
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

interface ChannelMainProps {
    activeGroup: string
}

const ChannelMain: FC<ChannelMainProps> = ({ activeGroup }) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();

    const [loading, setLoading] = useState<boolean>(true)
    const [newMessage, setNewMessage] = useState<string>("")
    const [gifValue, setGifValue] = useState<string>("")
    const [messages, setMessages] = useState<any>([])
    const [group, setGroup] = useState<any>([])
    const [submitting, setSubmitting] = useState(false)
    const [token, setToken] = useState("");
    const [inCall, setInCall] = useState<boolean>(false);
    const [hiddenCall, hideCall] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false)

    const router = useRouter();

    const [dateLimit, setDateLimit] = useState<string>("7")
    const limitRef = useRef<HTMLInputElement>(null)
    const [inviteLink, setInviteLink] = useState<string>("")

    const [usersShown, setUsersShown] = useState<boolean>(true)

    useEffect(() => {

        const fetchData = async () => {
            try {

                const fetchedGroup = await databases.listDocuments(
                    database,
                    'groups',
                    [Query.equal('$id', activeGroup)]
                );

                const fetchedMessage = await databases.listDocuments(
                    database,
                    'messages',
                    [Query.equal('group', activeGroup), Query.orderDesc("$updatedAt"), Query.limit(10)]
                );

                if(fetchedGroup) {
                    const transformedGroup: Models.Document[] = fetchedGroup.documents;
                    setGroup(transformedGroup[0]);
                }

                if (fetchedMessage) {
                    const transformedMessages: Models.Document[] = fetchedMessage.documents;
                    setMessages(transformedMessages);
                }
                
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

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

    // TODO: fixnúť to, aby bol cooldown, keď sa niečo napíše a aby to teda stále neupdatovalo state cez setNewMessage

    const messageSubmit = async (messageToSubmit: string) => {
        if(messageToSubmit && messageToSubmit !== ""){
            try {
                setSubmitting(true);

                const dbID = loggedInUser.dbID;
                const constructedBody = JSON.stringify({
                    "dbID": dbID,
                    "activeGroup": activeGroup,
                    "message": messageToSubmit
                });

                const response = await fetch(`/api/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: constructedBody
                });

                if (!response.ok) {
                    throw new Error('Failed to submit message');
                }

                setNewMessage("")

            } catch (err: any) {
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
        // Use emoji-name-map to replace emoji placeholders with actual emojis
        return inputText.replace(/:\w+:/g, (match) => {
            const emojiName = match.slice(1, -1); // Remove colons from the placeholder
            const emoji = emojiNameMap.get(emojiName);
            return emoji || match; // Return the emoji if found, otherwise return the original placeholder
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

            console.log(response)

        } catch (err: any) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    const generateInviteLink = async () => {

        let amountLimit: number = -1
        if (limitRef?.current?.value) amountLimit = parseInt(limitRef.current.value)

        let data = {
            inviter: loggedInUser.$id,
            groupId: activeGroup,
            validAmount: amountLimit,
            validDate: dateLimit !== "0" ? new Date(Date.now() + parseInt(dateLimit) * 24 * 60 * 60 * 1000) : undefined,
        };

        const generatedId: string = Md5.hashStr(`${activeGroup}${Date.now()}${loggedInUser.$id}`)


        try {
            const res = await databases.createDocument(
                database,
                'invites',
                generatedId,
                data,
                [
                    Permission.read(Role.user(loggedInUser.$id)),
                    Permission.read(Role.any()),
                    Permission.update(Role.user(loggedInUser.$id)),
                    Permission.delete(Role.user(loggedInUser.$id)),
                ]
            )

            setInviteLink(generatedId)

            fireToast('success', 'Your invite link has been created.', "top-right", 2000)
        } catch (e) {
            console.log(e)
            fireToast('error', 'There has been an error while creating your invite link. Try again later.', "top-right", 2000)
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

        console.log(loggedInUser, newLoggedInUser)
        setLoggedInUser(newLoggedInUser)

        fireToast('success', 'Successfully left the group.', 'top-right', 2000)
        router.push(`/`)
    }


    if (loading || !group || !group?.users) {
        return <ChannelMainSkeleton />;
    }

    return (
        <section className="w-8/10 bg-gray h-full flex flex-col text-white">

            <header className='h-1/10 w-full bg-light flex flex-row justify-between px-8'>
                <div className='flex flex-row gap-2 w-1/2 items-center'>
                    <ProfileIcon imageUrl={`/images/groups/${group.avatarPath}`} size={'3dvw'}/>
                    <div className='flex flex-col justify-center'>
                        <h3 className='text-xl font-bold'>{group.title}</h3>
                        <span className='text-lightly'>{group.users.length} members</span>
                    </div>
                </div>
                <div className='flex flex-row gap-6 justify-center items-center'>
                    <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>} size={'3'} onClickFn={() => call(true)} />
                    <SmallIcon icon={<FontAwesomeIcon icon={faVideo}/>} size={'3'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faThumbtack}/>} size={'3'}/>
                    <SmallIcon icon={<FontAwesomeIcon icon={faUsers}/>} size={'3'} onClickFn={() => setUsersShown(!usersShown)} />
                    <SmallIcon icon={<FontAwesomeIcon icon={faEllipsisVertical}/>} size={'3'} onClickFn={leaveGroup} />
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

                    <div
                        className='h-full w-full bg-gray-dark p-[2dvw] flex flex-col-reverse gap-[2dvw] overflow-y-scroll no-scrollbar'
                    >
                        {messages.map((message: any) => (
                            <ChannelMessage message={message} key={message.$id} localUser={(message.author.$id === loggedInUser.dbID)} />
                        ))}
                    </div>

                    <form
                        className='max-h-4/10 flex-grow w-full bg-light p-[1dvw] flex justify-center items-center'
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
                            gifValue={gifValue}
                            setGifValue={(value) => setGifValue(value)}
                            required={false}
                        />
                    </form>

                </div>

                <aside className={`h-full bg-light border-t-2 border-blue flex flex-col gap-[2dvw] transition-all ${usersShown ? 'w-3/10 p-[2dvw]' : 'w-0'}`}>
                    {usersShown && (
                        <>
                            <h3 className='text-xl font-bold'>{group.title}</h3>

                            <FormInput icon={<FontAwesomeIcon icon={faFileLines} className="text-gray-400"/>}
                                       title={'Description'}/>


                            <div className='flex flex-col gap-[0.5dvw] text-2'>
                                <div className='flex flex-row justify-between'>
                                    <div className=""><FontAwesomeIcon icon={faUser} className="text-blue pr-[0.5dvw]"/> Members ({group.users.length})
                                    </div>
                                    <a href='#' className='text-blue hover:text-lightly transition-all' onClick={() => setDialog(true)}>Add</a>
                                </div>

                                <FormModal title={"Add people"} modalState={dialog} setModalState={setDialog} onSubmit={generateInviteLink} submitText={'Generate'}>

                                    {inviteLink && (
                                        <span className='text-white'>Generated invite link:
                                            <a target={'_blank'} href={`${process.env.NEXT_PUBLIC_HOSTNAME}/invite/${inviteLink}`} className='text-blue hover:text-blue-hover transition-all ease-in hover:cursor-pointer'> {`${process.env.NEXT_PUBLIC_HOSTNAME}/invite/${inviteLink}`}</a>
                                        </span>
                                    )}

                                    <div>
                                        <label
                                            htmlFor="customRange1"
                                            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                        >{dateLimit === "0" ? ('No expiration') : (dateLimit + " Days till expiration")}</label
                                        >
                                        <input
                                            type="range" min={0} max={7}
                                            className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-600"
                                            id="customRange1" onChange={(e) => setDateLimit(e.target.value)} value={dateLimit} required={true}/>
                                    </div>

                                    <FormInput title={'Maximum amount of uses'} icon={<FontAwesomeIcon icon={faArrowUp91} /> } inputType={'number'} ref={limitRef} required={true} min={0} max={100} />

                                </FormModal>

                                {group.users.map((user: UserInterface) => (
                                    <div className='flex justify-between items-center' key={user.dbID}>
                                        <div className='flex flex-row gap-[0.5dvw] items-center'>
                                            <ProfileIcon imageUrl={`/images/users/${user.avatarPath}`} status={'online'} />
                                            <h3 className='font-bold'>{user.username}</h3>
                                        </div>
                                        <div className='flex flex-row gap-[0.5dvw]'>
                                            <SmallIcon icon={<FontAwesomeIcon icon={faPhone} />} />
                                            <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots} />} />
                                        </div>
                                    </div>
                                ))}


                                {/*<a href='#' className='text-blue text-md hover:text-lightly transition-all text-center'>Show More</a>*/}
                            </div>
                        </>
                    )}
                </aside>

            </article>

        </section>
    )
};

export default ChannelMain;

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} className=''>
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );
}