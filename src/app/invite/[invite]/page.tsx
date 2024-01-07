"use client"

import React, {useEffect, useState} from "react";
import {useParams, useRouter} from 'next/navigation';
import Main from "@/app/components/pages/Main";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import {database, databases} from "@/app/appwrite";
import {Query} from "appwrite";
import InviteInterface from "@/app/utils/interfaces/InviteInterface";
import ProfileIcon from "@/app/components/ProfileIcon";
import {useUserContext} from "@/app/UserContext";
import fireToast from "@/app/utils/toast";

const Group = () => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const [error, setError] = useState<string>('loading');
    // const [invite, setInvite] = useState<InviteInterface | {}>({});
    const [invite, setInvite] = useState<any>({});

    const router = useRouter();

    const params = useParams<{ invite: string }>();

    const inviteId = params.invite;

    const checkValidInvite = async () => {

        const inviteRecord = await databases.getDocument(database, 'invites', inviteId);

        if (!inviteRecord) {
            return setError('Provided invite link does not exist.')
        }

        setInvite(inviteRecord)
        setError("")

    }

    useEffect(() => {
        checkValidInvite()
    }, []);

    const joinGroup = async () => {

        if(!invite?.groupId) return

        const constructedBody = JSON.stringify({
            dbID: loggedInUser.$id,
            groupId: invite.groupId,
            inviteId: inviteId
        })

        const response = await fetch(`/api/joinGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: constructedBody
        });

        const resBody = await response.json()

        if (!response.ok) {
            fireToast('error', 'There has been an error while joining group...', 'top-right', 2000)
            throw new Error('Failed to join group');
        }

        fireToast('success', 'Successfully joined the group!', 'top-right', 2000)

        let newLoggedInUser = {...loggedInUser}
        newLoggedInUser.groups = [...loggedInUser.groups, resBody.result]
        setLoggedInUser(newLoggedInUser)
        router.push(`/group/${invite.groupId}`)

    }

    return (
        <div className='h-full w-full bg-light flex justify-center items-center'>
            <div className='h-3/10 w-1/3 bg-gray-dark border-blue border rounded-md flex flex-col justify-center items-center p-1/5 gap-1/10'>
                {error === 'loading' ? (
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                ) : (
                    error ? (
                        <h3 className='text-white text-2'>{error}</h3>
                    ) : (
                        invite && invite.groupId && (
                            <>
                                {/*<ProfileIcon imageUrl={`/images/groups/${invite.group.avatarPath}`} />*/}
                                <h3 className='text-white text-2'>Invited to a group
                                    {/*<span className='text-blue'>{invite.group.title}</span>*/}
                                </h3>
                                <PrimaryButton title={'Join group'} onClickFn={joinGroup} customClass={'w-1/4 h-1/5'} />
                            </>
                        )
                    )
                )}
            </div>
        </div>
    );

};

export default Group;
