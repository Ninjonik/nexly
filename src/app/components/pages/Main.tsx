"use client"

import ChannelMain from "@/app/components/ChannelMain";
import React, {FC} from "react";
import { ToastContainer, toast } from 'react-toastify';
import {Homepage} from "@/app/components/Homepage";

interface MainProps {
    group?: string | null
}

const Main: FC<MainProps> = ({ group }) => {

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