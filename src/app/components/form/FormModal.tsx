"use client"

import FormInput from "@/app/components/form/FormInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeading, faRightLong, faXmark} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import React, {ChangeEvent, FC, ReactNode, RefObject, useRef, useState} from "react";
import SmallIcon from "@/app/components/SmallIcon";

interface FormModalProps {
    title?: string;
    onSubmit?: () => void;
    submitText?: string;
    modalState: boolean;
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
    children?: ReactNode;
}

export const FormModal: FC<FormModalProps> = ({children, submitText = "Submit", onSubmit = null, title = "", modalState, setModalState}) => {

    return (
        <>
            {modalState && (
                <div className="absolute inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            )}

            <dialog className={`flex flex-col mt-0.25/10 w-3/10 max-h-5/10 bg-gray-dark border-blue border-2 rounded-md z-50 gap-[0.5dvw] ${!modalState && 'hidden'}`}>

                <div className={'absolute text-lightly right-[0.2dvw] top-0 flex justify-center items-center'}>
                    <SmallIcon icon={<FontAwesomeIcon icon={faXmark} />} size={'2'} onClickFn={() => setModalState(false)} />
                </div>


                <div className='w-full h-2/10 pt-[1dvw] px-[0.5dvw]'>
                    <h2 className='text-white pl-[0.5dvw] text-2 font-bold'><FontAwesomeIcon icon={faRightLong} /> {title}</h2>
                </div>

                <form method={"dialog"} className='flex flex-col gap-[0.5dvw] pt-[1dvw]' onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }}>
                    <div className='w-full h-full flex flex-col gap-[0.5dvw] px-[0.5dvw]'>
                        {children}
                    </div>

                    {onSubmit && (
                        <div className='w-full h-2/10 bg-light rounded-md flex justify-end items-center py-[1dvw] px-[2dvw]'>
                            <PrimaryButton title={submitText} width={'3/10'} type={"submit"} />
                        </div>
                    )}


                </form>


            </dialog>
        </>
    );
};

export default FormModal;