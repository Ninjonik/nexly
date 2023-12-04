"use client"

import {
    faLock,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import React, {FC, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";



interface LoginProps {
}

const Login: FC<LoginProps> = ({}) => {

    const username = useRef<String>('')
    const password = useRef<String>('')
    const button = useRef<HTMLButtonElement>(null)

    return (
        <main
            className='h-screen w-screen flex justify-center items-center bg-no-repeat bg-center bg-cover bg-[url("/banners/logoBanner.jpg")]'>
            <form className='bg-light flex flex-col rounded-md items-center gap-[2dvh] w-1/3 h-1/3 py-8 px-16'>
                <h1 className='text-4 text-white'>Welcome Back!</h1>
                <FormInput title={'Username'} icon={<FontAwesomeIcon icon={faUser}/>} ref={username} />
                <FormInput title={'Password'} icon={<FontAwesomeIcon icon={faLock}/>} inputType={'password'} ref={password} />
                <PrimaryButton title={'Log In'}/>
            </form>
        </main>
    )

};

export default Login;