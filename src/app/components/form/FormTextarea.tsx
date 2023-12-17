import React, { FC, ReactNode, forwardRef, ChangeEvent, useState, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink, faImages } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import GifPicker from "gif-picker-react";

interface FormTextAreaProps {
    title: string;
    icon: ReactNode;
    inputType?: string;
    required?: boolean;
    valueProp?: string;
    onChangeFn?: (value: string) => void;
    gifValue: string;
    setGifValue: (value: string) => void;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
    ({ title, icon, inputType, required, valueProp = "", onChangeFn = () => {}, gifValue, setGifValue }) => {
        const [textareaHeight, setTextareaHeight] = useState<number>(50);
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                let heightValue: number
                if(event.target.scrollHeight > window.innerHeight / 5 * 2){
                    heightValue = window.innerHeight / 2
                } else {
                    heightValue = event.target.scrollHeight
                }
                textareaRef.current.style.height = `${heightValue}px`;
                setTextareaHeight(event.target.scrollHeight);
            }

            onChangeFn(event.target.value);
        };

        const tenorKey = process.env.NEXT_PUBLIC_TENOR_KEY ?? 'tenorapikeynotentered'

        return (
            <div className='h-full w-full flex flex-col'>
                <div className="relative text-lightly text-2 h-full w-full flex flex-row bg-gray rounded-lg">
                    <div className="h-full w-0.5/10 flex items-center justify-center pointer-events-none rounded-lg">
                        {icon}
                    </div>
                    <textarea
                        required={required ?? false}
                        ref={textareaRef}
                        value={valueProp}
                        onChange={handleTextareaChange}
                        style={{ height: textareaHeight }}
                        className="pr-[1dvw] py-[0.5dvh] border bg-gray rounded-md border-none w-full focus:outline-none text-white h-full resize-none"
                        placeholder={title}
                        rows={1}
                    />
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
);

export default FormTextArea;
