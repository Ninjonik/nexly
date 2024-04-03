import React, {FC, useEffect, useState} from 'react';
import ProfileIcon from "@/app/components/ProfileIcon";
import MessageInterface from "@/app/utils/interfaces/MessageInterface";
import { isValidImageUrl } from "@/app/utils/isValidImageUrl";
import FormModal from "@/app/components/form/FormModal";
import {MessageAttachment} from "@/app/components/channel/MessageAttachment";
import formatTimestampToTime from "@/app/utils/convertTimestamp";
import formatTimestampToDate from "@/app/utils/formatTimestampToDate";

interface ChannelMessageProps {
    typing?: boolean,
    message: MessageInterface,
    localUser?: boolean
}

const MessageHeader: FC<{ username?: string, updatedAt: string }> = ({ username, updatedAt }) => (
    <div className='flex flex-row gap-[1dvw] lg:gap-[0.5dvw] items-center'>
        <h4 className='font-bold text-3xl lg:text-xl'>{username}</h4>
        <span className='text-lightly text-2xl lg:text-md'>{formatTimestampToDate(updatedAt)} {formatTimestampToTime(updatedAt)}</span>
    </div>
);

const MessageBody: FC<{ isImage: boolean, message: string, attachments: string[], localUser?: boolean }> = ({ isImage, message, attachments, localUser }) => {
    const messageClass = localUser ? 'bg-blue rounded-b-lg rounded-l-lg' : 'bg-lightly rounded-b-lg rounded-r-lg';
    const [fullscreenImage, setFullscreenImage] = useState<string>("")
    const [modal, setModal] = useState<boolean>(false)

    const openImage = (imageUrl: string | undefined) => {
        if(imageUrl){
            setFullscreenImage(imageUrl)
            setModal(true)
        }
    }

    const closeImage = () => {
        setModal(false)
        setFullscreenImage('')
    }

    return (
      <>
        <FormModal
          modalState={modal}
          setModalState={setModal}
          title={"Image Preview"}
          customCloseFn={closeImage}
        >
          {fullscreenImage && (
            <img
              className="rounded-lg max-w-8/10 max-h-8/10 self-center pb-[1dvw]"
              src={fullscreenImage}
              alt="Attachment"
            />
          )}
        </FormModal>

        <span
          className={!isImage ? `w-full text-md break-words p-2` : "max-w-full"}
          style={{ whiteSpace: "pre-line" }}
        >
          {isImage === true ? (
            <img
              className="rounded-lg max-h-35"
              src={message}
              alt="Message content"
            />
          ) : (
            <div className="flex flex-col gap-[0.5dvw]">
              {(message && message !== " ") && (
                <span
                  className={`p-[1dvw] lg:p-[0.4dvw] text-1.5 ${messageClass}`}
                >
                  {message}
                </span>
              )}
              {attachments.length > 0 &&
                attachments.map((attachment, index) => (
                  <MessageAttachment
                    attachmentId={attachment}
                    openImage={openImage}
                    key={index}
                  />
                ))}
            </div>
          )}
        </span>
      </>
    );
};

const ChannelMessage: FC<ChannelMessageProps> = ({ typing, message, localUser }) => {

    const [isImage, setIsImage] = useState<boolean>(false);
    const [alignmentClass, setAlignmentClass] = useState('');
    const [profileIconAlignment, setProfileIconAlignment] = useState('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsImage(isValidImageUrl(message.message));
        setAlignmentClass(localUser ? 'self-end' : ' ');
        setProfileIconAlignment(localUser ? 'self-start' : ' ');
        setLoading(false)
    }, [message]);

    if(!profileIconAlignment){
        return "";
    }

    return (
        <div className={`max-w-8/10 flex flex-row gap-[1dvw] lg:gap-[0.5dvw] ${alignmentClass}`}>
            {!localUser && <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} customClass={profileIconAlignment} status={message.author.status} />}
            <div className={`max-w-9/10 flex flex-col justify-center ${localUser ? 'items-end' : ''}`}>
                <MessageHeader username={message.author?.username} updatedAt={message.$updatedAt} />
                <MessageBody isImage={isImage} message={message.message} localUser={localUser} attachments={message.attachments} />
            </div>
            {localUser && <ProfileIcon imageUrl={`/images/users/${message.author?.avatarPath}`} customClass={profileIconAlignment} status={message.author.status} />}
        </div>
    );
};

export default ChannelMessage;
