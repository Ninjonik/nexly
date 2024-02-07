"use client"

import ChannelMain from "@/app/components/ChannelMain";
import React, {FC} from "react";
import { ToastContainer, toast } from 'react-toastify';
import {Homepage} from "@/app/components/Homepage";
import {useUserContext} from "@/app/UserContext";
import {useRouter} from "next/navigation";
import {SwipeHandler} from "@/app/components/SwipeHandler";

interface MainProps {
    group?: string | null
}

const Main: FC<MainProps> = ({ group }) => {

    const { loggedInUser, setLoggedInUser } = useUserContext();
    const router = useRouter();

    if(loggedInUser === null){
        router.push('/login?login=true')
        return
    }

    return (
        <>
            <ToastContainer />
            {group ? (
                <ChannelMain activeGroup={group} />
            ) : (
                <Homepage />
            )}
        </>
    )

};

export default Main;