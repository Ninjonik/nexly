"use client"

import React, {useEffect, useState} from "react";
import Main from "@/app/components/pages/Main";
import Cookies from "js-cookie";
import LoginPage from "@/app/components/pages/Login";
import login from "@/app/utils/login";
import Loading from "@/app/loading";

import User from "@/app/utils/interfaces/User";
import {useUserContext} from "@/app/UserContext";
import fireToast from "@/app/utils/toast";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {

    return (
        <Main />
      );
};

export default Home;
