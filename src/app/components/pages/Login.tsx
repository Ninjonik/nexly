"use client"

import React, { FC, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import login from "@/app/utils/login";

import User from "@/app/utils/interfaces/User";

interface LoginProps {
    loggedInUser: User | null,
    setLoggedInUser:  React.Dispatch<React.SetStateAction<User | null>>
}

const Login: FC<LoginProps> = ({ loggedInUser, setLoggedInUser }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // if (loggedInUser) {
    //     return (
    //         <div>
    //             <p>Logged in as {loggedInUser.name}</p>
    //             <button type="button" onClick={async () => setLoggedInUser(await logout())}>
    //                 Logout
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <main className='h-screen w-screen flex justify-center items-center bg-no-repeat bg-center bg-cover bg-[url("/banners/logoBanner.jpg")]'>
            <form
                className='bg-light flex flex-col rounded-md items-center gap-[2dvh] w-1/3 h-2/5 py-8 px-16'
            >
                <h1 className='text-4 text-white'>Welcome Back!</h1>
                <FormInput title={'Email'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={email} onChangeFn={(e) => setEmail(e.target.value)} required={true} />
                <FormInput title={'Password'} icon={<FontAwesomeIcon icon={faLock} />} inputType={'password'} valueProp={password} onChangeFn={(e) => setPassword(e.target.value)} required={true} />
                <PrimaryButton title={'Log In'} type='button' onClickFn={async () => setLoggedInUser(await login(email, password))} />
                <a className={'text-blue hover:text-blue-hover transition-all ease-in hover:cursor-pointer'} href={'/register'}>Not registered yet? Create a free account now!</a>
            </form>
        </main>
    );
};

export default Login;
