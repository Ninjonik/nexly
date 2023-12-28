"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import login from '@/app/utils/login';
import User from '@/app/utils/interfaces/User';

interface UserContextProps {
    children: ReactNode;
}

interface UserContextValue {
    // loggedInUser: User;
    loggedInUser: any;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null | "pending">>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null | "pending">("pending");

    useEffect(() => {
        const storedEmail = Cookies.get('email');
        const storedPassword = Cookies.get('password');

        const loginCookies = async (storedEmail: string | undefined, storedPassword: string | undefined) => {
            const res = await login(storedEmail, storedPassword)
            setLoggedInUser(res);
        };

        if (!loggedInUser || loggedInUser == "pending") {
            loginCookies(storedEmail, storedPassword);
        }

    }, [loggedInUser]);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
