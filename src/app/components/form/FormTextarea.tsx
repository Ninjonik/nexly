import React, { FC, ReactNode, forwardRef, ChangeEvent, useState, useRef, useEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink, faImages } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import GifPicker from "gif-picker-react";

interface FormTextAreaProps {
    title: string;
    icon: React.ReactNode;
    inputType?: string;
    required?: boolean;
    valueProp?: string;
    onChangeFn?: (value: string) => void;
    gifValue: string;
    setGifValue: (value: string) => void;
}

const FormTextArea: FC<FormTextAreaProps> = ({
                                                 title,
                                                 icon,
                                                 inputType,
                                                 required,
                                                 valueProp = '',
                                                 onChangeFn = () => {},
                                                 gifValue,
                                                 setGifValue,
                                             }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const heightValue = Math.min(event.target.scrollHeight, window.innerHeight / 5 * 2);
            textareaRef.current.style.height = `${heightValue}px`;
        }

        onChangeFn(event.target.value);
    };

    // Use useEffect to recalculate height when the component mounts or when the content changes
    useEffect(() => {
        if (textareaRef.current) {
            const newHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [valueProp]);

    const tenorKey = process.env.NEXT_PUBLIC_TENOR_KEY || 'tenorapikeynotentered';

    return (
        <div className="h-full w-full flex flex-col">
            <div className="relative text-lightly text-2 h-full w-full flex flex-row bg-gray rounded-lg overflow-y-scroll">
                <div className="h-full w-0.5/10 flex items-center justify-center pointer-events-none rounded-lg">
                    {icon}
                </div>
                <div className="grow-wrap w-full">
                      <textarea
                          required={required || false}
                          ref={textareaRef}
                          value={valueProp}
                          onChange={handleTextareaChange}
                          className="border bg-gray rounded-md border-none w-full focus:outline-none text-white h-full resize-none overflow-hidden"
                          placeholder={title}
                      />
                    <div className="replicated-value overflow-hidden" data-replicated-value={valueProp}></div>
                </div>
                <Tippy content={
                    <GifPicker tenorApiKey={tenorKey} onGifClick={(e: {url: string}) => setGifValue(e.url) } />
                } trigger={'click'} interactive={true}>
                    <button type={'button'} className='h-full w-0.5/10 flex items-center justify-center rounded-lg'>
                        <FontAwesomeIcon icon={faImages} />
                    </button>
                </Tippy>
                <Tippy content={
                    <Picker data={data} onEmojiSelect={(e: any) => onChangeFn(valueProp + " " + e.native)} />
                } trigger={'click'} interactive={true}>
                    <button type={'button'} className='h-full w-0.5/10 flex items-center justify-center rounded-lg'>
                        <FontAwesomeIcon icon={faFaceSmileWink} />
                    </button>
                </Tippy>
                </div>
            </div>
    );
}


export default FormTextArea;
