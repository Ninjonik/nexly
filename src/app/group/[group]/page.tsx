import React from "react";
import { useParams } from 'next/navigation';
import Main from "@/app/components/pages/Main";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import Sidebar from "@/app/components/Sidebar";
import {SwipeHandler} from "@/app/components/SwipeHandler";

const Group = ({ params } : {params: { group: string}}) => {

    const group = params.group;

    return (
        <SwipeHandler>
            <Sidebar />
            <ChannelSidebar />
            <Main group={group} />
        </SwipeHandler>
    );
};

export default Group;
