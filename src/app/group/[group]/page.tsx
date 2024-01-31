import React from "react";
import { useParams } from 'next/navigation';
import Main from "@/app/components/pages/Main";
import ChannelSidebar from "@/app/components/ChannelSidebar";
import Sidebar from "@/app/components/Sidebar";

const Group = ({ params } : {params: { group: string}}) => {

    const group = params.group;

    return (
        <>
            <Sidebar />
            <ChannelSidebar />
            <Main group={group} />
        </>
    );
};

export default Group;
