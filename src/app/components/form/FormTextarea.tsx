import React, {FC, ReactNode, forwardRef, ChangeEvent, useState, useRef, useEffect, RefObject} from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFaceSmileWink, faImages, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import GifPicker from "gif-picker-react";
import {storage} from "@/app/appwrite";
import {ID, Permission, Role} from "appwrite";
import Image from "next/image";
import fireToast from "@/app/utils/toast";

interface FormTextAreaProps {
    title: string;
    icon: React.ReactNode;
    inputType?: string;
    required?: boolean;
    valueProp?: string;
    onChangeFn?: (value: string) => void;
    handlePasteFn?: (value: File) => void;
    gifValue: string;
    setGifValue: (value: string) => void;
    attachments: File[];
    setAttachments: (value: File[]) => void;
    submitting: boolean;
    setSubmitting: (value: boolean) => void;
    ref?: RefObject<HTMLTextAreaElement>;
}

const textareaRef = useRef<HTMLTextAreaElement>(null);

const FormTextArea: FC<FormTextAreaProps> = ({
                                                 title,
                                                 icon,
                                                 inputType,
                                                 required,
                                                 valueProp = '',
                                                 onChangeFn = () => {},
                                                 handlePasteFn = () => {},
                                                 gifValue,
                                                 setGifValue,
                                                 setAttachments,
                                                 submitting,
                                                 setSubmitting,
                                                 attachments,
                                                 ref = textareaRef
                                             }) => {

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            const heightValue = Math.min(event.target.scrollHeight, window.innerHeight / 5 * 2);
            ref.current.style.height = `${heightValue}px`;
        }

        onChangeFn(event.target.value);
    };

    useEffect(() => {
        if (ref.current) {
            const newHeight = ref.current.scrollHeight;
            ref.current.style.height = `${newHeight}px`;
        }
    }, [valueProp]);

    const handlePaste = async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const items = event.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                event.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    await handlePasteFn(file)
                }
                return;
            }
        }
    };

    const deleteFile = (index: number) => {
        const newFiles = [...attachments];
        newFiles.splice(index, 1);
        setAttachments(newFiles);
    }

    useEffect(() => {
        if(attachments.length > 5) {
            setAttachments([])
            fireToast('error', 'You can only upload maximum of 5 files at once!')
        }
    }, [attachments]);

    const tenorKey = process.env.NEXT_PUBLIC_TENOR_KEY || 'tenorapikeynotentered';

    return (
        <div className="h-full w-full flex flex-col rounded-lg bg-gray py-[1dvw] px-[2dvw] lg:px-0">
            <div className='flex flex-row px-[1dvw] text-center items-center gap-[0.5dvw] max-w-full'>
                {attachments.map((file: File, index: number) => (
                    <div className='flex flex-col w-1/5 h-full relative' key={index}>
                        <button title='Remove' className={`w-[1.5dvw] h-[1.5dvw] top-[-0.5dvw] right-[-0.5dvw] hover:border-blue hover:text-red-600 transition-all ease-in hover:cursor-pointer absolute border-2 border-light rounded-full bg-white text-red-500 text-1.5 flex justify-center items-center text-center`} onClick={() => deleteFile(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <div className='h-8/10 w-full'>
                            {(file.type === 'image/gif' || file.type === 'image/webp' || file.type === 'image/png' || file.type === 'image/jpg') && (
                            <Image className='rounded-md ease-in w-full h-[7dvw] border-2 border-light'
                                   alt={'World War Community'} height={0} width={0}
                                   src={URL.createObjectURL(file)}/>
                            )}
                        </div>

                        <div className='h-full text-2'>{(file.name.length > 15) ? file.name.slice(0, 15) + "..." : file.name}</div>
                    </div>
                ))}
            </div>

            <div className="relative text-lightly text-2 h-full w-full flex flex-row bg-gray rounded-lg overflow-x-hidden">
                <div className='h-full w-0.5/10'>
                    <label htmlFor={'myInput'} className="h-full w-0.5/10 flex items-center justify-center pointer-events-none rounded-lg absolute hover:cursor-pointer">
                        {icon}
                    </label>
                    <input
                        id="myInput"
                        type="file"
                        multiple
                        className="opacity-0 h-full w-full"
                        onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                    />
                </div>

                <div className="flex flex-col grow-wrap w-full">
                    <textarea
                        required={required || false}
                        ref={ref}
                        value={valueProp}
                        rows={1}
                        onChange={handleTextareaChange}
                        className="bg-gray rounded-md border-none w-full focus:outline-none text-white h-auto resize-none overflow-scroll no-scrollbar"
                        placeholder={title}
                        onPaste={handlePaste}
                        disabled={submitting}
                        autoFocus
                    />
                    <div className="replicated-value overflow-hidden h-0" data-replicated-value={valueProp}></div>
                </div>

                <div className='h-full w-0.5/10'>
                    <Tippy content={
                        <GifPicker tenorApiKey={tenorKey} onGifClick={(e: {url: string}) => setGifValue(e.url) } />
                    } trigger={'click'} interactive={true} appendTo={document.body} >
                        <button type={'button'} className='h-full w-0.5/10 flex items-center justify-center rounded-lg'>
                            <FontAwesomeIcon icon={faImages} />
                        </button>
                    </Tippy>
                </div>

                <div className='h-full w-0.5/10'>
                    <Tippy content={
                        <Picker data={data} onEmojiSelect={(e: any) => onChangeFn(valueProp + " " + e.native)} />
                    } trigger={'click'} interactive={true} appendTo={document.body}>
                        <button type={'button'} className='h-full w-full flex items-center justify-center rounded-lg'>
                            <FontAwesomeIcon icon={faFaceSmileWink} />
                        </button>
                    </Tippy>
                </div>
                
            </div>
        </div>
    );
}


export default FormTextArea;
