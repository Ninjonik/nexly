"use client"

import React, { FC, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import login from "@/app/utils/login";

import User from "@/app/utils/interfaces/User";
import register from "@/app/utils/register";
import {account} from "@/app/appwrite";

interface LoginProps {
    loggedInUser: User | null,
    setLoggedInUser:  React.Dispatch<React.SetStateAction<User | null>>
}

const Login: FC<LoginProps> = ({ loggedInUser, setLoggedInUser }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [page, setPage] = useState<boolean>(false); // false = login; true = register;

    const handleSubmit = async (submitType: boolean) => {

        let result
        if(submitType){
            try {
                result = await register(name, email, password)
                if(!result){
                    return 'error'
                    // TODO: handle registration error
                }
            } catch (e) {
                return 'error'
            }
        } else {
            try {
                result = await login(email, password)
            } catch (e) {
                return 'error'
            }
        }

        setLoggedInUser(result)

    }

    return (
        <main className='h-screen w-screen flex justify-center items-center bg-no-repeat bg-center bg-cover bg-[url("/banners/logoBanner.jpg")]'>
            <form
                className='bg-light flex flex-col rounded-md justify-center gap-[2dvh] w-1/3 py-8 px-16'
            >
                <div className='flex flex-col gap-[2dvh]'>
                    <h1 className='text-4 text-white'>{page ? "Welcome to Nexly!" : "Welcome Back!"}</h1>
                    {page && (
                        <FormInput title={'Username'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={name} onChangeFn={(e) => setName(e.target.value)} required={true} />
                    )}
                    <FormInput title={'Email'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={email} onChangeFn={(e) => setEmail(e.target.value)} required={true} />
                    <FormInput title={'Password'} icon={<FontAwesomeIcon icon={faLock} />} inputType={'password'} valueProp={password} onChangeFn={(e) => setPassword(e.target.value)} required={true} />
                </div>
                {page ? (
                    <div className='py-2 flex flex-col gap-[1dvh] h-[10dvh]'>
                        <PrimaryButton title={'Register'} type='button' onClickFn={() => handleSubmit(true)} />
                        <a className={'text-blue hover:text-blue-hover transition-all ease-in hover:cursor-pointer'} onClick={() => setPage(false)}>Already have an account? Log in now!</a>
                    </div>

                ) : (
                    <div className='py-2 flex flex-col gap-[1dvh] h-[10dvh]'>
                        <PrimaryButton title={'Log In'} type='button' onClickFn={() => handleSubmit(false)} />
                        <a className={'text-blue hover:text-blue-hover transition-all ease-in hover:cursor-pointer'} onClick={() => setPage(true)}>Not registered yet? Create a free account now!</a>
                    </div>
                )}
            </form>
        </main>
    );
};

export default Login;
