"use client"

import React, {FC, RefObject, useRef} from 'react';

interface PrimaryButtonProps {
    title: string,
    height?: string,
    ref?: RefObject<HTMLButtonElement>,
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ title, height, ref }) => {

    const defaultRef = useRef<HTMLButtonElement>(null);

    return (
        <button ref={ref ?? defaultRef} className={`bg-blue text-white flex justify-center items-center text-center w-full h-${height ?? 'full'} rounded-md hover:rounded-lg hover:bg-blue-hover transition-all `} >
            {title}
        </button>
    )

};

export default PrimaryButton;
