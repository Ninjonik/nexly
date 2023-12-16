import React, { FC } from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import MessageInterface from "@/app/utils/interfaces/MessageInterface";
import convertTimestamp from "@/app/utils/convertTimestamp";
import ImagePreview from "@/app/components/client/ImagePreview";
import {isValidImageUrl} from "@/app/utils/isValidImageUrl";
import EmojiConversion from "@/app/components/client/EmojiConversion";

interface ChannelMessageProps {
    typing?: boolean,
    message: MessageInterface,
    localUser?: boolean
}

const ChannelMessage: FC<ChannelMessageProps> = ({ typing, message, localUser }) => {

    const isImage = isValidImageUrl(message.message)
    console.log(isImage)

    return(
        <>
            {localUser ? (
                <div className='w-8/10 flex flex-row gap-[0.5dvw] items-center self-end'>
                    <div className='w-9/10 flex flex-col justify-center items-end'>
                        <div className='flex flex-row gap-[0.5dvw] items-center'>
                            <h4 className='font-bold text-xl'>{message.author?.username}</h4>
                            <span className='text-lightly text-md'>{convertTimestamp(message.$updatedAt)}</span>
                        </div>
                        <span
                            className={!isImage ? 'w-full text-md break-words bg-blue p-2 rounded-b-lg rounded-l-lg' : 'max-w-full'}
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {isImage ? <img src={message.message} /> : <span>{message.message}</span>}
                        </span>
                    </div>
                    <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} customClass={'self-start'}/>
                </div>
            ) : (
                <div className='w-8/10 flex flex-row gap-[0.5dvw] items-center'>
                    <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} customClass={'self-start'}/>
                    <div className='w-9/10 flex flex-col justify-center'>
                        <div className='flex flex-row gap-[0.5dvw] items-center'>
                            <h4 className='font-bold text-xl'>{message.author?.username}</h4>
                            <span className='text-lightly text-md'>{convertTimestamp(message.$updatedAt)}</span>
                        </div>
                        <span
                            className='w-full text-md break-words bg-gray p-2 rounded-b-lg rounded-r-lg'
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {isValidImageUrl(message.message) ? <img src={message.message} /> : <span>message.message</span>}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
};

export default ChannelMessage;
