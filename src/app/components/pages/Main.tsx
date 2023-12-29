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
import UserInterface from "@/app/utils/interfaces/UserInterface";

interface MainProps {
    group?: string | null
}

const Main: FC<MainProps> = ({ group }) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const searchRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const [friendRequests, setFriendRequests] = useState<any>("loading")
    const [savedUsers, setSavedUsers] = useState<any>({})

    useEffect(() => {
        const fetchFriendRequests = async () => {
            const sentFriendRequestsRes = await databases.listDocuments(database, 'usersRelations', [Query.equal('source', loggedInUser.dbID), Query.equal('type', 10)]);
            const friendRequestsRes = await databases.listDocuments(database, 'usersRelations', [Query.equal('destination', loggedInUser.dbID), Query.equal('type', 10)]);
            const merge = {...sentFriendRequestsRes.documents, ...friendRequestsRes.documents}
            setFriendRequests(merge)
            console.log("Friend requests: ", merge)
        }
        fetchFriendRequests()

        const unsubscribe = client.subscribe(`databases.${database}.collections.usersRelations.documents`, response => {
            const res: any = response.payload
            console.log(res)
            setFriendRequests({...friendRequests, res})
        });

        return () => {
            unsubscribe()
        };

    }, []);

    useEffect(() => {
        const friends = friendRequests;

        const fetchFriendRequests = async () => {
            const friendsIds = [...new Set([
                ...(Object.values(friends) as FriendRequestInterface[]).map(item => item.source),
                ...(Object.values(friends) as FriendRequestInterface[]).map(item => item.destination)
            ])];
            console.log(friendsIds);
            const savedUsersRes = await databases.listDocuments(database, 'users', [Query.equal('$id', friendsIds)]);
            const savedUsersMap = savedUsersRes.documents.reduce((accumulator: { [key: string]: any }, user) => {
                accumulator[user.$id] = user;
                return accumulator;
            }, {});
            setSavedUsers(savedUsersMap);
            console.log("Saved users: ", savedUsersMap);
        }

        if(Object.keys(friends).length > 0){
            fetchFriendRequests();
        }

    }, [friendRequests]);

    const searchUser = async () => {

        const dest = searchRef?.current?.value
        console.log(dest)
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

    return (
        <>
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

                        <div className='h-2/10 w-full flex flex-row gap-[1dvw] items-center overflow-y-scroll no-scrollbar'>
                            {friendRequests === 'loading' ? (
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                />
                            ) : (
                                (Object.keys(friendRequests).length > 0 && Object.keys(savedUsers).length > 0) && (
                                    Object.keys(friendRequests).map((key) => {
                                        let friendRequest = friendRequests[key];
                                        console.log(friendRequest)
                                        if (friendRequest.type == 10) {
                                            if (friendRequest.source === loggedInUser.$id) {
                                                return <div key={friendRequest.$id}><ProfileIcon imageUrl={`/images/users/${savedUsers[friendRequest.destination].avatarPath}`} actionColor={'blue'} /></div>;
                                            } else {
                                                return <div key={friendRequest.$id}><ProfileIcon imageUrl={`/images/users/${savedUsers[friendRequest.source].avatarPath}`} actionColor={'blue'} /></div>;
                                            }
                                        } else {
                                            return <div>c</div>;
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