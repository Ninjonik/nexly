"use client"

import React, {useEffect, useState} from "react";
import Main from "@/app/components/pages/Main";
import Cookies from "js-cookie";
import LoginPage from "@/app/components/pages/Login";
import login from "@/app/utils/login";
import Loading from "@/app/loading";

import User from "@/app/utils/interfaces/User";
import {useUserContext} from "@/app/UserContext";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {

    const { loggedInUser, setLoggedInUser } = useUserContext();

    if (!loggedInUser && loggedInUser != undefined) {
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
