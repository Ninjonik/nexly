import React, { FC, ReactNode, forwardRef, ChangeEvent, useState, useRef } from 'react';
import { Picker } from 'emoji-mart'

interface FormTextAreaProps {
    title: string;
    icon: ReactNode;
    inputType?: string;
    required?: boolean;
    valueProp?: string;
    onChangeFn?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
    ({ title, icon, inputType, required, valueProp = "", onChangeFn = () => {} }, ref) => {
        const [textareaHeight, setTextareaHeight] = useState<number>(50);
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {

            onChangeFn(event);

            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                let heightValue: number
                if(event.target.scrollHeight > window.innerHeight / 2){
                    heightValue = window.innerHeight / 2
                } else {
                    heightValue = event.target.scrollHeight
                }
                textareaRef.current.style.height = `${heightValue}px`;
                setTextareaHeight(event.target.scrollHeight);
            }
        };

        return (
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
                <div className="h-full w-0.5/10 flex items-center justify-center pointer-events-none rounded-lg">

                </div>
            </div>
        );
    }
);

export default FormTextArea;
