import React, { FC, RefObject, ButtonHTMLAttributes, useRef } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    height?: string;
    ref?: RefObject<HTMLButtonElement>;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ title, height, ref, type, ...rest }) => {
    const defaultRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            type={type ?? 'button'}
            ref={ref ?? defaultRef}
            className={`bg-blue text-white flex justify-center items-center text-center w-full h-${height ?? 'full'} rounded-md hover:rounded-lg hover:bg-blue-hover transition-all `}
            {...rest}
        >
            {title}
        </button>
    );
};

export default PrimaryButton;
