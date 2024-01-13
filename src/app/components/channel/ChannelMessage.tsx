import React, {FC, useEffect, useState} from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import MessageInterface from "@/app/utils/interfaces/MessageInterface";
import convertTimestamp from "@/app/utils/convertTimestamp";
import { isValidImageUrl } from "@/app/utils/isValidImageUrl";

interface ChannelMessageProps {
    typing?: boolean,
    message: MessageInterface,
    localUser?: boolean
}

const MessageHeader: FC<{ username?: string, updatedAt: string }> = ({ username, updatedAt }) => (
    <div className='flex flex-row gap-[0.5dvw] items-center'>
        <h4 className='font-bold text-xl'>{username}</h4>
        <span className='text-lightly text-md'>{convertTimestamp(updatedAt)}</span>
    </div>
);

const MessageBody: FC<{ isImage: boolean | "string", message: string, localUser?: boolean }> = ({ isImage, message, localUser }) => {
    const messageClass = localUser ? 'bg-blue rounded-b-lg rounded-l-lg' : 'bg-lightly rounded-b-lg rounded-r-lg';
    return (
        <span className={!isImage ? `w-full text-md break-words p-2 ${messageClass}` : 'max-w-full'} style={{ whiteSpace: 'pre-line' }}>
            {isImage === true ? <img src={message} alt="Message content" /> :
                isImage ? <img src={isImage} alt="Message attachment" /> : <span>{message}</span>
            }
        </span>
    );
};

const ChannelMessage: FC<ChannelMessageProps> = ({ typing, message, localUser }) => {
    const [isImage, setIsImage] = useState<boolean | "string">(false);
    const [alignmentClass, setAlignmentClass] = useState('');
    const [profileIconAlignment, setProfileIconAlignment] = useState('');

    useEffect(() => {
        setIsImage(isValidImageUrl(message));
        setAlignmentClass(localUser ? 'self-end items-end' : '');
        setProfileIconAlignment(localUser ? 'self-start' : '');
        console.log(localUser, profileIconAlignment)
    }, [message]);

    return (
        <div className={`max-w-8/10 flex flex-row gap-[0.5dvw] items-center ${alignmentClass}`}>
            {localUser && <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} customClass={profileIconAlignment} />}
            <div className={`max-w-9/10 flex flex-col justify-center ${localUser ? 'items-end' : ''}`}>
                <MessageHeader username={message.author?.username} updatedAt={message.$updatedAt} />
                <MessageBody isImage={isImage} message={message.message} localUser={localUser} />
            </div>
            {!localUser && <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} customClass={profileIconAlignment} />}
        </div>
    );
};

export default ChannelMessage;
