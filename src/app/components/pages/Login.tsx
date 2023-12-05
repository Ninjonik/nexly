import {
    faLock,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import React, { FC, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(username, password)

        const formData = {
            username: username.current?.value || "",
            password: password.current?.value || "",
        };

        console.log(formData.username, formData.password);

        // try {
        //     const response = await fetch("/api/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(formData),
        //     });
        //
        //     if (response.ok) {
        //
        //     } else {
        //
        //     }
        // } catch (error) {
        //     console.error("Error during login:", error);
        // }
    };


    return (
        <main className='h-screen w-screen flex justify-center items-center bg-no-repeat bg-center bg-cover bg-[url("/banners/logoBanner.jpg")]'>
            <form
                ref={formRef}
                className='bg-light flex flex-col rounded-md items-center gap-[2dvh] w-1/3 h-1/3 py-8 px-16'
                onSubmit={handleSubmit}
            >
                <h1 className='text-4 text-white'>Welcome Back!</h1>
                <FormInput title={'Username'} icon={<FontAwesomeIcon icon={faUser} />} ref={username} required={true} />
                <FormInput title={'Password'} icon={<FontAwesomeIcon icon={faLock} />} inputType={'password'} ref={password} required={true} />
                <PrimaryButton title={'Log In'} type='submit' />
            </form>
        </main>
    );
};

export default Login;
