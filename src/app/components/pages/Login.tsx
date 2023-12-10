"use client"

import React, { FC, useEffect, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import { account, ID } from "../../appwrite";
import Cookies from "js-cookie";
import login from "@/app/utils/login";
import logout from "@/app/utils/logout";

interface User {
    name: string;
}

interface LoginProps {
    loggedInUser: User | null,
    setLoggedInUser:  React.Dispatch<React.SetStateAction<User | null>>
}

const Login: FC<LoginProps> = ({ loggedInUser, setLoggedInUser }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    const register = async () => {
        await account.create(ID.unique(), email, password, name);
        setLoggedInUser(await login(email, password))
    };

    if (loggedInUser) {
        return (
            <div>
                <p>Logged in as {loggedInUser.name}</p>
                <button type="button" onClick={async () => setLoggedInUser(await logout())}>
                    Logout
                </button>
            </div>
        );
    }

    return (
        <main className='h-screen w-screen flex justify-center items-center bg-no-repeat bg-center bg-cover bg-[url("/banners/logoBanner.jpg")]'>
            <form
                className='bg-light flex flex-col rounded-md items-center gap-[2dvh] w-1/3 h-1/3 py-8 px-16'
            >
                <h1 className='text-4 text-white'>Welcome Back!</h1>
                {/*<FormInput title={'Username'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={name} onChangeFn={(e) => setName(e.target.value)} />*/}
                <FormInput title={'Email'} icon={<FontAwesomeIcon icon={faUser} />} valueProp={email} onChangeFn={(e) => setEmail(e.target.value)} required={true} />
                <FormInput title={'Password'} icon={<FontAwesomeIcon icon={faLock} />} inputType={'password'} valueProp={password} onChangeFn={(e) => setPassword(e.target.value)} required={true} />
                <PrimaryButton title={'Log In'} type='button' onClickFn={() => login(email, password)} />
                {/*<PrimaryButton title={'Register'} type='button' onClickFn={register} />*/}
            </form>
        </main>
    );
};

export default Login;
