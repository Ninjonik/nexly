"use client"

import React, {useEffect, useState} from "react";
import Main from "@/app/components/pages/Main";
import Cookies from "js-cookie";
import LoginPage from "@/app/components/pages/Login";
import login from "@/app/utils/login";
import Loading from "@/app/loading";

import User from "@/app/utils/interfaces/User";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    useEffect( () => {
        const storedEmail = Cookies.get("email");
        const storedPassword = Cookies.get("password");

        // TODO: spraviť aby sa v cookies ukladali celé userData
        // TODO: po update sa vymažú a spravia nové

        const loginCookies = async (storedEmail: string, storedPassword: string) => {
            setLoggedInUser(await login(storedEmail, storedPassword));
        };

        if (storedEmail && storedPassword && !loggedInUser) {
            loginCookies(storedEmail, storedPassword).then(r => setLoading(false))
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        loggedInUser ? (
            <Main setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
          ) : (
            <LoginPage setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
          )

      );
};

export default Home;
