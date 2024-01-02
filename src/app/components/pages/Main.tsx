"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormInput from "@/app/components/form/FormInput";
import ChannelMain from "@/app/components/ChannelMain";
import React, {FC, useEffect, useRef, useState} from "react";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";
import {client, database, databases, ID} from "@/app/appwrite";
import {useUserContext} from "@/app/UserContext";
import {Permission, Query, Role} from "appwrite";
import ProfileIcon from "@/app/components/ProfileIcon";
import FriendRequestInterface from "@/app/utils/interfaces/FriendRequestInterface";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import fireToast from "@/app/utils/toast";
import { ToastContainer, toast } from 'react-toastify';

interface MainProps {
    group?: string | null
}

const Main: FC<MainProps> = ({ group }) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const searchRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const [friendRequests, setFriendRequests] = useState<any>("loading")
    const [savedUsers, setSavedUsers] = useState<any>({})
    const friendRequestsRef = useRef<any>(friendRequests);

    const updateUsers = async (friendRequestsCopy: any) => {
        setSavedUsers('loading')
        if(Object.keys(friendRequestsCopy).length > 0){
            const friendsIds = [...new Set([
                ...(Object.values(friendRequestsCopy) as FriendRequestInterface[]).map(item => item.source),
                ...(Object.values(friendRequestsCopy) as FriendRequestInterface[]).map(item => item.destination)
            ])];
            const savedUsersRes = await databases.listDocuments(database, 'users', [Query.equal('$id', friendsIds)]);
            const savedUsersMap = savedUsersRes.documents.reduce((accumulator: { [key: string]: any }, user) => {
                accumulator[user.$id] = user;
                return accumulator;
            }, {});
            setSavedUsers(savedUsersMap);
        } else {
            setSavedUsers({})
        }
    }

    const fetchFriendRequests = async () => {
        const sentFriendRequestsRes = await databases.listDocuments(database, 'usersRelations', [Query.equal('source', loggedInUser.dbID), Query.equal('type', 10)]);
        const friendRequestsRes = await databases.listDocuments(database, 'usersRelations', [Query.equal('destination', loggedInUser.dbID), Query.equal('type', 10)]);
        const friendsRes = await databases.listDocuments(database, 'usersRelations', [Query.equal('destination', loggedInUser.dbID), Query.equal('type', 11)]);
        const combinedDocuments = [...friendsRes.documents, ...sentFriendRequestsRes.documents, ...friendRequestsRes.documents];

        const combinedObject: Record<string, FriendRequestInterface> = combinedDocuments.reduce((acc, document) => {
            acc[document.$id as any] = document as FriendRequestInterface;
            return acc;
        }, {} as Record<string, FriendRequestInterface>);

        setFriendRequests(combinedObject);
        friendRequestsRef.current = combinedObject
        updateUsers(combinedObject)
    }

    useEffect(() => {

        fetchFriendRequests()

        const unsubscribe = client.subscribe(`databases.${database}.collections.usersRelations.documents`, response => {
            const res: any = response.payload
            const resId: string = res.$id
            const events: any = response.events

            console.log("New event:", res)

            fetchFriendRequests()
        });

        return () => {
            unsubscribe()
        };

    }, []);

    const searchUser = async () => {

        const dest = searchRef?.current?.value
        if(dest){

            if(dest === loggedInUser.name){
                setError("😥 You can't add yourself to your friendlist!")
                return
            }

            const res = await databases.listDocuments(database, 'users', [Query.equal('username', dest)]);
            if(res.documents.length === 0){
                setError("Provided user doesn't exist.")
                return
            }

            const friendRequestResponse = await fetch('/api/sendFriendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ source: loggedInUser.dbID, dest: res.documents[0].$id })
            });

            if (!friendRequestResponse.ok) {
                throw new Error('Failed to send friend request');
            }

            setError("")
        }
    }

    const handleFriendAction = async (documentId: string, currentType: number, newType: number, destination?: string) => {

        /*

        0 - remove from database
        10 - friend request
        11 - friends

         */

        if(currentType === 10){

            if(newType === 0){

                const promise = databases.deleteDocument(database, 'usersRelations', documentId);
                promise.then(function (response) {
                    fireToast("success", "Friend request has been declined.", "top-right", 2000)
                }, function (error) {
                    fireToast("error", "There has been an error while declining your friend request.", "top-right", 2000)
                    console.log(error);
                });

            } else if (newType === 11 && destination) {

                console.log("accepting friend")
                const friendRequestResponse = await fetch('/api/sendFriendRequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ source: loggedInUser.dbID, dest: destination })
                });

                console.log("Friend Request Response:", friendRequestResponse)

                if (!friendRequestResponse.ok) {
                    throw new Error('Failed to send friend request');
                }

                fireToast("success", "Friend request has been accepted", "top-right", 2000)

            }

        } else if (currentType === 11 && newType === 0 && destination){

            const promise = databases.deleteDocument(database, 'usersRelations', documentId);
            promise.then(async function (response) {

                const duplicateReq = await databases.listDocuments(database, 'usersRelations', [Query.equal('source', loggedInUser.dbID), Query.equal('destination', destination), Query.equal('type', 11)]);

                const promise2 = databases.deleteDocument(database, 'usersRelations', duplicateReq.documents[0].$id);
                promise2.then(function (response) {
                    fireToast("success", "Friend request has been removed.", "top-right", 2000)
                }, function (error) {
                    fireToast("error", "There has been an error while removing your friend request..", "top-right", 2000)
                    console.log(error);
                });
            }, function (error) {
                fireToast("error", "There has been an error while removing your friend request.", "top-right", 2000)
                console.log(error);
            });
        }

        fetchFriendRequests()

    }

    console.log("-----------------------------")
    console.log("Requests:", friendRequests)
    console.log("Users:", savedUsers)
    console.log("-----------------------------")

    return (
        <>
            <ToastContainer />
            {group ? (
                <ChannelMain activeGroup={group} />
            ) : (
                <section className="w-8/10 bg-gray-dark h-full flex flex-col text-white">

                    <header className='h-1/10 w-full bg-light flex flex-row justify-center items-center px-8'>
                        <h1 className='text-4'>NEXLY</h1>
                    </header>

                    <article className='h-9/10 w-full flex flex-col p-[2dvw] gap-[1-dvw]'>

                        <div className='h-3/10 w-full flex flex-col gap-[1dvw]'>
                            <h2 className='text-3'>Add Friend</h2>
                            <h3 className='text-2'>You can add friend using their Username</h3>
                            <div className='w-full flex flex-row gap-2'>
                                <div className='w-8/10'>
                                    <FormInput title={"Friend's username"} icon={<FontAwesomeIcon icon={faUser}/>} ref={searchRef} />
                                </div>
                                <div className='w-2/10 h-full'>
                                    <PrimaryButton title={'Send Request'} onClickFn={searchUser} />
                                </div>
                            </div>
                            <h3 className='text-2 text-red-500'>{error}</h3>
                        </div>

                        <div className='h-2/10 w-full flex flex-row gap-[1dvw] items-center overflow-y-scroll no-scrollbar text-lightly'>
                            {friendRequests === 'loading' || savedUsers === 'loading' ? (
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                />
                            ) : (
                                (Object.keys(friendRequests).length > 0 && Object.keys(savedUsers).length > 0) && (
                                    Object.keys(friendRequests).map((key) => {
                                        let friendRequest = friendRequests[key];
                                        if (friendRequest?.source !== null && friendRequest?.destination !== null){
                                            if (friendRequest.type === 10) {
                                                if (friendRequest.source === loggedInUser.$id) {
                                                    return <div key={friendRequest.$id}><ProfileIcon divTitle={savedUsers[friendRequest.destination].username} imageUrl={`/images/users/${savedUsers[friendRequest.destination].avatarPath}`} actionColor={'red-500'} actionIcon={<FontAwesomeIcon icon={faXmark} />} actionTitle={'Cancel'} actionFn={() => handleFriendAction(friendRequest.$id, 10, 0)} /></div>;
                                                } else {
                                                    return <div key={friendRequest.$id}><ProfileIcon divTitle={savedUsers[friendRequest.source].username} imageUrl={`/images/users/${savedUsers[friendRequest.source].avatarPath}`} actionColor={'red-500'} actionIcon={<FontAwesomeIcon icon={faXmark} />} actionTitle={'Decline'} actionFn={() => handleFriendAction(friendRequest.$id, 10, 0)} actionColor2={'green-500'} actionIcon2={<FontAwesomeIcon icon={faCheck} />} actionTitle2={'Accept'} actionFn2={() => handleFriendAction(friendRequest.$id, 10, 11, friendRequest.source)}  /></div>;
                                                }
                                            } else if (friendRequest.type === 11 && friendRequest.source !== loggedInUser.$id) {
                                                return <div key={friendRequest.$id}><ProfileIcon divTitle={savedUsers[friendRequest.source].username} imageUrl={`/images/users/${savedUsers[friendRequest.source].avatarPath}`} actionColor={'red-500'} actionIcon={<FontAwesomeIcon icon={faXmark} />} actionTitle={'Remove from friends'} actionFn={() => handleFriendAction(friendRequest.$id, 11, 0, friendRequest.source)} /></div>;
                                            }
                                        } else {
                                            return <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                                        }
                                    })
                                )
                            )}

                        </div>

                        <div className='h-full w-full flex flex-col'>

                        </div>

                    </article>

                </section>
            )}
        </>
    )

};

export default Main;