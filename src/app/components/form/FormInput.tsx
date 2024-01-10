import React, { FC, ReactNode, RefObject, forwardRef, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";

interface FormInputProps {
    title: string;
    icon: ReactNode;
    min?: number,
    max?: number,
    inputType?: string;
    required?: boolean;
    valueProp?: string;
    onChangeFn?: (event: ChangeEvent<HTMLInputElement>) => void;
    ref?: RefObject<HTMLInputElement>;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ title, icon, min = undefined, max = undefined, inputType, required, valueProp = "", onChangeFn = () => {} }, ref) => {
        return (
            <div className="relative text-lightly text-2 w-full">
                {(!ref) ? (
                    <input
                        required={required ?? false}
                        type={inputType ?? 'text'}
                        value={valueProp}
                        onChange={onChangeFn}
                        className="pl-[3dvw] pr-[1dvw] py-[1dvh] border rounded-md border-none bg-gray w-full focus:outline-none text-white"
                        placeholder={title}
                        min={min}
                        max={max}
                    />
                ) : (
                    <input
                        required={required ?? false}
                        type={inputType ?? 'text'}
                        ref={ref}
                        className="pl-[3dvw] pr-[1dvw] py-[1dvh] border rounded-md border-none bg-gray w-full focus:outline-none text-white"
                        placeholder={title}
                        min={min}
                        max={max}
                    />
                )}
                <div className="absolute inset-y-0 left-0 pl-[1dvw] flex items-center pointer-events-none bg-gray rounded-lg">
                    {icon}
                </div>
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';
export default FormInput;
