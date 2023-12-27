"use client"

import React from "react";
import { useParams } from 'next/navigation';
import Main from "@/app/components/pages/Main";

const Group = () => {
    const params = useParams<{ group: string }>();

    const group = params.group;

    return (
        <Main group={group} />
    );
};

export default Group;
