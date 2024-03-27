import FormInput from "@/app/components/form/FormInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faFileLines, faUser} from "@fortawesome/free-regular-svg-icons";
import AnchorLink from "@/app/components/AnchorLink";
import FormModal from "@/app/components/form/FormModal";
import {faArrowUp91, faPhone} from "@fortawesome/free-solid-svg-icons";
import UserInterface from "@/app/utils/interfaces/UserInterface";
import ProfileIcon from "@/app/components/ProfileIcon";
import SmallIcon from "@/app/components/SmallIcon";
import React, {useRef, useState} from "react";
import GroupInterface from "@/app/utils/interfaces/GroupInterface";
import {Md5} from "ts-md5";
import {database, databases} from "@/app/appwrite";
import {Permission, Query, Role} from "appwrite";
import fireToast from "@/app/utils/toast";
import {useUserContext} from "@/app/UserContext";

interface ChannelAsideProps {
    usersShown: boolean,
    group: GroupInterface,
    activeGroup: string
}

export const ChannelAside = ({usersShown, group, activeGroup}: ChannelAsideProps) => {
    const { loggedInUser, setLoggedInUser } = useUserContext();

    const [dialog, setDialog] = useState<boolean>(false)
    const [inviteLink, setInviteLink] = useState<string>("")
    const [dateLimit, setDateLimit] = useState<string>("7")
    const limitRef = useRef<HTMLInputElement>(null)

    const generateInviteLink = async () => {

        let amountLimit: number = -1
        if (limitRef?.current?.value) amountLimit = parseInt(limitRef.current.value)

        let data = {
            inviter: loggedInUser.$id,
            groupId: activeGroup,
            validAmount: amountLimit,
            validDate: dateLimit !== "0" ? new Date(Date.now() + parseInt(dateLimit) * 24 * 60 * 60 * 1000) : undefined,
        };



        let codeUsed = true
        let generatedId: string = ""
        while (codeUsed) {
            generatedId = Md5.hashStr(`${activeGroup}${Date.now()}${loggedInUser.$id}`).slice(0, 6)
            const result = await databases.listDocuments(
                database,
                'invites',
                [Query.equal('$id', generatedId)]
            )
            if(result.documents.length === 0) codeUsed = false
        }

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

    return (
        <aside
            className={`h-full bg-light border-t-2 border-blue flex flex-col gap-[2dvw] transition-all ${usersShown ? 'w-full lg:w-3/10 p-[2dvw]' : 'w-0'}`}>
            {usersShown && (
                <>
                    <h3 className='text-xl font-bold'>{group.title}</h3>

                    <FormInput icon={<FontAwesomeIcon icon={faFileLines} className="text-gray-400"/>}
                               title={'Description'}/>


                    <div className='flex flex-col gap-[0.5dvw] text-2'>
                        <div className='flex flex-row justify-between'>
                            <div className=""><FontAwesomeIcon icon={faUser} className="text-blue pr-[0.5dvw]"/> Members
                                ({group.users.length})
                            </div>
                            <AnchorLink size={'2'} description={'Add'} color={'blue'}
                                        onClickFn={() => setDialog(true)}/>
                        </div>

                        <FormModal title={"Add people"} modalState={dialog} setModalState={setDialog}
                                   onSubmit={generateInviteLink} submitText={'Generate'}>

                            {inviteLink && (
                                <span className='text-white break-normal'>Generated invite link: <br/>
                                            <AnchorLink target={'_blank'}
                                                        description={`${process.env.NEXT_PUBLIC_HOSTNAME}/invite/${inviteLink}`}
                                                        href={`${process.env.NEXT_PUBLIC_HOSTNAME}/invite/${inviteLink}`}/>
                                        </span>
                            )}

                            <div>
                                <label
                                    htmlFor="customRange1"
                                    className="mb-2 inline-block text-white"
                                >{dateLimit === "0" ? ('No expiration') : (dateLimit + " Days till expiration")}</label
                                >
                                <input
                                    type="range" min={0} max={7}
                                    className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-600"
                                    id="customRange1" onChange={(e) => setDateLimit(e.target.value)} value={dateLimit}
                                    required={true}/>
                            </div>

                            <FormInput title={'Maximum amount of uses'} icon={<FontAwesomeIcon icon={faArrowUp91}/>}
                                       inputType={'number'} ref={limitRef} required={true} min={0} max={100}/>

                        </FormModal>

                        {group.users.map((user: UserInterface) => (
                            <div className='flex justify-between items-center' key={user.$id}>
                                <div className='flex flex-row gap-[0.5dvw] items-center'>
                                    <ProfileIcon imageUrl={`/images/users/${user.avatarPath}`} status={'online'}/>
                                    <h3 className='font-bold'>{user.username}</h3>
                                </div>
                                <div className='flex flex-row gap-[0.5dvw]'>
                                    <SmallIcon icon={<FontAwesomeIcon icon={faPhone}/>}/>
                                    <SmallIcon icon={<FontAwesomeIcon icon={faCommentDots}/>}/>
                                </div>
                            </div>
                        ))}

                        {/*<AnchorLink size={'1'} description={'Show More'} color={'blue'} className={'text-center'} />*/}
                    </div>
                </>
            )}
        </aside>
    );
};