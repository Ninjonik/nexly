"use client"

import React, { FC, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import register from "@/app/utils/register";
import { useRouter } from 'next/navigation'

interface RegisterProps {}

const Register: FC<RegisterProps> = ({  }) => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <main className='h-screen w-screen flex justify-center items-center bg-no-repeat bg-center bg-cover bg-[url("/banners/logoBanner.jpg")]'>
            <form
                className='bg-light flex flex-col rounded-md items-center gap-[2dvh] w-1/3 h-1/2 py-8 px-16'
            >
                <h1 className='text-4 text-white'>Welcome to Nexly!</h1>
                <FormInput title={'Username'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={name} onChangeFn={(e) => setName(e.target.value)} required={true} />
                <FormInput title={'Email'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={email} onChangeFn={(e) => setEmail(e.target.value)} required={true} />
                <FormInput title={'Password'} icon={<FontAwesomeIcon icon={faLock} />} inputType={'password'} valueProp={password} onChangeFn={(e) => setPassword(e.target.value)} required={true} />
                {/*<PrimaryButton title={'Log In'} type='button' onClickFn={() => login(email, password)} />*/}
                <PrimaryButton title={'Register'} type='button' onClickFn={handleRegister} />
                <a className={'text-blue hover:text-blue-hover transition-all ease-in hover:cursor-pointer'} href={'/'}>Already have an account? Log in now!</a>
            </form>
        </main>
    );
};

export default Register;
