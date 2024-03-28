import getFilePreview from "@/app/utils/getFilePreview";
import getFileDownload from "@/app/utils/getFileDownload";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import React, {FC, useEffect, useState} from "react";
import {storage} from "@/app/appwrite";
import AttachmentInterface from "@/app/utils/interfaces/AttachmentInterface";

interface MessageAttachmentProps {
    attachmentId: string,
    openImage: (filePreview: string | undefined) => void,
}

export const MessageAttachment: FC<MessageAttachmentProps> = ({attachmentId, openImage}) => {

    const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
    const [attachment, setAttachment] = useState<AttachmentInterface>();

    const fetchData = async () => {
        const filePreview = getFilePreview(attachmentId)
        setFilePreview(filePreview)

        const attachment = await storage.getFile('messageAttachments', attachmentId)
        if(Object.keys(attachment).length > 0) setAttachment(attachment)

    }

    useEffect(() => {
        fetchData()
    }, [attachmentId]);

    return (
        <>
            {!filePreview || !attachment ? (
                <div
                    className="hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            ) : (
                <div key={attachmentId}>
                    <button type="submit" className='relative flex flex-row gap-[0.5dvw] w-full'>

                        {attachment?.mimeType?.startsWith('image') ? (
                            <img className='rounded-lg max-h-35 hover:cursor-pointer' src={getFilePreview(attachmentId)} alt="Attachment" onClick={() => openImage(filePreview)} />
                        ) : (
                            <div className='flex flex-row gap-[0.5dvw] w-full'>
                                <span className={`p-[0.4dvw] pr-[1dvw] text-1.5 bg-blue rounded-b-lg rounded-l-lg w-full`}>{attachment.name}</span>
                            </div>
                        )}
                        <a href={getFileDownload(attachmentId)} download title='Download' className={`w-[1.5dvw] h-[1.5dvw] bottom-[-0.5dvw] right-[-0.5dvw] hover:border-blue hover:text-blue-hover transition-all ease-in hover:cursor-pointer absolute border-2 border-light rounded-full bg-white text-blue text-1.5 flex justify-center items-center text-center`}>
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                    </button>

                </div>
            )}
        </>

    );
};