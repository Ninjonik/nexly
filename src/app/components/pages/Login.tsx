import React, { FC, useEffect, useState } from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import FormInput from "@/app/components/form/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/app/components/form/buttons/PrimaryButton";
import { account, ID } from "../../appwrite";
import Cookies from "js-cookie";

interface User {
    name: string;
}

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true); // Set initial loading state to true

    useEffect(() => {
        const storedEmail = Cookies.get("email");
        const storedPassword = Cookies.get("password");

        if (storedEmail && storedPassword) {
            login(storedEmail, storedPassword)
                .then(() => setLoading(false)) // Hide spinner when login is successful
                .catch(() => setLoading(false)); // Hide spinner if login fails
        } else {
            setLoading(false); // If no cookies, set loading to false
        }
    }, []);

    const login = async (email: string, password: string) => {
        const session = await account.createEmailSession(email, password);
        setLoggedInUser(await account.get());

        Cookies.set("email", email, { expires: 7 });
        Cookies.set("password", password, { expires: 7 });
    };

    const logout = async () => {
        await account.deleteSession("current");
        setLoggedInUser(null);

        // Remove cookies on logout
        Cookies.remove("email");
        Cookies.remove("password");
    };

    const register = async () => {
        await account.create(ID.unique(), email, password, name);
        login(email, password);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loggedInUser) {
        return (
            <div>
                <p>Logged in as {loggedInUser.name}</p>
                <button type="button" onClick={logout}>
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
