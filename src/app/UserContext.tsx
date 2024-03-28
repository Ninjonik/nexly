"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import login from '@/app/utils/login';
import User from '@/app/utils/interfaces/User';
import {client, database, databases} from "@/app/appwrite";
import {Permission, Role} from "node-appwrite";

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

        const loginCookies = async (email: string | undefined, password: string | undefined) => {
            const res = await login(email, password);
            setLoggedInUser(res);
        };

        if (!loggedInUser || loggedInUser === "pending") {
            loginCookies(storedEmail, storedPassword);
        }
    }, [loggedInUser]);

    useEffect(() => {

        if(loggedInUser !== "pending" && loggedInUser && loggedInUser.$id){
            const setStatusRes = databases.updateDocument(database, "users", loggedInUser.$id, {
                status: "online",
            })
        }

        const unsubscribe = client.subscribe(`databases.${database}.collections.users.documents`, response => {
            const res: any = response.payload;
            if (loggedInUser !== "pending" && loggedInUser && loggedInUser.$id && res.$id === loggedInUser.$id) {
                setLoggedInUser(res);
            }
        });

        /* RUN ON PAGE EXIT */
        const handleUnload = () => {
            if(loggedInUser !== "pending" && loggedInUser && loggedInUser.$id){
                navigator.sendBeacon(`/api/setUserStatus`,
                    JSON.stringify({
                        userID: loggedInUser.$id,
                        status: "offline"
                    })
                );
            }
        };
        window.addEventListener('beforeunload', handleUnload);
        /* END */

        return () => {
            unsubscribe();
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [loggedInUser]);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};

